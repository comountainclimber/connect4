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
app.server = app.listen(3000)

var io = require("socket.io")
var socketServer = io(app.server)

// var gamesInSession=[
// {gameroom: 1,
// currentplayers: [],
// },
// {gameroom: 2,
// currentplayers: [],
// },
// {gameroom: 3,
// currentplayers: [],
// },
// {gameroom: 4,
// currentplayers: [],
// },]

socketServer.on('connection', function(socket) {

	socket.on('gameInit', function(data){
		var gameSession = data.room
		console.log(data)
		socket.join(gameSession)
		// gamesInSession[data.room].gameroom.push(data.room)
		// gamesInSession[data.room - 1].currentplayers.push(data.nickname)
		console.log(gamesInSession[data.room -1 ])

		socketServer.to(gameSession).emit('gameStatus', gamesInSession[data.room -1 ].currentplayers)
		
	})

	// var connectedUsers = []

	// console.log('a user has connected!')

	// socket.on('gameInit', function(data){
	// 	connectedUsers.push(data)
	// 	var gameRoom = data.room
	// 	var player = data.nickname
	// 	socket.join(gameRoom)

	// 	console.log(player + " has joined game # " + gameRoom)
	// 	socketServer.to(gameRoom).emit('gameInfo', {room: gameRoom,
	// 												player: player,
	// 												allOnlineUsers: connectedUsers
	// 								  })
	// })


})