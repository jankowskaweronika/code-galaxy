import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { CourseCardProps } from '../../types/course';

const CourseCard: React.FC<CourseCardProps> = ({
    id,
    image,
    name,
    price,
    description,
    purchased,
    progress,
    onPurchase
}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    const handlePurchase = async () => {
        if (!user) {
            setShowLoginAlert(true);
            return;
        }

        if (!onPurchase) return;

        setIsProcessing(true);
        try {
            await onPurchase(id);
            navigate('/dashboard/progress');
        } catch (error) {
            console.error('Błąd podczas zakupu kursu:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: purchased ? 'none' : 500,
                opacity: purchased ? 1 : 0.85,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                    opacity: 0.9
                }
            }}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Box>

                <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    padding: 2
                }}>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            minHeight: '3em',
                            marginBottom: 1,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {name}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                            minHeight: '4.5em'
                        }}
                    >
                        {description}
                    </Typography>

                    {purchased && progress !== undefined && (
                        <Box sx={{ mt: 'auto', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Postęp: {progress}%
                            </Typography>
                            <Box sx={{
                                width: '100%',
                                height: 4,
                                bgcolor: 'grey.200',
                                borderRadius: 2,
                                mt: 1
                            }}>
                                <Box sx={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    bgcolor: 'primary.main',
                                    borderRadius: 2,
                                }} />
                            </Box>
                        </Box>
                    )}

                    <Typography
                        variant="subtitle1"
                        color="primary"
                        sx={{
                            fontWeight: 'bold',
                            mt: 'auto'
                        }}
                    >
                        {purchased ? 'Kurs zakupiony' : price.toLocaleString('pl-PL', {
                            style: 'currency',
                            currency: 'PLN'
                        })}
                    </Typography>
                </CardContent>

                <CardActions sx={{ padding: 2, pt: 0 }}>
                    {purchased ? (
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate(`/dashboard/course/${id}`)}
                        >
                            Kontynuuj kurs
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handlePurchase}
                            disabled={isProcessing}
                            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
                        >
                            {isProcessing ? 'Przetwarzanie...' : 'Kup kurs'}
                        </Button>
                    )}
                </CardActions>
            </Card>

            <Snackbar
                open={showLoginAlert}
                autoHideDuration={6000}
                onClose={() => setShowLoginAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    onClose={() => setShowLoginAlert(false)}
                    action={
                        <Button
                            size="small"
                            onClick={() => navigate('/login')}
                        >
                            Zaloguj się
                        </Button>
                    }
                >
                    Zaloguj się, aby kupić ten kurs
                </Alert>
            </Snackbar>
        </>
    );
};

export default CourseCard;