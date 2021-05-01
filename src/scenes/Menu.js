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

        // Menu Text
        this.add.text(game.config.width/2, game.config.height/2, "Bill Hader's Wizard Adventure!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'Use the arrow keys to dodge incoming obstacles', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'or press the prompt in time to destroy them and get more points', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 150, 'Press Space to start!', menuConfig).setOrigin(0.5);

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
    }
}