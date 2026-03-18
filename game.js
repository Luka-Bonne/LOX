import mainScene from "./scenes/mainScene.js"
import loadingScene from "./scenes/loadingScene.js"


const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 650,
    backgroundColor: "#000",
    parent: 'game',
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 700},
            debug: false,
        }
    },
    scene: [loadingScene, mainScene]//
}

new Phaser.Game(config)