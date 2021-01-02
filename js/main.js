window.addEventListener("load", init);
// Global variables

const selectedLevel = document.querySelector("#level-select");

// Available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

// To change level, type .easy, .medium or .hard
// This returns a number.
// const currentLevel = levels.medium
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM ELEMENTS
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
];

// Initialize game
function init() {
  // Show number of seconds in UI (top, green)
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  document.getElementById("word-input").disabled = false;
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  console.log("awake")
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    // Extra second because it takes a second for page to load.
    showWord(words);
    wordInput.value = "";
    score++;
  }
  // if score is -1, display 0 since the score decrements by 1.
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}
// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick and show random word
function showWord(words) {
  // Generate random array index
  // Math.random generates a value within [0, 1).
  // words.length = 25
  // Math.floor returns the largest integer less than or equal to the given number.
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  }
  else if (time === 0) {
  //   // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// check game status
function checkStatus() {
  if (
    !isPlaying &&
    time === 0
  ) {
    message.innerHTML = "Game Over!!!";
    score = -1;
    // wordInput.disabled = true;
  }
}

// Once "Try Again" is clicked
function tryAgain() {

  document.getElementById("word-input").disabled = false;

  window.location.reload();
  
}

// Level selection
selectedLevel.addEventListener("change", () => {
  if (selectedLevel.value === "easy") {
    currentLevel = levels.easy;
    console.log(currentLevel);
  } else if (selectedLevel.value === "medium") {
    currentLevel = levels.medium;
    console.log(currentLevel);
  } else {
    currentLevel = levels.hard;
    console.log(currentLevel);
  }
  // Show number of seconds in UI (top, green)
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);

});