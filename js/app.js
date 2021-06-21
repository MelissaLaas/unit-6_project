const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;

const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

//Start game button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

//Phrases array
const phrases = [
    'Learn to rest not to quit',
    'Everything is a choice',
    'Believe in yourself',
    'Enjoy life',
    'I love JavaScript'
];

//Functions to split the array phrases into strings
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const splitPhrases = randomPhrase.split('');
    return splitPhrases;
} 

//Keep split array
const phraseArray = getRandomPhraseAsArray(phrases);

//Add loop for each character
function addPhraseToDisplay(arr){
    for (i = 0; i < 0; i++) {
        const li = document.createElement('li');
        const ul = document.getElementById('phrase');
        let character = arr[i];
        li.textContent = character; 
    
    //if character has a letter and no space
    if ( li.textContent !== ' ') {
        li.className = "letter";
    } else {
        li.className = "space";
    }

    ul.appendChild(li);
    }
}

//Create a checkLetter function.
// const button = document.getElementsByTagName('button');
function checkLetter(button) {
    const letters = document.querySelectorAll('#phrase li');
    let match = null;

    const chosenLetter = button.textContent;
    for (let i = 0; i < letters.length; i++){
        const li = letters[i];

        if (chosenLetter === li.textContent.toLowerCase()) {
            letters[i].className = "show";
            match = chosenLetter;
        }
    }
    return match;
}

//Add an event listener to the keyboard.
//Button changes when clicked
//Change scoreboard if user choose wrong letter
qwerty.addEventListener('click', (e) => {
    let button = e.target;

    if (button.className === "chosen" || button.parentNode.className !== "keyrow"){
        return null;
    }
        button.className = 'chosen';
        button.disabled = true;
        const check = checkLetter(button);
        const heart = document.querySelectorAll('.tries img');
    
        if (check === null) {
            heart[missed].src = 'images/lostHeart.png';
            missed +=1;
    }
    checkWin();
}); 

//function that will display win/loose 
function checkWin() {
    const letterClass = document.querySelectorAll('.letter');
    const showClass = document.querySelectorAll('.show');
    let title = document.querySelector('.title');

    if(letterClass.length === showClass.length) {
        overlay.className = 'win';
        overlay.textContent = 'Congratulations! You are the winner!';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play Again';

    } else if (missed > 4){
        overlay.className = 'lose';
        overlay.textContent = 'Sorry, you loose...';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play Again';
    }
};
