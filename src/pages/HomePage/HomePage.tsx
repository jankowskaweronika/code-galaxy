import React from 'react';
import { Box, Button } from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';
import StarField from '../../animation/StarField';
import { PageLayout } from '../../layouts/PageLayout';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <StarField />
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                color: '#FFFFFF'
            }}>
                <PageLayout centered maxWidth="md">
                    <PageHeader
                        title="Twoja podróż w kosmos programowania!"
                        subtitle="CodeGalaxy – gdzie każda linia kodu to nowa galaktyka do odkrycia"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/courses')}
                        sx={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem'
                        }}
                    >
                        Zobacz kursy
                    </Button>
                </PageLayout>
            </Box>
        </Box>
    );
};

export default HomePage;
