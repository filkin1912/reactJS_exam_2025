import {useBoughtGamesContext} from "../../context/BoughtGamesContext";
import {BoughtGame} from "./BoughtGame";

export const BoughtGames = () => {
    const {boughtGames} = useBoughtGamesContext();

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
