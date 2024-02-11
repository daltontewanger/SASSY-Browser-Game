
// Allows you to select the instructions to display them over the gameContainer //
function showInstructions() {
  document.getElementById("gameTitle").style.display = "none";
  document.getElementById("playButton").style.display = "none";
  document.getElementById("instructionsButton").style.display = "none";
  document.getElementById("instructionsContainer").style.display = "block";
}

// Returns you to the main screen //
function hideInstructions() {
  document.getElementById("gameTitle").style.display = "block";
  document.getElementById("playButton").style.display = "block";
  document.getElementById("instructionsButton").style.display = "block";
  document.getElementById("instructionsContainer").style.display = "none";
}
