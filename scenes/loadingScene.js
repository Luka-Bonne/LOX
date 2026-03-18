export default class loadingScene extends Phaser.Scene{
    constructor(){
        super('loadingScene');

        this.Startbutton;
        this.ADbutton;
        this.SWbutton;

        this.loadmusic;
    }

    preload(){
        this.load.audio('musicL', '../assets/music/AmbientSpaceLoading.mp3');

        this.load.image('bgStart', '../assets/background/bgStart.png');

        this.load.spritesheet('btnStart', '../assets/buttons/btnStart.png', {
            frameWidth: 128, 
            frameHeight: 37,
        });
        this.load.spritesheet('btnMusicOn', '../assets/buttons/btnMusicOn.png', {
            frameWidth: 101, 
            frameHeight: 100,
        });
        this.load.spritesheet('btnMusicOff', '../assets/buttons/btnMusicOff.png', {
            frameWidth: 101, 
            frameHeight: 100,
        });
        this.load.spritesheet('btnAD', '../assets/buttons/btnAD.png', {
            frameWidth: 50, 
            frameHeight: 45,
        });
        this.load.spritesheet('btnSW', '../assets/buttons/btnSW.png', {
            frameWidth: 50, 
            frameHeight: 45,
        });


        this.load.spritesheet('btnGo', '../assets/buttons/btnGo.png', {
            frameWidth: 101, 
            frameHeight: 100,
        });
    }

    create(){
        this.add.image(325, 325, 'bgStart');

        this.add.text(235, 175, "L*OX", {
            fontFamily: 'Comic Neue',
			fontSize: '70px',
			color: '#F10A26',
			fontStyle: 'normal',
			stroke: '#320808',
			strokeThickness: 5,
			shadow: { blur: 15 }
        });

        this.add.text(120, 410, 'Используйте сочетания клавиш:', {
			fontFamily: 'Comic Neue',
			fontSize: '30px',
			color: '#ECBFF7BF',
			fontStyle: 'normal',
			stroke: '#2A163C',
			strokeThickness: 5,
			shadow: { blur: 15 }
		});

        this.add.text(312, 470, '+', {
			fontFamily: 'Comic Neue',
			fontSize: '45px',
			color: '#C854EABF',
			fontStyle: 'normal',
			stroke: '#1E0B2D',
			strokeThickness: 5,
			shadow: { blur: 15 }
		});

        this.add.text(190, 525, 'аналогично для стрелок', {
			fontFamily: 'Comic Neue',
			fontSize: '25px',
			color: '#ECBFF7BF',
			fontStyle: 'normal',
			stroke: '#2A163C',
			strokeThickness: 5,
			shadow: { blur: 15 }
		});

        this.Startbutton = this.add.sprite(325, 325, 'btnStart');
        this.Startbutton.setScale(2);
        this.anims.create({
            key: "forStart",
            frames: this.anims.generateFrameNumbers("btnStart"),
            framerate: 20,
            repeat: -1,
        });
        this.Startbutton.play("forStart");
        this.Startbutton.setInteractive({useHandCursor: true});
        this.Startbutton.on('pointerdown', () => this.clickbutton());

        this.ADbutton = this.add.sprite(275, 500, 'btnAD');
        this.anims.create({
            key: "forAD",
            frames: this.anims.generateFrameNumbers("btnAD"),
            framerate: 20,
            repeat: -1,
        });
        this.ADbutton.play("forAD");

        this.SWbutton = this.add.sprite(375, 500, 'btnSW');
        this.anims.create({
            key: "forSW",
            frames: this.anims.generateFrameNumbers("btnSW"),
            framerate: 20,
            repeat: -1,
        });
        this.SWbutton.play("forSW");

        this.Musicbutton = this.add.sprite(50, 50, 'btnMusicOn');
        this.Musicbutton.setScale(0.5);
        this.Musicbutton.setInteractive({useHandCursor: true});
        this.Musicbutton.on('pointerdown', () => this.OnOffMusic());

        this.loadmusic = this.sound.add('musicL');
        this.loadmusic.play();
    }    
    
    update(){       
    }

    clickbutton(pointer, gameObject){
        this.loadmusic.stop();
        this.scene.start("mainScene");
    }

    OnOffMusic(){
        if(!this.loadmusic.isPlaying){
            this.Musicbutton.setTexture('btnMusicOn');
            this.loadmusic.play();
        }
        else{
            this.Musicbutton.setTexture('btnMusicOff');
            this.loadmusic.stop();
        }
    }
}