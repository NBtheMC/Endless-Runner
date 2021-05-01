class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    preload(){
        
    }

    create(){
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
        let customHeight = 50;
        this.add.text(game.config.width/2, game.config.height/2 + -3 * customHeight, "Game by: ", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + -1 * customHeight, "Emil Saechao", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 0 * customHeight, "Miriam Perez", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 1 * customHeight, "Naman Bhushan", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 2 * customHeight, "Paul Lee", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 3 * customHeight, "Press Space to go to the Menu!", menuConfig).setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('menuScene');    
        }
    }
}