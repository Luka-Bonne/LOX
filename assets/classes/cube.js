export class Cube extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.color = "cube";

        this.scene = scene;
        this.scene.sys.updateList.add(this);
        this.scene.sys.displayList.add(this);
    }
    update(){
    }

    changeColor(){
        if (this.color == "cube"){
            this.setTexture("cubeR");
            this.color = "cubeR";
        }
        else{
            this.setTexture("cube");
            this.color = "cube";
        }
    }

    isRed(){
        if(this.color == "cubeR"){
            return true;
        }
        else{
            return false;
        }
    }
}