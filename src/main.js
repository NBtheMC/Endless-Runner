let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            // gravity: {
            //     x: 0,
            //     y: 0
            // }
        }
    },
    scene: [Menu, Play, Tutorial]
}

let gameOptions = {
    // From https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
    obstacleStartSpeed: 350,
    spawnRange: [100, 350],
    obstacleSizeRange: [50, 250],
    element: -1
}

let game = new Phaser.Game(config);

//globals

let cursors; //movement keys
let keySpace; //select key
let keyQ, keyW, keyE; //prompt keys

// Group of y-axes being used for obstacle spawning.
let activeY = {};

