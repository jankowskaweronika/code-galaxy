import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { Button } from '@mui/material';
import { PageHeader } from '../../components/PageHeader/PageHeader';

const HomePage: React.FC = () => (
    <PageLayout centered maxWidth="md">
        <PageHeader
            title="Witaj na platformie kursów programowania!"
            subtitle="Odkryj najlepsze kursy, rozwijaj swoje umiejętności i zostań mistrzem kodowania."
        />
        <Button
            variant="contained"
            color="primary"
            size="large"
            href="/courses"
            sx={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
        >
            Zobacz kursy
        </Button>
    </PageLayout>
);

export default HomePage;
