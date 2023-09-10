document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const message = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (board.includes('')) {
            return null;
        } else {
            return 'Empate';
        }
    }

    function handleCellClick(cell, index) {
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.style.backgroundColor = currentPlayer === 'X' ? '#f44336' : '#2196F3';

            const winner = checkWinner();
            if (winner) {
                if (winner === 'Empate') {
                    message.fire({
                        icon: 'info',
                        title: '¡Empate!',
                    });
                } else {
                    message.fire({
                        icon: 'success',
                        title: `¡${currentPlayer} ha ganado!`,
                    });
                }
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            handleCellClick(cell, index);
        });
    });

    resetButton.addEventListener('click', () => {
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.style.backgroundColor = '#ddd';
        });
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
    });
});
