/***********************************/
/*******        MODEL        *******/
/***********************************/

const Model = (function() {
    const state = {};
    const emtpyBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    
    const initialize = function() {
        resetGameState();
        console.log('Initalized Model');
    };

    const resetGameState = function() {
        console.log('Reset game state');

        // Deep copy the empty board
        state.board = JSON.parse(JSON.stringify(emtpyBoard));

        state.currentPlayer = 'X';
        state.finished = false;
        state.movesPlayed = 0;
        View.resetView();
    };

    const makeMove = function(row, column) {
        if (!state.finished) {
            row = Number(row);
            column = Number(column);
            state.board[row][column] = state.currentPlayer;
            View.updateSquare(row, column, state.currentPlayer);
            state.movesPlayed++;
    
            let waysWon = checkWinningBoard(state.board, row, column, state.currentPlayer);
            if (waysWon.length > 0) {
                // Won game
                View.displayOutcome(state.currentPlayer);
                state.finished = true;
            } else {
                if (state.movesPlayed === 9) {
                    console.log('Game has drawn');
                    View.displayOutcome('draw');
                    state.finished = true;
                } else {
                    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
                }
            };
        }
    };

    /**
     * Check board for winning state after a move
     */
    const checkWinningBoard = function(board, row, column, player) {
        const waysWon = [];
        
        // Check winning row
        let winningRow = true;
        for (let c = 0; c < board[row].length; c++) {
            if (board[row][c] !== player) {
                winningRow = false;
                break;
            }
        }
        if (winningRow) waysWon.push('winningRow');
        
        // Check winning column
        let winningColumn = true;
        for (let r = 0; r < board.length; r++) {
            if (board[r][column] !== player) {
                winningColumn = false;
                break;
            }
        }
        if (winningColumn) waysWon.push('winningColumn');
        
        // Check winning major diagonal
        if (row === column) {
            let winningMajorDiagonal = true;
            for (let r = 0; r < board.length; r++) {
                if (board[r][r] !== player) {
                    winningMajorDiagonal = false;
                    break;
                }
            }
            if (winningMajorDiagonal) waysWon.push('winningMajorDiagonal');
        }
        
        // Check winning minor diagonal
        if ((board.length - 1) - row === column) {
            let winningMinorDiagonal = true;
            for (let r = 0; r < board.length; r++) {
                if (board[r][(board.length - 1) - r] !== player) {
                    winningMinorDiagonal = false;
                    break;
                }
            }
            if (winningMinorDiagonal) waysWon.push('winningMinorDiagonal');
        }

        return waysWon;
    }
    
    return {
        initialize,
        resetGameState,
        makeMove
    };
})();

/***********************************/
/*******        VIEW         *******/
/***********************************/

const View = (function() {
    let node;
    let squareNodes;
    let winnerNode;
    const initialize = function(_node) {
        node = _node;
        
        const gameView = `
        <div class="tic-tac-toe">
            <button class='new-game'>New Game</button>
            <div class='stats'>
                <div class='winner'></div>
            </div>
            <div class='board'>
                <div class='row'>
                    <div class='square' data-row='0' data-column='0'></div>
                    <div class='square' data-row='0' data-column='1'></div>
                    <div class='square' data-row='0' data-column='2'></div>
                </div>
                <div class='row'>
                    <div class='square' data-row='1' data-column='0'></div>
                    <div class='square' data-row='1' data-column='1'></div>
                    <div class='square' data-row='1' data-column='2'></div>
                </div>
                <div class='row'>
                    <div class='square' data-row='2' data-column='0'></div>
                    <div class='square' data-row='2' data-column='1'></div>
                    <div class='square' data-row='2' data-column='2'></div>
                </div>
            </div>
        </div>
        `;

        const gameStyle = `
            <style type="text/css">
                .row {
                    display: flex;
                }
                .square {
                    border: 1px solid black;
                    height: 50px;
                    line-height: 50px;
                    width: 50px;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }
            </style>
        `
        
        node.insertAdjacentHTML('beforeend', gameStyle);
        node.insertAdjacentHTML('beforeend', gameView);

        squareNodes = node.querySelectorAll('.square');
        winnerNode = node.querySelector('.winner');
        
        console.log('Initalized View');
    }
    
    const updateSquare = function(row, column, text) {
        let squareIndex = flattenIndex(row, column, 3);
        squareNodes[squareIndex].innerText = text;
    }

    const resetView = function() {
        squareNodes.forEach(node => {
            node.innerText = '';
        });
        winnerNode.innerText = '';
    }

    /**
     * @param {Number} i Outer index 
     * @param {Number} j Inner index
     * @param {Number} n Length of outer array
     */
    const flattenIndex = function(i, j, n) {
        return i * n + j;
    }

    const displayOutcome = function(winner) {
        node.querySelector('.winner').innerText =
            winner === 'draw' ? 'Draw' : 
            `Player ${winner} wins`;
    }
    
    return {
        initialize,
        updateSquare,
        resetView,
        displayOutcome
    };
})();

/***********************************/
/*******      CONTROLLER     *******/
/***********************************/

const Controller = (function() {
    
    const initialize = function(node) {
        node.querySelector('.new-game')
            .addEventListener('click', (event) => {
                console.log('New Game');
                Model.resetGameState();
            });

        node.querySelectorAll('.square').forEach(squareNode => {
            squareNode.addEventListener('click', squareClickHandler);
        })
        console.log('Initalized Controller');
    };

    const squareClickHandler = function(event) {
        if (event.target.innerText !== 'X' && event.target.innerText !== 'O') {
            let {row, column} = event.target.dataset;
            console.log(`Click on ${row}, ${column}`);
            Model.makeMove(row, column);
        }
    };
    
    return {
        initialize
    };
})();

/**********************************/

const App = (function() {
    
    /**
     * Initializes Tic Tac Toe on given node.
     * @param {HTMLElement} [node=body]
     */
    const initialize = function(node = document.querySelector('body')) {
        View.initialize(node);
        Controller.initialize(node);
        Model.initialize();
        console.log('Tic-tac-toe has initialized');
    }
    
    return {
        initialize
    };
})();

const appNode = document.getElementById('app');
App.initialize(appNode);