# TicTacToeAI
Tic Tac Toe AI  javascript library based on the Minimax (depth first) Algorithm, for browser and Node.js


<img src="https://travis-ci.org/kinotto/TicTacToeAI.svg?branch=master" alt="not found" />

### 1. Installation

> npm install --save tictactoe-ai

<br/>


### 2. Usage:


- **Nodejs**: (bluebird promise based API)

  
  ```javascript
  var tictactoe = require('tictactoe');
  ```
  
  ```javascript
 
  var board = tictactoe.TicTacToeBoard(['','','','','','','','','']); //empty board flatten inside an array
  var aiTeam = board.oppositePlayer("X");
  aiPlayer = tictactoe.TicTacToeAIPlayer();
  aiPlayer.initialize(aiTeam, board);
  var move = aiPlayer.makeMove();
  if(move != null){
    board.makeMove(aiTeam, move);
  }
  console.log(board.board);
  ```

- **browser**: (plain ajax xhr call)

  import the script:
  

  ```html
  <script type="text/javascript" src="node_modules/tictactoe/dist/tictactoe.min.js"></script>
  ```
  ```javascript
  //TicTacToe is attached to window object
  var board = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
  aiPlayer = new TicTacToe.TicTacToeAIPlayer();
  //same as nodejs from here on
  ```

### 4. Contribution:
Feel free to contribute, any help is really appreciated :)


run with:

>gulp

>gulp dist (for the minification)

>npm test (for unit testing with mocha)







### 5. License:
MIT License

Copyright (c) 2017 Karim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
