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
        state.board = emtpyBoard.slice();
        state.currentPlayer = 'X';
    };

    const makeMove = function(row, column) {
        state.board[row][column] = state.currentPlayer;
        View.updateSquare(row, column, state.currentPlayer);
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    };
    
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
    const initialize = function(_node) {
        node = _node;
        
        /* TODO: Fix whitespace issue between squares */
        const gameView = `
        <div class="tic-tac-toe">
            <button class='new-game'>New Game</button>
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
                .square {
                    display: inline-block;
                    border: 1px solid black;
                    height: 50px;
                    width: 50px;
                    margin: 0;
                    padding: 0;
                }
            </style>
        `
        
        node.insertAdjacentHTML('beforeend', gameStyle);
        node.insertAdjacentHTML('beforeend', gameView);

        squareNodes = node.querySelectorAll('.square');

        
        console.log('Initalized View');
    }
    
    const updateSquare = function(row, column, text) {
        let squareIndex = flattenedIndex(row, column, 3);
        squareNodes[squareIndex].innerText = text;
    }
    
    /**
     * 
     * @param {Number} i Outer index 
     * @param {Number} j Inner index
     * @param {Number} n Length of outer array
     */
    const flattenedIndex = function(i, j, n) {
        i = Number(i);
        j = Number(j);
        n = Number(n);
        return i * n + j;
    }
    
    return {
        initialize,
        updateSquare
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
        if (event.target.innerText !== 'X' || event.target.innerText !== 'O') {
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
        Model.initialize();
        View.initialize(node);
        Controller.initialize(node);
        console.log('Tic-tac-toe has initialized');
    }
    
    return {
        initialize
    };
})();

const appNode = document.getElementById('app');
App.initialize(appNode);