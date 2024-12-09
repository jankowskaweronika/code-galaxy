import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

type StarProps = {
    width: number;
    height: number;
}

const Star = ({ width, height }: StarProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0, delay: 0 });

    useEffect(() => {
        const resetStar = () => {
            setPosition({
                x: Math.random() * width,
                y: Math.random() * height,
                delay: Math.random() * 8,
            });
        };

        resetStar();
        const interval = setInterval(resetStar, 4000);
        return () => clearInterval(interval);
    }, [width, height]);

    return (
        <Box
            className="star"
            sx={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                animationDelay: `${position.delay}s`,
            }}
        />
    );
};

export default Star;