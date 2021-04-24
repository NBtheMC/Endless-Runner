class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image("platform", "assets/platform.png");
        this.load.image("player", "assets/player.png");
        this.load.image("fire", "assets/tempFire.png");
        this.load.image("grass", "assets/tempGrass.png");
        this.load.image("water", "assets/tempWater.png");
    }

    create() {
        // Create platform
        this.platform = this.physics.add.sprite(game.config.width / 2, game.config.height * .8 , 'platform');
        this.platform.setImmovable(true);
        this.platform.displayWidth = game.config.width * 2;
        
        // Create group of active obstacles
        this.activeObstacles = this.add.group({
            // Once an obstacle is destroyed, it is re-added to the inactive group
            //removeCallback: function(obstacle){
            //   obstacle.scene.inactiveObstacles.add(obstacle)
            //}
        });

        // Create group of inactive obstacles
        this.inactiveObstacles = this.add.group({
            removeCallback: function(obstacle){
                obstacle.scene.activeObstacles.add(obstacle)
            }
        });

        // number of consecutive jumps made by the player
        //this.playerJumps = 0;
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, 'player');
        this.player.setGravityY(gameOptions.playerGravity);
 
        // setting collisions between the player and the platform
        this.physics.add.collider(this.player, this.platform);
 
        // checking for input
        //this.input.keyboard.on('keydown-SPACE', this.jump, this);

        // Keyboard stuff
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    }

    // Adds obstacle
    addObstacle(x, element){
        let obstacle;
        if(this.inactiveObstacles.getLength()){
            obstacle = this.inactiveObstacles.getFirst();
            obstacle.x = x;
            obstacle.active = true;
            obstacle.visible = true;
            this.inactiveObstacles.remove(obstacle);
        } else {
            obstacle = this.physics.add.sprite(x * 1.5, game.config.height * .6, element);
            obstacle.setVelocityX(gameOptions.obstacleStartSpeed * -3);
            obstacle.setGravityY(gameOptions.playerGravity);

            this.physics.add.collider(this.platform, obstacle);
            //this.physics.add.collider(this.player, obstacle);

            this.activeObstacles.add(obstacle);
        }

    }

    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    /*
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
    }*/

    update() {
        // game over
        if(this.player.y > game.config.height){
            this.scene.start('menuScene');
        }
        this.player.x = gameOptions.playerStartPosition;

        // recycling obstacles
        this.activeObstacles.getChildren().forEach(function(obstacle) {
            console.log(gameOptions.element);
            // Destroy objects
            // Fire
            if(this.activeObstacles.getLength() > 0 && Phaser.Input.Keyboard.JustDown(keyR) && gameOptions.element == 1) {
                this.activeObstacles.killAndHide(obstacle);
                this.activeObstacles.remove(obstacle);
            }
            // Grass
            if(this.activeObstacles.getLength() > 0 && Phaser.Input.Keyboard.JustDown(keyG) && gameOptions.element == 2) {
                this.activeObstacles.killAndHide(obstacle);
                this.activeObstacles.remove(obstacle);
            }
            // Water
            if(this.activeObstacles.getLength() > 0 && Phaser.Input.Keyboard.JustDown(keyB) && gameOptions.element == 3) {
                this.activeObstacles.killAndHide(obstacle);
                this.activeObstacles.remove(obstacle);
            }
            // If obstacle collides with player
            if(obstacle.x < gameOptions.playerStartPosition + this.player.width * 1.5) {
                this.scene.start('menuScene');
            }
        }, this);


        // add new obstacles
        if(this.activeObstacles.getLength() < 1) {
            let value = Phaser.Math.Between(1, 3);
            gameOptions.element = value;
            if(value == 1) {
                this.addObstacle(game.config.width, 'fire');
            }
            if(value == 2) {
                this.addObstacle(game.config.width, 'grass');
            }
            if(value == 3) {
                this.addObstacle(game.config.width, 'water');
            }
        }

    }
}