import {requestFactory} from "./requester"

const baseUrl = 'http://localhost:3030/data/boughtGames';

export const boughtGamesServiceFactory = (token) => {
    const request = requestFactory(token);

    // Fetches all bought games by a specific user's ID.
    const getAll = async (loggedUser) => {
        try {
            const result = await request.get(baseUrl);

            if (typeof result !== 'object') {
                throw new Error('Unexpected result');
            }

            const games = Object.values(result);
            const userGames = games.filter(game => game._ownerId === loggedUser);
            return userGames;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Adds a new game to the bought games list.
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