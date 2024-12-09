import { Box, Avatar, Typography } from '@mui/material';

type TeamMemberProps = {
    photo: string;
    name: string;
    role: string;
    bio: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
    photo,
    name,
    role,
    bio
}) => (
    <Box
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
                mb: 2
            }}
            src={photo}
        >
            {!photo && name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Typography variant="h6" color="text.primary">
            {name}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
            {role}
        </Typography>
        <Typography
            variant="body2"
            sx={{
                mt: 1,
                color: 'text.secondary'
            }}
        >
            {bio}
        </Typography>
    </Box>
);

export default TeamMemberCard