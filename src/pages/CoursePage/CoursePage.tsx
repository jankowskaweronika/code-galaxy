import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    Chip,
    CircularProgress,
    Button,
    Snackbar,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../auth/authContext';
import { Course } from '../../types/course';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import courseService from '../../utils/courseService';

type CourseProgress = {
    completedTopics: Record<string, boolean>;
    progress: number;
}

const CoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId || !user) return;

            try {
                const coursesRef = collection(db, 'courses');
                const coursesSnapshot = await getDocs(coursesRef);
                const courseData = coursesSnapshot.docs
                    .map(doc => doc.data() as Course)
                    .find(course => course.id.toString() === courseId);

                if (courseData) {
                    setCourse(courseData);

                    const progressRef = doc(db, 'users', user.uid, 'coursesProgress', courseId);
                    const progressDoc = await getDoc(progressRef);

                    if (progressDoc.exists()) {
                        const data = progressDoc.data() as CourseProgress;
                        setCompletedTopics(data.completedTopics || {});
                    }
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, user]);

    const handleTopicCompletion = async (topicTitle: string, isCompleted: boolean) => {
        if (!user || !courseId || !course) return;

        setIsSaving(true);
        try {
            const newCompletedTopics = {
                ...completedTopics,
                [topicTitle]: isCompleted
            };

            setCompletedTopics(newCompletedTopics);

            await courseService.updateCourseProgress(
                user.uid,
                courseId,
                newCompletedTopics,
                course.topics.length
            );

            setShowSaveAlert(true);
        } catch (error) {
            console.error('Error updating topic completion:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <DashboardUserLayout drawer={<DashboardNavigation />}>
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress />
                </Box>
            </DashboardUserLayout>
        );
    }

    if (!course) {
        return (
            <DashboardUserLayout drawer={<DashboardNavigation />}>
                <Typography>Nie znaleziono kursu</Typography>
            </DashboardUserLayout>
        );
    }

    const currentProgress = Math.round(
        (Object.values(completedTopics).filter(Boolean).length / course.topics.length) * 100
    );

    return (
        <DashboardUserLayout drawer={<DashboardNavigation />}>
            <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/dashboard/progress')}
                    sx={{ mb: 3 }}
                >
                    Wróć do postępów
                </Button>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            {course.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {course.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Chip
                                label={`Poziom: ${course.difficulty}`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Czas trwania: ${course.totalDuration} min`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Ukończono: ${currentProgress}%`}
                                color="primary"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                        Tematy kursu:
                    </Typography>
                    <List>
                        {course.topics.map((topic, index) => (
                            <ListItem
                                key={index}
                                divider={index < course.topics.length - 1}
                                sx={{ py: 2 }}
                                secondaryAction={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigate(`/dashboard/course/${courseId}/lesson/${topic.order}`)}
                                        >
                                            Przejdź do lekcji
                                        </Button>
                                        <Checkbox
                                            checked={completedTopics[topic.title] || false}
                                            onChange={(e) => handleTopicCompletion(topic.title, e.target.checked)}
                                            disabled={isSaving}
                                        />
                                    </Box>
                                }
                            >
                                <ListItemText
                                    primary={topic.title}
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            Czas: {topic.duration} min
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>

            <Snackbar
                open={showSaveAlert}
                autoHideDuration={2000}
                onClose={() => setShowSaveAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setShowSaveAlert(false)}>
                    Postęp został zapisany
                </Alert>
            </Snackbar>
        </DashboardUserLayout>
    );
};

export default CoursePage;