// Sets acceleration speeds and takes input and calls for animation updates based on direction
function updatePlayerMove(scene) {
  // Handles acceleration
  if (scene.cursors.left.isDown) {
    scene.player.setAccelerationX(-160);
  } else if (scene.cursors.right.isDown) {
    scene.player.setAccelerationX(160);
  } else {
    scene.player.setAccelerationX(0);
  }

  if (scene.cursors.up.isDown) {
    scene.player.setAccelerationY(-160);
  } else if (scene.cursors.down.isDown) {
    scene.player.setAccelerationY(160);
  } else {
    scene.player.setAccelerationY(0);
  }

  // Handles animation based on direction, allows for 8 directional animations
  if (scene.cursors.up.isDown) {
    if (scene.cursors.left.isDown) {
      scene.player.anims.play("leftUp", true);
    } else if (scene.cursors.right.isDown) {
      scene.player.anims.play("rightUp", true);
    } else {
      scene.player.anims.play("up", true);
    }
  } else if (scene.cursors.down.isDown) {
    if (scene.cursors.left.isDown) {
      scene.player.anims.play("leftDown", true);
    } else if (scene.cursors.right.isDown) {
      scene.player.anims.play("rightDown", true);
    } else {
      scene.player.anims.play("down", true);
    }
  } else if (scene.cursors.left.isDown) {
    scene.player.anims.play("left", true);
  } else if (scene.cursors.right.isDown) {
    scene.player.anims.play("right", true);
  } else {
    // Pause animations once no input is received
    scene.player.anims.pause();
  }
}
