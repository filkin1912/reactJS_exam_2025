import './Register.css';
import {useContext} from "react";

import {useForm} from "../../hooks/useForm";
import {AuthContext} from "../../context/AuthContext";

export const Register = () => {

    const {onRegisterSubmit} = useContext(AuthContext);

    const {values, errors, changeHandler, onSubmit} = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    return (
        <section id="register-page" className="content auth">
            <form id="register" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>REGISTER</h1>

                    <label htmlFor="email">EMAIL:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}

                    <label htmlFor="pass">PASSWORD:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                    {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}

                    <label htmlFor="con-pass">CONFIRM PASSWORD:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        value={values.confirmPassword}
                        onChange={changeHandler}
                    />
                    {errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}

                    <input className="btn submit" type="submit" value="REGISTER"/>
                </div>
            </form>
        </section>

    );
};