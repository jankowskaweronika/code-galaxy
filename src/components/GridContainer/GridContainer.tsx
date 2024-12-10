import { Grid2 } from '@mui/material';

type GridContainerProps = {
    children: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProps> = ({
    children,
}) => (
    <Grid2
        container
        spacing={4}
        sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
            },
            gap: 4,
        }}
    >
        {children}
    </Grid2>
);

export default GridContainer