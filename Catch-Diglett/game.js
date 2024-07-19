// Declare variables to store game state and elements

let diglettOra; // current Diglett element
let jigglypuffOra; // current Jigglypuff element
let score = 0; // current score
let gameOver = false; // game over flag
let timeOut = false; // time out flag
let timerElement = document.getElementById("timer"); // timer element
let countdownInterval; // store the countdown interval ID

// Run showRules function when the window loads
window.onload = function() {
    showRules();
}

// Show rules function -- this function shows the rules of the game
function showRules(){
    // Add event listener to "Paly" button
    document.getElementById("play").onclick = function (){
        // Hide Pokédex (with the rules) and start the game
        document.getElementById("pokedex").style.display = "none"
        setGame();
        startCountdown();
    }
}

// Set up the game board
function setGame(){
    // Show the game board
    document.getElementById("board").style.display = "flex"
    // Create 9 game cells and add event listeners
    for (let i = 0; i < 9; i++) {
        let casella = document.createElement("div");
        casella.id = i.toString();
        casella.addEventListener("click", selezionaCasella);
        document.getElementById("board").appendChild(casella);
    }
    // Set intervals to spawn Diglett and Jigglypuff
    setInterval(setDiglett, 1000);
    setInterval(setJigglypuff, 2000);
}

// Get a random cell ID
function getCasellaRandom() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

// Spawn Diglett
function setDiglett(){
    // Check if game is over or timed out
    if (gameOver || timeOut){
        return;
    }
    // Remove previous Diglett
    if (diglettOra){
        diglettOra.innerHTML = "";
    }
    // Create new Diglett image
    let diglett = document.createElement("img");
    diglett.src = "./images/Diglett.png";
    // Get a random cell ID
    let num = getCasellaRandom();
    // Check if Jigglypuff is already in this cell
    if (jigglypuffOra && jigglypuffOra.id === num) {
        return;
    }
    // Set the new Diglett element
    diglettOra = document.getElementById(num);
    diglettOra.appendChild(diglett);
}

// Spawn Jigglypuff
function setJigglypuff(){
    // Check if game is over or timed out
    if (gameOver || timeOut){
        return;
    }
    // Remove previous Jigglypuff
    if (jigglypuffOra){
        jigglypuffOra.innerHTML = "";
    }
    // Create new Jigglypuff image
    let jiggly = document.createElement("img");
    jiggly.src = "./images/Jigglypuff.png";
    // Get a random cell ID
    let num = getCasellaRandom();
    // Check if Diglett is already in this cell
    if (diglettOra && diglettOra.id === num) {
        return;
    }
    // Set the new Jigglypuff element
    jigglypuffOra = document.getElementById(num);
    jigglypuffOra.appendChild(jiggly);
}

// Handle cell selection
function selezionaCasella() {
    // Check if game is over or timed out
    if (gameOver || timeOut) {
        return;
    }
    // Check if the selected cell is Diglett or Jigglypuff
    if (this == diglettOra) {
        // Increase score
        score += 10;
        document.getElementById("score").innerText = score.toString(); // update score HTML
    }
    else if (this == jigglypuffOra) {
        // Game over
        document.getElementById("score").innerText = score.toString(); // update score HTML
        gameOver = true;
        timerElement.innerText = "0"
        alert("Game Over -- Refresh the page to play again")
        clearInterval(countdownInterval); // Stop the countdown interval
    }
}

// Start the countdown
function startCountdown() {
    countdownInterval = setInterval(() => {
        // Decrease timer by 1 second
        let remainingTime = parseInt(timerElement.textContent) - 1;
        timerElement.textContent = remainingTime;

        // Check if time is up
        if (remainingTime === 0) {
            timeOut = true;
            document.getElementById("score").innerText = score.toString();
            clearInterval(countdownInterval)
            timerElement.innerText = "0"
            clearInterval(setDiglett);
            clearInterval(setJigglypuff);
            alert("You won (" + score + " points) -- Refresh the page to play again")
        }
    }, 1000);
}