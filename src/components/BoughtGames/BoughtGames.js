import {useBoughtGamesContext} from "../../context/BoughtGamescontext";
import {BoughtGame} from "./BoughtGame";


export const BoughtGames = () => {
    const { boughtGames } = useBoughtGamesContext();

    if (!Array.isArray(boughtGames)) {
        return <div>No games found</div>; // Or some fallback UI
    }

    return (
        <section id="bought-games-page">
            <div style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                padding: 10,
                minHeight: "80.4vh",
            }}>
                {boughtGames.map(game => (
                    <BoughtGame key={game._id} {...game} />
                ))}
            </div>
        </section>
    );
}
