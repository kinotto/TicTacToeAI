(function(){
  var expect = chai.expect;
/*
  var board = new TicTacToe.TicTacToeBoard(['','','','','','','','X','O']);
  var aiTeam = board.oppositePlayer("X");
  aiPlayer = new TicTacToe.TicTacToeAIPlayer();
  aiPlayer.initialize(aiTeam, board);
  var move = aiPlayer.makeMove();
  if(move != null){
    board.makeMove(aiTeam, move);
  }
  console.log(board.state)*/


  describe('TicTacToeAI unit testing', function(){

    var board, aiPlayer;
    var statusBoard = ['','','O','','','O','X','X','O'];
    beforeEach(function(){
      board = new TicTacToe.TicTacToeBoard(statusBoard);
      aiPlayer = new TicTacToe.TicTacToeAIPlayer();
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
      console.log(flatMove);
      expect(statusBoard[flatMove]).to.be.empty;
    })
  })


}())
