import {requestFactory} from './requester';
import * as commentService from '../services/commentService';
import {boughtGamesServiceFactory} from "./boughtGameService";

const baseUrl = 'http://localhost:3030/data/games';

export const gameServiceFactory = (token) => {
    const request = requestFactory(token);
    const requestWithoutToken = requestFactory();
    const boughtGamesService = boughtGamesServiceFactory(token);

    const getAll = async () => {
        const result = await requestWithoutToken.get(baseUrl);
        const games = Object.values(result);

        return games;
    };

    const getOne = async (gameId) => {
        const result = await request.get(`${baseUrl}/${gameId}`);
        // add this check
        if (!result.comments) {
            result.comments = [];
        }
        return result;
    };

    const create = async (gameData) => {
        const result = await request.post(baseUrl, gameData);
        await boughtGamesService.create(gameData);
        console.log(result);

        return result;
    };

    const addComment = async (data) => {
        const result = commentService.create(data);
        console.log(result)
        return result;
    };

    const edit = (gameId, data) => request.put(`${baseUrl}/${gameId}`, data);

    const deleteGame = (gameId) => request.delete(`${baseUrl}/${gameId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        addComment,
        delete: deleteGame,
    };
}
