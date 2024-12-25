

const maxLives = 3;
let lives = maxLives;
let secretNumber = Math.floor(Math.random() * 100) + 1;
let gameOver = false;

function* lifeGenerator() {
    while (lives > 0) {
        yield lives;
        lives--;
    }
}


const lifeIter = lifeGenerator();
const heartsElement = document.getElementById('hearts');
const messageElement = document.getElementById('message');
const submitButton = document.getElementById('submitGuess');
const restartButton = document.getElementById('restartButton');
const guessInput = document.getElementById('guess');
const resultMessage = document.getElementById('resultMessage');

function updateHearts() {
    heartsElement.innerHTML = '❤️ '.repeat(lives);
}

function restartGame() {
    lives = maxLives;
    secretNumber = Math.floor(Math.random() * 10) ;
    gameOver = false;
    updateHearts();
    resultMessage.textContent = '';
    messageElement.textContent = 'Guess a number between 1 and 100';
    restartButton.style.display = 'none';
    guessInput.value = '';
}


submitButton.addEventListener('click', () => {
    if (gameOver) return;

    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 10) {
        resultMessage.textContent = 'Please enter a valid number between 1 and 10.';
        return;
    }
    
    if (guess === secretNumber) {
        resultMessage.textContent = '🎉 You Win!';
        gameOver = true;
        restartButton.style.display = 'inline-block';
    } else {
        const currentLives = lifeIter.next().value;
        updateHearts();
        
        if (currentLives === undefined) {
            resultMessage.textContent = '😞 Game Over! The number was ' + secretNumber;
            gameOver = true;
            restartButton.style.display = 'inline-block';
        } else {
            resultMessage.textContent = `Wrong guess! You have ${currentLives} lives left.`;
        }
    }
});


restartButton.addEventListener('click', restartGame);


updateHearts();
messageElement.textContent = 'Guess a number between 1 and 100';
