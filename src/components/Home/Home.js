import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGameContext } from "../../context/GameContext";

export const Home = () => {

    const { games } = useGameContext();
    const latestGames = games ? games.slice(-3) : [];
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <section id="home-page">
            {isAuthenticated && (<h1>Latest added Games</h1>)}
            {!isAuthenticated && (<h1>If you want to buy games, please login or register</h1>)}
            <div className="game-container">
                {latestGames.map(game =>
                    <div key={game._id} className="game-item" style={{ backgroundImage: `url(${game.imageUrl})` }}>
                        <h3 className="game-title">{game.title}</h3>
                    </div>
                )}
            </div>
        </section>
    );
};