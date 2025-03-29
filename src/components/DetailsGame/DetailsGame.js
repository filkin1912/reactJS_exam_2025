import {useEffect, useState, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';

import {gameServiceFactory} from '../../services/gameService';
import {useService} from '../../hooks/useService';
import {AuthContext} from '../../context/AuthContext';
import {useGameContext} from "../../context/GameContext";

export const DetailsGame = () => {
    const {onGameDeleteSubmit} = useGameContext();
    const {userId} = useContext(AuthContext);
    const {gameId} = useParams();
    const [game, setGame] = useState({});
    const gameService = useService(gameServiceFactory)



    useEffect(() => {
        const fetchGameDetailsAndComments = async () => {
            try {
                const gameDetails = await gameService.getOne(gameId)
                setGame(gameDetails);

            } catch (error) {
                console.error("Failed to fetch game details and comments: ", error);
            }
        };

        fetchGameDetailsAndComments();
    }, [gameId, gameService]);

    useEffect(() => {
        console.log(game.comments);
    }, [game.comments]);


    return (
        <section id="game-details">
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title}/>
                    <h1>{game.title}</h1>
                    <span className="levels">MAX LEVEL: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="buttons">
                    <Link to={`/catalog/${game._id}/edit`} className="button">EDIT</Link>
                    <button className="button" id="btn" onClick={() => onGameDeleteSubmit(gameId)}>DELETE</button>
                </div>

            </div>

        </section>
    );
};