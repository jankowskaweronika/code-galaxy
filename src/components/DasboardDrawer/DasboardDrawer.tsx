import React from 'react';
import { Drawer } from '@mui/material';

type DashboardDrawerProps = {
    open: boolean;
    onClose: () => void;
    drawerWidth: number;
    variant: 'temporary' | 'permanent';
    children: React.ReactNode;
}

const DashboardDrawer: React.FC<DashboardDrawerProps> = ({
    open,
    onClose,
    drawerWidth,
    variant,
    children
}) => {
    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true
            }}
            sx={{
                display: variant === 'temporary' ? 'block' : {
                    xs: 'none',
                    md: 'block'
                },
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            {children}
        </Drawer>
    );
};

export default DashboardDrawer