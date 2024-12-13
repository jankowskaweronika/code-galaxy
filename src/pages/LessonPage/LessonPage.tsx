import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { collection, getDocs } from "firebase/firestore";
import { Course } from "../../types/course";
import { db } from "../../config/firebase.config";
import DashboardUserLayout from "../../layouts/DasboardUserLayout";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";

const LessonPage: React.FC = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasNextLesson, setHasNextLesson] = useState(false);
    const [currentTitle, setCurrentTitle] = useState<string>("");

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId || !lessonId) return;

            try {
                setIsLoading(true);
                const coursesRef = collection(db, 'courses');
                const coursesSnapshot = await getDocs(coursesRef);
                const courseData = coursesSnapshot.docs
                    .map(doc => doc.data() as Course)
                    .find(course => course.id.toString() === courseId);

                if (courseData?.topics) {
                    const currentTopicIndex = courseData.topics.findIndex(
                        topic => topic.order === Number(lessonId)
                    );

                    if (currentTopicIndex !== -1 && courseData.topics[currentTopicIndex]) {
                        const currentTopic = courseData.topics[currentTopicIndex];
                        setContent(currentTopic.content || '');
                        setCurrentTitle(currentTopic.title || '');
                        setHasNextLesson(currentTopicIndex < courseData.topics.length - 1);
                    } else {
                        navigate('/404');
                    }
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                navigate('/404');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, lessonId, navigate]);

    const handleBack = () => {
        navigate(`/dashboard/course/${courseId}`);
    };

    const handleNext = () => {
        if (!lessonId) return;
        const nextLessonId = Number(lessonId) + 1;
        navigate(`/dashboard/course/${courseId}/lesson/${nextLessonId}`);
    };

    if (isLoading) {
        return (
            <DashboardUserLayout drawer={<DashboardNavigation />}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            </DashboardUserLayout>
        );
    }

    if (!content) {
        return (
            <DashboardUserLayout drawer={<DashboardNavigation />}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" color="error">
                        Nie znaleziono treści lekcji
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleBack}
                        sx={{ mt: 2 }}
                    >
                        Wróć do kursu
                    </Button>
                </Box>
            </DashboardUserLayout>
        );
    }

    return (
        <DashboardUserLayout drawer={<DashboardNavigation />}>
            <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ mb: 3 }}
                >
                    Wróć do kursu
                </Button>

                <Paper elevation={3} sx={{ p: 4 }}>
                    {currentTitle && (
                        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                            {currentTitle}
                        </Typography>
                    )}

                    <div
                        className="lesson-content"
                        dangerouslySetInnerHTML={{
                            __html: content
                        }}
                    />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 4 }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                        >
                            Wróć do kursu
                        </Button>

                        {hasNextLesson && (
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={handleNext}
                            >
                                Następna lekcja
                            </Button>
                        )}
                    </Stack>
                </Paper>
            </Box>
        </DashboardUserLayout>
    );
};

export default LessonPage;