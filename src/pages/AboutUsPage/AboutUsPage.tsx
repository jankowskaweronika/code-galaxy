import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';

import PageSection from '../../components/PageSection/PageSection';
import ValueCard from '../../components/ValueCard/ValueCard';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';

import { team } from '../../data/aboutUsData';

const AboutUsPage: React.FC = () => {
    return (
        <MainLayout>
            <Box sx={{
                minHeight: 'calc(100vh - 64px)',
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <PageSection
                        title="CodeGalaxy"
                        sx={{ mb: 6 }}
                    >
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.primary"
                            sx={{ mb: 4 }}
                        >
                            Nasza akademia szkoleń to miejsce, gdzie pasja spotyka profesjonalizm.
                            Tworzymy wysokiej jakości kursy, które pomagają rozwijać umiejętności
                            i osiągać wyznaczone cele zawodowe. Nauka w dowolnym miejscu i czasie – platforma dostępna na różnych urządzeniach.
                        </Typography>

                        <ValueCard
                            title="Nasze Wartości"
                            values={[
                                'Jakość merytoryczna',
                                'Indywidualne podejście',
                                'Praktyczne umiejętności',
                                'Ciągły rozwój',
                                'Elastyczność i wygoda',
                                'Społeczność programistów'
                            ]}
                        />
                    </PageSection>

                    <PageSection title="Nasz Zespół">
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            gap={3}
                        >
                            {team.map((member) => (
                                <TeamMemberCard
                                    key={member.name}
                                    {...member}
                                />
                            ))}
                        </Box>
                    </PageSection>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default AboutUsPage;