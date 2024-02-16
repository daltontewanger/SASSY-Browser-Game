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

// Continuously makes objects based on scale of player and sends them from one side of the screen to the other
function spawnObject(scene) {
  let x, y, velocityX, velocityY;

  // Chooses side of screen 0: top, 1: right, 2: bottom, 3: left
  // Calculate spawn position and random velocity based on chosen side
  const side = Phaser.Math.Between(0, 3);
  switch (side) {
    case 0: // spawns at top and moves down
      x = Phaser.Math.Between(0, scene.game.config.width);
      y = -50;
      velocityY = Phaser.Math.Between(50, 100); // update these numbers to change speed of objects
      break;
    case 1: // spawns at right and moves left
      x = scene.game.config.width + 50;
      y = Phaser.Math.Between(0, scene.game.config.height);
      velocityX = Phaser.Math.Between(-100, -50);
      break;
    case 2: // spawns at bottom and moves up
      x = Phaser.Math.Between(0, scene.game.config.width);
      y = scene.game.config.height + 50;
      velocityY = Phaser.Math.Between(-100, -50);
      break;
    case 3: // spawns at left and moves right
      x = -50;
      y = Phaser.Math.Between(0, scene.game.config.height);
      velocityX = Phaser.Math.Between(50, 100);
      break;
  }

  const playerSize = scene.player.displayWidth;
  const minSize = playerSize * 0.5;
  const maxSize = 100; //max pixel size of object, can adjust to be smaller or larger
  const size = Phaser.Math.Between(minSize, maxSize);

  // Creates object group to use with logic to prevent more than 10 objects at once
  const object = scene.objectsGroup.create(x, y, "object");
  object.setScale(size / object.displayWidth);

  // Sets object collision perimeter a bit tighter for better visual collision detection
  const collisionWidth = object.width * 0.8;
  const collisionHeight = object.height * 0.8;
  object.body.setSize(collisionWidth, collisionHeight);

  if (velocityX !== undefined) object.setVelocityX(velocityX);
  if (velocityY !== undefined) object.setVelocityY(velocityY);
}

// Check if the number of active objects is less than 10 and spawn a new one, or destroy it if it goes off screen
function maxObjects(scene) {
  if (scene.objectsGroup.countActive(true) < 10) {
    scene.handleObject();
  }

  scene.objectsGroup.children.iterate((object) => {
    if (
      object &&
      (object.x < -50 ||
        object.x > scene.game.config.width + 50 ||
        object.y < -50 ||
        object.y > scene.game.config.height + 50)
    ) {
      object.destroy(); // Phaser funcion to destroy or remove objects
    }
  });
}
