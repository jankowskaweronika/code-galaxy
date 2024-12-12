import React from 'react';
import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';
import StarField from '../../animation/StarField';
import { PageLayout } from '../../layouts/PageLayout';

const HomePage: React.FC = () => (
    <Box
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden'
        }}
    >
        <StarField />
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <PageLayout centered maxWidth="md" padding={0}>
                <Box sx={{ color: '#FFFFFF' }}>
                    <PageHeader
                        title="Twoja podróż w kosmos programowania!"
                        subtitle="CodeGalaxy – gdzie każda linia kodu to nowa galaktyka do odkrycia"
                    />
                    <Box
                        component="a"
                        href="/courses"
                        sx={{
                            display: 'inline-block',
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}
                    >
                        Zobacz kursy
                    </Box>
                </Box>
            </PageLayout>
        </Box>
    </Box>
);

export default HomePage;