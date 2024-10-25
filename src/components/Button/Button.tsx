import * as React from 'react';
import Button from '@mui/material/Button';

export type ButtonMUIProps = {
    variant?: 'text' | 'contained' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    onClick?: () => void;
    children?: React.ReactNode;
}

const ButtonMUI: React.FC<ButtonMUIProps> = ({
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    onClick,
    children,
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            color={color}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default ButtonMUI;