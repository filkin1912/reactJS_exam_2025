import {Link} from "react-router-dom";

export const Game = ({_id, title, imageUrl, category, price, isFiltered, onBuy}) => {
    isFiltered = isFiltered || false;
    const gameStyle = isFiltered ? {backgroundColor: '#746161'} : {};

    const handleBuy = () => {
        const gameData = {_id, title, imageUrl, category, price};
        onBuy(gameData);
    }

    return (
        <div>
            <div className="allGames">
                <div className="allGames-info" style={gameStyle}>
                    <img src={imageUrl} alt={title}/>
                    <h6>{category}</h6>
                    <h2>{title}</h2>
                    <>
                        <button className="buy-button" onClick={handleBuy}>{`BUY: ${price}€`}</button>
                        <Link to={`/catalog/${_id}`} className="details-button">DETAILS</Link>
                    </>
                </div>
            </div>
        </div>
    );
};
