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
        // Record the start time
        this.start = this.getTime();
        // Initalize points for destroying objects
        bonus = 0;

        // Invisible wall at top
        this.topBarrier = this.physics.add.sprite(game.config.width/2, 0, 1800,game.config.height/3);
        this.topBarrier.body.setSize(game.config.width, game.config.height/3);
        //this.topBarrier.body.setSize(100,100);
        this.topBarrier.setImmovable(true);
        console.log("play");
        this.background = this.add.tileSprite(0,0,1800,720,'background').setOrigin(0,0);
        activeY = {};

        // affects slide
        this.ACCELERATIONX = 5000 * deltaMultiplier;
        this.ACCELERATIONY = 5000 * deltaMultiplier;
        this.DRAG = 2000 * deltaMultiplier;
        this.MAXVELOCITYX = 400 * deltaMultiplier;
        this.MAXVELOCITYY = 800 * deltaMultiplier;

        // Element options for Obstacles and Potions
        this.elements = {
            NONE: 0,
            FIRE: 1,
            WATER: 2,
            GRASS: 3
        }

        // Player stuff
        this.player = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'player').setScale(.3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setMaxVelocity(this.MAXVELOCITYX,this.MAXVELOCITYY)
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
        cursors = this.input.keyboard.createCursorKeys();
        // Collider between Player and Top Barrier
        this.physics.add.collider(this.player, this.topBarrier);

        // Obstacle stuff
        // Create group of active obstacles
        this.activeObstacles = this.add.group({
        });

        // Create group of inactive obstacles
        this.inactiveObstacles = this.add.group({
            removeCallback: function(obstacle){
                obstacle.scene.activeObstacles.add(obstacle)
            }
        }); 

        // Potion stuff
        // Set prompt inputs
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
       
        // Set the potion
        this.potion = this.physics.add.sprite(0, 0, 'potion').setScale(.1);
        this.potion.visible = false;
        this.isThrowing = false;
        this.potion.element = this.elements.NONE;

        // Potion collides with obstacle (get rid of obstacle and reset potion)
        // p = potion, o = obstacle
        this.physics.add.collider(this.potion, this.activeObstacles, function(p,o) {
            // Velocity & Acceleration of Potion
            this.potion.setVelocityX(0);
            this.potion.setAccelerationX(0);
            // Velocity & Acceleration of Obstacle Hit
            o.setVelocityX(gameOptions.obstacleStartSpeed * -3 * deltaMultiplier);
            o.setAccelerationX(0);
            // If potion element matches the obstacle element
            if(p.element == o.element){
                let currentY = o.y;
                this.isThrowing = false;
                //this.resetPotion();
                //destroy potion tween
                this.add.tween({
                    targets: [p, o],
                    duration: 50,
                    ease: 'linear',
                    alpha: 0,
                    //setScaleX: .2,
                    //setScaleY: .2,
                    onComplete: function() {
                        this.activeObstacles.remove(o);
                        o.destroy();
                        this.resetPotion();
                        delete activeY[currentY];
                        this.bonusAdd(1);
                    },
                    onCompleteScope: this,
                });
            }
            else{
                this.resetPotion();
            }
        }, null, this);

        // Player collides with obstacle (game over)
        this.physics.add.collider(this.player, this.activeObstacles, null, function() {
            // INCLUDE WAY TO SHOW HIGH SCORE
            this.scene.start('menuScene');
        }, this);

        // Score
        let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'left',
        }
        timerText = this.add.text(200, 100, score, scoreConfig).setOrigin(0.5).setVisible(true);
    }
    // Adds obstacle
    addObstacle(x, element){
        let obstacle;
        // If there are inactive obstacles, make them active
        if(this.inactiveObstacles.getLength()){
            obstacle = this.inactiveObstacles.getFirst();
            obstacle.x = x;
            obstacle.active = true;
            obstacle.visible = true;
            this.inactiveObstacles.remove(obstacle);
        } else {
            obstacle = this.physics.add.sprite(x * 1.5, game.config.height * .6, element)
            // Set element so potion can detect it
            switch(element){
                case 'fire':
                    obstacle.element = this.elements.FIRE;
                    break;
                case 'water':
                    obstacle.element = this.elements.WATER;
                    break;
                case 'grass':
                    obstacle.element = this.elements.GRASS;
                    break;
            }
            // Randomize y
            obstacle.y = 200 * Phaser.Math.Between(1, 3);
            let currentY = obstacle.y;
            if(!Object.values(activeY).includes(currentY)) {
                // Change size of temp assets
                if (gameOptions.element == 1 || gameOptions.element == 3) {
                    obstacle.setScale(.1); //sprites a bit too big
                } else {
                    obstacle.setScale(.2);
                }
                obstacle.setVelocityX(gameOptions.obstacleStartSpeed * -3 * deltaMultiplier);
                this.activeObstacles.add(obstacle);
                activeY[currentY] = currentY;
            }
        }
    }    

    update(time, delta){
        deltaMultiplier = (delta/16.66667);
        // Score stuff:
        // Updates timer
        timer = this.getTime() - this.start;
        // Sets score to timer + bonus amount
        score = timer + bonus;
        // Updates score text to reflect current score
        timerText.setText(score);

        //parallax ooooh
        this.background.tilePositionX += 33 * deltaMultiplier;
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

        // Throwing different potions
        if(!this.isThrowing){
            if(Phaser.Input.Keyboard.JustDown(keyQ)){
                this.throwPotion(this.elements.FIRE);
            }
            else if(Phaser.Input.Keyboard.JustDown(keyW)){
                this.throwPotion(this.elements.WATER);
            }
            else if(Phaser.Input.Keyboard.JustDown(keyE)){
                this.throwPotion(this.elements.GRASS);
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
            // Destroy obstacles if they go past the screen
            if(obstacle.x < 0) {
                delete activeY[obstacle.y];
                this.activeObstacles.killAndHide(obstacle);
                this.activeObstacles.remove(obstacle);
            }
        }, this);
        
        // Add new obstacles
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

    // EXTERNAL FUNCTIONS
    throwPotion(newElement){
        // Particle effects
        this.woosh = this.add.particles('spark').createEmitter({
            speed: 100,
            gravity: { x: 0, y: 200 },
            scale: { start: 0.1, end: 1 },
            follow: this.potion
        });
        // Change type
        this.potion.element = newElement;
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

    getTime() {
        // Used to keep track of score
        //make a new date object
        let d = new Date();
        //return the number of milliseconds since 1 January 1970 00:00:00.
        return d.getTime();
    }

    bonusAdd(x) {
        // Used to update bonus points for destroying obstacles
        // This will execute 7-8 times as of right now, so players will get
        // 7000-8000 bonus points for destroying an obstacle.
        if (x == 1) {
            bonus += 1000;
        }
    }
}