let config = { 
    type: Phaser.CANVAS, 
    width: 1334, 
    height: 750,
    scene: [Menu, Play],
    backgroundColor: 0x444444,
    // physics settings
    physics: {
        default: "arcade"
    }
}

let gameOptions = {
    // From https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
    obstacleStartSpeed: 350,
    spawnRange: [100, 350],
    obstacleSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2,
    element: -1
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySpace, keyR, keyG, keyB;