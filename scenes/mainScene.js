import {Player} from '../assets/classes/player.js'
import {Enemy} from '../assets/classes/enemy.js'
import {Platform} from '../assets/classes/platform.js'
import {Cube} from '../assets/classes/cube.js'


export default class mainScene extends Phaser.Scene{
    constructor(){
        super('mainScene')

        this.platforms;
        this.player;
        this.enemies;
        this.cursor;
        this.cubes;
        this.dialog;

        this.gameover;
        this.stopgame;

        this.score;
        this.scoreboard;
        this.lives;

        this.gamemusic;
    }

    preload(){
        this.load.audio('musicG', '../assets/music/AmbientSpaceGame.mp3');

        this.load.image('bgGame', '../assets/background/bgGame.png')

        this.load.image('platform', '../assets/platforms/platform.png')
        this.load.image('cube', '../assets/platforms/cube.png')
        this.load.image('cubeR', '../assets/platforms/cubeR.png')

        this.load.image('GameOver', '../assets/buttons/GameOver.png')

        this.load.spritesheet('enemy', '../assets/player/enemy.png', {
            frameWidth: 32, 
            frameHeight: 25
        })

        this.load.spritesheet('playerJR', '../assets/player/LOXjmpR.png', {
            frameWidth: 120, 
            frameHeight: 188
        })
        this.load.spritesheet('playerJL', '../assets/player/LOXjmpL.png', {
            frameWidth: 120, 
            frameHeight: 188
        })

        this.load.spritesheet('btnMusicOn', '../assets/buttons/btnMusicOn.png', {
            frameWidth: 101, 
            frameHeight: 100,
        });
        this.load.spritesheet('btnMusicOff', '../assets/buttons/btnMusicOff.png', {
            frameWidth: 101, 
            frameHeight: 100,
        });

        this.load.spritesheet('btnPauseOn', '../assets/buttons/btnPauseOn.png', {
            frameWidth: 101, 
            frameHeight: 100,
        })
        this.load.spritesheet('btnPauseOff', '../assets/buttons/btnPauseOff.png', {
            frameWidth: 101, 
            frameHeight: 100,
        })

        this.load.spritesheet('btnGo', '../assets/buttons/btnGo.png', {
            frameWidth: 101, 
            frameHeight: 100,
        })
    }

    create(){
        this.add.image(325, 325, 'bgGame')

        this.stopgame = false;
        this.score = 0;

        this.makeMapVisual();

        this.player = new Player(this, 325, 100, "playerJR");

        this.platforms = this.physics.add.staticGroup();
        this.makeMapReal();    

        this.physics.add.collider(this.player, this.platforms);

        this.Musicbutton = this.add.sprite(50, 50, 'btnMusicOn');
        this.Musicbutton.setScale(0.5);
        this.Musicbutton.setInteractive({useHandCursor: true});
        this.Musicbutton.on('pointerdown', () => this.OnOffMusic())

        this.Pausebutton = this.add.sprite(600, 50, 'btnPauseOn');
        this.Pausebutton.setScale(0.5);
        this.Pausebutton.setInteractive({useHandCursor: true});
        this.Pausebutton.on('pointerdown', () => this.isPause())

        this.gamemusic = this.sound.add('musicG');
        this.gamemusic.play();
        
        this.cursor = this.input.keyboard.createCursorKeys()
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.w = this.input.keyboard.addKey('W')
        this.s = this.input.keyboard.addKey('S')
        this.a = this.input.keyboard.addKey('A')
        this.d = this.input.keyboard.addKey('D')

        this.textScore();

        this.startTimer();
        this.physics.add.collider(this.enemies, this.platforms)
    }

    update(){
        this.movePlayerManager();

        this.livestext();
        this.updateScore();

        for (var i = 0; i < this.enemies.getChildren().length; i++){
            var enem = this.enemies.getChildren()[i];
            if ((enem.i == this.player.i) && (enem.j == this.player.j)){
                this.player.killed();
                this.timer.remove();
                this.timerjmp.remove();
                this.enemies.clear();
                this.startTimer();
                this.physics.add.collider(this.enemies, this.platforms)
                break;
            }
        }

        if (this.player.dead){
            this.physics.world.colliders.destroy();

            this.gameOver();
        }
        this.player.update();
    }

    makeMapVisual(){
        this.cubes = [
            [new Cube(this, 325, 200, 'cube')],
            [new Cube(this, 295, 245, 'cube'), new Cube(this, 355, 245, 'cube')],
            [new Cube(this, 265, 290, 'cube'), new Cube(this, 325, 290, 'cube'), new Cube(this, 385, 290, 'cube')],
            [new Cube(this, 235, 335, 'cube'), new Cube(this, 295, 335, 'cube'), new Cube(this, 355, 335, 'cube'), new Cube(this, 415, 335, 'cube')],
            [new Cube(this, 205, 380, 'cube'), new Cube(this, 265, 380, 'cube'), new Cube(this, 325, 380, 'cube'), new Cube(this, 385, 380, 'cube'), new Cube(this, 445, 380, 'cube')],
            [new Cube(this, 175, 425, 'cube'), new Cube(this, 235, 425, 'cube'), new Cube(this, 295, 425, 'cube'), new Cube(this, 355, 425, 'cube'), new Cube(this, 415, 425, 'cube'), new Cube(this, 475, 425, 'cube')],
            [new Cube(this, 145, 470, 'cube'), new Cube(this, 205, 470, 'cube'), new Cube(this, 265, 470, 'cube'), new Cube(this, 325, 470, 'cube'), new Cube(this, 385, 470, 'cube'), new Cube(this, 445, 470, 'cube'), new Cube(this, 505, 470, 'cube')]
        ]
    }

