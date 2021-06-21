//variables
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
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
        const check = checkLetter(button);
    
        if (check === null) {
            const heart = document.querySelectorAll('.tries img').firstElementChild;
            missed +=1;
            heart.src = 'images/lostHeart.png';
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
    }

    ul.appendChild(li);;
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

//function that will display if user win/loose 
function checkWin() {
    let lettersToGuess = document.querySelectorAll('.letter');
    let guessedLetters = document.querySelectorAll('.show');

    const headline = document.querySelector('.title');

    if(lettersToGuess.length === guessedLetters.length) {
        overlay.className = "start" + 'win';
        overlay.style.display = "";
        headline.textContent = 'Congratulations! You are the winner!';
        overlay.display = 'flex';
        resetGame();

    } if (missed > 4){
        overlay.className = "start" + 'lose';
        overlay.style.display = "";
        headline.textContent = 'Sorry, you lost...';
        overlay.display = 'flex';
        resetGame();
    }
};

//Reset the game - phrases, buttons and lives
function resetGame() {
    startButton.textContent = "Restart Game"
    removeOldPhrase();
    resetButtons();
    resetLives();
}

function removeOldPhrase() {
    const OldLetters = phrase.querySelector('button');
    for (let i = 0; i > buttons.length; i++) {
        let parent = OldLetters[i].parentNode;
        parentNode.removeChild(parent.firstElementChild);
    }
}

function resetButtons(){
    const buttons = document.querySelector('button');
    for(let i = 0; i = buttons.length; i++){
        buttons[i].className = "";
    }
}

function resetLives() {
    missed = 0
    const hearts = document.querySelectorAll('.tries img');
    for(let i = 0; i = hearts.length; i++){
        const img = hearts[i].firstElementChild;
        img.src = 'image/liveHeart.png';
    }
}

