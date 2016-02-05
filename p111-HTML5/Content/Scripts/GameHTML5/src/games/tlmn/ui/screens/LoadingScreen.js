/**
 * Created by datnt on 1/26/2016.
 */
'use strict';
define(function (require) {
    var GeneralScreen = require("ui/screens/GeneralScreen");

    var Sprite = PIXI.Sprite;

    LoadingScreen.prototype = Object.create(GeneralScreen.prototype);
    LoadingScreen.prototype.constructor = LoadingScreen;

    Object.defineProperties(LoadingScreen.prototype, {
        _background: {
            value: null,
            writable: true
        },
        _barBG: {
            value: null,
            writable: true
        },
        _barProgress: {
            value: null,
            writable: true
        },
        _onLoadResourceCompleteFunc: {
            value: null,
            writable: true
        }
    });

    /**
     *
     * @param preLoader
     * @constructor
     */
    function LoadingScreen(preLoader) {
        GeneralScreen.call(this, preLoader);
    }

    /**
     *Create UserInterface of this screen
     */
    LoadingScreen.prototype.init = function () {
        GeneralScreen.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;

            if(this._background == null){
                this._background = new Sprite(ResourceManager.Atlas.AtlasLoadingTLMN.textures.LoadingBGTLMN);
                this._background.scale.x = AppInfo.appScaleMax;
                this._background.scale.y = AppInfo.appScaleMax;
                this._background.setToCenterScreen();

                this.addChild(this._background);
            }

            if(this._barBG == null){
                this._barBG = new Sprite(ResourceManager.Atlas.AtlasLoadingTLMN.textures.LoadingBarBGTLMN);
                this._barBG.scale.x = AppInfo.appScaleMax;
                this._barBG.scale.y = AppInfo.appScaleMax;
                this._barBG.setXToCenterScreen();

                this._barBG.y = AppInfo.getScaleVertical(550);

                this.addChild(this._barBG);
            }

            if(this._barProgress == null){
                this._barProgress = new Sprite(ResourceManager.Atlas.AtlasLoadingTLMN.textures.LoadingBarProgressTLMN);
                this._barProgress.scale.x = AppInfo.appScaleMax;
                this._barProgress.scale.y = AppInfo.appScaleMax;
                this._barProgress.x = this._barBG.x + AppInfo.getScaleHorizontal(4);
                this._barProgress.y = this._barBG.y + AppInfo.getScaleVertical(3);

                var mask = PIXI.Graphics.RoundedRect(0, 0, this._barProgress.width, this._barProgress.height, this._barProgress.height / 2);
                mask.x = this._barProgress.x;
                mask.y = this._barProgress.y;

                this._barProgress.mask = mask;
                this._barProgress.x -= this._barProgress.width;

                this.addChild(this._barProgress);
                this.addChild(mask);
            }
        }
    };

    LoadingScreen.prototype.loadResource = function(onLoadResourceCompleteFunc) {
        this._onLoadResourceCompleteFunc = onLoadResourceCompleteFunc;

        this._loadResourceLoading();
    };

    LoadingScreen.prototype._loadResourceLoading = function(){
        ResourceManager.loadResourceLoading(this._onLoadResourceLoadingComplete.bind(this));
        FontLibrary.loadNormalFontResource(this._onLoadNormalFontResourceComplete.bind(this));
    };

    LoadingScreen.prototype._onLoadResourceLoadingComplete = function() {
        this.init();
        this.renderer.view.style.display = 'block';
        PIXI.ticker.shared.start();

        ResourceManager.loadResource(this._onLoadResourceProgress.bind(this), this._onLoadAllResourceComplete.bind(this));
    };

    LoadingScreen.prototype._onLoadResourceProgress = function(loader, resource) {
        if (resource.error == null) {
            this._barProgress.x = (this._barBG.x + AppInfo.getScaleHorizontal(4) - this._barProgress.width) + (this._barProgress.width * loader.progress / 100);
        }
        else {
            //Load resource error has catched in ResourceManager
        }
    };

    LoadingScreen.prototype._onLoadAllResourceComplete = function(loader, resources) {
        this._barProgress.x = this._barBG.x + 4;
        this._onLoadResourceCompleteFunc(loader, resources);
    };

    LoadingScreen.prototype._onLoadNormalFontResourceComplete = function(){
        FontLibrary.loadBitmapFontResource(this._onLoadBitmapFontResourceComplete.bind(this));
    };

    LoadingScreen.prototype._onLoadBitmapFontResourceComplete = function(){
        console.log('Load all font complete');
    };

    /**
     *Destroy UserInterface of this screen
     */
    LoadingScreen.prototype.dispose = function () {
        GeneralScreen.prototype.dispose.call(this);

        if(this._background != null) {
            this.removeChild(this._background);
            this._background.destroy();
            this._background = null;
        }

        if(this._barBG != null) {
            this.removeChild(this._barBG);
            this._barBG.destroy();
            this._barBG = null;
        }

        if(this._barProgress != null) {
            var mask = this._barProgress.mask;
            if(mask !== undefined && mask != null){
                this.removeChild(mask);
                mask.destroy();
                mask = null;
            }

            this.removeChild(this._barProgress);
            this._barProgress.destroy();
            this._barProgress = null;
        }
    };

    /**
     *Resize all UserInterface of this screen IF NEED
     * @param {Window.Event} event
     */
    LoadingScreen.prototype.onResize = function (event) {
        GeneralScreen.prototype.onResize.call(this, event);

        if(this._background == null){
            this._background.scale.x = AppInfo.appScaleMax;
            this._background.scale.y = AppInfo.appScaleMax;
            this._background.setToCenterScreen();
        }

        if(this._barBG == null){
            this._barBG.scale.x = AppInfo.appScaleMax;
            this._barBG.scale.y = AppInfo.appScaleMax;
            this._barBG.setXToCenterScreen();

            this._barBG.y = AppInfo.getScaleVertical(550);
        }

        if(this._barProgress == null){
            this._barProgress.scale.x = AppInfo.appScaleMax;
            this._barProgress.scale.y = AppInfo.appScaleMax;
            this._barProgress.x = this._barBG.x + AppInfo.getScaleHorizontal(4);
            this._barProgress.y = this._barBG.y + AppInfo.getScaleVertical(3);

            var mask = this._barProgress.mask;
            this._barProgress.mask = null;
            this.removeChild(mask);

            mask.destroy();
            mask = PIXI.Graphics.Rectangle(0, 0, this._barProgress.width, this._barProgress.height);
            mask.x = this._barProgress.x;
            mask.y = this._barProgress.y;

            this._barProgress.mask = mask;
            this._barProgress.x -= this._barProgress.width;

            this.addChild(mask);
        }
    };

    /**
     *Use to animate UserInterface of this screen IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    LoadingScreen.prototype.onEnterFrame = function (deltaTime) {
        GeneralScreen.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this screen IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    LoadingScreen.prototype.updateUserInfo = function (userInfo) {
        GeneralScreen.prototype.updateUserInfo.call(this, userInfo);
    };

    return LoadingScreen;
});