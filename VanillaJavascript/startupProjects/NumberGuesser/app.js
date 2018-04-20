// Game values
let min = 1, max = 10, winningNum = getWinningNum(min, max), guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInpt = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Play Again EventListener
game.addEventListener('mousedown', (e) => {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Assisgn min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen For Guess
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInpt.value);
    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // Check if won 
    if(guess === winningNum) {
        // Guess over - won

        gameOver(true, `${winningNum} is correct! you win.`);
    } else {
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // Game Over lost

           gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        } else {
            // Game Continues - answer wrong

            guessInpt.style.borderColor = 'red';

            // Clear input

            guessInpt.value = '';
            

            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

        }
    }
});


function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInpt.disabled = true;

    guessInpt.style.borderColor = color;

    setMessage(msg, color);


    // Play Again
    guessBtn.value = 'PlayAgain';
    guessBtn.className += 'play-again';
}

// Seting message

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Setting Winning Num
function getWinningNum(min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}