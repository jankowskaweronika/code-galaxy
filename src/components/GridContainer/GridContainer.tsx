import { Box } from '@mui/material';

type GridContainerProps = {
    children: React.ReactNode;
    spacing?: number;
}

export const GridContainer: React.FC<GridContainerProps> = ({
    children,
    spacing = 3
}) => (
    <Box sx={{
        display: 'grid',
        gap: spacing,
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
        }
    }}>
        {children}
    </Box>
);