export default {
	name: 'Example command',

	// Space separated Google API scopes, basic profile scopes always available.
	scopes: '',

	async run(gapi) {
		console.log('example : started');
		const output = await new Promise(resolve => {
			setTimeout(() => resolve('This is the output from the example command.'), 3000);
		});
		console.log('example : finished');
		return output;
	}
}