    makeMapReal(){
        var platform;
        var x = 325, y = 185;
        var numb = 0;
        for(var i = 1; i <= 7; i++){
            for (var j = 0; j < i; j++){
                platform = new Platform(this, x, y, 'platform', numb);
                this.platforms.add(platform);
                numb += 1;
                if (i % 2 == 0){
                    x = x - 60;
                }
                else{
                    x = x + 60;
                }
            }
            if (i % 2 == 0){
                x = x + 30;
            }
            else{
                x = x - 30;
            }
            y = y + 45;
        }
    }

    startTimer(){
        this.enemies = this.physics.add.group();
        this.timer = this.time.addEvent({
            delay: 5000,
            callback: function() {
                var enemy = new Enemy(this, 325, 100, "enemy");
                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true
        });

        this.timerjmp = this.time.addEvent({
            delay: 1500,
            callback: function() {
                for (var i = 0; i < this.enemies.getChildren().length; i++){
                    var enem = this.enemies.getChildren()[i];
                    enem.move();
                    enem.update();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    movePlayerManager(){
        if(!this.stopgame){
            var live = this.player.lives;
            if ((this.cursor.left.isDown && Phaser.Input.Keyboard.JustDown(this.down))){
                this.player.moveLD();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
                }
            else if ((this.cursor.right.isDown && Phaser.Input.Keyboard.JustDown(this.down))){
                this.player.moveRD();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }
            else if ((this.cursor.left.isDown && Phaser.Input.Keyboard.JustDown(this.up))){
                this.player.moveLU();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }
            else if ((this.cursor.right.isDown && Phaser.Input.Keyboard.JustDown(this.up))){
                this.player.moveRU();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }    
            else if ((this.a.isDown && Phaser.Input.Keyboard.JustDown(this.s))){
                this.player.moveLD();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }
            else if ((this.d.isDown && Phaser.Input.Keyboard.JustDown(this.s))){
                this.player.moveRD();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }
            else if ((this.a.isDown && Phaser.Input.Keyboard.JustDown(this.w))){
                this.player.moveLU();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }
            else if ((this.d.isDown && Phaser.Input.Keyboard.JustDown(this.w))){
                this.player.moveRU();
                this.newColor();
                if (live > this.player.lives){
                    this.forkill();
                }
                this.isThatAll();
            }
        }
    }

    forkill(){
        this.timer.remove();
        this.timerjmp.remove();
        this.enemies.clear();
        this.startTimer();
        this.physics.add.collider(this.enemies, this.platforms)
    }

    newColor(){
        this.cubes[this.player.i][this.player.j].changeColor();
        if (this.cubes[this.player.i][this.player.j].color == "cubeR"){
            this.score += 25;
        }
        else{
            this.score -= 25;
        }
    }

    livestext(){
        this.add.text(100, 30, 'Health: ' + this.player.lives, {
			fontFamily: 'Comic Neue',
			fontSize: '25px',
			color: '#F5DFFC',
			stroke: '#140423',
			strokeThickness: 9,
			shadow: { stroke: false, blur: 0, offsetX: 0, offsetY: 0 },
			padding: { left: 0 }
		})
    }

    textScore(){        
        this.scoreboard = this.add.text(250, 30, 'Score: 0', {
			fontFamily: 'Comic Neue',
			fontSize: '25px',
			color: '#F5DFFC',
			stroke: '#140423',
			strokeThickness: 9,
			shadow: { stroke: false, blur: 0, offsetX: 0, offsetY: 0 },
			padding: { left: 0 }
		})
    }

    updateScore(){
        this.scoreboard.setText('Score: ' + this.score);
    }

    isThatAll(){
        var f = true;
        for(var i = 0; i < 7; i++){
            for (var j = 0; j < i + 1; j++){
                if (!this.cubes[i][j].isRed()){
                    f = false;
                }
            }
        }

        if(f){
            this.stopgame = true;
            this.timer.paused = true;
            this.timerjmp.paused = true;
            
            this.Gobutton = this.add.sprite(325, 325, 'btnGo');
            this.anims.create({
                key: "forGo",
                frames: this.anims.generateFrameNumbers("btnGo"),
                framerate: 20,
                repeat: -1,
            });
            this.Gobutton.play("forGo");
            this.Gobutton.setInteractive({useHandCursor: true});
            this.Gobutton.on('pointerdown', () => this.clickbutton())
        }
    }

    gameOver(){
        this.stopgame = true;
        this.timer.paused = true;
        this.timerjmp.paused = true;

        this.gameover = this.add.sprite(325, 325, 'GameOver');
        this.gameover.setScale(0.2);
        this.gameover.setInteractive({useHandCursor: true});
        this.gameover.on('pointerdown', () => this.clickbutton());
    }

    clickbutton(){
        this.gamemusic.stop();
        this.scene.start("loadingScene");
    }

    OnOffMusic(){
        if(!this.gamemusic.isPlaying){
            this.Musicbutton.setTexture('btnMusicOn');
            this.gamemusic.play();
        }
        else{
            this.Musicbutton.setTexture('btnMusicOff');
            this.gamemusic.stop();
        }
    }

    isPause(){
        if(!this.stopgame){
            if (!this.timer.paused){
                this.Pausebutton.setTexture('btnPauseOff');
                this.timer.paused = true;
                this.timerjmp.paused = true;
            }
            else{
                this.Pausebutton.setTexture('btnPauseOn');
                this.timer.paused = false;
                this.timerjmp.paused = false;
            }
        }
    }
}