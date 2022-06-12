import auth from './auth.js';
import ui from './ui.js';

// Commands should be an array of 'command' objects,
// which should have the properties: { name, desc, scopes, run }.
import commands from './commands.js';

// Set command options into UI.
ui.state.commands = commands.map((c, i) => { return { value: i, text: c.name }; });
// On RUN button click run the selected command, the <select>.value is the index into the commands array.
ui.elements.buttonRunCommand.addEventListener('click', () => runCommand(commands[ui.elements.selectCommands.value]));
// On REFRESH button click clear auth and reset UI.
ui.elements.buttonSigninReset.addEventListener('click', () => resetSignin());

const gapiScopes = distillCommandScopes(commands);
// Initialize the UI and then initialize Auth (with gapi & scopes).
ui.init(async (gapiClientId) => {
  if (gapiClientId) {
    await auth.init(gapiClientId, gapiScopes, (userDisplayIdentity) => { ui.state.identity = userDisplayIdentity; });    
    auth.renderButton(ui.elements.containerSigninButton.id, gapiScopes);
  }
});

async function runCommand(selectedCommand) {
  if (!selectedCommand.run || typeof selectedCommand.run !== 'function') {
    console.error(`run command failed: no run function for '${selectedCommand.name}'`);
    return;
  }

  ui.state.results = null;
  ui.state.running = true;

  try {
    ui.state.results = await selectedCommand.run();
  }
  catch (err) {
    throw err;
  }
  finally {
    ui.state.running = false;
  }
}

function resetSignin() {
  auth.reset();
  ui.state.identity = null;
  ui.state.results = null;
}

function distillCommandScopes(commands) {
  let scopes = commands
    .map(cmd => cmd.scopes.split(' ')) // Get all the scopes split up into their own arrays.
    .reduce((result, scopes) => result.concat(scopes), []); // Concat (flatten) into single array.

  scopes = new Set(scopes); // The Set type will eliminate duplicates (kinda hacky).
  scopes = [...scopes].join(' '); // Turn into array using spread operator (...) and join into space separated string.

  return scopes;
}