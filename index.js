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

// Function for the "Play Game" button to hide everything but the game container and initiate phaser config
function startGame() {
  document
    .getElementById("gameContainer")
    .querySelectorAll(":not(#gameCanvas)")
    .forEach((element) => (element.style.display = "none"));
  document.getElementById("gameContainer").style.border = "none";

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "gameCanvas",
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: { y: 0 },
      },
    },
    scene: BrowserGame,
  };

  // Creates the game
  const game = new Phaser.Game(config);
}

class BrowserGame extends Phaser.Scene {
  player;

  preload() {
    this.load.atlas(
      "playerAnim",
      "assets/player.png",
      "assets/playerAnimation.json"
    );
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("object", "assets/strawberry.png");
    this.load.image("background", "assets/tiles/grass/Grass_04-128x128.png");
  }

  create() {
    createBackground(this);
    createPlayer(this);
  }

  update() {}
}
