angular.module('Connect4App')
    .controller('GameController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){

// We begin by setting the name of the player objects

$scope.player1 = {}
$scope.player2 = {}

if ($rootScope.playerInfo) {
    $scope.player1.username = $rootScope.playerInfo[0]
    $scope.player2.username = $rootScope.playerInfo[1]
}

else {
    $scope.player1.username = 'anonymous1'
    $scope.player2.username = 'anonymous2'
}

// We want player 1 to go first so we assign the boolean true 
$scope.player1.playerOnesTurn = true
$scope.player1.playerTwosTurn = false

// The GameBoard function populates our game//

$scope.GameBoard = function() {
    this.playField = [];
    for (var x = 0; x < 6 ; x++){
        var column = [];
        for (var y = 0; y < 7; y++){
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

$scope.GameBoard.prototype.playerMove = function(index) {
    $scope.player2.playerTwosTurn = !$scope.player2.playerTwosTurn
    $scope.player1.playerOnesTurn = !$scope.player1.playerOnesTurn

    // var playerRole

    if (!$scope.player1.playerOnesTurn) {
        var playerRole = 1
    }

    else {
        var playerRole = 2
    }

   
    // console.log(playerRole)
    var columnPlayed = $scope.playField[index]
    var xCoord = index

    var playedCell = this.placeChip(xCoord, playerRole, columnPlayed);

    // console.log("X axis: " + index)
    
    // this.detectWin(playedCell);
}

$scope.GameBoard.prototype.placeChip = function(xCoord, playerRole, columnPlayed) {

    // var columnPlayed = $scope.GameBoard.playField[xCoord];
    $scope.playedCell = {};

    // Loop to determine gravity
    for (var i = 0; i < 6; i++) {
        var currentCell = columnPlayed[i];

    // Column selected is empty, place at the bottom of column
        if (i === 6) {
            playedCell = columnPlayed[5];
        }
    }

    $scope.playedCell.owner = playerRole;

    // $scope.redMove = !$scope.blackMove

}



}])
