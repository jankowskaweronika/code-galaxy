import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};