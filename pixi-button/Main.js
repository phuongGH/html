/**
 * Created by phuongtv on 1/19/2016.
 */
requirejs(
    [
        "./lib/pixi.min",
        "./PreLoader/PreLoader"
    ],
    function(PIXI, PreLoader) {


        stage = new PIXI.Container();
        renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {  antialias: false, transparent: true,  resolution: 1 }, false);

        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";

        document.getElementById('container').appendChild(renderer.view);

       var preLoader = new PreLoader();
        stage.addChild(preLoader);

        onEnterFrame();


        function onEnterFrame() {

            renderer.render(stage);

            requestAnimationFrame(onEnterFrame);
        }

    }
);