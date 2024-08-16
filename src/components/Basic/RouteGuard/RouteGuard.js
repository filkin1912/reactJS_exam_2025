import {Navigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

export const RouteGuard = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to='/login'/>;
    }

    return (
        <>
            {children}
        </>
    );
};
