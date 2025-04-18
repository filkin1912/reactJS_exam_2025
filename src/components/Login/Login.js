import {useContext} from "react";

import {AuthContext} from "../../context/AuthContext";
import {useForm} from "../../hooks/useForm";

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = () => {
    const {onLoginSubmit} = useContext(AuthContext);
    const {values, changeHandler, onSubmit} = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return (
        <section id="login-page" className="auth">
            <form id="login" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <h1>LOGIN</h1>
                    <label htmlFor="email">EMAIL:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Sokka@gmail.com"
                        name={LoginFormKeys.Email}
                        value={values[LoginFormKeys.Email]}
                        onChange={changeHandler}
                    />

                    <label htmlFor="login-pass">PASSWORD:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={LoginFormKeys.Password}
                        value={values[LoginFormKeys.Password]}
                        onChange={changeHandler}
                    />
                    <input type="submit" className="btn submit" value="LOGIN"/>

                </div>
            </form>
        </section>
    );
}