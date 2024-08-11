
export const Home = ({ games }) => {

    const latestGames = games ? games.slice(-3) : [];

    return (
        <section id="home-page">
            <h1>Latest Games</h1>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap"
            }}>
                {latestGames.map(game =>
                    <div key={game._id} style={{
                        border: "1px solid black",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        backgroundImage: `url(${game.imageUrl})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: "375px",
                        height: "375px",
                        overflow: "hidden"
                    }}>
                        {/*<img src={game.imageUrl} alt={game.title} style={{maxWidth: "100%", maxHeight: "100%"}} />*/}
                    </div>
                )}
            </div>
        </section>
    );
};