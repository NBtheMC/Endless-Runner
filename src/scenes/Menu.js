class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){

    }

    create(){
        console.log("menu");
    }

    update(){
        //immediately start play
        this.scene.start("playScene");
    }
}