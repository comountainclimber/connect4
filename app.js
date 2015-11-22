'use strict';

// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var io = require('socket.io')

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
    res.sendFile('/index.html', { root: './public/html' });
});

// Creating Server and Listening for Connections \\
app.server = app.listen(3000)

var socketServer = io(app.server);
var roomData = {};

socketServer.on('connection', function(socket) {

    socket.on('gameInit', function(data){
        var roomName = data.room;
        console.log(data);
        socket.join(roomName);
        var room = roomData[roomName];
        if (!room) {
            room = {
                name: roomName,
                players: []
            }
        }
        findRole(room, data.nickName, socket);
    });

})

var player1Message = 'You are player one... waiting for another player to join.'
function craftPlayer2Message(name) {
    return 'You have joined a game with ' + name + '. BUCKLE UP MOFO!';
}

function findRole(room, name, socket) {
    var numberOfPlayers = room.length;
    switch (numberOfPlayers) {
        case 0:
            room.players.push({
                name: name
            });

            socket.emit('player1Message', {
                message: player1Message,
                role: 1
            });
        case 1:
            room.players.push({
                name: name
            });

            socket.emit('player2Message', {
                message: craftPlayer2Message(name),
                player1: room.players[0].name,
                role: 2
            });

            socketServer.to(room.name).emit('startGame');
        default:
    }
}
