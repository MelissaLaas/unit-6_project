//variables
const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;

const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

//Phrases array
const phrases = [
    'happiness is key',
    'choose wisely',
    'believe in yourself',
    'enjoy life',
    'javascript is killing me'
];

//start the game
startGame();

function startGame(){
    startButton.addEventListener('click', (e) => { 
        overlay.style.display = 'none';
        let randomPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(randomPhrase); 
    });
}

//Add an event listener to the keyboard.
//Button changes when clicked
//Change scoreboard if user choose wrong letter
qwerty.addEventListener('click', (e) => {
    let button = e.target;

    if (button.className === "chosen" || button.parentNode.className !== "keyrow"){
        return;
    }
        button.className = 'chosen';
        button.disabled = true;
        let check = checkLetter(button);
        const heart = document.querySelectorAll('.tries img');
    
        if (check === null) {
            heart[missed].src = 'images/lostHeart.png';
            missed += 1;
    }

    checkWin();
}); 

//Split the array phrases into strings
function getRandomPhraseAsArray(arr){
    const i = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[i];
    const phraseArray = randomPhrase.split("");
    return phraseArray;
} 

//Append all letters to the phrases
function addPhraseToDisplay(arr){
    const ul = document.getElementById('phrase').firstElementChild;
    
    for (i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const character = arr[i];
        li.textContent = character; 

    //if character has a letter and no space
        if ( character !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
     ul.appendChild(li);;
    }
}

//Create a checkLetter function.
function checkLetter(button) {
    const list = document.querySelectorAll('#phrase li');
    let match = null;

    const chosenLetter = button.textContent;
    for (let i = 0; i < list.length; i++) {
        const li = list[i];

        if (chosenLetter === li.textContent.toLowerCase()) {
            li.className += " " + "show";
            match = chosenLetter;
        }
    } return match;
}

//function that will display if user win/lose 
function checkWin() {
    let lettersToGuess = document.querySelectorAll('.letter');
    let guessedLetters = document.querySelectorAll('.show');

    const headline = document.querySelector('.title');

    if(lettersToGuess.length === guessedLetters.length) {
        overlay.classList.add('win');
        overlay.style.display = "";
        headline.textContent = 'Congratulations! You are the winner!';
        overlay.display = 'flex';
        resetGame();

    } if (missed > 4){
        overlay.classList.add('lose');
        overlay.style.display = "";
        headline.textContent = 'Sorry, you loose...';
        overlay.display = 'flex';
        startButton.textContent = 'Play Again';
        resetGame();
    }
};

//Reset the game - phrases, buttons and lives
function resetGame() {
    const keys = document.getElementsByTagName('button');
    for(let i = 0; i < keys.length; i++){
        keys[i].className = '';
        keys[i].disabled = false;
    }
}

function clearLetters() {
    const clearLetters = phrase.querySelectorAll('li');
    for (let i = 0; i < clearLetters.length; i++) {
        let ul = clearLetters[i].parentNode;
        ul.removeChild(ul.firstElementChild);
    }
}

function resetLives() {
    missed = 0
    const hearts = document.querySelectorAll('.tries');
    for(let i = 0; i < hearts.length; i++){
        const heartImg = hearts[i].firstElementChild;
        heartImg.src = 'image/liveHeart.png';
    }
}

startButton.addEventListener('click', () => {
    if(startButton.textContent === 'Play Again') {
        resetGame();
        resetLives();
        clearLetters();
        overlay.style.display = 'none';
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
    }
});
