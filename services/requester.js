const request = async (method, token, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
    }

    // const serializedAuth = localStorage.getItem('authKey');

    // if (serializedAuth) {
    //     const auth = JSON.parse(serializedAuth);
    //     token = auth.accessToken;
    //     if (token) {
    //         options.headers = {
    //             ...options.headers,
    //             'X-Authorization': token,
    //         };
    //     }
    // }
    // и може да махнем токна отвсякъде, той не е вече нужен!

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        };
    }

    const response = await fetch(url, options);


    if (response.status === 404) {
        throw new Error(`Not Found: The URL ${url} does not exist.`);
    }
    if (response.status === 403 && response.url === 'http://localhost:3030/data/games') {
        return {};
    }
    if (response.status === 204) {
        return {};
    }
    if (response.status === 401) {
        throw new Error('Unauthorized: Invalid token.');
    }


    let result;

    if (response.headers.get('Content-Type')?.includes('application/json')) {
        result = await response.json();
    } else {
        result = await response.text();
    }

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const requestFactory = (token) => {

    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        patch: request.bind(null, 'PATCH', token),
        delete: request.bind(null, 'DELETE', token),
    }
};
