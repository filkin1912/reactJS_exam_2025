import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { gameServiceFactory } from '../../services/gameService';
import * as commentService from '../../services/commentService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../context/AuthContext';

export const DetailsGame = ({onGameDeleteSubmit}) => {
    const { userId, userEmail, isAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const gameService = useService(gameServiceFactory)
    const navigate = useNavigate();
    const isLoggedIn = Boolean(userId);


    useEffect(() => {
    const fetchGameDetailsAndComments = async () => {
        try {
            const gameDetails = await gameService.getOne(gameId)
            const allComments = await commentService.getAll(gameId)
            const comments = allComments.filter(comment => comment.gameId === gameId);
            setGame({ ...gameDetails, comments: comments });

        } catch (error) {
            console.error("Failed to fetch game details and comments: ", error);
        }
    };

    fetchGameDetailsAndComments();
}, [gameId]);

    useEffect(() => {
      console.log(game.comments);
    }, [game.comments]);


    const onCommentSubmit = async (e) => {
          e.preventDefault();

          const commentData = {
            username: `${userEmail} - ${username}`,
            comment,
            gameId,
          };

          try {
            const result = await gameService.addComment(commentData);

            // This assumes that result = { username: '', comment: '' }
            if(result && result.username && result.comment) {
              setGame(state => ({
                ...state,
                comments: [...state.comments, {username: `${userEmail} - ${username}`, comment: commentData.comment}]
              }));
            }

            setUsername('');
            setComment('');

          } catch (error) {
            console.error("ERRRRRRROOOORRRR");
          }
    };

    const isOwner = game._ownerId === userId;



    return (
        <section id="game-details">
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl}/>
                    <h1>{game.title}</h1>
                    <span className="levels">MAX LEVEL: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {isAuthenticated && (
                    <div className="details-comments">
                        <h2>COMMENTS:</h2>
                        <ul>
                            {game.comments && game.comments.map((comment, index) => (
                                <li key={index} className="comment">
                                    <p>{comment.username}: {comment.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${game._id}/edit`} className="button">EDIT</Link>
                        <button className="button" id="btn" onClick={() => onGameDeleteSubmit(gameId)}>DELETE</button>
                    </div>
                )}
            </div>


            {isLoggedIn && (
                <div className="comment-box">
                    <article className="create-comment">
                        <label>Comment:</label>
                        <form className="form" onSubmit={onCommentSubmit}>
                            <input type="text" name="username" placeholder='Your name' value={username}
                                   onChange={(e) => setUsername(e.target.value)} required/>
                            <textarea name="comment" placeholder="Comment......" value={comment}
                                      onChange={(e) => setComment(e.target.value)} required></textarea>
                            <input className="btn submit" type="submit" value="Add Comment"/>
                        </form>
                    </article>
                </div>
            )}

        </section>
    );
};
