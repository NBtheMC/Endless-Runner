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

        //player stuff
        this.player = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'player').setScale(.5);
        this.player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        //movement y
        if(cursors.up.isDown){
            this.player.body.setAccelerationY(-this.ACCELERATION);
        }
        else if(cursors.down.isDown){
            this.player.body.setAccelerationY(this.ACCELERATION);
        }
        else{
            this.player.body.setAccelerationY(0);
            this.player.body.setDragY(this.DRAG);
        }
        //movement x
        if(cursors.right.isDown){
            this.player.body.setAccelerationX(this.ACCELERATION);
        }
        else if(cursors.left.isDown){
            this.player.body.setAccelerationX(-this.ACCELERATION);
        }
        else{
            this.player.body.setAccelerationX(0);
            this.player.body.setDragX(this.DRAG);
        }
    }
}