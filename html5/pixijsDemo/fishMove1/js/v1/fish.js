/**
 * Created by phuongtv on 12/8/2015.
 */
Fish = function(fishName, showCircle){

    PIXI.Container.call(this);

    var fish = GameAsset.getFish(fishName);
    var fishFrame = new PIXI.extras.MovieClip(fish.getFrame());
    var speed = 3;
    var radius = 0;

    this.direction = Math.random() * Math.PI * 2;
    this.turningSpeed = Math.random() - 0.8;
    this.moveToX = 0;
    this.moveToY = 0;


    this.getSpeed = getSpeed;
    this.checkCollision = checkCollision;
    this.getRadius = getRadius;

    fishFrame.anchor.set(0.5);
    fishFrame.animationSpeed = 0.2;
    fishFrame.play();

    if(showCircle)
    {
        var circle = new PIXI.Graphics()
        circle.lineStyle(2, 0x0000FF, 1);
        circle.beginFill(0xFF700B,1);
        circle.drawCircle(0,0,fishFrame.width/4);
        circle.endFill();
        this.addChild(circle);
    }

    this.addChild(fishFrame);

    function getSpeed()
    {
        return speed;
    }

    function checkCollision(anotherFish)
    {
        if(distance(this.x,this.y,anotherFish.x,anotherFish.y)<(this.getRadius()-anotherFish.getRadius()))
        {
            return true;
        }
        return false;
    }

    function getRadius()
    {
       return this.width/4;
    }

    function distance(x1,y1,x2,y2){
        return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    }


}

Fish.prototype = Object.create(PIXI.Container.prototype);
Fish.prototype.constructor = Fish;
