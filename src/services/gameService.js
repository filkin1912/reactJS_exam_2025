import {requestFactory} from './requester';

const baseUrl = 'http://localhost:3030/jsonstore/games';

export const gameServiceFactory = () => {
    const request = requestFactory();
    const requestWithoutToken = requestFactory();

    const getAll = async () => {
        const result = await requestWithoutToken.get(baseUrl);
        const games = Object.values(result);

        return games;
    };

    const getOne = async (gameId) => {
        const result = await request.get(`${baseUrl}/${gameId}`);

        return result;
    };

    const create = async (gameData) => {
        const result = await request.post(baseUrl, gameData);

        console.log(result);

        return result;
    };

    const edit = (gameId, data) => request.put(`${baseUrl}/${gameId}`, data);

    const deleteGame = (gameId) => request.delete(`${baseUrl}/${gameId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        delete: deleteGame,
    };
}
