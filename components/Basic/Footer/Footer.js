import "./Footer.css";
import {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

export const Footer = () => {
    const {isAuthenticated, userEmail} = useContext(AuthContext);
    return (
        <section className="container-fluid footer_section ">
            <p>
                {isAuthenticated && (<h5>{userEmail}</h5>)}
                {!isAuthenticated && (<h5>All rights reserved</h5>)}
            </p>
        </section>
    );
};