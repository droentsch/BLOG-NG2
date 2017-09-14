var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var request = require('request');
var app = express();
app.use(serveStatic(path.join(__dirname, "dist"))).listen(4453,  function() {
	console.log("Server listening on port 4453");
});