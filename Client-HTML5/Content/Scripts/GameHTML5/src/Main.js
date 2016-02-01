/**
 * Created by datnt on 1/8/2016.
 */
requirejs(
    [
        "../lib/pixi.min",
        "../lib/stats",
        "PreLoader/PreLoader"
    ],
    function(PIXI, Stats, PreLoader) {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.bottom = '0px';

        document.body.appendChild( stats.domElement );

        var Container = PIXI.Container;

        stage = new Container();
        renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight ,{backgroundColor: 0xAAEEFF,preserveDrawingBuffer:true});
        window.renderer = renderer;
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";

        document.getElementById('container').appendChild(renderer.view);

        var preLoader = new PreLoader();
        stage.addChild(preLoader);

        onEnterFrame();

        window.addEventListener("resize", onResize);

        function onEnterFrame() {
            stats.begin();

            for(var i = 0; i < stage.children.length; i++){
                if(stage.children[i].onEnterFrame != undefined) {
                    stage.children[i].onEnterFrame();
                }
            }

            renderer.render(stage);

            stats.end();

            requestAnimationFrame(onEnterFrame);
        }

        function onResize(event){
            renderer.view.style.position = "absolute";
            renderer.view.style.width = window.innerWidth + "px";
            renderer.view.style.height = window.innerHeight + "px";
            renderer.view.style.display = "block";

            for(var i = 0; i < stage.children.length; i++){
                if(stage.children[i].onResize != undefined) {
                    stage.children[i].onResize(event);
                }
            }
        }

        window.fullscreen = function(){
            var element = document.documentElement;
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }
);