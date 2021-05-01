class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    preload(){
        
    }

    create(){
        console.log("tutorial");
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('playScene');    
        }
    }
}