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

//assigning player roles based on who is making the move
    if (!$scope.player1.playerOnesTurn) {
        var playerRole = 1
    }
    else {
        var playerRole = 2
    }

//the column played and x coordinate are the same
    var columnPlayed = index + 1
    console.log("Player "+ playerRole + " has selected column #"+ columnPlayed)

    //call the detectWin function
    // this.detectWin(playedCell);
}




}])
