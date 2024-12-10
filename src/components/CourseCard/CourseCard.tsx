import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface CourseCardProps {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    purchased?: boolean;
    progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
    id,
    image,
    name,
    price,
    description,
    purchased = false,
    progress
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (purchased) {
            navigate(`/course/${id}`);
        } else {
            navigate(`/course/${id}/purchase`);
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Pełna wysokość
                maxHeight: 500,  // Maksymalna wysokość karty
                opacity: purchased ? 1 : 0.7,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                    opacity: 0.9
                }
            }}
        >
            <Box sx={{ position: 'relative', paddingTop: '56.25%' /* aspect ratio 16:9 */ }}>
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
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    padding: 2
                }}
            >
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
                        <Box
                            sx={{
                                width: '100%',
                                height: 4,
                                bgcolor: 'grey.200',
                                borderRadius: 2,
                                mt: 1
                            }}
                        >
                            <Box
                                sx={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    bgcolor: 'primary.main',
                                    borderRadius: 2,
                                }}
                            />
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
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleClick}
                >
                    {purchased ? 'Kontynuuj kurs' : 'Kup kurs'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default CourseCard;