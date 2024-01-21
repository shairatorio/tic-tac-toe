// Gameboard module
const Gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function placeMark(row, col, mark) {
        if (board[row][col] === "") {
            board[row][col] = mark;
            return true;
        }
        return false; // The cell is already occupied
    }

    function isGameOver() {
        return getWinner() || isBoardFull();
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

    function getWinner() {
        return checkRows() || checkColumns() || checkDiagonals();
    }

    function getWinnerInfo() {
        const winnerMark = getWinner();
        if (winnerMark) {
            const winnerName = winnerMark === player1.mark ? player1.name : player2.name;
            return { name: winnerName, mark: winnerMark };
        }
        return null; // No winner found
    }

    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    return false; // There's an empty cell, the board is not full
                }
            }
        }
        return true; // The board is full (tie)
    }

    function getBoard() {
        return board;
    }

    return {
        placeMark,
        isGameOver,
        getBoard,
        getWinnerInfo
    };
})();

const DisplayController = (() => {
    function renderBoard() {
        const board = Gameboard.getBoard();
        // Implement logic to render the board on the webpage
        // ...
    }

    return {
        renderBoard
    };
})();

const Player = (name, mark) => {
    return { name, mark };
};

const player1 = Player("Alice", "X");
const player2 = Player("Bob", "O");

// Example moves
Gameboard.placeMark(0, 0, player1.mark);
Gameboard.placeMark(0, 1, player2.mark);
Gameboard.placeMark(1, 1, player1.mark);
Gameboard.placeMark(1, 0, player2.mark);
Gameboard.placeMark(1, 2, player1.mark);
Gameboard.placeMark(2, 0, player2.mark);
Gameboard.placeMark(2, 2, player1.mark);

console.log(Gameboard.getBoard());

const winnerInfo = Gameboard.getWinnerInfo();
if (winnerInfo) {
    console.log(`The winner is ${winnerInfo.name} with mark ${winnerInfo.mark}`);
} else {
    console.log("No winner");
}

// Display the board
DisplayController.renderBoard();