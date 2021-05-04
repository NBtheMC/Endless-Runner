class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
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
    }
}