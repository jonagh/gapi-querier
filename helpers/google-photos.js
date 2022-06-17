import auth from '../auth.js';

const ENDPOINT = 'https://photoslibrary.googleapis.com/v1';

function doRequest(method, path, body, accessToken) {
    return fetch(ENDPOINT + path, {
        method: method || 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: body ? JSON.stringify(body) : undefined
    })
    .then(response => response.json());
}

export default {
    request: async (method, path, body) => {
        return doRequest(method, path, method !== 'GET' ? body : undefined, auth.getCachedAccessToken());
    }
}
