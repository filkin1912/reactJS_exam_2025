import {createContext, useContext, useEffect, useState} from "react";
import {gameServiceFactory} from "../services/gameService";
import {useLocation, useNavigate} from "react-router-dom";
import {BoughtGamesContext} from "./BoughtGamescontext";


export const GameContext = createContext('');

export const GameProvider = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();

    // const [games, setGames] = useState([]);
    const [games, setGames] = useState(() => {
      return JSON.parse(localStorage.getItem('games')) || [];
   });

   useEffect(() => {
      localStorage.setItem('games', JSON.stringify(games));
   }, [games]);

    const [filteredGames, setFilteredGames] = useState([]);
    const gameService = gameServiceFactory();
    const { boughtGames, setBoughtGames } = useContext(BoughtGamesContext);


    useEffect(() => {
        if (games.length > 0) return;

        if (location.pathname !== '/catalog') {
            setFilteredGames([]);
        }

        gameService.getAll()
            .then(result => {
                setGames(result);
            })
            .catch(err => {
                console.error('Error fetching games:', err);
            });
    }, [location, games]);

// handleSearch is a function that handles the game search process.
// It takes a searchTerm as a parameter which should refer to the game's title.
// The function filters the games list based on the searchTerm, and updates the filteredGames state.
// If no games match the searchTerm, filteredGames is set as an empty array and user is redirected to the '/catalog' route.
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
        let formErrors = {};

        // Validation input title field
        if (!data.title) formErrors.title = "Title field must be filled";

        // Check if form is valid
        if (Object.keys(formErrors).length) {
            return formErrors; // If validation fails, return errors
        }

        // Default imageUrl if not provided
        data.imageUrl = data.imageUrl || "/images/no-image.png";

        // Create the game and update states
        const newGame = await gameService.create(data);
        setGames((state) => [...state, newGame]);
        setBoughtGames((prevBoughtGames) => {
            const updatedBoughtGames = [...prevBoughtGames, newGame];
            localStorage.setItem('boughtGames', JSON.stringify(updatedBoughtGames)); // Updated localStorage - boughtGames
            return updatedBoughtGames;
        });

        navigate("/catalog");

        return {};  // Return empty object if no errors
    };


// onGameEditSubmit is an asynchronous function that handles games update process.
// It accepts an object of updated game details as a parameter.
// The function passes the game's id and the updated details to the gameService's edit method.
// After successful editing, it updates the games state where the edited game replaces the original game.
// Finally, it redirects the user to the game's individual page located at '/catalog/:gameId'.
    const onGameEditSubmit = async (values) => {
        // Check if image is missing or empty and set a default image if needed
        values.imageUrl = values.imageUrl || "/images/no-image.png";

        const result = await gameService.edit(values._id, values);

        setGames((state) => state.map((x) => (x._id === values._id ? result : x)));
        navigate(`/catalog/${values._id}`);
    };

// onGameDeleteSubmit is an asynchronous function that handles the game deletion process.
// It accepts the game's id as a parameter.
// The function passes the game's id to the gameService's delete method and upon successful delete, it removes the deleted game from the games state.
// Finally, it redirects the user to '/catalog' route.
    const onGameDeleteSubmit = async (gameId) => {
        await gameService.delete(gameId);
        setGames((state) => state.filter((x) => (x._id !== gameId)));
        navigate(`/catalog`);
    };

    const contextValues = {
        games,
        filteredGames,
        setFilteredGames,
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
