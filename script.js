const board = document.getElementById('board');
const modal = document.getElementById('proModal');
let hasMovedOnce = false;
let selectedPiece = null;

const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.className = `square ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
        square.dataset.row = row;
        square.dataset.col = col;

        const piece = initialBoard[row][col];
        if (piece) {
            square.innerHTML = piece;
            square.classList.add('piece');
            if (row < 2) {
                square.classList.add('black-piece');
            } else if (row > 5) {
                square.classList.add('white-piece');
            }
        }

        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    }
}

function handleSquareClick(e) {
    if (hasMovedOnce) {
        modal.style.display = 'block';
        return;
    }

    const square = e.target;

    if (square.innerHTML && square.classList.contains('white-piece')) {
        if (selectedPiece) {
            selectedPiece.classList.remove('highlight');
        }
        square.classList.add('highlight');
        selectedPiece = square;
    } else if (selectedPiece) {
        const newRow = parseInt(square.dataset.row);
        const newCol = parseInt(square.dataset.col);
        const oldRow = parseInt(selectedPiece.dataset.row);
        const oldCol = parseInt(selectedPiece.dataset.col);

        if (square.innerHTML === '' || square.classList.contains('black-piece')) {
            square.innerHTML = selectedPiece.innerHTML;
            square.classList.add('piece', 'white-piece');
            selectedPiece.innerHTML = '';
            selectedPiece.classList.remove('highlight', 'piece', 'white-piece');
            selectedPiece = null;
            hasMovedOnce = true;
        }
    }
}

function closeModal() {
    modal.style.display = 'none';
}
