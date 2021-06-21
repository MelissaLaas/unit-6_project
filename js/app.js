//variables
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
    'happiness is key',
    'choose wisely',
    'believe in yourself',
    'enjoy life',
    'javascript is killing me'
];

//Functions to split the array phrases into strings
function getRandomPhraseAsArray(arr){
    let randomNumber = Math.floor(Math.random() * arr.length);
    let result = phrases[randomNumber].split('');
    return result;
} 

//Add loop for each character
function addPhraseToDisplay(arr){
    const li = document.createElement('li');
    const ul = document.getElementById('phrase');
    
    for (i = 0; i < arr.length; i++) {
        let character = arr[i];
        li.textContent = character; 
        ul.appendChild(li);

    //if character has a letter and no space
        if ( character == ' ') {
            li.className = "letter";
        } else {
            li.className = "space";
        }
    }
    return ul;
}

//call the add phrase - display function on screen
addPhraseToDisplay(getRandomPhraseAsArray(phrases));

//Create a checkLetter function.
function checkLetter(button) {
    const letters = document.querySelectorAll('#phrase li');
    let match = null;

    const chosenLetter = button.textContent;
    for (let i = 0; i < letters.length; i++) {
        const li = letters[i];

        if (li.textContent.toLowerCase().includes(chosenLetter)) {
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

    if(letterClass.length === showClass.length) {
        overlay.className = 'start' + 'win';
        overlay.textContent = 'Congratulations! You are the winner!';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play Again';

    } else if (missed > 4){
        overlay.className = 'start' + 'lose';
        overlay.textContent = 'Sorry, you loose...';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play Again';
    }
};

