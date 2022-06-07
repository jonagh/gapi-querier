import jwtHelper from './helpers/jwt-helper.js';

let _signinCallback = (userDisplay) => { console.warning('signinCallback not provided', userDisplay); };

function signInSuccessForCurrentUser(googleAuth) {
  return signInSuccess(googleAuth.currentUser.get());
}
function signInSuccess(googleUser) {
  alert('sign in success called');

  if (!googleUser)
    return signInFailure('gapi.signInSuccess:no-user');

  let userEmail = googleUser.getBasicProfile().getEmail();
  _signinCallback(userEmail || 'Signed In'); // If no 'email' scope was requested then no email will be available.
}
function signInFailure(err) {
  console.error('gapi.signInFailure', err);
  _signinCallback(`error:${JSON.stringify(err)}`);
}

export default {

  async init(gapi_client_id, gapi_scopes, signinCallback) {

    await gisLoadPromise;

    google.accounts.id.initialize({
      client_id: gapi_client_id,
      callback: async (response) => {
        const decodedCredential = jwtHelper.parseJwt(response.credential);
        signinCallback(decodedCredential.name);
        await this.loadAccessToken(gapi_client_id, gapi_scopes);
      }
    });
  },

  async loadAccessToken(gapi_client_id, gapi_scopes) {
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
  },

  renderButton(buttonContainerId, gapi_scopes) {
    google.accounts.id.renderButton(
      document.getElementById(buttonContainerId),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }
}
