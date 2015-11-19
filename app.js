// Requires \\
var express = require('express');
var bodyParser = require('body-parser');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
  res.sendFile('/index.html', { root: './public/html' })
});

// Creating Server and Listening for Connections \\
app.server = app.listen(8080)

var io = require("socket.io")
var socketServer = io(app.server)