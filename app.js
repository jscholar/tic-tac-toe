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
        currentPlayer = 'X';
    };

    const makeMove = function(row, column) {
        state.board[row][column] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer = 'X' ? 'O' : 'X';
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
    let _node;
    const initialize = function(node) {
        _node = node;
        
        /* TODO: Fix whitespace issue between squares */
        const gameView = `
        <div class="tic-tac-toe">
            <button class='new-game'>New Game</button>
            <div class='board'>
                <div class='row''>
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
        
        console.log('Initalized View');
    }
    
    /**
     * Renders a new board to given node.
     * If no node is passed, renders to initialized node.
     * @param {HTMLElement} node 
     */
    const newBoard = function(node = _node) {
        console.log('Rendered new board');
    }
    
    return {
        initialize,
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