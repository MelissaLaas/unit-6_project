const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

//Start game button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

// Phrases array
const ul = phrase.querySelector('ul');
const phrases = [
    "Learn to rest not to quit",
    "Everything is a choice",
    "Believe in yourself",
    "Enjoy life",
    "I love JavaScript"
];

//Functions to split the array phrases
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const splitPhrases = randomPhrase.split();
    return splitPhrases;
} 
//Keep split array
const phraseArray = getRandomPhraseAsArray(phrases);

//Add loop for each character
function addPhraseToDisplay(arr){
    for (i = 0; i < 0; i++) {
        const li = document.createElement('li');
        const list = document.getElementById('phrase');
        let character = arr[i];
        li.textContent = character; 
    
    //if character has a letter and no space
    if ( li.textContent !== ' ') {
        li.className = "letter";
    } else {
        li.className = "space";
    }
    ul.appendChild(li);
    };
}

//Create a checkLetter function.
function checkLetter(button) {
    const letters = document.querySelectorAll('#phrase li');
    let letters = null;
    for (let i = 0; i < li.length; i++){
        const li = letters[i]
        if ( chosenLetter === li.textContent.toLowerCase()) {
            letters[i].className = "show";
            match = chosenLetter;
        }
    }
    return match;
}

//Add an event listener to the keyboard.
qwerty.addEventListener('click', (e) => {
    let button = e.target;
    if (button.className === 'chosen' || button.parentNode.className !== "keyrow") {
        return null;
    }
}); 

//Count the missed guesses in the game.


//Create a checkWin function.