import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";

export const Game = ({_id, title, imageUrl, category, isFiltered, onBuy}) => {
    const {isAuthenticated} = useContext(AuthContext);
    isFiltered = isFiltered || false;
    const gameStyle = isFiltered ? {backgroundColor: '#746161'} : {};

    const handleBuy = () => {
        const gameData = {_id, title, imageUrl, category};
        onBuy(gameData);
    }

    return (
        <div>
            <div className="allGames">
                <div className="allGames-info" style={gameStyle}>
                    <img src={imageUrl} alt={title}/>
                    <h6>{category}</h6>
                    <h2>{title}</h2>
                    {isAuthenticated && (
                        <>
                            <button className="buy-button" onClick={handleBuy}>BUY</button>
                            <Link to={`/catalog/${_id}`} className="details-button">DETAILS</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
