export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.i = 0;
        this.j = 0;

        this.dead = false;

        this.scene = scene;
        this.scene.sys.updateList.add(this);
        this.scene.sys.displayList.add(this);
        this.scene.physics.world.enableBody(this);
        
        //this.setScale(0.3);
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
            key: "jamp",
            frames: this.anims.generateFrameNumbers("enemy"),
            framerate: 20,
            repeat: 1,
        })

        
    }
    update(){  
        if (this.dead){
            this.destroy();
        }
    }

    move(){
        if (!this.dead){
            var value = Phaser.Math.Between(0, 10);
            this.i += 1;
            if (value % 2 == 0){
                this.j += 1;
            }

            if(this.i < 7){
                this.x = this.coords[this.i][this.j][0];
                this.y = this.coords[this.i][this.j][1];

                this.play("jamp");
            }
            else{
                this.dead = true;
            }
        }
    }
}