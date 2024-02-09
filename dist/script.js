const mark = document.getElementById('mark');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const buttonsArray = document.querySelectorAll('[data-index]');
const markSound = document.querySelector(`audio[data-key='mark']`);
const wonSound = document.querySelector(`audio[data-key='won']`);
const tieSound = document.querySelector(`audio[data-key='tie']`);
const btnList = document.querySelectorAll('button');
let currentPlayer = 'X';

const player1 = createPlayer("X");
const player2 = createPlayer("O");

// Player module
function createPlayer(mark) {
    return { mark };
}

// Gameboard module
const Gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function getBoard() {
        return board;
    }

    return {
        getBoard,
    };
})();

// DisplayController module
const DisplayController = (() => {
    // function resetBoard() {
    //     for (let i = 0; i < 3; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             Gameboard.getBoard()[i][j] = "";
    //         }
    //     }
    // }

    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gameboard.getBoard()[i][j] === "") {
                    return false; // There's an empty cell, the board is not full
                }
            }
        }
        return true; // The board is full (tie)
    }

    function isGameOver() {
        return getWinner() || isBoardFull();
    }

    function getWinnerInfo() {
        const winnerMark = getWinner();
        if (winnerMark) {
            return { mark: winnerMark };
        }
        return null; // No winner found
    }

    function getWinner() {
        return GameController.checkRows() || GameController.checkColumns() || GameController.checkDiagonals();
    }

    function handleButtonClick(event) {
        const clickedButtonIndex = parseInt(event.target.dataset.index);

        if (isValidMove(clickedButtonIndex)) {
            const [row, col] = getRowAndColumn(clickedButtonIndex);
            if (GameController.placeMark(row, col, currentPlayer)) {
                event.target.innerText = currentPlayer;
                event.target.style.color = currentPlayer === 'X' ? '#e25041' : '#1cbd9e';
                mark.style.color = currentPlayer === 'X' ? '#1cbd9e' : '#e25041';
                audio(markSound);
                if (checkGameOver()) {
                    announceWinner();
                    disableButtons();
                } else {
                    togglePlayer();
                }
            }
        }
    }

    function disableButtons() {
        for (let i = 0; i < 9; i++) {
            btnList[i].disabled = true;
        }b
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        mark.innerText = currentPlayer;
    }

    function announceWinner() {
        const winnerInfo = getWinnerInfo();
        if (winnerInfo) {
            const winningMark = winnerInfo.mark;
            const color = winningMark === 'X' ? '#e25041' : '#1cbd9e';
            message.innerHTML = `Player <span style="color: ${color}">${winningMark}</span> is the winner!`;
            audio(wonSound);
        } else if (isBoardFull()) {
            message.innerText = `It's a tie!`;
            audio(tieSound);
        }
    }

    function handleRestartClick() {
        // Implement logic to reset the game
        // buttonsArray.forEach(button => {
        //     button.innerText = '';
        // });
        // resetBoard();
        // currentPlayer = 'X';
        // mark.innerText = currentPlayer;
        location.reload();
    }

    function isValidMove(index) {
        const [row, col] = getRowAndColumn(index);
        return Gameboard.getBoard()[row][col] === "";
    }

    function getRowAndColumn(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return [row, col];
    }

    function checkGameOver() {
        return isGameOver();
    }

    function audio(sound) {
        sound.play();
    }

    return {
        // resetBoard,
        isBoardFull,
        isGameOver,
        getWinnerInfo,
        getWinner,
        handleButtonClick,
        handleRestartClick,
    };
})();

// GameController module
const GameController = (() => {
    const board = Gameboard.getBoard();

    function placeMark(row, col, mark) {
        if (board[row][col] === "") {
            board[row][col] = mark;
            return true;
        }
        return false; // The cell is already occupied
    }

    function checkLine(cell1, cell2, cell3) {
        return cell1 !== "" && cell1 === cell2 && cell2 === cell3;
    }

    function checkRows() {
        for (let i = 0; i < 3; i++) {
            if (checkLine(board[i][0], board[i][1], board[i][2])) {
                return board[i][0]; // Return the winning mark
            }
        }
        return null; // No winning row found
    }

    function checkColumns() {
        for (let i = 0; i < 3; i++) {
            if (checkLine(board[0][i], board[1][i], board[2][i])) {
                return board[0][i]; // Return the winning mark
            }
        }
        return null; // No winning column found
    }

    function checkDiagonals() {
        if (checkLine(board[0][0], board[1][1], board[2][2])) {
            return board[0][0]; // Return the winning mark
        } else if (checkLine(board[0][2], board[1][1], board[2][0])) {
            return board[0][2]; // Return the winning mark
        }
        return null; // No winning diagonal found
    }

    return {
        placeMark,
        checkLine,
        checkRows,
        checkColumns,
        checkDiagonals
    };
})();

// Event Listeners
buttonsArray.forEach(button => {
    button.addEventListener('click', DisplayController.handleButtonClick);
});

restartBtn.addEventListener('click', DisplayController.handleRestartClick);