// GameBoard constructor
function GameBoard() {
    this.playField = [];

    for (var x = 0; x < 6; x++){
        var column= [];
        for (var y = 0; y < 7; y++){
            column.push(new BoardCell(x, y, this.playField));
        }
        this.playField.push(column);
    }
}

// Place chip and detect win state
GameBoard.prototype.playerMove = function(xCoord, playerRole) {
    var playedCell = this.placeChip(xCoord, playerRole);

    if (!playedCell) {
        // This needs to let the player know they have made an invalid move
        console.log('Invalid Move')
        return false
    }

    this.detectWin(playedCell);
};

// Check to see if move is valid and play it
GameBoard.prototype.placeChip = function(xCoord, playerRole) {
    if (xCoord < 0 || xCoord > 5) {
        return false;
    }

    var columnPlayed = this.playField[xCoord];
    var playedCell;

    // Loop to determine gravity
    for (var i = 0; i < 6; i++) {
        var currentCell = columnPlayed[i];
        if (currentCell.owner !== 0) {
            // Column Selected is full, invalid move
            if (i === 0) {
                return false;
            }

            playedCell = currentCell.findTopCell();
            break;
        }
    }

    // Column selected is empty, place at the bottom of column
    if (i === 6) {
        playedCell = columnPlayed[5];
    }

    playedCell.owner = playerRole;
    return playedCell;
};

// Check for all possible win vectors for a new move
GameBoard.prototype.detectWin = function(latestMove) {
    var self = this;

    var positionFunctions = [
        'findleftCell',
        'findBottomCell',
        'findTopCell',
        'findRightCell',
        'findTopLeftCell',
        'findTopRightCell',
        'findBottomLeftCell',
        'findBottomRightCell'
    ]

    var winObj;
    var winFound = positionFunctions.some(function check(currFunc){
        var opts = {
            owner: latestMove.owner,
            positionFunction: currFunc,
            currentCell: latestMove
        }

        var moveResults = self.checkWin(opts);

        if (moveResults.winState === true) {
            winObj = moveResults;
            return true;
        }

        return false;
    });

    if (winFound) {
        console.log(winObj)
    }
};

// Recursive check for win
GameBoard.prototype.checkWin = function(options){
    var streak = options.streak = options.streak || [];
    var currentCell = options.currentCell;
    if (streak.length === 4) {
        return {
            winState: true,
            streak: streak
        }
    }

    if (currentCell.owner !== options.owner) {
        return {
            winState: false,
            streak: streak
        }
    }

    if (currentCell.owner === options.owner) {
        streak.push(currentCell)
        options.currentCell = currentCell[options.positionFunction]();
        return this.checkWin(options)
    }
}

// BoardCell constructor
function BoardCell(xCoord, yCoord, playField) {
    this.playField = playField;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.owner = 0;
};

// Utility functions for finding adjacent cells ------------------
BoardCell.prototype.findTopCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var topCell = this.playField[xCoord][yCoord - 1]
    if (topCell) {
        return topCell;
    }

    return {};
};

BoardCell.prototype.findTopLeftCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var leftColumn = this.playField[xCoord - 1]
    if (leftColumn && leftColumn[yCoord - 1]) {
        return leftColumn[yCoord - 1];
    }

    return {};
};

BoardCell.prototype.findTopRightCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var rightColumn = this.playField[xCoord + 1]
    if (rightColumn && rightColumn[yCoord - 1]) {
        return rightColumn[yCoord - 1]
    }

    return {};
};

BoardCell.prototype.findBottomCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var bottomCell = this.playField[xCoord][yCoord + 1]
    if (bottomCell) {
        return bottomCell;
    }

    return {};
};

BoardCell.prototype.findBottomLeftCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var leftColumn = this.playField[xCoord - 1]
    if (leftColumn && leftColumn[yCoord + 1]) {
        return leftColumn[yCoord + 1];
    }

    return {};
};

BoardCell.prototype.findBottomRightCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var rightColumn = this.playField[xCoord + 1]
    if (rightColumn && rightColumn[yCoord + 1]) {
        return rightColumn[yCoord + 1]
    }

    return {};
};

BoardCell.prototype.findleftCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var leftColumn = this.playField[xCoord - 1]
    if (leftColumn) {
        return leftColumn[yCoord];
    }

    return {};
};

BoardCell.prototype.findRightCell = function() {
    var yCoord = this.yCoord;
    var xCoord = this.xCoord;
    var rightColumn = this.playField[xCoord + 1]
    if (rightColumn) {
        return rightColumn[yCoord];
    }

    return {};
};

// Here is a sample game where the players go super out of order
// player 1 wins on a diagonale

var game = new GameBoard();

game.playerMove(0, 1);
game.playerMove(1, 2);
game.playerMove(1, 1);
game.playerMove(2, 2);
game.playerMove(2, 2);
game.playerMove(2, 1);
game.playerMove(3, 2);
game.playerMove(3, 2);
game.playerMove(3, 2);
game.playerMove(3, 1);
