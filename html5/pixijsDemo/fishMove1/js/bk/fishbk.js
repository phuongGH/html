/**
 * Created by phuongtv on 12/4/2015.
 */
//Fish = function(fishName, frameName){
function Fish(fishName, frameName , container){

    var fish,
        circle = new PIXI.Graphics(),
        layer = new PIXI.Container(),
        radius = 0;

    this.getRadius = getRadius;
    this.setPosition = setPosition;
    this.setRotation = setRotation;
    this.getFish = getFish;
    this.setScale = setScale;

    PIXI.loader.add('images/'+fishName+'.json').load(onAssetsLoaded);

    function onAssetsLoaded()
    {
        var frames = [];

        for (var i = 1; i < 10; i++) {

            frames.push(PIXI.Texture.fromFrame(frameName + i + '.png'));
        }

        fish = new PIXI.extras.MovieClip(frames);
        fish.anchor.set(0.5);
        fish.animationSpeed = 0.2;
        fish.play();

        circle.lineStyle(2, 0x0000FF, 1);
        circle.beginFill(0xFF700B,1);
        circle.drawCircle(0,0,fish.width/4);
        circle.endFill();

        layer.addChild(circle);
        layer.addChild(fish);

        radius = fish.width/4;
        //console.log("radius " + radius + "this" + layer.width/4);

        container.addChild(layer);
    }


   /* this.isInSize = isInSize;
    function isInSize(fish1)	{
        if(distance(this.x,this.y,fish1.x,fish1.y)<(radius-fish1.getRadius()))
        {
            return true;
        }
        return false;
    }

    function distance(x1,y1,x2,y2){
        return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    }
    */


    function getFish(){
        return layer;
    }

    function getRadius(){
        return radius;
    }

    function setPosition(loacaX,locaY)
    {
        layer.position.set(loacaX,locaY);
    }

    function setRotation(value)
    {
        layer.rotation = value;
    }

    function setScale(scaleX,scaleY)
    {
        layer.scale.x = scaleX;
        layer.scale.y = scaleY;
        radius = layer.width/4;
    }


    /*
    this.updateSize1 = updateSize1;
    function  updateSize1()
    {
        this.scale.x = value;
        this.scale.y = value;
        radius = this.width/2;
        console.log("radius " + radius);
        return;
    }*/



    /*this.getRadius = function()
    {
        return radius;
    }*/

    //return layer;
}
