class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Player Asset
        //this.load.image('player', 'assets/tempwizard.png');
        this.load.atlas('player', 'assets/playerSpritesheet.png','assets/playerSprites.json');
        // Obstacle Assets
        this.load.image('fire', 'assets/obstacleFire.png');
        this.load.image('water', 'assets/obstacleWater.png');
        this.load.image('grass', 'assets/obstacleGrass.png');
        // Potion Assets
        this.load.image('firePotion', 'assets/firePotion.png');
        this.load.image('waterPotion', 'assets/waterPotion.png');
        this.load.image('grassPotion', 'assets/grassPotion.png');
        this.load.image('fireSpark', 'assets/fireSpark.png');
        this.load.image('waterSpark', 'assets/waterSpark.png');
        this.load.image('grassSpark', 'assets/grassSpark.png');
        this.load.image('smoke', 'assets/smokeParticle.png');
        // Card Assets
        this.load.image('fireCard', 'assets/wizard_cards_fire3.png');
        this.load.image('waterCard', 'assets/wizard_cards_water3.png');
        this.load.image('grassCard', 'assets/wizard_cards_grass3.png');
        // Icon Assets
        this.load.image('fireIcon', 'assets/wizard_warn_fire1.png');
        this.load.image('waterIcon', 'assets/wizard_warn_water1.png');
        this.load.image('grassIcon', 'assets/wizard_warn_grass1.png');

        //TRANSITION STUFF
        // Actual transition assets
        this.load.image('sun', 'assets/transition/sun.png');
        this.load.image('moon', 'assets/transition/moon.png');
        this.load.image('sky1', 'assets/transition/sky1.png');
        this.load.image('sky2', 'assets/transition/sky2.png');
        this.load.image('transitionTree', 'assets/transition/treeTest.png');
        // Level 1
        this.load.image('lvl1_base', 'assets/level1/lvl1_base.png');
        this.load.image('lvl1_backtrees', 'assets/level1/lvl1_backtrees.png');
        this.load.image('lvl1_midtrees', 'assets/level1/lvl1_midtrees.png');
        this.load.image('lvl1_foretrees', 'assets/level1/lvl1_foretrees.png');
        this.load.image('lvl1_ground', 'assets/level1/lvl1_ground.png');
        this.load.image('lvl1_foregrass', 'assets/level1/lvl1_foregrass.png');
        // Level 2
        this.load.image('lvl2_base', 'assets/level2/lvl2_base.png');
        this.load.image('lvl2_backtrees', 'assets/level2/lvl2_backtrees.png');
        this.load.image('lvl2_midtrees', 'assets/level2/lvl2_midtrees.png');
        this.load.image('lvl2_foretrees', 'assets/level2/lvl2_foretrees.png');
        this.load.image('lvl2_ground', 'assets/level2/lvl2_ground.png');
        this.load.image('lvl2_foregrass', 'assets/level2/lvl2_foregrass.png');
        // Level 3
        this.load.image('lvl3_base', 'assets/level3/lvl3_base.png');
        this.load.image('lvl3_backtrees', 'assets/level3/lvl3_backtrees.png');
        this.load.image('lvl3_midtrees', 'assets/level3/lvl3_midtrees.png');
        this.load.image('lvl3_foretrees', 'assets/level3/lvl3_foretrees.png');
        this.load.image('lvl3_ground', 'assets/level3/lvl3_ground.png');
        this.load.image('lvl3_foregrass', 'assets/level3/lvl3_foregrass.png');

        //SOUND
        this.load.audio('on_death', 'assets/onDeath.wav');
        this.load.audio('potion_destroy', 'assets/potionDestroy.wav');
        this.load.audio('obstacle_destroy', 'assets/obstacleDestroy.wav');
        this.load.audio('on_shoot', 'assets/shoot.wav');
    }

    create(){
        // Record the start time
        this.start = this.getTime();
        // Initalize points for destroying objects
        bonus = 0;

        // Timer for transition
        this.transitionTimer = 1000;

        // Invisible wall at top
        this.topBarrier = this.physics.add.sprite(game.config.width/2, 0, 1800,game.config.height/3);
        this.topBarrier.body.setSize(game.config.width, game.config.height/3);
        this.topBarrier.setImmovable(true);

        // Transition level 1
        this.base = this.add.tileSprite(0,0,1800,720,'lvl1_base').setOrigin(0,0);
        this.backtrees = this.add.tileSprite(0,0,1800,720,'lvl1_backtrees').setOrigin(0,0);
        this.midtrees = this.add.tileSprite(0,0,1800,720,'lvl1_midtrees').setOrigin(0,0);
        this.foretrees = this.add.tileSprite(0,0,1800,720,'lvl1_foretrees').setOrigin(0,0);
        this.ground = this.add.tileSprite(0,0,1800,720,'lvl1_ground').setOrigin(0,0);
        activeY = {};

        // affects slide
        this.ACCELERATIONX = 4000;
        this.ACCELERATIONY = 4000;
        this.DRAG = 2500;
        this.MAXVELOCITYX = 400;
        this.MAXVELOCITYY = 800;

        // Element options for Obstacles and Potions
        this.elements = {
            NONE: 0,
            FIRE: 1,
            WATER: 2,
            GRASS: 3
        }

        // Player stuff
        this.player = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'player').setScale(.3);
        let frameNames = this.textures.get('player').getFrameNames();
        this.anims.create({
            key: 'noPotion',
            frames: [{
                key: 'player',
                frame: 'noPotionFrame1'
            },{
                key: 'player',
                frame: 'noPotionFrame2'
            },{
                key: 'player',
                frame: 'noPotionFrame3'
            },{
                key: 'player',
                frame: 'noPotionFrame4'
            },{
                key: 'player',
                frame: 'noPotionFrame5'
            }],
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'potion',
            frames: [{
                key: 'player',
                frame: 'potionFrame1'
            },{
                key: 'player',
                frame: 'potionFrame2'
            },{
                key: 'player',
                frame: 'potionFrame3'
            },{
                key: 'player',
                frame: 'potionFrame4'
            },{
                key: 'player',
                frame: 'potionFrame5'
            }],
            frameRate: 8,
            repeat: -1
        });
        this.player.play('noPotion');

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
        //scales linear with time
        this.speedMultiplier = 1;

        // Potion stuff
        // Set prompt inputs
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        // Cards
        const cardScale = .3;
        this.globalCardScale = cardScale;
        this.fireCard = this.add.sprite(2 * game.config.width/3, 100,'fireCard').setScale(cardScale);
        this.waterCard = this.add.sprite(game.config.width/3, 100,'waterCard').setScale(cardScale);
        this.grassCard = this.add.sprite(game.config.width/2, 100,'grassCard').setScale(cardScale);

        // Element Icons ***Will combine with obstacle sprite***
        // this.fireIcon = this.add.sprite('fireIcon');
        // this.waterIcon = this.add.sprite('waterIcon');
        // this.grassIcon = this.add.sprite('grassIcon');

        // Set the potion
        const potionScale = .3;
        this.globalPotionScale = potionScale;
        this.potion = this.physics.add.sprite(0, 0, 'firePotion').setScale(potionScale);
        this.potion.visible = false;
        this.isThrowing = false;
        this.potion.element = this.elements.NONE;
        
        //sounds
        this.death = this.sound.add('on_death');
        this.wrong = this.sound.add('potion_destroy');
        this.right = this.sound.add('obstacle_destroy');
        this.shoot = this.sound.add('on_shoot');

        // Potion collides with obstacle (get rid of obstacle and reset potion)
        // p = potion, o = obstacle
        this.physics.add.collider(this.potion, this.activeObstacles, function(p,o) {
            // Velocity & Acceleration of Potion
            this.potion.setVelocityX(0);
            this.potion.setAccelerationX(0);
            // Velocity & Acceleration of Obstacle Hit
            o.setVelocityX(gameOptions.obstacleStartSpeed * -3);
            o.setAccelerationX(0);
            // If potion element matches the obstacle element
            if(p.element == o.element){
                this.right.play();
                let currentY = o.y;
                this.activeObstacles.remove(o);
                o.destroy();
                delete activeY[currentY];
                this.isThrowing = false;
                //this.resetPotion();
                //destroy potion tween
                this.add.tween({
                    targets: p,
                    duration: 300,
                    ease: 'linear',
                    alpha: 0,
                    scaleX: potionScale*1.1,
                    scaleY: potionScale*1.1,
                    onComplete: function() {
                        this.resetPotion();
                        this.bonusAdd(1);
                    },
                    onCompleteScope: this,
                });
            }
            else{
                this.wrong.play();
                this.boom = this.add.particles('smoke').createEmitter({
                    speed: 100,
                    gravity: { x: 0, y: -200 },
                    scale: { start: 0.1, end: .5 },
                    x: p.x,
                    y: p.y,
                    lifespan: 500
                });
                this.resetPotion();
            }
        }, null, this);

        // Player collides with obstacle (game over)
        this.physics.add.collider(this.player, this.activeObstacles, null, function() {
            this.death.play();
            // INCLUDE DEATH ANIMATION HERE
            // INCLUDE WAY TO SHOW HIGH SCORE
            this.scene.start('menuScene');
            transition1.remove(false);
            transition2.remove(false);
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

        // Perform transition some time after the game starts

        transition1 = this.time.addEvent({ 
            delay: this.transitionTimer, 
            callback: this.transition, 
            args: [1], 
            callbackScope: this
        });

        transition2 = this.time.addEvent({ 
            delay: this.transitionTimer + 20000, 
            callback: this.transition, 
            args: [2], 
            callbackScope: this
        });
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
            obstacle.depth = 3;
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
                obstacle.setScale(.4);
                obstacle.setVelocityX(gameOptions.obstacleStartSpeed * -3 * this.speedMultiplier);
                this.activeObstacles.add(obstacle);
                activeY[currentY] = currentY;
            }
        }
    }    

    update(time, delta){
        this.speedMultiplier *= 1.0001;
        deltaMultiplier = (delta/16.66667);
        // Score stuff:
        // Updates timer
        timer = this.getTime() - this.start;
        // Sets score to timer + bonus amount
        score = timer + bonus;
        // Updates score text to reflect current score
        timerText.setText(score);
        
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
                //set cards to inactive
                this.fireCard.setAlpha(.5);
                this.waterCard.setAlpha(.5);
                this.grassCard.setAlpha(.5);
                this.throwPotion(this.elements.FIRE);
            }
            else if(Phaser.Input.Keyboard.JustDown(keyW)){
                this.fireCard.setAlpha(.5);
                this.waterCard.setAlpha(.5);
                this.grassCard.setAlpha(.5);
                this.throwPotion(this.elements.WATER);
            }
            else if(Phaser.Input.Keyboard.JustDown(keyE)){
                this.fireCard.setAlpha(.5);
                this.waterCard.setAlpha(.5);
                this.grassCard.setAlpha(.5);
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
            }
            if(value == 2) {
                this.addObstacle(game.config.width, 'grass');
            }
            if(value == 3) {
                this.addObstacle(game.config.width, 'water');
            }
        }

        // Transition Level 1 Movement
        this.backtrees.tilePositionX += 0.5;
        this.midtrees.tilePositionX += 2;
        this.foretrees.tilePositionX += 7.5;
        this.ground.tilePositionX += 8;
    }

    // EXTERNAL FUNCTIONS
    throwPotion(newElement){
        // Change type
        switch(newElement){
            case this.elements.FIRE:
                // Particle effects
                this.woosh = this.add.particles('waterSpark').createEmitter({
                    speed: 100,
                    gravity: { x: 0, y: 200 },
                    scale: { start: 0.1, end: .5 },
                    follow: this.potion
                });
                this.potion.setTexture('waterPotion');
                break;
            case this.elements.WATER:
                this.woosh = this.add.particles('grassSpark').createEmitter({
                    speed: 100,
                    gravity: { x: 0, y: 200 },
                    scale: { start: 0.1, end: .5 },
                    follow: this.potion
                });
                this.potion.setTexture('grassPotion');
                break;
            case this.elements.GRASS:
                this.woosh = this.add.particles('fireSpark').createEmitter({
                    speed: 100,
                    gravity: { x: 0, y: 200 },
                    scale: { start: 0.1, end: .5 },
                    follow: this.potion
                });
                this.potion.setTexture('firePotion');
                break;
        }
        this.potion.element = newElement;
        this.isThrowing = true;
        this.potion.visible = true;
        this.potion.alpha = 100;
        this.potion.x = this.player.x;
        this.potion.y = this.player.y;
        this.shoot.play();
        this.player.play('noPotion');
    }

    resetPotion(){
        this.woosh.stop();
        //maybe tweens here
        this.fireCard.setAlpha(1);
        this.fireCard.setScale(this.globalCardScale);
        this.waterCard.setAlpha(1);
        this.waterCard.setScale(this.globalCardScale);
        this.grassCard.setAlpha(1);
        this.grassCard.setScale(this.globalCardScale);
        this.isThrowing = false;
        this.potion.visible = false;
        this.potion.setVelocityX(0);
        this.potion.setAccelerationX(0);
        this.potion.scaleX = this.globalPotionScale;
        this.potion.scaleY = this.globalPotionScale;
        this.potion.x = -500;
        this.potion.y = -500;
        this.player.play('potion');
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

    // TRANSITION
    transition(flag) {
        if (flag == 1) {
            activeY = [200, 400, 600];
            environment1 = this.time.addEvent({ delay: 3500, callback: this.changeEnvironment, args: [1], callbackScope: this});

            this.sky1 = this.physics.add.sprite(game.config.width, 0,'sky1').setOrigin(0,0);
            this.sun = this.physics.add.sprite(game.config.width, 0,'sun').setOrigin(0.25,0.5);
            this.transitionTree1 = this.physics.add.sprite(game.config.width, 0,'transitionTree').setOrigin(0,0).setScale(1);
            this.sky1.depth = 2;
            this.sun.depth = 2;
            this.transitionTree1.depth = 2;

            this.transitionTree1.body.setVelocityX(-600);
            this.sun.body.setVelocityX(-350);
            this.sun.body.setVelocityY(100);
            this.sky1.body.setVelocityX(-600);

            this.player.depth = 1;

            destroyTransition1 = this.time.addEvent({ delay: 8000, callback: this.destroyTransition, args: [1], callbackScope: this});
        }
        if (flag == 2) {
            activeY = [200, 400, 600];
            environment2 = this.time.addEvent({ delay: 3500, callback: this.changeEnvironment, args: [2], callbackScope: this});

            this.sky2 = this.physics.add.sprite(game.config.width, 0,'sky2').setOrigin(0,0);
            this.moon = this.physics.add.sprite(game.config.width, 0,'moon').setOrigin(0.25,-0.5);
            this.transitionTree1 = this.physics.add.sprite(game.config.width, 0,'transitionTree').setOrigin(0,0);
            this.sky2.depth = 2;
            this.moon.depth = 2;
            this.transitionTree1.depth = 2;

            this.transitionTree1.body.setVelocityX(-600);
            this.moon.body.setVelocityX(-350);
            this.moon.body.setVelocityY(-150);
            this.sky2.body.setVelocityX(-600);

            this.player.depth = 1;

            destroyTransition2 = this.time.addEvent({ delay: 8000, callback: this.destroyTransition, args: [2], callbackScope: this});
        }
    }

    changeEnvironment(flag) {
        if (flag == 1) {
            this.base.setTexture('lvl2_base');
            this.backtrees.setTexture('lvl2_backtrees');
            this.midtrees.setTexture('lvl2_midtrees');
            this.foretrees.setTexture('lvl2_foretrees');
            this.ground.setTexture('lvl2_ground');
        }
        if (flag == 2) {
            this.base.setTexture('lvl3_base');
            this.backtrees.setTexture('lvl3_backtrees');
            this.midtrees.setTexture('lvl3_midtrees');
            this.foretrees.setTexture('lvl3_foretrees');
            this.ground.setTexture('lvl3_ground');
        }
    }
    destroyTransition(flag) {
        if (flag == 1) {
            console.log("Transition 1 over")
            this.transitionTree1.destroy();
            this.sun.destroy();
            this.sky1.destroy();
            activeY = [];
        }
        if (flag == 2) {
            console.log("Transition 2 over")
            this.transitionTree1.destroy();
            this.moon.destroy();
            this.sky2.destroy();
            activeY = [];
        }
    }
}