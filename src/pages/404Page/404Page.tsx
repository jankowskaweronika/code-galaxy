import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

type NotFoundPageProps = {
    title: string;
    message: string;
    buttonText: string;
    buttonLink: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
    title,
    message,
    buttonText,
    buttonLink,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 4,
            }}
        >
            <Typography variant="h1" component="div" sx={{ fontSize: '4rem', mb: 2 }}>
                🚧
            </Typography>
            <Typography variant="h1" component="h1" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" gutterBottom>
                {message}
            </Typography>
            <Button
                component={Link}
                to={buttonLink}
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}
            >
                {buttonText}
            </Button>
        </Box>
    );
};

export default NotFoundPage;