let config = {
    type: Phaser.CANVAS,
    width: 1800,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, Tutorial]
}

let game = new Phaser.Game(config);