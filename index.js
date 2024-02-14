// Allows you to select the instructions to display them over the gameContainer
function showInstructions() {
  document.getElementById("gameTitle").style.display = "none";
  document.getElementById("playButton").style.display = "none";
  document.getElementById("instructionsButton").style.display = "none";
  document.getElementById("instructionsContainer").style.display = "block";
}

// Returns you to the main screen
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
  cursors;

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

    // Sets the boundaries of the game to the edges of the set width and height made from config
    this.physics.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );

    createAnimation(this);

    /** Use this with debug text in update() to view character speed
    * Helps when messing with drag factors and max velocity in createPlayer() in create.js
    */

     /**  this.text = this.add.text(10, 10, "", {
     *  font: "bold 18px Courier",
     *  fill: "red",
     *  });
     */
  }

  update() {
    updatePlayerMove(this);

    // Debug text for speed
    //// this.text.setText(`Speed: ${this.player.body.speed.toFixed(2)}`);

    // Allows the player to "wrap" around the bounds of the game by popping up on the opposite side if they hit the edge
    this.physics.world.wrap(this.player, 8);
  }
}
