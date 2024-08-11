import { Link } from "react-router-dom";

export const Game = ({ _id, title, imageUrl, category, isFiltered }) => {
  isFiltered = isFiltered || false;
  const gameStyle = isFiltered ? { backgroundColor: '#746161' } : {}; // replace 'colorOfYourChoice' with your chosen color

  return (
      <div>
          <div className="allGames">
              <div className="allGames-info" style={gameStyle}>
                  <img src={imageUrl}/>
                  <h6>{category}</h6>
                  <h2>{title}</h2>
                  <Link to={`/catalog/${_id}`} className="details-button">DETAILS</Link>
              </div>
          </div>
      </div>
  );
};
