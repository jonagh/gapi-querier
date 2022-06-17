import jwtHelper from './helpers/jwt-helper.js';

const state = {
  credential: null,
  access_token: null
};

async function loadAccessToken(gapi_client_id, gapi_scopes) {
  return new Promise((resolve, reject) => {

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: gapi_client_id,
      scope: gapi_scopes,
      prompt: '',
      callback: (resp) => {
        if (resp.error !== undefined) {
          reject(resp);
        }

        resolve(resp.access_token);
      }
    });

    // GSI TokenClient.requestAccessToken() method displays a popup when invoked,
    // the initTokenClient callback (above) will be called once process is complete.
    tokenClient.requestAccessToken();

  });
}

export default {

  async init(gapi_client_id, gapi_scopes, signinCallback) {
    await global_gisLoadPromise;

    google.accounts.id.initialize({
      client_id: gapi_client_id,
      callback: async (response) => {
        try {
          state.credential = jwtHelper.parseJwt(response.credential);
          state.access_token = await loadAccessToken(gapi_client_id, gapi_scopes);
          signinCallback(state.credential.name);
        }
        catch (err) {
          signinCallback('ERROR: ' + JSON.stringify(err));
        }
      }
    });
  },

  getCachedAccessToken() {
    return state.access_token;
  },

  renderButton(buttonContainerId) {
    // https://developers.google.com/identity/gsi/web/guides/display-button#javascript
    google.accounts.id.renderButton(
      document.getElementById(buttonContainerId),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  },

  reset() {
    google.accounts.oauth2.revoke();
  }
}
