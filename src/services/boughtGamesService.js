import {requestFactory} from './requester';

const baseUrl = 'http://localhost:3030/data/boughtGames';

export const boughtGamesServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async (loggedUser) => {
        const result = await request.get(baseUrl);
        const games = Object.values(result);

        const userGames = games.filter(game => game._ownerId === loggedUser);

        return userGames;
    };


    const create = async (gameData) => {
        const result = await request.post(baseUrl, gameData);

        console.log(result);

        return result;
    };


    return {
        getAll,
        create,
    };
}
