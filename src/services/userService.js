import {requestFactory} from "./requester";

const baseUrl = 'http://localhost:3030/data/additional';

export const userServiceFactory = (token) => {

    const request = requestFactory(token);


    const createInitialDetails = async () => {
        const data = {
            nationality: '',
            age: '',
            imageUrl: '',
        };

        const result = await request.post(baseUrl, data);
        return result;
    }

    const additionalInfoByOwnerId = async (loggedUserId) => {

        try {
            const res = await request.get(baseUrl);

            const currentUserData = res.filter(el => el._ownerId === loggedUserId);
            return currentUserData[0] ?? createInitialDetails();

        } catch (error) {
            console.error(error);
            if (error && error.message.includes('Not Found')) {
                return createInitialDetails();
            }
        }
    };


    const update = async (userId, data) => {
        try {
            await request.get(`${baseUrl}/${userId}`);

            const response = await request.put(`${baseUrl}/${userId}`, data);
            return response;

        } catch (err) {
            if (err.message.includes('Not Found')) {
                // The resource doesn't exist
                console.error(`Resource with ID ${userId} doesn't exist.`);
            } else {
                console.log('Doesnt EXIST')
                console.error(err);
            }
        }
    };

    return {
        additionalInfoByOwnerId,
        update,
    };
}
