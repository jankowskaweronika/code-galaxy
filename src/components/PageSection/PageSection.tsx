import { Box, Typography, SxProps, Theme } from '@mui/material';

type PageSectionProps = {
    title: string;
    children: React.ReactNode;
    titleColor?: string;
    sx?: SxProps<Theme>;
}

const PageSection: React.FC<PageSectionProps> = ({
    title,
    children,
    titleColor = 'primary.main',
    sx
}) => (
    <Box sx={{ width: '100%', ...sx }}>
        <Typography
            variant="h4"
            align="center"
            sx={{
                mb: 4,
                color: titleColor,
                fontWeight: 'bold'
            }}
        >
            {title}
        </Typography>
        {children}
    </Box>
);

export default PageSection