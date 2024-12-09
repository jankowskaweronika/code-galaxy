import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { Button, Box } from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';

import StarField from '../../animation/StarField';

const HomePage: React.FC = () => (
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
                    href="/courses"
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

export default HomePage;