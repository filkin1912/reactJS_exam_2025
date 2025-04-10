import {createContext, useContext, useEffect, useState} from 'react';
import {boughtGamesServiceFactory} from "../services/boughtGameService";
import {AuthContext} from "./AuthContext";
import {userServiceFactory} from "../services/userService";
import {useService} from "../hooks/useService";
import {useNavigate} from "react-router-dom";

export const BoughtGamesContext = createContext();

export const BoughtGamesProvider = ({children}) => {
    const {token, userId} = useContext(AuthContext);
    const navigate = useNavigate();

    const [boughtGames, setBoughtGames] = useState(() => {
        const storedGames = localStorage.getItem('boughtGames');
        return storedGames ? JSON.parse(storedGames) : [];
    });

    useEffect(() => {
      localStorage.setItem('boughtGames', JSON.stringify(boughtGames));
    }, [boughtGames]);

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

// 'buyGame' function is an asynchronous operation that handles the purchase of a game.
// It accepts the 'game' object as a parameter.
// First, it checks if the user has already bought this game. If yes, it alerts the user that they already own the game and returns immediately.
// It retrieves the user information by calling the 'getUser' method from the userService.
// Then it checks if the user has sufficient money for the game. If not, it alerts the user that they don't have enough money.
// If the user has enough money, it creates a copy of the game as 'newBoughtGame' using 'boughtGamesService.create', append it to the 'boughtGames' list,
// and updates localStorage to persist changes across sessions.
// Then the user's money is deducted by the price of the game and updated using 'userService.update'.
// If the user's money is successfully updated, it alerts the user about the successful purchase and redirects them to the '/catalog' route. In case of an error in updating, it alerts the user about the update error.
    const buyGame = async (game) => {
        if(boughtGames.some(boughtGame => boughtGame.title === game.title)) {
            alert("You already have this game");
            return;
        }

        try {
            const user = await userService.getUser(userId);

            if (user.money >= game.price) {
                const newBoughtGame = await boughtGamesService.create(game);
                setBoughtGames(prevBoughtGames => {
                    const updatedBoughtGames = [...prevBoughtGames, newBoughtGame];
                    localStorage.setItem('boughtGames', JSON.stringify(updatedBoughtGames)); // Update localStorage
                    return updatedBoughtGames;
                });

                const newMoney = user.money - game.price;
                user.money = newMoney;
                const result = await userService.update(user._id, user);

                if (result && result._id) {
                    alert("Money successfully updated");
                    navigate('/catalog');
                } else {
                    alert('Error when updating balance!');
                }
            } else {
                alert("Not enough money");
            }

        } catch (err) {
            console.log(err);
        }
    }

    const contextValues = {
        boughtGames, buyGame, setBoughtGames,
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
