import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute({ children }) {
    const user = useSelector((x) => x.user);

    if (!user.user && !user.tokenEncrypt && !user.isConnected) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" replace={true} />;
    }

    // authorized so return child components
    return children;
}
