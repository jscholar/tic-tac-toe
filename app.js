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
        resetGame();
        console.log('Initalized Model');
    };

    const resetGameState = function() {
        state.board = emtpyBoard.slice();
        nextTurnPlayer = 'X';
    }
    
    return {
        initialize
    };
})();

/***********************************/
/*******        VIEW         *******/
/***********************************/

const View = (function() {
    let _node;
    const initialize = function(node) {
        _node = node;

        const resetButton = document.createElement('button');
        resetButton.setAttribute('class', 'new-game');
        resetButton.innerText = 'New Game';

        node.appendChild(resetButton);
        
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