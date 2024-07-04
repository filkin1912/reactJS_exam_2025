import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { gameServiceFactory } from '../../services/gameService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../context/AuthContext';

export const DetailsGame = ({onGameDeleteSubmit}) => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const gameService = useService(gameServiceFactory)
    const navigate = useNavigate();


    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
            })
    }, [gameId]);

    // const onCommentSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     const result = await gameService.addComment(gameId, {
    //         username,
    //         comment,
    //     });
    //
    //     setGame(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));
    //     setUsername('');
    //     setComment('');
    // };

    const onCommentSubmit = async (e) => {
      e.preventDefault();

      try {
        const result = await gameService.addComment(gameId, {
          username,
          comment,
        });
        console.log('huiiiiiiiii')
        console.log(result);  // Log here

        setGame(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));
        setUsername('');
        setComment('');
      } catch (error) {
        console.error("ERRRRRRROOOORRRR"); // or wherever you want to display the error
      }
    };

    const isOwner = game._ownerId === userId;



    return (
        <section id="game-details">
            <h1>DETAILS GAME</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MAX LEVEL: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>COMMENTS:</h2>
                    <ul>
                        <li><h5>Huiiiiiiiiiiii</h5></li>
                        {game.comments && Object.values(game.comments).map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {/* {!Object.values(game.comments).length && (
                        <p className="no-comment">No comments.</p>
                    )} */}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${game._id}/edit`} className="button">EDIT</Link>
                        <button className="button" id="btn" onClick={() => onGameDeleteSubmit(gameId)}>DELETE</button>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type="text" name="username" placeholder='Your name' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};