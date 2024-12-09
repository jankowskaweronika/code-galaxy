import { Box, styled } from '@mui/material';
import Star from './star';

const StyledStarField = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
    '& .star': {
        position: 'absolute',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        opacity: 0,
        animation: 'shoot 4s ease-in-out infinite',
        boxShadow: '0px 0px 5px 1.5px rgba(255, 255, 255, 0.5)',
    },
    '@keyframes shoot': {
        '0%': {
            transform: 'translateX(0) translateY(0)',
            opacity: 1,
        },
        '70%': {
            opacity: 0.8,
        },
        '100%': {
            transform: 'translateX(100vw) translateY(50vh)',
            opacity: 0,
        },
    },
});

const StarField = () => {
    const numStars = 10;
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <StyledStarField>
            {Array.from({ length: numStars }).map((_, i) => (
                <Star key={i} width={width} height={height} />
            ))}
        </StyledStarField>
    );
};

export default StarField;