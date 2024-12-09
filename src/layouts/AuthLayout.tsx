import React from 'react';
import { Paper } from '@mui/material';
import { PageLayout } from './PageLayout';

type AuthLayoutProps = {
    children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <PageLayout maxWidth="xs" centered>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    padding: 3,
                    mt: { xs: 2, sm: 8 }
                }}
            >
                {children}
            </Paper>
        </PageLayout>
    );
};