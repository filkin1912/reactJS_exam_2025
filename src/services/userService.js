import {requestFactory} from "./requester";

const baseUrl = 'http://localhost:3030/data/additional';

export const userServiceFactory = (token) => {

    const request = requestFactory(token);

   const additionalInfo = async (userId) => {

        try {
            const result = await request.get(`${baseUrl}/${userId}`);
            const info = Object.values(result);

            return info;

        } catch (error) {
            console.error("No additional info: ", error);
            if (error.message.includes('Not Found')) {

                const data = {
                    nationality: '',
                    age: '',
                    imageUrl: '',
                    userId: userId,
                };

                const result = await request.post(baseUrl, data);
                console.log(result);
                return result;

            } else {
                // Handle other types of errors
                throw error;
            }
        }
    };

   const update = async (userId, data) => {
       try {
           const response = await request.put(`${baseUrl}/${userId}`, data);
           console.log(response);
       } catch (err) {
           console.log(err);
       }
   }

   return {
       additionalInfo,
       update,
   };
}
