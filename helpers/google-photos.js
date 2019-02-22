const ENDPOINT = 'https://photoslibrary.googleapis.com/v1';

function getAccessToken(gapi) {
	return window.gapi
		.auth2.getAuthInstance()
		.currentUser.get()
		.getAuthResponse(true)
		.access_token;
}

function doRequest(method, path, body, accessToken) {
	return fetch(ENDPOINT + path, {
		method: method || 'GET',
		mode: 'cors',
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
			'authorization': `Bearer ${accessToken}`
		},
		body: body ? JSON.stringify(body) : undefined
	})
	.then(response => response.json());
}

export default {
	request: (method, path, body) => {
		return doRequest(method, path, method !== 'GET' ? body : undefined, getAccessToken());
	}
}