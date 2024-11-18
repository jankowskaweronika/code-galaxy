import React from 'react';
import { Box, Typography, Container, Avatar, Paper } from '@mui/material';

import { MobileMenu } from '../../components/MobileMenu';
import Navbar from '../../components/Navbar/Navbar';

import theme from '../../theme/theme';

import { useNavigation } from '../../hooks/useNavigation';

type TeamMember = {
    photo: string;
    name: string;
    role: string;
    bio: string;
};

const team: TeamMember[] = [
    {
        photo: "https://thispersondoesnotexist.com/",
        name: 'Anna Kowalska',
        role: 'Główny Trener',
        bio: 'Ponad 10 lat doświadczenia w nauczaniu i rozwoju umiejętności zawodowych.'
    },
    {
        photo: "https://thispersondoesnotexist.com/",
        name: 'Piotr Nowak',
        role: 'Ekspert Techniczny',
        bio: 'Specjalista z wieloletnim doświadczeniem w branży IT i szkoleniach.'
    }
];

const AboutUsPage: React.FC = () => {
    const { isDrawerOpen, handleDrawerToggle, handleDrawerClose } = useNavigation();

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 4,
                color: theme.palette.background.default,
            }}
        >
            <Navbar
                isDrawerOpen={isDrawerOpen}
                onDrawerToggle={handleDrawerToggle}
                onDrawerClose={handleDrawerClose}
            />
            {isDrawerOpen && <MobileMenu onClose={handleDrawerClose} isOpen={false} menuItems={[]} />}
            <Typography
                mt="100px"
                variant="h3"
                align="center"
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main
                }}
            >
                CodeRoad
            </Typography>

            <Box display="flex" flexDirection="column" gap={4}>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'column' }} gap={4}>
                    <Box textAlign='center'>
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.background.default }}
                        >
                            Nasza akademia szkoleń to miejsce, gdzie pasja spotyka profesjonalizm.
                            Tworzymy wysokiej jakości kursy, które pomagają rozwijać umiejętności
                            i osiągać wyznaczone cele zawodowe.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.background.default }}
                        >
                            Każdy kurs jest starannie przygotowany przez doświadczonych trenerów,
                            którzy dzielą się sprawdzoną wiedzą i praktycznymi rozwiązaniami.
                        </Typography>
                    </Box>

                    <Box>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 2
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ color: theme.palette.background.default }}
                            >
                                Nasze Wartości
                            </Typography>
                            <Typography
                                variant="body2"
                                display='flex'
                                sx={{ color: theme.palette.background.default }}
                            >
                                • Jakość merytoryczna
                                • Indywidualne podejście
                                • Praktyczne umiejętności
                                • Ciągły rozwój
                            </Typography>
                        </Paper>
                    </Box>
                </Box>

                <Box>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            my: 3,
                            color: theme.palette.primary.main
                        }}
                    >
                        Nasz Zespół
                    </Typography>

                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={3}
                    >
                        {team.map((member: TeamMember) => (
                            <Box
                                key={member.name}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                textAlign="center"
                                width={{ xs: '100%', sm: 'calc(50% - 24px)' }}
                            >
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mb: 2,
                                        bgcolor: theme.palette.secondary.main,
                                        color: theme.palette.background.default
                                    }}
                                    src={member.photo}
                                >
                                    {!member.photo && member.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    sx={{ color: theme.palette.primary.main }}
                                >
                                    {member.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: theme.palette.background.default }}
                                >
                                    {member.role}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        color: theme.palette.background.default
                                    }}
                                >
                                    {member.bio}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default AboutUsPage;