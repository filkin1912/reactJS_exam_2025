import {createContext, useContext, useEffect, useState} from 'react';
import {boughtGamesServiceFactory} from "../services/boughtGamesService";
import {AuthContext} from "./AuthContext";
import {userServiceFactory} from "../services/userService";
import {useService} from "../hooks/useService";

export const BoughtGamesContext = createContext();

export const BoughtGamesProvider = ({children}) => {
    const {token, userId} = useContext(AuthContext);

    const [boughtGames, setBoughtGames] = useState([]);
    const boughtGamesService = boughtGamesServiceFactory(token);
    const userService = useService(userServiceFactory);

    useEffect(() => {
        if (userId) {
            boughtGamesService.getAll(userId)
                .then(result => {
                    setBoughtGames(result)
                })
        }
    }, [userId]);


    const buyGame = async (game) => {
        console.log("Inside buyGame function");
        console.log(userId);
        try {
            const user = await userService.getUser(userId);

            if (user.money >= game.price) {

                const newBoughtGame = await boughtGamesService.create(game);
                setBoughtGames([...boughtGames, newBoughtGame]);

                const newMoney = user.money - game.price;
                user.money = newMoney;
                const result = await userService.update(user._id, user);

                if (result && result._id) {
                    console.log('User money updated successfully!')
                } else {
                    console.log('ERROR WHILE UPDATING USER MONEY!');
                }

            } else {
                alert("Not enough money");
            }

        } catch (err) {
            console.log(err);  // Add error handling.
        }
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
