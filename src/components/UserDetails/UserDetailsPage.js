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
                <div className="container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '10px'
                }}>

                    <div className="text-container" style={{
                        paddingLeft: "0px",
                    }}>
                        <label>EMAIL: {userEmail}</label>
                        <label htmlFor="leg-title">NATIONALITY: {userDetails.nationality}</label>
                        <label htmlFor="levels">AGE: {userDetails.age}</label>
                    </div>

                    <img className="game-img" src={userDetails.imageUrl}/>
                </div>
            </section>
        </div>
    );
};