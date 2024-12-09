import { Box, Paper, Typography } from '@mui/material';

type ValueCardProps = {
    title: string;
    values: string[];
}

const ValueCard: React.FC<ValueCardProps> = ({ title, values }) => (
    <Paper
        elevation={3}
        sx={{
            p: 3,
            backgroundColor: 'primary.main',
            borderRadius: 2
        }}
    >
        <Typography
            variant="h5"
            gutterBottom
            sx={{ color: 'background.default' }}
        >
            {title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {values.map((value) => (
                <Typography
                    key={value}
                    variant="body2"
                    sx={{
                        color: 'background.default',
                        backgroundColor: 'primary.dark',
                        padding: '4px 12px',
                        borderRadius: '16px'
                    }}
                >
                    {value}
                </Typography>
            ))}
        </Box>
    </Paper>
);

export default ValueCard