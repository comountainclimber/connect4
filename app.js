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


var playersInGame = []

socketServer.on('connection', function(socket) {
	console.log('a user has connected!')

	socket.on('gameInit', function(data){
		
		var gameRoom = data.room



		playersInGame.push(data.nickname)
		console.log(playersInGame)

		socket.join(gameRoom)
		socketServer.to(gameRoom).emit('gameInfo', {gameinfo: data,
													players: playersInGame
									  })
	})


})