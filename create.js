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

//Creates the player, places it in the middle of the screen, and configures the speed settings
function createPlayer(scene) {
  scene.player = scene.physics.add.sprite(400, 300, "player");
  scene.player.setDamping(true);
  scene.player.setDrag(0.95);
  scene.player.setMaxVelocity(200);
}
