/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMyFish = function(){

    PIXI.Container.call(this);

    this.update = update;
    this.onMouseMove = onMouseMove;
    this.getMyFishPosition = getMyFishPosition;

    /*PIXI.loader.add('asset/socden1.json').load(onAssetsLoaded);

    var Frames = [];

    var fish;

    function onAssetsLoaded()
    {
        for (var i = 1; i < 10; i++) {

            Frames.push(PIXI.Texture.fromFrame("Blue_butter00" + i + '.png'));
        }
        console.log(parent);

    }*/

    var fish = new Fish("socden1","Blue_butter00",10, true);
    fish.position.x = AppInfo.WIDTH/2;
    fish.position.y = AppInfo.HEIGHT/2;
    //myFishPosition.x = Math.random()*2000;
    //myFishPosition.y = Math.random()*2000;
    this.addChild(fish);
    var detalX;
    var detalY;
    var pCurrX;
    var pCurrY;


    function onMouseMove(eventData)
    {
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
            //if(Math.abs(fish.position.x - fish.moveToX)>2 && Math.abs(fish.position.y - fish.moveToY)>2)
            //{
            detalX = Math.cos(fish.rotation) * fish.getSpeed();
            detalY = Math.sin(fish.rotation) * fish.getSpeed();
            pCurrX = fish.getCurPosition().x - AppInfo.WIDTH/2 + fish.width/4+4;
            pCurrY = fish.getCurPosition().y - AppInfo.HEIGHT/2 + fish.height/4+4;
            if(pCurrX > 0 && detalX>0)
            {
                detalX = 0;
            }

            if(pCurrX < -12000+fish.width/2+4 && detalX<0)
            {
                detalX = 0;
            }

           /* if(fish.getCurPosition().x < 0 )
            {
                pTempX = 0;
            }

            if( fish.getCurPosition().y > 12000)
            {
                pTempX = 0;
            }*/


            //if(pTempY > 0 )
            //{
            //    pTempY = 0;
            //}
            //
            //if(pTempY < -14000)
            //{
            //    pTempY = -14000;
            //}


            fish.setCurPosition( {x:detalX,y:detalY});
            //}
        }
       /* if(!fish)
        {
            if(Frames.length > 0)
            {
                fish = new PIXI.extras.MovieClip(Frames);
                fish.anchor.set(0.5);
                fish.animationSpeed = 0.2;
                fish.play();

                var circle = new PIXI.Graphics()
                circle.lineStyle(2, 0x0000FF, 1);
                circle.beginFill(0xFF700B,1);
                circle.drawCircle(0,0,fish.width/4);
                circle.endFill();

                this.addChild(circle);
                this.addChild(fish);
            }
        }*/
    }


}
LayerMyFish.prototype = Object.create(PIXI.Container.prototype);
LayerMyFish.prototype.constructor = LayerMyFish;