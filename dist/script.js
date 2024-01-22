const mark = document.getElementById('mark');
const restartBtn = document.getElementById('restartBtn');
const buttonsArray = document.querySelectorAll('[data-index]');
let currentPlayer = 'X';

// Player module
const Player = (name, mark) => ({ name, mark });
const player1 = Player("Alice", "X");
const player2 = Player("Bob", "O");

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
    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                Gameboard.getBoard()[i][j] = "";
            }
        }
    }

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
            const winnerName = winnerMark === player1.mark ? player1.name : player2.name;
            return { name: winnerName, mark: winnerMark };
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
                if (checkGameOver()) {
                    announceWinner();
                } else {
                    togglePlayer();
                }
            }
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        mark.innerText = currentPlayer;
    }

    function announceWinner() {
        const winnerInfo = getWinnerInfo();
        if (winnerInfo) {
            console.log(`The winner is ${winnerInfo.name} with mark ${winnerInfo.mark}`);
            // Handle game over actions, e.g., display winner, show restart button, etc.
        } else if (isBoardFull()) {
            console.log("It's a tie!");
            // Handle tie actions, e.g., show restart button, etc.
        }
    }

    function handleRestartClick() {
        // Implement logic to reset the game
        buttonsArray.forEach(button => {
            button.innerText = '';
        });
        resetBoard();
        currentPlayer = 'X';
        mark.innerText = currentPlayer;
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

    return {
        resetBoard,
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
        return DisplayController.isGameOver();
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