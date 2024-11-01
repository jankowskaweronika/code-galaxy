import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions
} from '@mui/material';

export type CourseCardProps = {
    image: string;
    name: string;
    price: number;
    description: string;
    disabled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
    image,
    name,
    price,
    description,
    disabled = true
}) => {
    return (
        <Card
            sx={{
                maxWidth: 545,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
                sx={{
                    objectFit: 'contain',
                    height: 294,
                    width: '100%'
                }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ fontWeight: 'bold', mt: 1 }}
                >
                    {price.toLocaleString('pl-PL', {
                        style: 'currency',
                        currency: 'PLN'
                    })}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    disabled={disabled}
                    fullWidth
                >
                    Przejdź do kursu
                </Button>
            </CardActions>
        </Card>
    );
};

export default CourseCard;