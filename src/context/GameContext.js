import {createContext, useContext, useEffect, useState} from "react";
import {gameServiceFactory} from "../services/gameService";
import {useLocation, useNavigate} from "react-router-dom";
import {BoughtGamesContext} from "./BoughtGamescontext";


export const GameContext = createContext('');

export const GameProvider = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const gameService = gameServiceFactory();
    const { boughtGames, setBoughtGames } = useContext(BoughtGamesContext);


    useEffect(() => {
        // Check if the games are already fetched
        if (games.length > 0) return; // Skip fetching if games are already set

        // Reset filtered games if not on catalog page
        if (location.pathname !== '/catalog') {
            setFilteredGames([]);
        }

        // Fetch games only once
        gameService.getAll()
            .then(result => {
                setGames(result); // Set games only once
            })
            .catch(err => {
                console.error('Error fetching games:', err); // Log error if any
            });
    }, [location, games]); // Dependencies: location and games


    const handleSearch = (searchTerm) => {
        const results = games.filter(game =>
            game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (!results.length) {
            setFilteredGames([]);
            navigate('/catalog');
            return;
        }
        setFilteredGames(results);
    };

    const onCreateGameSubmit = async (data) => {
        if (!data.imageUrl) {
            data.imageUrl = "/images/no-image.png";
        }

        const newGame = await gameService.create(data);

        setGames((state) => [...state, newGame]);
        setBoughtGames(() => [...boughtGames, newGame]);

        navigate("/catalog");
    };

    const onGameEditSubmit = async (values) => {
        const result = await gameService.edit(values._id, values);
        setGames((state) => state.map((x) => (x._id === values._id ? result : x)));
        navigate(`/catalog/${values._id}`);
    };

    const onGameDeleteSubmit = async (gameId) => {
        await gameService.delete(gameId);
        setGames((state) => state.filter((x) => (x._id !== gameId)));
        navigate(`/catalog`);
    };

    const contextValues = {
        games,
        filteredGames,
        handleSearch,
        onGameEditSubmit,
        onCreateGameSubmit,
        onGameDeleteSubmit,
    };

    return (
        <GameContext.Provider value={contextValues}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
};
