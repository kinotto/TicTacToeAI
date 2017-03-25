(function(){
  
  var chai = require('chai');
  var expect = chai.expect;
  var tictactoe = require('../src/tictactoe');

  describe('TicTacToeAI unit testing', function(){

    var board, aiPlayer;
    var statusBoard = ['','','O','','','O','X','X','O'];
    beforeEach(function(){
      board = new tictactoe.TicTacToeBoard(statusBoard);
      aiPlayer = new tictactoe.TicTacToeAIPlayer();
      aiPlayer.initialize('O', board);
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
  })

})()
