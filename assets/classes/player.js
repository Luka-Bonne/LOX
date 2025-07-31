export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.i = 0;
        this.j = 0;

        this.lives = 3;
        this.dead = false;

        this.scene = scene;
        this.scene.sys.updateList.add(this);
        this.scene.sys.displayList.add(this);
        this.scene.physics.world.enableBody(this);
        
        this.setScale(0.3);
        this.setBounce(0.2);

        this.coords = [
            [[325, 150]],
            [[295, 195], [355, 195]],
            [[265, 240], [325, 240], [385, 240]],
            [[235, 285], [295, 285], [355, 285], [415, 285]],
            [[205, 330], [265, 330], [325, 330], [385, 330], [445, 330]],
            [[175, 375], [235, 375], [295, 375], [355, 375], [415, 375], [475, 375]],
            [[145, 420], [205, 420], [265, 420], [325, 420], [385, 420], [445, 420], [505, 420]]
        ]

        this.scene.anims.create({
            key: "jampR",
            frames: this.anims.generateFrameNumbers("playerJR"),
            framerate: 20,
            repeat: 1,
        })

        this.scene.anims.create({
            key: "jampL",
            frames: this.anims.generateFrameNumbers("playerJL"),
            framerate: 20,
            repeat: 1,
        })

        
    }
    update(){  
        if (this.y > 650){
            this.destroy();
        }
    }

    killed(){
        if (this.lives != 0){
            this.lives -= 1;
        
            this.i = 0;
            this.j = 0;
        
            this.x = this.coords[this.i][this.j][0];
            this.y = this.coords[this.i][this.j][1];
        }
        else{
            if(!this.dead){
                this.dead = true;
            }
        }
    }

    moveRU(){
        if (this.i - 1 != -1){
            this.i -= 1;
            if (this.j <= this.i) {
                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];

                this.play("jampR");
            }
            else{
                if (this.lives != 0){
                    this.lives -= 1;
    
                    this.i = 0;
                    this.j = 0;
    
                    this.x = this.coords[this.i][this.j][0];
                    this.y = this.coords[this.i][this.j][1];
                }
                else{
                    if(!this.dead){
                        this.x -= 30;
                        this.y -= 45;
                        this.dead = true;
                    }
                }
            }
        }
        else{
            if (this.lives != 0){
                this.lives -= 1;

                this.i = 0;
                this.j = 0;

                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];
            }
            else{
                if(!this.dead){
                    this.x += 30;
                    this.y -= 45;
                    this.dead = true;
                }
            }
        }        
    }
    moveRD(){
        if (this.i + 1 != 7){
            this.i += 1;
            if (this.j + 1 != this.i + 1) {
                this.j += 1;

                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];

                this.play("jampR");
            }
            else{
                if (this.lives != 0){
                    this.lives -= 1;
    
                    this.i = 0;
                    this.j = 0;
    
                    this.x = this.coords[this.i][this.j][0];
                    this.y = this.coords[this.i][this.j][1];
                }
                else{
                    if(!this.dead){
                        this.x += 30;
                        this.y += 45;
                        this.dead = true;
                    }
                }
            }
        }
        else{
            if (this.lives != 0){
                this.lives -= 1;

                this.i = 0;
                this.j = 0;

                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];
            }
            else{
                if(!this.dead){
                    this.x += 30;
                    this.y += 45;
                    this.dead = true;
                }
            }
        }
    }
    moveLU(){
        if (this.i - 1 != -1) {
            this.i -= 1;
            if (this.j - 1 != -1){
                this.j -= 1;

                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];

                this.play("jampL");
            }
            else{
                if (this.lives != 0){
                    this.lives -= 1;
    
                    this.i = 0;
                    this.j = 0;
    
                    this.x = this.coords[this.i][this.j][0];
                    this.y = this.coords[this.i][this.j][1];
                }
                else{
                    if(!this.dead){
                        this.x -= 30;
                        this.y -= 45;
                        this.dead = true;
                    }
                }
            }
        }
        else{
            if (this.lives != 0){
                this.lives -= 1;

                this.i = 0;
                this.j = 0;

                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];
            }
            else{
                if(!this.dead){
                    this.x -= 30;
                    this.y -= 45;
                    this.dead = true;
                }
            }
        }
    }
    moveLD(){
        if (this.i + 1 != 7) {
            this.i += 1;

            this.x = this.coords[this.i][this.j][0];
            this.y = this.coords[this.i][this.j][1];

            this.play("jampL");
        }
        else{
            if (this.lives != 0){
                this.lives -= 1;

                this.i = 0;
                this.j = 0;

                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];
            }
            else{
                if(!this.dead){
                    this.x -= 30;
                    this.y += 45;
                    this.dead = true;
                }
            }
        }
    }
}