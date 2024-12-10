import { Typography, Box } from '@mui/material';

type SectionHeaderProps = {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    align = 'center'
}) => (
    <Box sx={{ mb: 4, textAlign: align }}>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
        {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
                {subtitle}
            </Typography>
        )}
    </Box>
);

export default SectionHeader