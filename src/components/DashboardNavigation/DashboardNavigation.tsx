import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Person, Timeline, School, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';

export type DashboardMenuItem = {
    text: string;
    path: string;
    icon: React.ReactNode;
    action?: () => void;
}

const DashboardNavigation: React.FC = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const menuItems: DashboardMenuItem[] = [
        { text: 'Twój profil', icon: <Person />, path: '/dashboard' },
        { text: 'Twoje postępy', icon: <Timeline />, path: '/dashboard/progress' },
        { text: 'Kursy', icon: <School />, path: '/dashboard/courses' },
        { text: 'Ustawienia', icon: <Settings />, path: '/dashboard/settings' },
        { text: 'Wyloguj się', icon: <ExitToApp />, path: '', action: () => signOut() }
    ];

    return (
        <List>
            {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            if (item.action) {
                                item.action();
                                navigate('/login');
                            } else {
                                navigate(item.path);
                            }
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default DashboardNavigation