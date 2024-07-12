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

function updateHighScores() {
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = "";
  highScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${score}`;
    highScoresList.appendChild(listItem);
  });
}

// Function for the "Play Game" button to hide everything but the game container and initiate phaser config
function startGame() {
  // Reset high scores
  highScores = [];
  updateHighScores();

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
  text;
  objectsGroup;
  score = 0;
  scoreText;

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
    this.load.image("background", "assets/tiles/Grass/Grass_04-128x128.png");
    this.load.audio("collisionSound", "assets/eat-sound.wav");
  }

  create() {
    this.input.addPointer(1);
    // Sets the boundaries of the game to the edges of the set width and height made from config
    this.physics.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );

    createBackground(this);
    createPlayer(this);
    createAnimation(this);

    // Register touch events
    // this.input.on("pointerdown", this.handleTouchStart, this);
    // this.input.on("pointerup", this.handleTouchEnd, this);
    // this.input.on("pointermove", this.handleTouchMove, this);

    // Adds score to top right of the game
    this.scoreText = this.add
      .text(this.game.config.width - 10, 10, `Score: ${this.score}`, {
        font: "bold 18px Tahoma",
        fill: "white",
        align: "right",
      })
      .setOrigin(1, 0);

    // Group made to handle the objects for spawning, moving, and eventually collision
    this.objectsGroup = this.physics.add.group();

    /** Use this with debug text in update() to view character speed
     * Helps when messing with drag factors and max velocity in createPlayer() in create.js
     */

    /**  this.text = this.add.text(10, 10, "", {
     *  font: "bold 18px Courier",
     *  fill: "red",
     *  });
     */

    // Enables collision between the player and objects
    this.physics.add.collider(
      this.player,
      this.objectsGroup,
      this.handleCollision,
      null,
      this
    );
  }

  // handleTouchStart(pointer) {
  //   // Store initial touch position
  //   this.touchStartX = pointer.x;
  //   this.touchStartY = pointer.y;
  // }

  // handleTouchEnd() {
  //   // Reset movement when touch ends
  //   this.player.setVelocity(0);
  // }

  // handleTouchMove(pointer) {
  //   // Calculate the distance moved from the initial touch position
  //   const deltaX = pointer.x - this.touchStartX;
  //   const deltaY = pointer.y - this.touchStartY;

  //   // Adjust player velocity based on touch movement
  //   this.player.setVelocityX(deltaX * 2); // Adjust multiplier for speed
  //   this.player.setVelocityY(deltaY * 2); // Adjust multiplier for speed
  // }

  update() {
    maxObjects(this);
    updatePlayerMove(this);

    // Allows the player to "wrap" around the bounds of the game by popping up on the opposite side if they hit the edge
    this.physics.world.wrap(this.player, 8);

    // Makes the collision bounds based on the size of the current frame (ran into issues with the player collision perimeter and this fixed it)
    const currentFrame = this.player.anims.currentFrame;
    this.player.body.setSize(currentFrame.width, currentFrame.height);

    // Debug text for speed
    //// this.text.setText(`Speed: ${this.player.body.speed.toFixed(2)}`);
  }

  handleObject() {
    spawnObject(this);
  }
  handleCollision(player, movingObject) {
    objectCollision(player, movingObject, this);
  }
  handleYouWon() {
    youWon(this, highScores);
  }
  handleGameOver() {
    gameOver(this, highScores);
  }
}
