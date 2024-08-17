import {createContext, useContext,} from 'react';
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {authServiceFactory} from "../services/authService";
import {userServiceFactory} from "../services/userService";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const [auth, setAuth] = useLocalStorage('authKey', {});
    const authService = authServiceFactory(auth.accessToken);
    const userService = userServiceFactory(auth.accessToken);


    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate("/catalog");
        } catch (error) {
            console.log("There is a problem");
        }
    };

    const onRegisterSubmit = async (values) => {
        const {confirmPassword, ...registerData} = values;
        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate("/catalog");

        } catch (error) {
            console.log("There is a problem");
        }
    };

    const onLogout = async () => {
        try {
            const authService = authServiceFactory(auth.accessToken);
            await authService.logout();
            setAuth({});

        } catch (error) {
            console.error("Logout error: ", error);
        }
        navigate('/');
    };


    const onUserEditSubmit = async (values) => {

        const result = await userService.update(values._id, values);

        if (result && result._id) {
            alert("Details updated");
            // navigate('/catalog');
            navigate("/user-details");

        } else {
            console.log('ERRRROOORRR!')
        }
    };


    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        onUserEditSubmit,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};
