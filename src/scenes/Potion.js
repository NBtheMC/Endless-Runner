//this class is to test out throwing different objects
class Potion extends Phaser.Scene{
    constructor(){
        super("potionScene");
    }

    preload(){
        this.load.image('potion', 'assets/temppotion.png');
        this.load.image('player', 'assets/tempwizard.png');
    }

    create(){
        console.log("potion");
        //affects slide
        this.ACCELERATION = 10000;
        this.DRAG = 2000;
        this.MAXVELOCITYX = 400;
        this.MAXVELOCITYY = 900;
        // set bg color
        this.cameras.main.setBackgroundColor('#228b22');

        //player stuff
        this.player = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'player').setScale(.3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setMaxVelocity(this.MAXVELOCITYX,this.MAXVELOCITYY)
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
        cursors = this.input.keyboard.createCursorKeys();

        this.potion = this.physics.add.sprite(game.config.width/7, game.config.height/2, 'potion').setScale(.1);
        this.potion.visible = false;
        //throw buttons
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.isThrowing = false;
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
        }
        //throwing different potions
        if(!this.isThrowing){
            if(Phaser.Input.Keyboard.JustDown(keyQ)){
                this.isThrowing = true;
                this.potion.visible = true;
            }
            if(Phaser.Input.Keyboard.JustDown(keyW)){
                this.isThrowing = true;
                this.potion.visible = true;
            }
            if(Phaser.Input.Keyboard.JustDown(keyE)){
                this.isThrowing = true;
                this.potion.visible = true;
            }
        }
        else{
            this.potion.body.setVelocityX(2000);
        }
    }
}