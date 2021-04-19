GAPI-Querier (aka find out-of-album photos)
==
I needed to get a list of all my photos (in Google Photos) that were NOT in an album,
unfortunately Google didn't provide that feature. So I created this tool to get that listing via their API.

The gapi-querier tool itself is a shell that gets the Google user's auth and then runs the chosen script.
The only existing scripts are those I wrote to find photos (in Google Photos) that are NOT in an album.

In order for the tool to access Google's APIs you will need to provide it with your (Google API credential's) "clientId".
To get a "clientId" you will need to enable the appropriate API and create OAuth credentials (for JS) in Google Developer console.
You will need to copy the "clientId" from your OAuth credentials and enter it into the gray box at the top of the tool's UI.

* Sign into Google Developer console: https://console.developers.google.com
* Create a project.
* Go to API library and enable the APIs you want: https://console.developers.google.com/apis/library
	- Eg (for Google Photos API): https://console.developers.google.com/apis/library/photoslibrary.googleapis.com
	- Click enable.
* Setup consent screen: https://console.developers.google.com/apis/credentials/consent
	- Click edit app (in OAuth consent screen) and add authorised domains...
	- If you're running the app from jonagh.github.io/gapi-querier then enter "jonagh.github.io", if you're using your own domain then enter that.
* Create credentials (OAuth client ID): https://console.developers.google.com/apis/credentials/oauthclient
	- Application Type: "Web Application"
	- Add Authorised JavaScript origins, eg: "https://jonagh.github.io" or your own domain.
* Copy the client ID (from the credentials you just created) and paste it into the gray box at the top of the gapi-querier's UI.

You can host it on your own computer (or wherever you want).. or you can use it here: https://jonagh.github.io/gapi-querier
* I don't output the best errors (sorry), so make sure to check your credentials are correct.
* Some errors can be viewed in the browser's dev-tools/console.
* Note, unless you 'verify' your API project & domain, the Google signin popup will show a warning about the app not being verified, you'll need click 'Advanced' and 'Go to ... (unsafe)' to continue.

**DISCLAIMER:** This tool (as is) should be benign, it only reads your Google Photo index (id/url), it doesn't look at the images themselves, it doesn't send any data to any server (apart from the Google API requests themselves). There are no ads or tracking or anything (maybe Github or Google track hits/etc but that is out of my control). However I provide no guarantee or warranties or anything of the sort. You should use it at your own risk. You can view the source code and audit it or change it as you wish. The tool (as is) only requests permission for basic-profile data and read-only access to Google Photos, as already mentioned it does nothing with this data apart from outputing the desired results into the browser. Your Google API clientId, once entered, is stored in localStorage (in browser) for your convenience but can be cleared by you at any time.



Customizing
--

In theory other scripts can be written and plugged into the tool.
See commands sub dir for examples, and commands.js is where they are imported into the tool/UI.
If you create your own 'command' then I am expecting something like the following:
```
export default {
	name: 'Some display name that will show in the dropdown',
	scopes: 'SpaceSeparated GoogleAPI Scopes AkaPermissions',
	async run() { return 'Either an HTML string or a DocumentFragment which will be inserted into the DOM'; }
}
```

Your run() function will be executed when the user chooses your 'command' from the dropdown and clicks 'Run'.

Note: while coding this I was playing around (trying out Proxy objects, etc) so it is a bit fanciful in parts.
I also haven't really gone through and tested or cleaned-up/improved/etc the code, sorry - and I don't plan to.
You need a modern browser to run the code, but why would you run anything else.
