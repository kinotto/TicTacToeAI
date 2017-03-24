;(function() {
  'use strict';

  var Cell = {
    EMPTY: '',
    X: 'X',
    O: 'O'
  }
  var WIDTH = 3, HEIGHT = 3, NUM_CELLS = WIDTH * HEIGHT;

  function Location(x, y){
    this.x = x;
    this.y = y;
  }

/******************* TicTacToeBoard *********************************/
  var board = [];
  function TicTacToeBoard(cells){
		for(var i=0; i<NUM_CELLS; i++) {
      if(cells){
        board[i] = cells[i];
      } else {
        board[i] = Cell.EMPTY;
      }
		}
  }

  TicTacToeBoard.prototype.oppositePlayer = function(team){
    if(team === Cell.X){
      return Cell.O;
    } else if(team === Cell.O){
      return Cell.X;
    } else {
      return Cell.EMPTY;
    }
  }
  TicTacToeBoard.prototype.copy = function(obj){
    return JSON.parse(JSON.stringify(obj));
  }
  var indexFor = function(location) {
		return location.x + (location.y * WIDTH);
	}

  TicTacToeBoard.prototype.makeMove = function(cell, location){
		try {
			if(cellAt(location) != Cell.EMPTY) {
				throw new Error("Cell is already take");
			} else {
				board[indexFor(location)] = cell;
			}
		}catch(IndexOutOfBoundsException exc){
			throw new Error("Invalid cell");
		}
	}

  TicTacToeBoard.prototype.cellAt = function(location) {
		return board[indexFor(location)];
	}


  TicTacToeBoard.prototype.winner = function() {
		var winning_indexes = [
				// Horizontal lines
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],

				// Vertical lines
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],

				// Diagonals
				[0, 4, 8],
				[2, 4, 6]
		];

		// Return the winner if there is one
		for(var i=0; i<winning_indexes.length; i++){
			if(board[winning_indexes[i][0]] != Cell.EMPTY
					&& (board[winning_indexes[i][0]] == board[winning_indexes[i][1]])
					&& (board[winning_indexes[i][1]] == board[winning_indexes[i][2]])){
				//return board[winning_indexes[i][0]];
				return new TicTacToeWinner(board[winning_indexes[i][0]], winning_indexes[i]);
			}
		}

		// If there is no winner and the board in full than the game is a draw
		// TODO: We can check if it is impossible for any one to win
		// But that would be too much work for now
		if(boardFull()) {
			//return Cell.EMPTY;
			return new TicTacToeWinner(Cell.EMPTY, null);
		}

		// Otherwise there is no winner and the game can go on
		return null;
	}

  TicTacToeBoard.prototype.boardFull = function() {
		for(var i=0; i<NUM_CELLS; i++) {
			if(board[i] === Cell.EMPTY) {
				return false;
			}
		}
		return true;
	}

  TicTacToeBoard.prototype.emptySlots = function() {
		var slots = [];
		for(var y = 0; y < HEIGHT; y++) {
			for(var x = 0; x < WIDTH; x++) {
				var l = new Location(x, y);
				Cell c = this.cellAt(l);
				if(c === Cell.EMPTY) {
					slots.push(l);
				}
			}
		}
		return slots;
	}
/******************* TicTacToeAIPlayer *********************************/
  function TicTacToeAIPlayer(){}

  TicTacToeAIPlayer.prototype.initialize = function(team, gameBoard) {
		this.team = team;
		this.gameBoard = gameBoard;
	}

  TicTacToeAIPlayer.prototype.makeMove = function(){
		var possibleLocations = this.gameBoard.emptySlots();

		var thisScore;
		var bestScore = -1;
		var bestMove = null;
		var currentBoard;

		for(var i = 0; i < possibleLocations.length; i++) {
      var location = possibleLocations[i];
			currentBoard = gameBoard.copy();
			currentBoard.makeMove(team, location);
			thisScore = this.minimax(currentBoard, gameBoard.oppositePlayer(team));
			if(thisScore >= bestScore) {
				bestScore = thisScore;
				bestMove = location;
			}
		}

		return bestMove;
   }

   /*
	 * Find the best move based on the minimax algorithm
	 * http://en.wikipedia.org/wiki/Minimax
	 * This is the first iteration, where on Max
	 * We implement the first iteration here
	 * so we can find the best move
	 * instead of having min and max
	 * return both a score and location
	 */
	TicTacToeAIPlayer.prototype.minimax = function(board, thisTeam){
		var maxScore = -1;
		var multiplyer = 1;
		if(thisTeam != team) {
			multiplyer = -1;
		}
		var winner = board.winner();
		if(winner != null) {
			return this.evaluateWinner(winner.getCell());
		}

		var possibleMoves = board.emptySlots();
		var thisScore;
		var currentBoard;

		for(var i = 0; i < possibleMoves.length; i++) {
			currentBoard = board.copy();
			currentBoard.makeMove(thisTeam, l);
			thisScore = multiplyer*minimax(currentBoard, board.oppositePlayer(thisTeam));
			if(thisScore >= maxScore) {
				maxScore = thisScore;
			}
		}
		return multiplyer*maxScore;
	}

  TicTacToeAIPlayer.prototype.evaluateWinner = function(winner) {
		if((winner == null) || (winner === Cell.EMPTY)) {
			return 0;
		} else if(winner == team) {
			return 1;
		} else {
			return -1;
		}
	}

/******************* TicTacToeWinner *********************************/
  function TicTacToeWinner(cell, indexes) {
		this.cell = cell;
		this.indexes = indexes;
	}

  if(typeof module !== 'undefined' && module.exports){
    module.exports = {
      TicTacToeBoard: TicTacToeBoard,
      TicTacToeAIPlayer: TicTacToeAIPlayer
    };
  } else{
    window.TicTacToe = {
      TicTacToeBoard: TicTacToeBoard,
      TicTacToeAIPlayer: TicTacToeAIPlayer
    };
  }
  })();