/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMyFish = function(){

    PIXI.Container.call(this);

    var  circle = new  PIXI.Graphics();

    circle.beginFill(0x00FF00,1);
    circle.drawCircle(0,0,4);
    circle.endFill();

    circle.position.x =  AppInfo.WIDTH /2;
    circle.position.y =  AppInfo.HEIGHT/2;

    this.addChild(circle);
}

LayerMyFish.prototype = Object.create(PIXI.Container.prototype);
LayerMyFish.prototype.constructor = LayerMyFish;