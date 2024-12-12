import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    CircularProgress
} from '@mui/material';
import { useAuth } from '../../auth/authContext';
import { Course } from '../../types/course';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

const CoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { user } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

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
                        setCompletedTopics(progressDoc.data().completedTopics || {});
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

        const newCompletedTopics = {
            ...completedTopics,
            [topicTitle]: isCompleted
        };

        setCompletedTopics(newCompletedTopics);

        const completedCount = Object.values(newCompletedTopics).filter(Boolean).length;
        const totalProgress = Math.round((completedCount / course.topics.length) * 100);

        const progressRef = doc(db, 'users', user.uid, 'coursesProgress', courseId);
        await setDoc(progressRef, {
            completedTopics: newCompletedTopics,
            lastUpdated: new Date().getTime()
        });

        const purchasedRef = doc(db, 'users', user.uid, 'purchasedCourses', courseId);
        await setDoc(purchasedRef, { progress: totalProgress }, { merge: true });
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

    return (
        <DashboardUserLayout drawer={<DashboardNavigation />}>
            <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
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
                            >
                                <ListItemText
                                    primary={topic.title}
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            Czas: {topic.duration} min
                                        </Typography>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        checked={completedTopics[topic.title] || false}
                                        onChange={(e) => handleTopicCompletion(topic.title, e.target.checked)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </DashboardUserLayout>
    );
};

export default CoursePage;