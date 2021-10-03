/*
guess a number between min and max
specified number of guesses
notify player of guesses remaining
notify player of correct answer if lose
let player choose to play aghain
*/

// game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct`)

    } else {
        guessesLeft -= 1;
        if (guessesLeft == 0) {
            gameOver(false, `Game over, the correct number was ${winningNum}. Try again?`);
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses remaining`, 'red');
        }


    }
})

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;

    setMessage(msg, color);

    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

function getRandomNumber(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min))
}
