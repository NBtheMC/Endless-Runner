class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', 'assets/tempwizard.png');
        this.load.image('fire', 'assets/tempfire.png');
        this.load.image('water', 'assets/tempwater.png');
        this.load.image('grass', 'assets/tempgrass.png');
        this.load.image('potion', 'assets/temppotion.png');
        this.load.image('background', 'assets/tempbackground.png');
        this.load.image('spark', 'assets/tempspark.png');
    }

    create(){
        //invisible wall at top
        this.topBarrier = this.physics.add.sprite(game.config.width/2, 0, 1800,game.config.height/3);
        this.topBarrier.body.setSize(game.config.width, game.config.height/3);
        //this.topBarrier.body.setSize(100,100);
        this.topBarrier.setImmovable(true);
        console.log("play");
        this.background = this.add.tileSprite(0,0,1800,720,'background').setOrigin(0,0);
        activeY = {};
        //affects slide
        this.ACCELERATIONX = 5000;
        this.ACCELERATIONY = 10000;
        this.DRAG = 2000;
        this.MAXVELOCITYX = 400;
        this.MAXVELOCITYY = 900;

        //player stuff
        this.player = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'player').setScale(.3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setMaxVelocity(this.MAXVELOCITYX,this.MAXVELOCITYY)
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.topBarrier);

        //obstacle stuff
        // Create group of active obstacles
        this.activeObstacles = this.add.group({
        });

        // Create group of inactive obstacles
        this.inactiveObstacles = this.add.group({
            removeCallback: function(obstacle){
                obstacle.scene.activeObstacles.add(obstacle)
            }
        });

        // Prompt
        let promptConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5,
            }
        }
        this.firePrompt = this.add.text(200, 100, 'Press Q!', promptConfig).setOrigin(0.5).setVisible(false);
        this.grassPrompt = this.add.text(200, 100, 'Press W!', promptConfig).setOrigin(0.5).setVisible(false);
        this.waterPrompt = this.add.text(200, 100, 'Press E!', promptConfig).setOrigin(0.5).setVisible(false);    

        // potion stuff
        // set prompt inputs
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
       
        this.potion = this.physics.add.sprite(0, 0, 'potion').setScale(.1);
        this.potion.visible = false;
        this.isThrowing = false;
        this.potion.element = 'fire';
        console.log(this.potion.element);

        //player collides with obstacle (game over)
        this.physics.add.collider(this.player, this.activeObstacles, null, function() {
            this.scene.start('menuScene');
        }, this);

        //potion collides with obstacle (get rid of obstacle and reset potion)
        //p = potion, o = obstacle
        this.physics.add.collider(this.potion, this.activeObstacles, function(p,o) {
            let currentY = o.y;
            //this.activeObstacles.remove(o);
            //o.destroy();
            this.potion.setVelocityX(0);
            this.potion.setAccelerationX(0);
            this.isThrowing = false;
            //this.resetPotion();
            //destroy potion tween
            this.add.tween({
                targets: [p, o],
                duration: 200,
                ease: 'linear',
                alpha: 0,
                //setScaleX: .2,
                //setScaleY: .2,
                onComplete: function() {
                    this.resetPotion();
                    this.activeObstacles.remove(o);
                    o.destroy();
                    delete activeY[currentY];
                },
                onCompleteScope: this,
            });
        }, null, this);
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
            obstacle.type = element; //set element so potion can detect it
            //randomize y
            obstacle.y = 200 * Phaser.Math.Between(1, 3);
            let currentY = obstacle.y;
            if(!Object.values(activeY).includes(currentY)) {
                //console.log("The current y is " + currentY);

                // Change size of temp assets
                if (gameOptions.element == 1 || gameOptions.element == 3) {
                    obstacle.setScale(.1); //sprites a bit too big
                } else {
                    obstacle.setScale(.2);
                }

                obstacle.setVelocityX(gameOptions.obstacleStartSpeed * -3);

                this.activeObstacles.add(obstacle);
                
                activeY[currentY] = currentY;
            }
        }
    }    

    update(){
        //parallax ooooh
        this.background.tilePositionX += 33;
        //console.log(activeY);
        //movement y
        if(cursors.up.isDown){
            this.player.body.setAccelerationY(-this.ACCELERATIONY);
        }
        else if(cursors.down.isDown){
            this.player.body.setAccelerationY(this.ACCELERATIONY);
        }
        else{
            this.player.body.setAccelerationY(0);
        }
        //movement x
        if(cursors.right.isDown){
            this.player.body.setAccelerationX(this.ACCELERATIONX);
        }
        else if(cursors.left.isDown){
            this.player.body.setAccelerationX(-this.ACCELERATIONX);
        }
        else{
            this.player.body.setAccelerationX(0);
        }

        //throwing different potions
        if(!this.isThrowing){
            if(Phaser.Input.Keyboard.JustDown(keyQ)){
                this.throwPotion();
            }
            else if(Phaser.Input.Keyboard.JustDown(keyW)){
                this.throwPotion();
            }
            else if(Phaser.Input.Keyboard.JustDown(keyE)){
                this.throwPotion();
            }
        }
        else{
            if(this.potion.x >= game.config.width){
                this.resetPotion();
            }
            this.potion.body.setVelocityX(1200);
        }

        // Obstacles
        this.activeObstacles.getChildren().forEach(function(obstacle) {
            // // Destroy obstacles if player presses a key
            // // Fire
            // if(this.activeObstacles.getLength() > 0 && Phaser.Input.Keyboard.JustDown(keyQ) && gameOptions.element == 1) {
            //     delete activeY[obstacle.y];
            //     this.activeObstacles.killAndHide(obstacle);
            //     this.activeObstacles.remove(obstacle);
            //     this.destroyPrompt();
            // }
            // // Grass
            // if(this.activeObstacles.getLength() > 0 && Phaser.Input.Keyboard.JustDown(keyW) && gameOptions.element == 2) {
            //     delete activeY[obstacle.y];
            //     this.activeObstacles.killAndHide(obstacle);
            //     this.activeObstacles.remove(obstacle);
            //     this.destroyPrompt();
            // }
            // // Water
            // if(this.activeObstacles.getLength() > 0 && Phaser.Input.Keyboard.JustDown(keyE) && gameOptions.element == 3) {
            //     delete activeY[obstacle.y];
            //     this.activeObstacles.killAndHide(obstacle);
            //     this.activeObstacles.remove(obstacle);
            //     this.destroyPrompt();
            // }

            // Destroy obstacles if they go past the screen
            if(obstacle.x < 0) {
                delete activeY[obstacle.y];
                this.activeObstacles.killAndHide(obstacle);
                this.activeObstacles.remove(obstacle);
                this.destroyPrompt();
            }
        }, this);


        // add new obstacles
        if(this.activeObstacles.getLength() < 2) {
            let value = Phaser.Math.Between(1, 3);
            gameOptions.element = value;
            if(value == 1) {
                this.addObstacle(game.config.width, 'fire');
                //setTimeout(() => { this.showPrompt()}, 500);
            }
            if(value == 2) {
                this.addObstacle(game.config.width, 'grass');
                //setTimeout(() => { this.showPrompt()}, 500);
            }
            if(value == 3) {
                this.addObstacle(game.config.width, 'water');
                //setTimeout(() => { this.showPrompt()}, 500);
            }
        } 
        
    }

    throwPotion(){
        //particle effects
        this.woosh = this.add.particles('spark').createEmitter({
            speed: 100,
            gravity: { x: 0, y: 200 },
            scale: { start: 0.1, end: 1 },
            follow: this.potion
        });
        //change type DO LATER

        this.isThrowing = true;
        this.potion.visible = true;
        this.potion.alpha = 100;
        this.potion.x = this.player.x;
        this.potion.y = this.player.y;
    }

    resetPotion(){
        this.woosh.stop();
        this.isThrowing = false;
        this.potion.visible = false;
        this.potion.setVelocityX(0);
        this.potion.setAccelerationX(0);
        this.potion.x = -500;
        this.potion.y = -500;
    }

    showPrompt() {
        let value = gameOptions.element;
        if(value == 1) {
            this.firePrompt.setVisible(true);
        }
        if(value == 2) {
            this.grassPrompt.setVisible(true);
        }
        if(value == 3) {
            this.waterPrompt.setVisible(true);
        }
    }

    destroyPrompt() {
        if(gameOptions.element == 1) {
            this.firePrompt.setVisible(false);
        }
        if(gameOptions.element == 2) {
            this.grassPrompt.setVisible(false);
        }
        if(gameOptions.element == 3) {
            this.waterPrompt.setVisible(false);
        }
    }
}