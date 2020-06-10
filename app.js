// Get all the DOM elements
var windowOne = document.querySelector('.window-one');
var timerStarted = document.querySelector('.timer-started');

// gets user input elements
var userName = document.querySelector('.user-name');
var userTask = document.querySelector('.user-task');
var userTimer = document.querySelector('.user-timer');
var goBtn = document.querySelector('.go-btn');

// for printing user input elements to DOM
var usernamePrint = document.querySelector('.user-name-print');
var usertaskPrint = document.querySelector('.user-task-print');
var usertimePrint = document.querySelector('.user-time-print');

// for a lil music to let you know that you're finished
var finishedSound = document.querySelector('#finished-sound');

// Click that button to get this party started
goBtn.addEventListener('click', function() {
    // removes user input window
    windowOne.classList.add('inactive');
    
    // shows you the started timer window with user input
    timerStarted.classList.remove('inactive');
    usernamePrint.textContent = 'You got this, ' + userName.value;
    usertaskPrint.textContent = userTask.value + ' like a champ.'
    
    // sets timer according to user choice (ten, twenty or thirty minutes)
    var timerChoice = userTimer.options[userTimer.selectedIndex].value;
    if(timerChoice === 'ten') {
        timer(600);
        console.log('Put a ten minute timer here');
    } else if (timerChoice === 'twenty') {
        timer(1200);
        console.log('Put a twenty minute timer here');
    } else {
        timer(1800);
        console.log('Put a thirty minute timer her');
    }
});

// COUNTDOWN TIMER FUNCTION

// declares variable to store the setInterval function
let countdown; 

function timer(seconds) {
    const now = Date.now();
    // now + the amount of seconds the timer runs. Must multiply by 1000 b/c Date.now() is in milliseconds
    const then = now + seconds * 1000;
    console.log({now, then});
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        // must divide by 1000 because Date.now is in ms, then have to round it to avoid the decimals
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // prevents it from going negative
        if(secondsLeft < 0) {
            clearInterval(countdown); 

            // calls the function that gives you a little celebratory naptime and song
            celebrateNow();
            return; // exits function
        }
        // display the timer function
        displayTimeLeft(secondsLeft);
    }, 1000)
};

// for displaying the time
function displayTimeLeft(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    // adds a zero if minutes or seconds go under 10
    if(minutes < 10) {
        minutes = '0' + minutes;
    }
    if(remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }
    usertimePrint.textContent = `${minutes}:${remainingSeconds}`;
}

// a function that gives you a sleepy puppy and plays pretty song when timer finishes
const timerFinished = document.querySelector('.timer-finished');
function celebrateNow() {
    timerFinished.classList.add('active');
    timerStarted.classList.add('inactive');
    finishedSound.play();
}

// Goes back to the original window
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function() {
    timerFinished.classList.remove('active');
    windowOne.classList.remove('inactive');
    timerStarted.classList.add('inactive');
    finishedSound.pause();
    finishedSound.currentTime = 0;
    usertimePrint.textContent = '';
    usernamePrint.textContent = '';
    usertaskPrint.textContent = '';
})