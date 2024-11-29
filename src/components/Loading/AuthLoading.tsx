import {
    Backdrop,
    CircularProgress,
    Typography,
    Box,
    LinearProgress
} from '@mui/material';

const AuthLoading = () => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(255,255,255,0.7)',
            }}
            open={true}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 3
                }}
            >
                <CircularProgress color="primary" size={60} thickness={4} />

                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                >
                    Uwierzytelnianie...
                </Typography>

                <Box sx={{ width: '300px' }}>
                    <LinearProgress
                        variant="indeterminate"
                        color="primary"
                        sx={{
                            height: 6,
                            borderRadius: 3
                        }}
                    />
                </Box>
            </Box>
        </Backdrop>
    );
};

export default AuthLoading;