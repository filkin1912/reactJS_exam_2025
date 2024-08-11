import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {userServiceFactory} from "../../services/userService";

export const UserDetailsPage = () => {
  const { token, userId } = useContext(AuthContext);
  const userService = userServiceFactory(token, userId);
  const [userDetails, setUserDetails] = useState([]);


   useEffect(() => {
        userService.additionalInfo(userId)
            .then(result => {
                setUserDetails(result);
            });
    }, []);


  return (
    <div>
        {userDetails.flatMap(userObj =>
            Object.entries(userObj).map(([id, user]) =>
                <section key={id} id="edit-page" className="auth">
                    <form id="edit" method="post">
                        <div className="container">
                            <h1>EMAIL: {user.email}</h1>
                            <label htmlFor="leg-title">NATIONALITY: {userDetails.nationality}</label>
                            <label htmlFor="levels">AGE: {userDetails.age}</label>
                            <label htmlFor="game-img">IMAGE: {userDetails.imageUrl}</label>
                        </div>
                    </form>
                </section>
            ))
        }
    </div>
  );
};