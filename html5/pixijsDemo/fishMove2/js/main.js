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
            var layerMap,layerMyfish;
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
                layerMap.scale.x = 0.1;
                layerMap.scale.y = 0.1;

                layerMyfish = new  LayerMyFish();

                mainStage.addChild(layerMap);
                mainStage.addChild(layerMyfish);

                update();

            }



            function update(){
                requestAnimationFrame(update);
                renderer.render(mainStage);

                layerMyfish.update();
                //layerMap.position.x -= 10;
                //layerMap.position.y -= 10;
            }
        }
    };

    App.init();

}(jQuery, this));