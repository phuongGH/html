/**
 * Created by datnt on 1/8/2016.
 */
'use strict';
requirejs(
    [
        PreLoaderConfig.PathToLibCode + 'stats.js',
        PreLoaderConfig.PathToLibCode + 'pixi.js',
        PreLoaderConfig.PathToLibCode + 'TweenMax.js',
        PreLoaderConfig.PathToLibCode + 'Font.js',
        'PIXIEXTENDS',
        'GOWN',
        'PreLoader'
    ],
    function (Stats, PIXI, GreenSock, Font, PIXIExtends, GOWN, PreLoader) {
        var Container = PIXI.Container;

        var ticker = PIXI.ticker.shared;
        ticker.autoStart = false;
        ticker.stop();
        ticker.add(onEnterFrame, this);

        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        var gameContainer = document.getElementById('gameContainer');
        var gameContainerStyle = window.getComputedStyle(gameContainer);
        var gameContainerWidth = gameContainer.offsetWidth - parseFloat(gameContainerStyle.paddingLeft) - parseFloat(gameContainerStyle.paddingRight);
        var gameContainerHeight = gameContainer.offsetHeight - parseFloat(gameContainerStyle.paddingTop) - parseFloat(gameContainerStyle.paddingBottom);

        var renderer = PIXI.autoDetectRenderer(gameContainerWidth, gameContainerHeight, {antialias: false, transparent: false, resolution: 1}, false);
        renderer.view.style.width = gameContainerWidth + "px";
        renderer.view.style.height = gameContainerHeight + "px";
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "none";
        renderer.backgroundColor = 0xFFFFFF;

        var stage = new Container();
        stage.stageWidth = gameContainerWidth;
        stage.stageHeight = gameContainerHeight;

        Object.defineProperties(PIXI.DisplayObject.prototype, {
            gameContainer: {
                value: gameContainer,
                writable: false
            },
            renderer: {
                value: renderer,
                writable: false
            },
            stage: {
                value: stage,
                writable: false
            }
        });

        var preLoader = new PreLoader();
        stage.addChild(preLoader);

        window.addEventListener("resize", onResize);

        gameContainer.appendChild(renderer.view);
        document.body.appendChild(stats.domElement);

        function onEnterFrame(deltaTime) {
            stats.begin();

            preLoader.onEnterFrame(ticker.elapsedMS);
            renderer.render(stage);

            stats.end();
        }

        function onResize(event) {
            var gameContainerStyle = window.getComputedStyle(gameContainer);
            stage.stageWidth = gameContainer.offsetWidth - parseFloat(gameContainerStyle.paddingLeft) - parseFloat(gameContainerStyle.paddingRight);
            stage.stageHeight = gameContainer.offsetHeight - parseFloat(gameContainerStyle.paddingTop) - parseFloat(gameContainerStyle.paddingBottom);

            renderer.view.style.width = stage.stageWidth + "px";
            renderer.view.style.height = stage.stageHeight + "px";

            preLoader.onResize(event);
        }
    }
);