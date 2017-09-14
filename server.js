let express = require('express');
let serveStatic = require('serve-static');
let path = require('path');
let request = require('request');
let app = express();

const PORT = 4453;
const UI_DIRECTORY = 'dist/prod';

app.use(serveStatic(path.join(__dirname, UI_DIRECTORY))).listen(4453,  function() {
	console.log(`Server listening on port ${PORT}`);
});