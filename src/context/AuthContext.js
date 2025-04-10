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

// onLoginSubmit is an asynchronous function that handles the user login process.
// It takes a data object as a parameter which should contain the user's credentials(username and password).
// The function passes this data to authService's login method and in case of successful login,
// the returned result containing user's information and the access token get stored in the LocalStorage.
// If the login process is successful, it navigates the user to "/catalog".
// If an error occurs during the process, it will simply log "There is a problem" to the console.
    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate("/catalog");
        } catch (error) {
            console.log("There is a problem");
        }
    };
// onRegisterSubmit is an asynchronous function that handles the user registration process.
// It takes an object containing the new user's details as a parameter (email, and password).
// Before processing, it ensures that the provided password and confirmation password match.
// If they don't match, it immediately returns without any further processing.
// The function passes the user registration data (without the confirmation password) to authService's register method.
// If registration is successful, the result (similar to login) is stored in the LocalStorage and the user is navigated
// to the "/catalog" route.If an error occurs during registration,then "There is a problem" will be logged to the console.
    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        const errors = {};

        // Validate email
        const email = registerData.email;

        // Check for minimum length of local part
        if (!/^[\w-]{3,}/.test(email.split('@')[0])) {
            errors.email = "The local part must be at least 3 characters long and can only include letters, numbers, " +
                "underscores, and hyphens.";
            console.log(errors.email);
            return errors;
        }

        // Check for valid domain part
        const domain = email.split('@')[1];
        if (!domain || !/^[\w-]{2,}(\.[\w-]{2,})+$/.test(domain)) {
            errors.email = "The domain must start with at least 2 characters and can include letters, numbers, " +
                "underscores, and hyphens, followed by a valid TLD.";
            console.log(errors.email);
            return errors;
        }

        // Password complexity
        // Ensures that the password is at least 4 characters long and includes at least one uppercase letter
        if (!/(?=.*[A-Z]).{4,}/.test(registerData.password)) {
            errors.password = "Password must be at least 4 characters long and contain at least one uppercase letter";
            console.log("Password must be at least 4 characters long and contain at least one uppercase letter");
            return errors;
        }

        // Password Confirmation Match
        if (confirmPassword !== registerData.password) {
            console.log("Passwords do not match");
            errors.confirmPassword = "Passwords do not match";
            return errors;
        }

        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate("/catalog");
            return null; // No errors
        } catch (error) {
            errors.email = "A user with the same email already exists!";
            return error;
        }
    };

// onLogout is an asynchronous function that is responsible for logging out the user.
// The function first calls authService's logout method, and on success, it clears the user's authentication data from
// the LocalStorage and navigates the user to the root ("/") route.
// If an error occurs during the logout process, it logs the error message to the console.
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

// onUserEditSubmit is an asynchronous function that helps the user to update their details.
// It takes an object containing the updated user's details as a parameter.
// The function passes this data to userService's update method, and on success, it confirms to the user that their
// details have been updated via an alert message.
// After the update process, it navigates the user to the "/catalog" route.
// If an error occurs during the update process, it logs "ERRRROOORRR!" to the console.
    const onUserEditSubmit = async (values) => {

        const result = await userService.update(values._id, values);

        if (result && result._id) {
            alert("Details updated");
            navigate('/catalog');
            // navigate("/user-details");

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