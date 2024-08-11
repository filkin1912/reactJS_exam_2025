import { Game } from "./Game/Game";
export const Catalog = ({
    games,
    filteredGames
}) => {

    const gamesToDisplay = filteredGames.length > 0 ? filteredGames : games;

    return (
        <section id="catalog-page">
            <h1>All Games</h1>

            {
              gamesToDisplay.map(x => <Game key={x._id} {...x} />)
            }
        </section>
    );
};
