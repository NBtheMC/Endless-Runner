/* Header
Collaborator Names: 
    Emil Saechao, Miriam Perez, Naman Bhushan, and Paul Lee.
Game Title: 
    Nell's Wizard Adventure
Date Completed: 
    May 3rd, 2021
Creative Tilt Justification:
    For our technical side, we're particularly proud of our implementation of particles and transitions.
    Naman...
    Paul tested out different object velocities & timings to make the transitions cohesive and as seamless as possible. 
    This was done with addEvents with delays to patch bugs that occurred when dying in the middle of a transition with setTimeout().

    For our art side, we're particularly proud of our original music and art.
    Miriam...
    Emil...
*/

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
    scene: [Menu, Play, Tutorial, Credits]
}

let gameOptions = {
    obstacleStartSpeed: 350,
    spawnRange: [100, 350],
    obstacleSizeRange: [50, 250],
}

let game = new Phaser.Game(config);

//globals
let cursors; //movement keys
let keySpace; //select key
let keyQ, keyW, keyE, keyLeft, keyRight; //prompt keys
let timer, bonus, timerText, deltaMultiplier;
let score = 0;
let highscore = 0;
let environment1, environment2, destroyTransition1, destroyTransition2, transition1, transition2;

// Group of y-axes being used for obstacle spawning.
let activeY = {};

