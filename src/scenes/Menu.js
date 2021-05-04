class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('b1', "assets/backdrop/b1.png");
        this.load.image('b2', "assets/backdrop/b2.png");
        this.load.image('b3', "assets/backdrop/b3.png");
        this.load.image('b4', "assets/backdrop/b4.png");
        this.load.image('b5', "assets/backdrop/b5.png");
        this.load.image('b6', "assets/backdrop/b6.png");
        this.load.image('b7', "assets/backdrop/b7.png");
        this.load.image('b8', "assets/backdrop/b8.png");
        this.load.image('b9', "assets/backdrop/b9.png");

    }

    create() {
        //backdrop images on 1800x720 canvas
        // red flower
        this.c1 = this.add.tileSprite(250, 225, 720, 720, 'b1');
        // blue arms
        this.c2 = this.add.tileSprite(1550, 600, 720, 720, 'b2');
        // yellow
        this.c3 = this.add.tileSprite(675, 0, 720, 720, 'b3');
        // brown
        this.c4 = this.add.tileSprite(175, 600, 720, 720, 'b4');
        // green
        this.c5 = this.add.tileSprite(1100, 400, 720, 720, 'b5');
        // blue flower
        this.c6 = this.add.tileSprite(650, 525, 720, 720, 'b6');
        // red ring
        this.c7 = this.add.tileSprite(1175, -125, 720, 720, 'b7');
        // purple
        this.c8 = this.add.tileSprite(1675, 200, 720, 720, 'b8');
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '24px',
            backgroundColor: '#F3AC5E',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        let titleConfig = {
            fontFamily: 'Verdana',
            fontSize: '45px',
            color: 'white',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        let customHeight = 50;
        // Menu Text
        this.add.text(game.config.width/2, game.config.height/2 - customHeight*2, "Nell's Wizard Adventure!", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press Space to start!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + customHeight, 'Press <- for Credits and -> for Tutorial!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 2.5 * customHeight, 'Latest score: ' + score, menuConfig).setOrigin(0.5);
        highscore = Math.max(score, highscore);
        this.add.text(game.config.width/2, game.config.height/2 + 3.5 * customHeight, 'High score: ' + highscore, menuConfig).setOrigin(0.5);

        // Define Keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('playScene');    
        }
        if(Phaser.Input.Keyboard.JustDown(keyLeft)){
            this.scene.start('creditScene');    
        }
        if(Phaser.Input.Keyboard.JustDown(keyRight)){
            this.scene.start('tutorialScene');    
        }
        this.c1.angle -= 1;
        this.c2.angle -= 1;
        this.c3.angle += 0.5;
        this.c4.angle += 0.5;
        this.c5.angle += 0.5;
        this.c6.angle -= 0.75;
        this.c7.angle += 1;
        this.c8.angle += 0.5;
    }
}