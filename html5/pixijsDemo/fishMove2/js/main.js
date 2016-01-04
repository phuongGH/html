/**
 * Created by phuongtv on 12/29/2015.
 */
(function($,window){

    window.App = {};

    App = {
        init:function(){

            var renderer = PIXI.autoDetectRenderer(AppInfo.WIDTH ,AppInfo.HEIGHT,{transparent:true});
            var mainStage = new PIXI.Container();

            amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;

            if(amount == 5)
            {
                renderer.context.mozImageSmoothingEnabled = false;
                renderer.context.webkitImageSmoothingEnabled = false;
            }

            $("body").append(renderer.view);
            //document.body.appendChild(renderer.view);


            var  layerMap= new  LayerMap();
            mainStage.addChild(layerMap);

            var  layerMyfish = new  LayerMyFish();
            mainStage.addChild(layerMyfish);

            update();

            function update(){
                requestAnimationFrame(update);
                renderer.render(mainStage);
            }
        }
    };

    App.init();

}(jQuery, this));