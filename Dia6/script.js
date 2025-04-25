// Game state variables
let deckId = '';
let playerCard = null;
let computerCard = null;
let loading = false;
let gameStarted = false;
let playerScore = 0;
let computerScore = 0;
let remainingCards = 0;
let rounds = 0;

// Card values for comparison (higher index = higher value)
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

// DOM elements
const playerCardElement = document.getElementById('player-card');
const computerCardElement = document.getElementById('computer-card');
const playerCardValueElement = document.getElementById('player-card-value');
const computerCardValueElement = document.getElementById('computer-card-value');
const resultElement = document.getElementById('result');
const newGameBtn = document.getElementById('new-game-btn');
const drawCardBtn = document.getElementById('draw-card-btn');
const roundsElement = document.getElementById('rounds');
const remainingCardsElement = document.getElementById('remaining-cards');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const toastElement = document.getElementById('toast');

// Initialize a new deck
async function initializeDeck() {
    setLoading(true);
    resetGame();
    
    try {
        console.log('Inicializando mazo...');
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Respuesta de la API (nuevo mazo):', data);

        if (data.success) {
            deckId = data.deck_id;
            remainingCards = data.remaining;
            updateRemainingCards();
            gameStarted = true;
            showToast('¡Nuevo juego iniciado!');
            drawCardBtn.disabled = false;
        } else {
            showToast('Error al crear el mazo: ' + (data.error || 'Error desconocido'), true);
        }
    } catch (error) {
        console.error('Error al inicializar el mazo:', error);
        showToast('No se pudo inicializar el mazo de cartas: ' + error.message, true);
    } finally {
        setLoading(false);
    }
}

// Reset game state
function resetGame() {
    playerCard = null;
    computerCard = null;
    resetCardDisplay();
    resultElement.textContent = '';
    resultElement.className = 'result';
}

// Reset card display
function resetCardDisplay() {
    playerCardElement.innerHTML = '?';
    playerCardElement.className = 'card-placeholder';
    computerCardElement.innerHTML = '?';
    computerCardElement.className = 'card-placeholder';
    playerCardValueElement.textContent = '';
    computerCardValueElement.textContent = '';
}

// Draw cards for player and computer
async function drawCards() {
    if (!deckId || !gameStarted) return;

    setLoading(true);
    resetCardDisplay();
    resultElement.textContent = '';
    resultElement.className = 'result';
    
    try {
        console.log(`Robando 2 cartas del mazo ${deckId}...`);
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Respuesta de la API (robar cartas):', data);

        if (data.success) {
            playerCard = data.cards[0];
            computerCard = data.cards[1];
            remainingCards = data.remaining;
            updateRemainingCards();
            
            // Incrementar el contador de rondas
            rounds++;
            updateRounds();
            
            // Mostrar las cartas
            displayCards();
            
            // Determinar el ganador
            determineWinner();
            
            // Deshabilitar el botón si no quedan cartas
            if (remainingCards === 0) {
                drawCardBtn.disabled = true;
                showFinalResult();
            }
        } else {
            showToast('Error al robar cartas: ' + (data.error || 'Error desconocido'), true);
        }
    } catch (error) {
        console.error('Error al robar cartas:', error);
        showToast('No se pudieron robar cartas: ' + error.message, true);
    } finally {
        setLoading(false);
    }
}

// Display cards
function displayCards() {
    if (!playerCard || !computerCard) return;
    
    // Mostrar carta del jugador
    playerCardElement.innerHTML = '';
    playerCardElement.className = 'card';
    const playerImg = document.createElement('img');
    playerImg.alt = `${playerCard.value} of ${playerCard.suit}`;
    playerImg.onerror = function() {
        console.error(`Error al cargar la imagen para ${playerCard.code}`);
        this.src = `https://via.placeholder.com/150x210?text=${playerCard.value}+of+${playerCard.suit}`;
    };
    playerImg.src = playerCard.image;
    playerCardElement.appendChild(playerImg);
    playerCardValueElement.textContent = `${playerCard.value} de ${getSuitName(playerCard.suit)}`;
    
    // Mostrar carta de la computadora
    computerCardElement.innerHTML = '';
    computerCardElement.className = 'card';
    const computerImg = document.createElement('img');
    computerImg.alt = `${computerCard.value} of ${computerCard.suit}`;
    computerImg.onerror = function() {
        console.error(`Error al cargar la imagen para ${computerCard.code}`);
        this.src = `https://via.placeholder.com/150x210?text=${computerCard.value}+of+${computerCard.suit}`;
    };
    computerImg.src = computerCard.image;
    computerCardElement.appendChild(computerImg);
    computerCardValueElement.textContent = `${computerCard.value} de ${getSuitName(computerCard.suit)}`;
}

