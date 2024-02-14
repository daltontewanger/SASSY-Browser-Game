//Creates background for the game, centers it within the container, and makes it's opacity 50%
function createBackground(scene) {
  const tilesetScale = 1;
  const background = scene.add.tileSprite(
    scene.game.config.width / 2,
    scene.game.config.height / 2,
    scene.game.config.width,
    scene.game.config.height,
    "background"
  );
  background.setTileScale(tilesetScale);
  background.setAlpha(0.5);
}

// Creates the player, places it in the middle of the screen, and configures the speed settings
function createPlayer(scene) {
  scene.player = scene.physics.add.sprite(400, 300, "player");
  scene.player.setDamping(true);
  scene.player.setDrag(0.95);
  scene.player.setMaxVelocity(200);

  // Phaser 3 function that creates and returns an object containing 4 hotkeys for arrow keys to be used for movement
  scene.cursors = scene.input.keyboard.createCursorKeys();
}

// Creates the animations for player movements utilizing the sprite sheet
// Using if statements to wrap the animation functions to allow for proper refreshing/handling of the animations
function createAnimation(scene) {
  if (!scene.anims.exists("idle")) {
    scene.anims.create({
      key: "idle",
      frames: [{ key: "playerAnim", frame: "Run_Down_1.png" }],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("down")) {
    scene.anims.create({
      key: "down",
      frames: [
        { key: "playerAnim", frame: "Run_Down_1.png" },
        { key: "playerAnim", frame: "Run_Down_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("left")) {
    scene.anims.create({
      key: "left",
      frames: [
        { key: "playerAnim", frame: "Run_Left_1.png" },
        { key: "playerAnim", frame: "Run_Left_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("right")) {
    scene.anims.create({
      key: "right",
      frames: [
        { key: "playerAnim", frame: "Run_Right_1.png" },
        { key: "playerAnim", frame: "Run_Right_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("up")) {
    scene.anims.create({
      key: "up",
      frames: [
        { key: "playerAnim", frame: "Run_Up_1.png" },
        { key: "playerAnim", frame: "Run_Up_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("leftDown")) {
    scene.anims.create({
      key: "leftDown",
      frames: [
        { key: "playerAnim", frame: "Run_LeftDown_1.png" },
        { key: "playerAnim", frame: "Run_LeftDown_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("leftUp")) {
    scene.anims.create({
      key: "leftUp",
      frames: [
        { key: "playerAnim", frame: "Run_LeftUp_1.png" },
        { key: "playerAnim", frame: "Run_LeftUp_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("rightDown")) {
    scene.anims.create({
      key: "rightDown",
      frames: [
        { key: "playerAnim", frame: "Run_RightDown_1.png" },
        { key: "playerAnim", frame: "Run_RightDown_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("rightUp")) {
    scene.anims.create({
      key: "rightUp",
      frames: [
        { key: "playerAnim", frame: "Run_RightUp_1.png" },
        { key: "playerAnim", frame: "Run_RightUp_2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  scene.player.anims.play("idle");
}
