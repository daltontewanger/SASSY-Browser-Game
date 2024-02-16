// All collision logic for player growth and scoring
function objectCollision(player, movingObject, scene) {
  const playerWidth = player.displayWidth;
  const playerHeight = player.displayHeight;
  const objectSize = movingObject.displayWidth;

  // Console logs to assist in collision debugging
  console.log("Collision detected!");
  console.log("Player Width:", playerWidth);
  console.log("Player Height:", playerHeight);
  console.log("Object Size:", objectSize);

  if (objectSize < playerWidth) {
    let ratio = objectSize / playerWidth;

    // 3% size increase after each collision with an object that is smaller than the player
    const growthFactor = 0.03;
    const newWidth = playerWidth + playerWidth * growthFactor;
    const newHeight = playerHeight + playerHeight * growthFactor;

    // Set max size for the player
    const maxWidth = 100;
    const maxHeight = 100;

    // Checks if the calculated new size exceeds the maximum size and if not allows the increase
    if (newWidth > maxWidth || newHeight > maxHeight) {
      player.displayWidth = maxWidth;
      player.displayHeight = maxHeight;
    } else {
      player.displayWidth = newWidth;
      player.displayHeight = newHeight;
    }

    // Console logs to assist in collision debugging
    console.log(
      "Player size after growth:",
      player.displayWidth,
      player.displayHeight
    );

    let scoreDelta = Math.round(25 + 125 * ratio);

    movingObject.destroy();

    scene.score += scoreDelta;
    scene.scoreText.setText(`Score: ${scene.score}`);
  } else {
    // Display a "You Lose" message
    const loseText = scene.add.text(
      scene.game.config.width / 2 - 100,
      scene.game.config.height / 2 - 20,
      "You Lose",
      {
        font: "32px Arial",
        fill: "#ff0000",
      }
    );
    // Stop the game
    scene.physics.pause();
    scene.time.removeAllEvents();
  }

  player.body.setSize(player.displayWidth, player.displayHeight);
}
