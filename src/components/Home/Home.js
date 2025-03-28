import {useGameContext} from "../../context/GameContext";

export const Home = () => {

    const {games} = useGameContext();
    const latestGames = games ? games.slice(-3) : [];

    return (
        <section id="home-page">

            <h1>Latest added Games</h1>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap"
            }}>
                {latestGames.map(game =>
                    <div key={game._id} style={{
                        border: "1px solid black",
                        backgroundImage: `url(${game.imageUrl})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: "375px",
                        height: "375px",
                        overflow: "hidden"
                    }}>
                    </div>
                )}
            </div>
        </section>
    );
};