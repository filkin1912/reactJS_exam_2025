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

    // const [boughtGames, setBoughtGames] = useState([]);
    const [boughtGames, setBoughtGames] = useState(() => {
      return JSON.parse(localStorage.getItem('boughtGames')) || [];
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


    const buyGame = async (game) => {

        if(boughtGames.some(boughtGame => boughtGame.title === game.title)) {
            alert("You already have this game");
            return;
        }

        try {
            const user = await userService.getUser(userId);

            if (user.money >= game.price) {
                const newBoughtGame = await boughtGamesService.create(game);
                setBoughtGames([...boughtGames, newBoughtGame]);

                const newMoney = user.money - game.price;
                user.money = newMoney;
                const result = await userService.update(user._id, user);

                if (result && result._id) {
                    alert("Money successfully updated"); // Work on the wording to fit your context here
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
