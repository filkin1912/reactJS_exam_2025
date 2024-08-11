import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {authServiceFactory} from "../../services/authService";
import {useForm} from "../../hooks/useForm";
import {useParams} from "react-router-dom";
import {useService} from "../../hooks/useService";
import {userServiceFactory} from "../../services/userService";

export const UserDetails = ({onUserEditSubmit,}) => {

    const { userEmail, userId } = useContext(AuthContext);

    // const userId = useParams();
    const userDataService = useService(userServiceFactory);
    const {values, changeHandler, onSubmit, changeValues} = useForm({
        nationality: '',
        age: '',
        imageUrl: '',
    }, onUserEditSubmit);


    useEffect(() => {
        userDataService.additionalInfo(userId)
            .then(result => {
                changeValues(result);
            });
    }, [userId]);

    return (
        <div>
            <section id="edit-page" className="auth">
                <form id="edit" method="post" onSubmit={onSubmit}>
                    <div className="container">

                        <h1>EMAIL: {userEmail}</h1>
                        <label htmlFor="leg-title">NATIONALITY:</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={values.nationality}
                            onChange={changeHandler}
                        />

                        <label htmlFor="levels">AGE:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            min="1"
                            value={values.age}
                            onChange={changeHandler}
                        />

                        <label htmlFor="game-img">IMAGE:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={values.imageUrl}
                            onChange={changeHandler}
                        />
                        <input className="btn submit" type="submit" value="SAVE"/>

                    </div>
                </form>
            </section>
        </div>
    );
}
