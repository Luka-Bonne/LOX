export class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, numb){
        super(scene, x, y, texture);

        this.countNumber = numb;

        this.scene = scene;
        this.scene.sys.updateList.add(this);
        this.scene.sys.displayList.add(this);
    }
    update(){
    }
}