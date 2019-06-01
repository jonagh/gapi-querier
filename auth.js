let _signinCallback = (userDisplay) => { console.warning('signinCallback not provided', userDisplay); };

function authReady(googleAuth) {
  //googleAuth.signIn();

  if (googleAuth.isSignedIn.get())
    signInSuccessForCurrentUser(googleAuth);

  googleAuth.isSignedIn.listen((isSignedIn) => {
    if (!isSignedIn)
      _signinCallback(null);
    else
      signInSuccessForCurrentUser(googleAuth);
  });
}

function signInSuccessForCurrentUser(googleAuth) {
  return signInSuccess(googleAuth.currentUser.get());
}
function signInSuccess(googleUser) {
  if (!googleUser)
    return signInFailure('gapi.signInSuccess:no-user');
  
  let userEmail = googleUser.getBasicProfile().getEmail();
  _signinCallback(userEmail || 'no-email');
}
function signInFailure(err) {
  console.error('gapi.signInFailure', err);
  _signinCallback(`error:${JSON.stringify(err)}`);
}

export default {
  init(gapi_client_id, gapi_scopes, signinCallback) {
    _signinCallback = signinCallback;

    // Google authentication/signin initialization (platform.js must be loaded already)
    gapi.load('auth2', function() { // on auth2 lib ready
      gapi.auth2.init({
        client_id: gapi_client_id,
        fetch_basic_profile: true,
        // https://developers.google.com/photos/library/guides/authentication-authorization
        scope: gapi_scopes,
        ux_mode: 'popup',
      })
      //.signIn()
      .then(authReady) // after auth2 init
      .catch(function(err) {
        console.error('auth.init:catch', err);
      });
    });
  },

  renderButton(buttonContainerId, gapi_scopes) {
    gapi.signin2.render(buttonContainerId, {
      scope: gapi_scopes,
      width: 240,
      height: 40,
      longtitle: true,
      theme: 'dark',
      onsucess: signInSuccess,
      onfailure: signInFailure
    });
  }
}