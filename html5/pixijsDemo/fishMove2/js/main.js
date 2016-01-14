/**
 * Created by phuongtv on 12/29/2015.
 */
(function($,window){

    window.App = {};

    App = {
        init:function(){

            var renderer = PIXI.autoDetectRenderer(AppInfo.WIDTH ,AppInfo.HEIGHT,{transparent:true});
            var mainStage = new PIXI.Container();
            var fishAsset;
            var layerMap,layerMyfish,layerFood;
            amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;

            if(amount == 5)
            {
                renderer.context.mozImageSmoothingEnabled = false;
                renderer.context.webkitImageSmoothingEnabled = false;
            }

            $("body").append(renderer.view);
            //document.body.appendChild(renderer.view);

            fishAsset = new FishAsset(loadResourcesComplete);

            function loadResourcesComplete()
            {
                layerMap = new  LayerMap();

                layerFood = new LayerFood();

                //layerMap.scale.x = 0.1;
                //layerMap.scale.y = 0.1;

                layerMyfish = new  LayerMyFish();

                mainStage.addChild(layerMap);
                mainStage.addChild(layerFood);
                mainStage.addChild(layerMyfish);

                document.addEventListener("mousemove",function(event){
                    layerMyfish.onMouseMove(event);
                    layerMap.onMouseMove(event);
                });

                update();

            }




            function update(){
                requestAnimationFrame(update);
                renderer.render(mainStage);

                layerMyfish.update();
                layerFood.update(layerMyfish.getMyFishPosition());
                layerMap.update(layerMyfish.getMyFishPosition());

                gamePlay();
            }

            function gamePlay()
            {
                var listFoods = layerFood.listFoods;
                var len = listFoods.length -1;
                var food;
                var myFish = layerMyfish.getMyFish();
                var i = len;

                if(myFish && len>0)
                {
                    for(i;i>=0;i--)
                    {
                        food = listFoods[i];
                       /* if(myFish.checkCollision(food))
                        {
                            console.log("collision");
                            //layerFish.removeChild(food);
                        }*/
                    }
                }

            }
        }
    };

    App.init();

}(jQuery, this));