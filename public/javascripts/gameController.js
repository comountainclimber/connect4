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
$scope.BoardCell = function(xCoord, yCoord, playField, owner) {
    this.playField = playField;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.ownedByPlayerOne = false;
    this.ownedByPlayerTwo = false;
    this.occupied = false;
    this.owner = owner

};
    $scope.GameBoard()

$scope.GameBoard.prototype.playerMove = function(index) {
    $scope.player2.playerTwosTurn = !$scope.player2.playerTwosTurn
    $scope.player1.playerOnesTurn = !$scope.player1.playerOnesTurn

//assigning player roles based on who is making the move
    if (!$scope.player1.playerOnesTurn) {
        var playerRole = {number: 1, name:'ownedByPlayerOne'}
    }
    else {
        var playerRole = {number: 2, name:'ownedByPlayerTwo'}
    }
      console.log(index)
      var xCoord = index

    var playedCell = this.placeChip(xCoord, playerRole)
    console.log(playedCell)


    // for (var i = 0; i < 6; i++) {
    //     console.log($scope.playField[xCoord][i])
    //     if ($scope.playField[xCoord][i].occupied = false) {
    //         $scope.playerField[xCoord][i].playerRole.name = true
    //     }

}

$scope.GameBoard.prototype.placeChip = function (xCoord, playerRole){
    var playedCell;

    console.log(playerRole)
    for (var i = 0; i < 6; i++) {
        
        if ($scope.playField[xCoord][i].occupied === false) {
            $scope.playField[xCoord][i].occupied = true
            $scope.playField[xCoord][i].owner = playerRole.number

                if($scope.playField[xCoord][i].owner === 1) {
                    $scope.playField[xCoord][i].ownedByPlayerOne = true
                }

                else if ($scope.playField[xCoord][i].owner === 2) {
                    $scope.playField[xCoord][i].ownedByPlayerTwo = true
                }

            console.log($scope.playField[xCoord][i])
            break
        }
    // break
    // }
    }
}


}])
