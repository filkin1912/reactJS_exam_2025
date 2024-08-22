import {createContext, useContext, useEffect, useState} from 'react';
import {boughtGamesServiceFactory} from "../services/boughtGamesService";
import {AuthContext} from "./AuthContext";

export const BoughtGamesContext = createContext();

export const BoughtGamesProvider = ({children}) => {
    const {token, userId} = useContext(AuthContext);

    const [boughtGames, setBoughtGames] = useState([]);
    const boughtGamesService = boughtGamesServiceFactory(token);

    useEffect(() => {
        if (userId) {
            boughtGamesService.getAll(userId)
                .then(result => {
                    setBoughtGames(result)
                })
        }
    }, [userId]);

    const buyGame = async (game) => {
        const newBoughtGame = await boughtGamesService.create(game);
        setBoughtGames([...boughtGames, newBoughtGame]);
    }

    const contextValues = {
        boughtGames, buyGame,
    };

    return (
        <BoughtGamesContext.Provider value={contextValues}>
            {children}
        </BoughtGamesContext.Provider>
    );
};

export const useBoughtGamesContext = () => {
    const context = useContext(BoughtGamesContext);

    return context;
};
