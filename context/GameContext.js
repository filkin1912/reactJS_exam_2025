import {createContext, useContext, useEffect, useState} from "react";
import {gameServiceFactory} from "../services/gameService";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";


export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const gameService = gameServiceFactory(token);


    useEffect(() => {
        if (location.pathname !== '/catalog') {
            setFilteredGames([]);
        }
        // if (token) {
            gameService.getAll()
                .then(result => {
                    setGames(result)
                })
        // }
    }, [location, token]);

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
        const newGame = await gameService.create(data);

        setGames((state) => [...state, newGame]);

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
