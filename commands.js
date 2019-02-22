const commandModules = [
	//import('./commands/example.js'),
	import('./commands/findOutOfAlbumPhotos.js')
];

export default Promise.all(commandModules).then(modules => {
	// Use default import of modules,
	// changing an array of Modules into an array of the actual exports.
	return modules.map(m => m.default);
});