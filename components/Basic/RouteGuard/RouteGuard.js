import {Navigate} from "react-router-dom";

export const RouteGuard = ({children}) => {
    const auth = JSON.parse(localStorage.getItem('authKey')) || {};
    const isAuthenticated = !!auth.accessToken;

    if (!isAuthenticated) {
        return <Navigate to='/login'/>;
    }

    return (
        <>
            {children}
        </>
    );
};
