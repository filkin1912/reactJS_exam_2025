import {requestFactory} from "./requester";
// import * as console from "console";

const baseUrl = 'http://localhost:3030/data/additional';

export const userServiceFactory = (token) => {

    const request = requestFactory(token);

   // const additionalInfo = async (userId) => {
   //
   //      try {
   //          const result = await request.get(`${baseUrl}/${userId}`);
   //          const info = Object.values(result);
   //
   //          return info;
   //
   //      } catch (error) {
   //          console.error("No additional info: ", error);
   //          if (error.message.includes('Not Found')) {
   //
   //              const data = {
   //                  nationality: '',
   //                  age: '',
   //                  imageUrl: '',
   //                  userId: userId,
   //              };
   //
   //              const result = await request.post(baseUrl, data);
   //              console.log(result);
   //              return result;
   //
   //          } else {
   //              // Handle other types of errors
   //              throw error;
   //          }
   //      }
   //  };

    const createInitialDetails = async () => {
        const data = {
            nationality: '',
            age: '',
            imageUrl: '',
        };

        return await request.post(baseUrl, data);
    }

    const additionalInfoByOwnerId = async (loggedUserId) => {
        try {
            const result = await request.get(`${baseUrl}?_ownerId=${loggedUserId}`);
            if (result && Array.isArray(result)) {
                return result[0]; // Filter by parameter (_ownerId) returns Array with values. This is why we take the first only
            } else {
                throw new Error(`Something wrong with details request: ${result}`);
            }

        } catch (error) {
            console.error("No additional info: ", error);
            if (error.message.includes('Not Found')) {
                return createInitialDetails();
            } else {
                throw error;
            }
        }
    }

    const additionalInfo = async (userId) => {
        try {
            const result = await request.get(`${baseUrl}/${userId}`);
            const info = Object.values(result);
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

   // const update = async (userId, data) => {
   //      try {
   //          console.log(token);
   //          const response = await request.put(`${baseUrl}/${userId}`, data);
   //          return response;
   //      } catch (err) {
   //          console.log(err);
   //      }
   //  }
   const update = async (userId, data) => {
      try {
        // First, check if the resource exists
        await request.get(`${baseUrl}/${userId}`);

          console.log('EXIST')
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
       additionalInfo,
       additionalInfoByOwnerId,
       update,
   };
}
