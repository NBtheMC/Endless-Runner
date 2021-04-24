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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "Naman's Wizard Adventure!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'Press Space to start!', menuConfig).setOrigin(0.5);

        // Define Keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');    
        }
    }
}