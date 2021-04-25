class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', 'assets/wizard.png');
    }

    create(){
        console.log("play");
        //affects slide
        this.ACCELERATION = 500;
        this.DRAG = 300;
        // set bg color
        this.cameras.main.setBackgroundColor('#228b22');

        this.player = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'player').setScale(.5);
        this.alien.setCollideWorldBounds(true);
    }

    update(){
        
    }
}