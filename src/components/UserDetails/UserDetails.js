import React, {useEffect, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "../../hooks/useForm";
import {useService} from "../../hooks/useService";
import {userServiceFactory} from "../../services/userService";


export const UserDetails = () => {

    const { userEmail, userId, onUserEditSubmit } = useContext(AuthContext);
    const userDataService = useService(userServiceFactory);

    const {values, changeHandler, onSubmit, changeValues} = useForm({
        _id: '',
        nationality: '',
        age: '',
        imageUrl: '',
    }, onUserEditSubmit);


    useEffect(() => {

        if (userId) {
            userDataService.additionalInfoByOwnerId(userId)
                .then(result => {
                    console.log('USE EFFECT RESULT')
                    console.log(result)
                    changeValues({ ...result });
                });
        }
        console.log('HUIAAAAA');
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
