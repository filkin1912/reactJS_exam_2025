import { Link } from "react-router-dom";

export const Game = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return(
        <div className="allGames">
            <div className="allGames-info">
                <img src={imageUrl} />
                <h6>{category}</h6>
                <h2>{title}</h2>
                <Link to={`/catalog/${_id}`} className="details-button">DETAILS</Link>
            </div>
        </div>
    );
};

// {
//     "title": "",
//     "category": "", 
//     "imageUrl": "",
//     "maxlevel": "",
//     "summary": ""
// }