// Get Spanish suit name
function getSuitName(suit) {
    switch (suit) {
        case 'HEARTS': return 'Corazones';
        case 'DIAMONDS': return 'Diamantes';
        case 'CLUBS': return 'Tréboles';
        case 'SPADES': return 'Picas';
        default: return suit;
    }
}

// Determine the winner
function determineWinner() {
    if (!playerCard || !computerCard) return;
    
    const playerValueIndex = cardValues.indexOf(playerCard.value);
    const computerValueIndex = cardValues.indexOf(computerCard.value);
    
    let resultText = '';
    let resultClass = '';
    
    if (playerValueIndex > computerValueIndex) {
        resultText = '¡Ganaste esta ronda!';
        resultClass = 'win';
        playerScore++;
        updateScores();
        
        // Añadir indicador de ganador
        const winnerIndicator = document.createElement('div');
        winnerIndicator.className = 'winner-indicator';
        winnerIndicator.textContent = '¡Ganador!';
        playerCardElement.style.position = 'relative';
        playerCardElement.appendChild(winnerIndicator);
    } else if (computerValueIndex > playerValueIndex) {
        resultText = '¡La computadora gana esta ronda!';
        resultClass = 'lose';
        computerScore++;
        updateScores();
        
        // Añadir indicador de ganador
        const winnerIndicator = document.createElement('div');
        winnerIndicator.className = 'winner-indicator';
        winnerIndicator.textContent = '¡Ganador!';
        computerCardElement.style.position = 'relative';
        computerCardElement.appendChild(winnerIndicator);
    } else {
        resultText = '¡Empate!';
        resultClass = 'draw';
    }
    
    resultElement.textContent = resultText;
    resultElement.className = `result ${resultClass}`;
}

// Show final result
function showFinalResult() {
    let finalMessage = '';
    
    if (playerScore > computerScore) {
        finalMessage = `¡Felicidades! Has ganado el juego ${playerScore} a ${computerScore}`;
        showToast(finalMessage);
    } else if (computerScore > playerScore) {
        finalMessage = `¡Has perdido el juego ${computerScore} a ${playerScore}!`;
        showToast(finalMessage);
    } else {
        finalMessage = `¡El juego ha terminado en empate ${playerScore} a ${computerScore}!`;
        showToast(finalMessage);
    }
}

// Update UI elements
function updateRounds() {
    roundsElement.textContent = rounds;
}

function updateRemainingCards() {
    remainingCardsElement.textContent = remainingCards;
}

function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Set loading state
function setLoading(isLoading) {
    loading = isLoading;
    newGameBtn.disabled = isLoading;
    drawCardBtn.disabled = isLoading || !gameStarted || remainingCards === 0;
    
    if (isLoading) {
        newGameBtn.innerHTML = 'Cargando...';
        drawCardBtn.innerHTML = 'Cargando...';
    } else {
        newGameBtn.textContent = 'Nuevo Juego';
        drawCardBtn.textContent = 'Robar Carta';
    }
}

// Show toast notification
function showToast(message, isError = false) {
    toastElement.textContent = message;
    toastElement.className = `toast ${isError ? 'error' : ''} show`;
    
    setTimeout(() => {
        toastElement.className = 'toast';
    }, 3000);
}

// Event listeners
newGameBtn.addEventListener('click', initializeDeck);
drawCardBtn.addEventListener('click', drawCards);

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada, listo para iniciar juego...');
});

// Mostrar mensaje en la consola para verificar que el script se está ejecutando
console.log('Script de Carta Mayor cargado correctamente');