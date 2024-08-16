import {requestFactory} from "./requester";
// import * as console from "console";

const baseUrl = 'http://localhost:3000/data/additional';

export const userServiceFactory = (token) => {

    const request = requestFactory(token);


    const createInitialDetails = async () => {
        const data = {
            nationality: '',
            age: '',
            imageUrl: '',
        };

        return await request.post(baseUrl, data);
    }

    const additionalInfoByOwnerId = async (loggedUserId) => {
        console.log('ADDITIONAL INFO BY OWNER ID');
        console.log(loggedUserId);

        try {
            const res = await request.get(baseUrl);

            const currentUserData = res.filter(el => el._ownerId === loggedUserId);
            const result = currentUserData[0];

            if (result) {
                return result;
            } else {
                return createInitialDetails();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const additionalInfo = async (userId) => {
        try {
            console.log('ADDITIONAL INFO')
            const result = await request.get(`${baseUrl}/${userId}`);
            const info = Object.values(result);
            console.log(info);
            return info;
        } catch (error) {
            console.error("No additional info: ", error);
            if (error.message.includes('Not Found')) {

                const initialData = await createInitialDetails();
                return initialData;

            } else {
                //Handle other types of errors
                throw error;
            }
        }
    };

    const update = async (userId, data) => {
        try {
            // First, check if the resource exists
            await request.get(`${baseUrl}/${userId}`);

            console.log('EXIST');
            const response = await request.put(`${baseUrl}/${userId}`, data);
            console.log(response);
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
        additionalInfo,
        additionalInfoByOwnerId,
        update,
    };
}

// REDUCER
// dispatch({
//     type: 'COMMENT_ADD',
//     payload: response,
//     userEmail,
// });
//
// dispatch([{type: 'GAME_FETCH', payload: gameState}])
//
//
//
// const [game, dispatch] = useReducer(gameReducer, {});
//
// export const gameReducer = (state, action) => {
//     switch (action.type) {
//         case 'GAME_FETCH':
//             return action.payload;
//             return {...action.payload};
//         case 'COMMENT_ADD':
//             return {
//                 ...state,
//                 comments: [
//                     ...state.comments,
//                     {
//                         ...action.payload,
//                         author: {
//                             email: action.userEmail,
//                         },
//                     },
//                 ],
//             };
//         default:
//             return state;
//     }
// }
