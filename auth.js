import jwtHelper from './helpers/jwt-helper.js';

async function loadAccessToken(gapi_client_id, gapi_scopes) {
  await new Promise((resolve, reject) => {
    try {
      // Settle this promise in the response callback for requestAccessToken()
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: gapi_client_id,
        scope: gapi_scopes,
        prompt: 'none',
        callback: (resp) => {
          if (resp.error !== undefined) {
            reject(resp);
          }
          window.access_token = resp.access_token;
          resolve(resp);
        }
      });
      tokenClient.requestAccessToken();
    } catch (err) {
      console.log(err)
    }
  });
}

export default {

  async init(gapi_client_id, gapi_scopes, signinCallback) {
    await gisLoadPromise;
    google.accounts.id.initialize({
      client_id: gapi_client_id,
      callback: async (response) => {
        const decodedCredential = jwtHelper.parseJwt(response.credential);
        signinCallback(decodedCredential.name);
        await loadAccessToken(gapi_client_id, gapi_scopes);
      }
    });
  },

  renderButton(buttonContainerId, gapi_scopes) {
    // https://developers.google.com/identity/gsi/web/guides/display-button#javascript
    google.accounts.id.renderButton(
      document.getElementById(buttonContainerId),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }
}
