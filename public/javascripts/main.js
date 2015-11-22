angular.module('Connect4App', ['ngRoute'])

angular.module('Connect4App')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl : '/html/home.html',
                controller : 'HomePageController'
            })
            .when('/:roomNumber', {
                templateUrl : '/html/thegame.html',
                controller : 'GameController'
            })
    }])

angular.module('Connect4App')
    .controller('HomePageController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
    var socket = io()

    $scope.submitForm = function() {
        console.log($scope.form)
        socket.emit('gameInit', $scope.form)
        $rootScope.nickname = $scope.form.nickname
        $location.url('/' + $scope.form.room)
    }
}]);


angular.module('Connect4App')
    .controller('GameController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
    var socket = io()

    $scope.room = $routeParams.roomNumber
    $scope.gameBoard = [];
    populateGameBoard();
    $scope.isDisabled = true;
    var role;

//-----------creating the circle divs to populate game-----------//
    function populateGameBoard() {
        for (var i = 0; i<7; i++){
            var column = [];
            for (var k = 0; k < 6; k++){
                column.push({});
            }
            $scope.gameBoard.push(column);
        }
    }

    function unlockBoard() {
        $scope.isDisabled = false;
    }

    $scope.playerMove = function(index){
        console.log(index)
        $scope.isDisabled = true;
    }

//--------------------------------------------------------------//
    socket.on('gameStatus', function(data){
        console.log(data)
    })

    socket.on('player1Message', function(data){
        console.log(data.message)
        $scope.messageForPlayer1 = data.message
        $scope.$apply(function(){$scope.messageForPlayer1})
        role = data.role;
    })

    socket.on('player2Message', function(data){
        console.log(data.message)
        $scope.messageForPlayer2 = data.message
        $scope.$apply(function(){$scope.messageForPlayer2})
        role = data.role;
    })

    socket.on('startGame', function(data){
        console.log(data.message)
        if (role === 1) {
            unlockBoard();
        }
    })

    $scope.log = function(){
        console.log($scope.players)
    }
}])
