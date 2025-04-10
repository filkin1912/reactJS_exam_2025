import "./CreateGame.css";
import { useForm } from '../../hooks/useForm';
import {useGameContext} from "../../context/GameContext";

export const CreateGame = () => {

    const {onCreateGameSubmit} = useGameContext();
    const { values, changeHandler, onSubmit, errors } = useForm({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: '',
        price: 0,
    }, onCreateGameSubmit);

    return (
        <section id="create-page" className="auth">
            <form id="create" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>CREATE GAME</h1>

                    <label htmlFor="leg-title">TITLE:</label>
                    <input value={values.title} onChange={changeHandler} type="text" id="title" name="title"
                           placeholder="Enter game title..."/>
                     {errors.title && <p className="error">{errors.title}</p>}  {/* Error message */}

                    <label htmlFor="category">CATEGORY:</label>
                    <input value={values.category} onChange={changeHandler} type="text" id="category" name="category"
                           placeholder="Enter game category..."/>

                    <label htmlFor="levels">MAX LEVEL:</label>
                    <input value={values.maxLevel} onChange={changeHandler} type="number" id="maxLevel" name="maxLevel"
                           min="1" placeholder="1"/>

                    <label htmlFor="game-img">IMAGE:</label>
                    <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl"
                           placeholder="Upload a photo..."/>

                    <label htmlFor="summary">SUMMARY:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={changeHandler}></textarea>

                    <label htmlFor="levels">PRICE:</label>
                    <input value={values.price} onChange={changeHandler} type="number" id="price" name="price"
                           min="1" placeholder="1"/>

                    <input className="btn submit" type="submit" value="CREATE GAME"/>
                </div>
            </form>
        </section>
    );
};