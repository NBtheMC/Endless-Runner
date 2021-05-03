class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.image('tutorialImage', 'assets/tutorial.png');
    }

    create(){
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '24px',
            backgroundColor: '#F3AC5E',
            color: '#000000',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        this.image = this.add.image(900, 360, 'tutorialImage');
        let customHeight = 50;
        this.add.text(game.config.width/2 - 350, game.config.height/2 + 0 * customHeight, "Press Arrow keys\n to move around", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 550, game.config.height/2 + -1 * customHeight, "Throw Potions with\nQ, W, and E to\ndestroy obstacles!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 650, game.config.height/2 + 1 * customHeight, "Water Potion destroys Fire Obstacles\nGrass Potion destroys Water Obstacles\nFire Potion destroys Grass Obstacles", menuConfig).setOrigin(0.5);

        // Define Keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('menuScene');    
        }
    }
}