/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMyFish = function(){

    PIXI.Container.call(this);

    this.update = update;
    this.onMouseMove = onMouseMove;
    this.getMyFishPosition = getMyFishPosition;
    this.getMyFish = getMyFish;

    //var fish = new Fish("socden1","Blue_butter00",10, true);
    var fish = new Fish("socden1",true);
    fish.position.x = AppInfo.WIDTH/2;
    fish.position.y = AppInfo.HEIGHT/2;
    fish.setCurPosition({x:-Math.random()*2000,y:-Math.random()*2000});
    fish.size = AppInfo.MyFishDefaultSize;
    fish.scale.x = fish.scale.y = fish.size * AppInfo.ratio;
    this.addChild(fish);
    var detalX;
    var detalY;
    var pCurrX;
    var pCurrY;


    function onMouseMove(eventData)
    {
        fish.moveToX = eventData.clientX;
        fish.moveToY = eventData.clientY;
        fish.rotation = -( Math.atan2(fish.x - eventData.clientX, fish.y - eventData.clientY) - (Math.PI/2));
    }

    function getMyFishPosition()
    {
        return fish.getCurPosition();
    }

    function update()
    {
        if(fish)
        {
            if(Math.abs(fish.position.x - fish.moveToX)>2 && Math.abs(fish.position.y - fish.moveToY)>2) {
                detalX = Math.cos(fish.rotation) * fish.getSpeed();
                detalY = Math.sin(fish.rotation) * fish.getSpeed();
                pCurrX = fish.getCurPosition().x - AppInfo.WIDTH / 2 + fish.width / 4 + 4;
                pCurrY = fish.getCurPosition().y - AppInfo.HEIGHT / 2 + fish.height / 2 + 4;
                if (pCurrX > 0 && detalX > 0) {
                    detalX = 0;
                }

                if (pCurrX < -12000 + fish.width / 2 + 4 && detalX < 0) {
                    detalX = 0;
                }

                if (pCurrY > 0 && detalY > 0) {
                    detalY = 0;
                }

                if (pCurrY < -14000 + fish.height && detalY < 0) {
                    detalY = 0;
                }

                fish.setCurPosition({x: detalX, y: detalY});
            }
        }

    }

    function getMyFish(){
        return fish;
    }


}
LayerMyFish.prototype = Object.create(PIXI.Container.prototype);
LayerMyFish.prototype.constructor = LayerMyFish;