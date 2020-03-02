/***********************************/
/*******        MODEL        *******/
/***********************************/

const Model = (function() {
    return {};
})();

/***********************************/
/*******        VIEW         *******/
/***********************************/

const View = (function() {
    let _node;
    /**
     * Initializes Tic Tac Toe view on given node.
     * @param {HTMLElement} [node=body]
     */
    const initialize = function(node = document.querySelector('body')) {
        _node = node;
        newBoard();
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
        newBoard
    };
})();

/***********************************/
/*******      CONTROLLER     *******/
/***********************************/

const Contoller = (function() {
    return {};
})();

/**********************************/

const App = (function() {

    const initialize = function() {
        const appNode = document.getElementById('app');
        View.initialize(appNode);
        console.log('Tic-tac-toe has initialized');
    }

    return {
        initialize
    };
})();

App.initialize();