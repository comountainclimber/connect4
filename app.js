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

socketServer.on('connection', function(socket) {

	var usersArray = []
	var users = {}
	var numUsers = 0

	socket.on('gameInit', function(data){
		
		socket.join(data.room)
		usersArray.push(data.nickname)
		// console.log("allUsers: ", usersArray)
		users[data.nickname] = data.nickname;
		
		
		socketServer.to(data.room).emit('gameInfo', usersArray)

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