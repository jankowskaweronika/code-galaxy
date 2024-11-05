import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 4
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" gutterBottom>
                Oops! Strona nie została znaleziona.
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Przepraszamy, ale strona, której szukasz, nie istnieje.
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}
            >
                Wróć na stronę główną
            </Button>
        </Box>
    );
};

export default NotFoundPage;