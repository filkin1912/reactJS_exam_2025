import { Game } from "./Game/Game";
import {useGameContext} from "../../context/GameContext";
import {useBoughtGamesContext} from "../../context/BoughtGamesContext";

export const Catalog = () => {
    const {games} = useGameContext();
    const {filteredGames} = useGameContext();
    const gamesToDisplay = filteredGames.length > 0 ? filteredGames : games;

    const {buyGame} = useBoughtGamesContext();

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {
            gamesToDisplay.map(x => <Game key={x._id} {...x} onBuy={buyGame} />)
            }
        </section>
    );
}
