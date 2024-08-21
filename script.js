const ROWS = 6;
const COLS = 7;
let currentPlayer = 1; // Définir le joueur actuel (1 ou 2)
const board = [];

const gameBoard = document.getElementById('game-board');
const currentPlayer1Info = document.getElementById('current-player-1');
const currentPlayer2Info = document.getElementById('current-player-2');

function initializeBoard() {
    for (let row = 0; row < ROWS; row++) {
        board.push(Array.from({ length: COLS }, () => 0));
    }
}

function renderBoard() {
    gameBoard.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            gameBoard.appendChild(cell);

            // Ajouter la classe pour la couleur du jeton du joueur
            if (board[row][col] === 1) {
                cell.classList.add('player1');
            } else if (board[row][col] === 2) {
                cell.classList.add('player2');
            }
        }
    }
}

function dropToken(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            renderBoard(); // Mettre à jour l'affichage du plateau
            updateCurrentPlayerInfo(); // Mettre à jour l'indicateur du joueur actuel
            return;
        }
    }
}

function updateCurrentPlayerInfo() {
    currentPlayer1Info.textContent = `Joueur 1${currentPlayer === 1 ? ' (Actuel)' : ''}`;
    currentPlayer2Info.textContent = `Joueur 2${currentPlayer === 2 ? ' (Actuel)' : ''}`;
}

// Fonction pour vérifier si un joueur a gagné
function checkWinner() {
    // Vérification des lignes
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
            if (
                board[row][col] !== 0 &&
                board[row][col] === board[row][col + 1] &&
                board[row][col] === board[row][col + 2] &&
                board[row][col] === board[row][col + 3]
            ) {
                return board[row][col]; // Retourne le joueur gagnant
            }
        }
    }

    // Vérification des colonnes
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row <= ROWS - 4; row++) {
            if (
                board[row][col] !== 0 &&
                board[row][col] === board[row + 1][col] &&
                board[row][col] === board[row + 2][col] &&
                board[row][col] === board[row + 3][col]
            ) {
                return board[row][col]; // Retourne le joueur gagnant
            }
        }
    }

    // Vérification des diagonales (\)
    for (let row = 0; row <= ROWS - 4; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
            if (
                board[row][col] !== 0 &&
                board[row][col] === board[row + 1][col + 1] &&
                board[row][col] === board[row + 2][col + 2] &&
                board[row][col] === board[row + 3][col + 3]
            ) {
                return board[row][col]; // Retourne le joueur gagnant
            }
        }
    }

    // Vérification des diagonales (/)
    for (let row = 3; row < ROWS; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
            if (
                board[row][col] !== 0 &&
                board[row][col] === board[row - 1][col + 1] &&
                board[row][col] === board[row - 2][col + 2] &&
                board[row][col] === board[row - 3][col + 3]
            ) {
                return board[row][col]; // Retourne le joueur gagnant
            }
        }
    }

    // S'il n'y a pas de gagnant
    return 0;
}

// Ajouter des variables pour suivre les scores des joueurs
let scorePlayer1 = 0;
let scorePlayer2 = 0;

// Fonction pour réinitialiser le jeu et mettre à jour les scores
function resetGame() {
    // Réinitialiser le tableau et le plateau de jeu
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            board[row][col] = 0;
        }
    }
    renderBoard(); // Mettre à jour l'affichage du plateau
    updateCurrentPlayerInfo(); // Mettre à jour l'indicateur du joueur actuel
}

// Fonction pour vérifier s'il y a un match nul
function checkDraw() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] === 0) {
                return false; // Il reste au moins une case vide, ce n'est pas un match nul
            }
        }
    }
    return true; // Toutes les cases sont remplies, c'est un match nul
}


// Gestionnaire d'événement pour le clic sur une colonne
gameBoard.addEventListener('click', function(event) {
    const col = event.target.dataset.col;
    if (col !== undefined) {
        dropToken(parseInt(col));
        const winner = checkWinner();
        if (winner !== 0) {
            // Mettre à jour les scores et réinitialiser le jeu
            if (winner === 1) {
                scorePlayer1++;
            } else {
                scorePlayer2++;
            }
            alert(`Le joueur ${winner} a gagné !\nScores:\nJoueur 1: ${scorePlayer1}\nJoueur 2: ${scorePlayer2}`);
            resetGame();
        } else if (checkDraw()) {
            // S'il n'y a pas de gagnant et que c'est un match nul
            alert("Match nul !");
            resetGame();
        } else {
            // Mettre à jour le joueur actuel après avoir placé le pion
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }
});

// Fonction pour mettre à jour l'affichage des scores
function updateScoreDisplay() {
    currentPlayer1Info.textContent = `Joueur 1 (Points: ${scorePlayer1})${currentPlayer === 1 ? ' (Actuel)' : ''}`;
    currentPlayer2Info.textContent = `Joueur 2 (Points: ${scorePlayer2})${currentPlayer === 2 ? ' (Actuel)' : ''}`;
}

// Initialiser la grille de jeu et afficher les scores
for (let i = 0; i < ROWS; i++) {
    board.push(Array.from({ length: COLS }, () => 0));
}
renderBoard();
updateCurrentPlayerInfo();
updateScoreDisplay();



// Appeler la fonction d'initialisation du plateau au démarrage
initializeBoard();
renderBoard();
updateCurrentPlayerInfo();
