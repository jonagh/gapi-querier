GAPI-Querier
====================
I needed to get a list of all my photos (in Google Photos) that were NOT in an album,
unfortunatley Google didn't provide that feature. So I created this tool to get that listing via their API.
I probably could have just used their Google API playground (maybe?) but that's not as much fun.

This tool provides an interface for running Google APIs (doesn't have to be Google Photos).
You can create 'commands' in the commands folder and add them to the tool in commands.js.
The commands will show up in the dropdown (in the UI).

Google user authentication is taken care of, you just have to run whatever API calls you want, and provide output.

If you create your own 'command' then I am expecting something like the following:
export default {
	name: 'Some display name that will show in the dropdown',
	scopes: 'SpaceSeparated GoogleAPI Scopes AkaPermissions',
	async run() { return 'Either an HTML string or a DocumentFragment which will be inserted into the DOM'; }
}

Your run() function will be executed when the user chooses your 'command' from the dropdown and clicks 'Run'.

While coding this I was playing around (trying out Proxy objects, etc) so it is a bit fanciful in parts.
I also haven't really gone through and tested or cleaned-up/improved/etc the code, sorry - and I don't plan to.
You need a modern browser to run the code, but why would you run anything else.

You will need Google API credentials to be able to use the tool with their APIs.
Specifically you will need to enable the appropriate API and create OAuth credentials for JS.
You will need to copy the 'clientId' from your OAuth credentials and enter it into the gray box at the top of the UI.
- https://developers.google.com/photos/library/guides/get-started
- https://console.developers.google.com/apis/library
- Choose organization
- Enable photos API (APIs & Services > Library)
- Create a project (or choose existing)
- OAuth consent screen..., add authorised origins (eg: "https://jonagh.github.io")
- Add OAuth credentials (APIs & Services > Credentials)
- For Javascript (Web Application)
- Authorised JS origins (eg: "http://localhost", "https://jonagh.github.io")

Try it out: https://jonagh.github.io/gapi-querier