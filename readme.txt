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
* Sign into Google Developer console: https://console.developers.google.com
* Create a project.
* Go to API library and enable the APIs you want: https://console.developers.google.com/apis/library
  Eg (for Google Photos API): https://console.developers.google.com/apis/library/photoslibrary.googleapis.com
* Setup consent screen: https://console.developers.google.com/apis/credentials/consent
	- Add authorised domains, eg: "jonagh.github.io"
* Create credentials (choose OAuth client id): https://console.developers.google.com/apis/credentials/oauthclient
	- For "Web Application"
	- Add Authorised JavaScript origins, eg: "https://jonagh.github.io"
* Copy the client ID (from the credentials you just created)

Try it out: https://jonagh.github.io/gapi-querier
* I don't output very good errors (sorry), so make sure to check your credentials are correct.
* Some errors can be viewed in the browser's dev-tools/console.
* Note that, unless you 'verify' your API project & domain, the Google signin popup will show a warning about the app not being verified, you'll need click 'Advanced' and 'Go to ... (unsafe)' to continue.

WARNING: This tool (as is) should be benign, it only reads your Google Photo index (id/url), it doesn't look at the images themselves, it doesn't send or save any data to any server. There are no ads or tracking or anything (maybe github or google track hits on their servers? but that is out of my control/access). However I provide no guarantee or warranties or anything of the sort. You should use it at your own risk. You can view the source code and audit it or change it as you wish. The tool (as is) only requests permission for basic-profile data and read-only access to Google Photos, as already mentioned it does nothing with this data apart from outputing the desired results into the browser. Your Google API clientId, once entered, is stored in localStorage (in browser) for your convenience but can be cleared by you at any time.