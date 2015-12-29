/**
 * Created by phuongtv on 12/17/2015.
 */
(function($,window){
    window.App = {};

    App = {
        init:function() {

            var w_width = $(window).width();
            var w_height = $(window).height();
            var renderer = PIXI.autoDetectRenderer(w_width, w_height, {transparent: true});
            var stage = new PIXI.Container();

            animate();

            function animate(){

                requestAnimationFrame(animate);
                renderer.render(stage);
            }
        }
    }
});
