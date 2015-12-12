angular.module('Connect4App', ['ngRoute'])

angular.module('Connect4App')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl : '/html/home.html',
                controller : 'HomePageController'
            })
            .when('/game', {
                templateUrl : '/html/thegame.html',
                controller : 'GameController'
            })
    }])

angular.module('Connect4App')
    .controller('HomePageController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
    var socket = io()

    $scope.players = []
    $scope.submitForm = function() {
        $rootScope.playerInfo = $scope.players
        $location.url('/game')
        // socket.emit('gameInit', $scope.form)
        // $rootScope.nickname = $scope.form.nickname
        // $location.url('/' + $scope.form.room)
    }
}]);


angular.module('Connect4App')
    .controller('GameController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
    // var socket = io()
    console.log($rootScope.playerInfo)
    $scope.player1 = $rootScope.playerInfo[0]
    $scope.player2 = $rootScope.playerInfo[1]


    // $scope.room = $routeParams.roomNumber
    // $scope.playField = [];
   
//-----------creating the circle divs to populate game-----------//

$scope.GameBoard = function() {
    this.playField = [];

    for (var x = 0; x < 8; x++){
        var column = [];
        for (var y = 0; y < 6; y++){
            column.push(new $scope.BoardCell(x, y, this.playField));
        }
        this.playField.push(column);
    }
}
$scope.BoardCell = function(xCoord, yCoord, playField) {
    this.playField = playField;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.owner = 0;
};
    $scope.GameBoard()





    // function unlockBoard() {
    //     $scope.isDisabled = false;
    // }

    $scope.playerMove = function(index){
        console.log(index)
    }

//--------------------------------------------------------------//
    // socket.on('gameStatus', function(data){
    //     console.log(data)
    // })

    // socket.on('player1Message', function(data){
    //     console.log(data.message)
    //     $scope.messageForPlayer1 = data.message
    //     $scope.$apply(function(){$scope.messageForPlayer1})
    //     role = data.role;
    // })

    // socket.on('player2Message', function(data){
    //     console.log(data.message)
    //     $scope.messageForPlayer2 = data.message
    //     $scope.$apply(function(){$scope.messageForPlayer2})
    //     role = data.role;
    // })

    // socket.on('startGame', function(data){
    //     console.log(data.message)
    //     if (role === 1) {
    //         unlockBoard();
    //     }
    // })

    // $scope.log = function(){
    //     console.log($scope.players)
    // }
}])
