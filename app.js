/***********************************/
/*******        MODEL        *******/
/***********************************/

const Model = (function() {
    const initialize = function() {
        console.log('Initalized Model');
    };
    
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