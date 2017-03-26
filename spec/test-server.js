(function(){

  var chai = require('chai');
  var expect = chai.expect;
  var should = chai.should();
  var tictactoe = require('../src/tictactoe');

  describe('TicTacToeAI unit testing', function(){

    var board, aiPlayer;
    var statusBoard = ['','','','','','','','X','O'];


    it('should instanciate a board', function(){
      board = new tictactoe.TicTacToeBoard(statusBoard);
      expect(board).to.not.null;
    })

    it('should instantiate an AI player', function(){
      aiPlayer = new tictactoe.TicTacToeAIPlayer();
      expect(aiPlayer).to.be.a('object');
    })

    it('should initialize an AI player', function(){
      aiPlayer.initialize('O', board);
      expect(aiPlayer).to.have.property('team');
    })

    it('AI should pick an opponent team', function(){
      expect(aiPlayer.team).to.equal('O');

    })

    it('AI should be initialized with a board', function(){
      expect(aiPlayer.gameBoard).to.be.a('object');
    })

    it('AI should choose a VALID move', function(){
      var move = aiPlayer.makeMove();
      expect(move.x).exist;
      expect(move.y).exist;
      var flatMove = move.x + (move.y * 3);
      expect(statusBoard[flatMove]).to.be.empty;
    })


    it('should throw exception for invalid move', function(){
      var location = {
        x: 2,
        y: 2
      }
      expect(function(){
        board.makeMove('X', location)
      }).to.throw();

    })
  })

})()
