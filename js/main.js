
//GAME BOARD
const Gameboard = (function createGridCells() {
const gameboard = []; 

    const gridSize = 3; // Change this to adjust the grid size
    const gameCells = gridSize * gridSize;/// multiply gridsize for gameboard
    const gamePlayBoard = document.createElement('div') 
        gamePlayBoard.setAttribute('id', 'game-play-board');
        gamePlayBoard.style.display = 'flex';
        gamePlayBoard.style.flexWrap = 'wrap';
        gamePlayBoard.style.width = '454px';
        gamePlayBoard.style.border = 'solid 1px red';
        //game-play-board
    for (let i = 0; i < gameCells; i++) {
        const gridCell = document.createElement('div');
        let id = i;
        let idString = id.toString();
        gridCell.setAttribute('class', 'grid-cell');
        gridCell.setAttribute('id', `${idString}`);
        gridCell.textContent = `${idString}`;
        gridCell.style.width = '150px'; 
        gridCell.style.height = '150px'; 
        gridCell.style.border = 'solid 1px red';
        gridCell.style.boxSizing = 'border-box';
        gridCell.style.display = 'flex';
        // gridCell.style.lineHeight = '195px';
        gridCell.style.fontSize = '130px'
        gridCell.style.justifyContent = 'center';
        gamePlayBoard.append(gridCell);
        gameboard.push(gridCell);
        
    }
    document.addEventListener("DOMContentLoaded", function () {
        document.body.append(gamePlayBoard);
    });
    // return {
    //     gameboard,
    //     gamePlayBoard,
        
    // }
})();

// const player = (function () {
//     //Create an object and define its properties 
//     const player1 = {
//         name: 'Player-X',
//         mark: 'X',
//         player: 'player1',
        
//         displayPlayer: function() {
//             return(`${this.name} ${this.player} won`);
//         },                
//     }
//     //Player 2 Obj
//     const player2 = {
//         name: 'Player-O',
//         mark: 'O',
//         player: 'player2',

//         displayPlayer: function() {
//             return(`${this.name} ${this.player} won`)
//         },
//     } 
     
//     return {
//         player1,
//         player2
//     }

// })();  
function createPlayer(player1, player2) {
    
    player1 = 
    {
        name:player1,
        mark: 'X',
        player:'player1',
  
        playerWinMsg: function() {
            return(`${this.name} ${this.player} won`)
        },
        
    }
    player2 = {
        name:player2,
        mark: 'O',
        player:'player2',
  
        playerWinMsg: function() {
            return(`${this.name} ${this.player} won`)
        },

    }
    return {
        
        player1,
        player2,
    }
 
}
const GameFlow = (function() {

function GamePlay() {
    // console.log(createPlayer('player1'))
    clearSquares();
    const playerOneInput = document.getElementById('player1').value;    
    const playerTwoInput = document.getElementById('player2').value;
    const players = createPlayer(`${playerOneInput}` ,  `${playerTwoInput}`)
    const gridSquares = document.getElementsByClassName('grid-cell');
    const winMessage = document.getElementById('winner-message');
    winMessage.textContent = '';
    let currentPlayer = players.player1;
    const xMark = players.player1.mark;
    const oMark = players.player2.mark;       
    const tilesArray = gridSquares;

    for (let i = 0; i < gridSquares.length; i++){
        let gridSquare = gridSquares[i];       
        // gridSquare.style.fontSize = '225px';
        gridSquare.addEventListener('click', function() {

            if(currentPlayer === players.player1 && 
            gridSquare.textContent == '')
            {
                gridSquare.textContent = xMark;
                
                toggleActivePlayer();                           
                gameOver();
                if(checkForWin(xMark)) 
                {   const playerOneInput = document.getElementById('player1');
                    const playerTwoInput = document.getElementById('player2'); 
                    let winningMessage = players.player1.playerWinMsg();
                        winMessage.append(winningMessage);
                        playerTwoInput.value = '';
                        playerOneInput.value = '';

                            for(let i = 0; i < gridSquares.length; i++){
                                if(gridSquares[i].textContent == '') 
                                {
                                gridSquares[i].textContent = '*'
                                }
                            }
                        
                }
            
            
            } 
            else if(currentPlayer === players.player2 && gridSquare.textContent == '') 
            {
                gridSquare.textContent = oMark;
                
                toggleActivePlayer();
                gameOver();
                if(checkForWin(oMark)) 
                {   const playerOneInput = document.getElementById('player1');
                    const playerTwoInput = document.getElementById('player2'); 
                    let winMessage = document.getElementById('winner-message');
                

                    let winningMessage = players.player2.playerWinMsg();
                    winMessage.append(winningMessage);
                    playerTwoInput.value = '';
                    playerOneInput.value = '';

                    for(let i = 0; i < gridSquares.length; i++){
                        if(gridSquares[i].textContent == '') 
                        {
                        gridSquares[i].textContent = '*'
                        }
                        
                    }
                }
                                        
            }

        })       
    }
    
    function checkForWin(playerMark) {
        const winningCombos = [
            [0, 1, 2], [0, 3, 6], [0, 4, 8],
            [6, 4, 2], [4, 1, 7], [5, 8, 2],
            [6, 7, 8], [3, 4, 5], 
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (tilesArray[a].textContent === playerMark &&
                tilesArray[b].textContent === playerMark &&
                tilesArray[c].textContent === playerMark) {
                return true;
            }
        }
        return false;
    }

        // Function to toggle the active player
    function toggleActivePlayer() {
            if (currentPlayer === players.player1) {
                currentPlayer = players.player2;
            } else {
                currentPlayer = players.player1;
            }
        }

    function gameOver() {
        const playerOneInput = document.getElementById('player1');
        const playerTwoInput = document.getElementById('player2');                   
            if(Array.from(gridSquares).every(square => square.textContent === 'X' || square.textContent === 'O'))           
            {
            
            if(checkForWin(oMark) === false && checkForWin(xMark) === false){
                
                winMessage.textContent = 'It\'s a tie!';
                playerTwoInput.value = '';
                playerOneInput.value = '';
            }
            }
            
        }


    function clearSquares() {
            const gridSquares = document.getElementsByClassName('grid-cell');
            for(let i = 0; i < gridSquares.length; i++) {
            let gridSquare =  gridSquares[i];
                gridSquare.textContent = '';                
            }
            // if (){

            // const playerOneInput = document.getElementById('player1');
            // const playerTwoInput = document.getElementById('player2');
            // playerTwoInput.value = '';
            // playerOneInput.value = '';

            // }
        }
}

return {
    GamePlay:GamePlay,
  
}
})();

