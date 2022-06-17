const elements = {
	inputGapiClientId: document.getElementById('inputGapiClientId'),
	cardSignin: document.getElementById('cardSignin'),
	containerSigninButton: document.getElementById('containerSigninButton'),
	outputSigninIdentity: document.getElementById('outputSigninIdentity'),
	buttonSigninReset: document.getElementById('buttonSigninReset'),
	cardCommands: document.getElementById('cardCommands'),
	selectCommands: document.getElementById('selectCommands'),
	buttonRunCommand: document.getElementById('buttonRunCommand'),
	progressRunCommand: document.getElementById('progressRunCommand'),
	cardResults: document.getElementById('cardResults')
};

const state = {
	identity(displayIdentity) {
		elements.outputSigninIdentity.innerText = displayIdentity;
		toggleUI(true, !!displayIdentity);
	},
	commands(opts) {
		if (!opts || !opts.length) {
			console.error('ui.state.commands expects an array of { value, text } objects');
			return;
		}

		for (const v of opts) {
			const option = document.createElement('option');
			option.value = v.value;
			option.innerText = v.text;

			elements.selectCommands.appendChild(option);
		}
	},
	running(show) {
		elements.selectCommands.toggleAttribute('disabled', !!show);
		elements.buttonRunCommand.toggleAttribute('disabled', !!show);
		elements.progressRunCommand.toggleAttribute('hidden', !show);
	},
	results(outputFragOrString) {
		elements.cardResults.toggleAttribute('hidden', !outputFragOrString);
		elements.cardResults.innerHTML = '';

		if (outputFragOrString instanceof DocumentFragment) {
			elements.cardResults.appendChild(outputFragOrString);
		}
		else if (typeof outputFragOrString === 'string') {
			elements.cardResults.innerHTML = outputFragOrString;
		}
		else if (outputFragOrString)
			console.error('ui.results failed, invalid content, must be document-fragment or string', outputFragOrString);
		// else falsy, innerHTML is already cleared, all good
	}
};

const GAPI_CLIENTID_STORAGEKEY = 'gapi-querier.gapi-clientid';

function toggleUI(hasGapiClientId, isSignedIn) {
	elements.cardSignin.toggleAttribute('hidden', !hasGapiClientId);
	elements.containerSigninButton.toggleAttribute('hidden', isSignedIn);
	elements.outputSigninIdentity.toggleAttribute('hidden', !isSignedIn);
	elements.buttonSigninReset.toggleAttribute('hidden', !isSignedIn);
	elements.cardCommands.toggleAttribute('hidden', !isSignedIn);
	elements.selectCommands.value = '-';
	state.results(); // clear
}

function initGeneral() {
	// Initialize MDC elements.
	mdc.linearProgress.MDCLinearProgress.attachTo(elements.progressRunCommand);

	// Once a command has been selected we can show the button,
	// and you cant select the default 'select an option' option, so no need to hide ever.
	elements.selectCommands.addEventListener('change', (ev) => {
		elements.buttonRunCommand.removeAttribute('hidden'); // show
		state.results(null); // clear
	});
}
function initGapiClientId(callbackGapiClientIdChanged) {
	elements.inputGapiClientId.addEventListener('change', (ev) => {
		const gapiClientId = elements.inputGapiClientId.value.trim();
		handleGapiClientIdChange(gapiClientId, callbackGapiClientIdChanged);
	});

	// Load initial value of GAPI ClientId from localStorage if it exists.
	const gapiClientId = (localStorage.getItem(GAPI_CLIENTID_STORAGEKEY) || elements.inputGapiClientId.value || '').trim();
	elements.inputGapiClientId.value = gapiClientId;
	handleGapiClientIdChange(gapiClientId, callbackGapiClientIdChanged);
}
function handleGapiClientIdChange(gapiClientId, callbackGapiClientIdChanged) {
	toggleUI(gapiClientId, false);

	// Save changes to GAPI ClientId into localStorage.
	localStorage.setItem(GAPI_CLIENTID_STORAGEKEY, gapiClientId);
	callbackGapiClientIdChanged(gapiClientId);
}

export default {
	elements,
	state: new Proxy(state, {
		set(target, propName, newValue) {
			target[propName](newValue);
			return true;
		}
	}),
	init(callbackGapiClientIdChanged) {
		initGeneral();
		initGapiClientId(callbackGapiClientIdChanged);
	}
}