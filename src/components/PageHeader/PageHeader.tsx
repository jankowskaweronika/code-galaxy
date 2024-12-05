import { Typography, Box } from '@mui/material';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
        </Typography>
        {subtitle && (
            <Typography variant="h5" component="p" sx={{ color: 'text.secondary' }}>
                {subtitle}
            </Typography>
        )}
    </Box>
);