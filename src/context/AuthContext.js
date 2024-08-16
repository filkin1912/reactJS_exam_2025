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
            console.log(result);
            console.log(result._id);

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
        console.log(`___________BEFORE SERVER____________`);
        console.log(values);
        console.log(values._id);
        const result = await userService.update(values._id, values);
        console.log(`___________AFTER SERVER____________`);
        console.log(result._id);
        console.log(result);
        if (result && result._id) {
            alert("Details updated");
            navigate('/catalog');
        } else {
            console.log('ERRRROOORRR!')
        }
        // navigate(`/details/${values._ownerId}`);
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
