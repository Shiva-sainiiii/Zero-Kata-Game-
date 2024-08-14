
// Initialize game state variables
var flag = 0; // Tracks whose turn it is (0 for O, 1 for X)
var boxes = document.querySelectorAll(".box"); // Selects all game boxes
var resetButton = document.querySelector("#btn"); // Selects the reset button
var resetsound = new Audio('resetmusic.mp3'); // Audio for reset sound
var winnerName = document.querySelector("#hero h1"); // Selects the winner display element

// Add event listeners to game boxes
boxes.forEach(function(elem) {
  elem.addEventListener("click", function() {
    // Check if box is empty
    if (elem.innerHTML == "") {
      // Update box with current player's symbol
      if (flag == 0) {
        elem.innerHTML = "O";
        flag = 1;
      } else {
        elem.innerHTML = "X";
        flag = 0;
      }
      // Check for winning conditions
      checkWinningConditions();
    }
  });
});

// Function to check winning conditions
function checkWinningConditions() {
  // Define winning combinations
  var winningCombinations = [
    [".one", ".two", ".three"],
    [".four", ".five", ".six"],
    [".seven", ".eight", ".nine"],
    [".one", ".four", ".seven"],
    [".two", ".five", ".eight"],
    [".three", ".six", ".nine"],
    [".one", ".five", ".nine"],
    [".three", ".five", ".seven"]
  ];

  // Check each winning combination
  winningCombinations.forEach(function(combination) {
    var one = document.querySelector(combination[0]).innerHTML;
    var two = document.querySelector(combination[1]).innerHTML;
    var three = document.querySelector(combination[2]).innerHTML;

    // Check if winning condition is met
    if (one !== "" && one === two && two === three) {
      // Play reset sound and display winner
      resetsound.play();
      winnerName.innerHTML = "Winner is " + one;
      // Reset game after 3-second delay
      setTimeout(function() {
        resetGame();
      }, 3000);
    }
  });
}

// Function to reset game
function resetGame() {
  // Clear game boxes
  boxes.forEach(function(elem) {
    elem.innerHTML = "";
  });
  // Reset game state
  flag = 0;
  winnerName.innerHTML = "";
}

// Add event listener to reset button
resetButton.addEventListener("click", function() {
  // Reset game
  resetGame();
});
