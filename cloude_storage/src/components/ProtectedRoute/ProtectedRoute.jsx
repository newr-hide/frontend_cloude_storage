import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';


export function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}