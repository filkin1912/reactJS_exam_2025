import {requestFactory} from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/comments';
const request = requestFactory();

// Fetches all comments for a specific game.
export const getAll = async (gameId) => {
    const query = encodeURIComponent(`gameId="${gameId}"`);

    const result = await request.get(`${baseUrl}?where=${query}`);
    const comments = Object.values(result);

    return comments;
};

// Creates a new comment for a game.
export const create = async (data) => {
    const result = await request.post(baseUrl, data);

    return result;
};