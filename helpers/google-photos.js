const ENDPOINT = 'https://photoslibrary.googleapis.com/v1';

function getAccessToken() {
	/**
	 * The new Google Identity Service's (GIS) TokenClient.requestAccessToken() method displays a popup when invoked.
	 * Since we are using the access token in a loop, it is less than ideal to get the token (and hence, show the popup) on each iteration.
	 * To address, move the access token fetcher to init.js and save in a global variable (ugh!).
	 * If we were using GAPI client, GIS would automatically set the client's token.
	 */

	return window.access_token;
}

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
		return doRequest(method, path, method !== 'GET' ? body : undefined, getAccessToken());
	}
}
