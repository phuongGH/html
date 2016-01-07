/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMyFish = function(){

    PIXI.Container.call(this);

    this.update = update;

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
    this.addChild(fish);


    function update()
    {
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