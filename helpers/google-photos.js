const ENDPOINT = 'https://photoslibrary.googleapis.com/v1';
const requestsSemaphore = new semaphore(3);

function getAccessToken(gapi) {
	return window.gapi
		.auth2.getAuthInstance()
		.currentUser.get()
		.getAuthResponse(true)
		.access_token;
}

function doRequest(method, path, body, accessToken) {
	return new Promise((resolve, reject) => {
		requestsSemaphore.take(async () => {
			try {
				const response = await fetch(ENDPOINT + path, {
					method: method || 'GET',
					mode: 'cors',
					headers: {
						'content-type': 'application/json',
						'authorization': `Bearer ${accessToken}`
					},
					body: body ? JSON.stringify(body) : undefined
				});
				resolve(response.json())
			} catch (err) {
				reject(err);
			}
			finally {
				requestsSemaphore.leave();
			}
		});
	})
}

export default {
	request: (method, path, body) => {
		return doRequest(method, path, method !== 'GET' ? body : undefined, getAccessToken());
	}
}