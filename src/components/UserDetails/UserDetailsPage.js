import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {userServiceFactory} from "../../services/userService";

export const UserDetailsPage = () => {
    const {token, userId, userEmail} = useContext(AuthContext);
    const userService = userServiceFactory(token, userId);
    const [userDetails, setUserDetails] = useState([]);


    useEffect(() => {
        userService.additionalInfoByOwnerId(userId)
            .then(result => {
                console.log(result)
                setUserDetails(result);
            });
    }, []);


    return (
        <div>
            <section id="edit-page" className="auth">
                <form id="edit" method="post">
                    <div className="container">
                        <h1>EMAIL: {userEmail}</h1>
                        <label htmlFor="leg-title">NATIONALITY: {userDetails.nationality}</label>
                        <label htmlFor="levels">AGE: {userDetails.age}</label>
                        <img className="game-img" src={userDetails.imageUrl}/>
                    </div>
                </form>
            </section>
        </div>
    );
};