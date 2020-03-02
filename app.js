/***********************************/
/*******        MODEL        *******/
/***********************************/

const Model = (function() {
    const state = {};
    const emtpyBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
    
    const initialize = function() {
        resetGameState();
        console.log('Initalized Model');
    };

    const resetGameState = function() {
        state.board = emtpyBoard.slice();
        nextTurnPlayer = 'X';
    }
    
    return {
        initialize,
        resetGameState
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
                <div class='row' data-row='0'>
                    <div class='square' data-column='0'></div>
                    <div class='square' data-column='1'></div>
                    <div class='square' data-column='2'></div>
                </div>
                <div class='row' data-row='1'>
                    <div class='square' data-column='0'></div>
                    <div class='square' data-column='1'></div>
                    <div class='square' data-column='2'></div>
                </div>
                <div class='row' data-row='2'>
                    <div class='square' data-column='0'></div>
                    <div class='square' data-column='1'></div>
                    <div class='square' data-column='2'></div>
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
        console.log('Initalized Controller');
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