/**
 * Created by phund on 01/02/2016.
 */
'use strict';
define(function (require) {
    var GeneralComponent = require("ui/components/GeneralComponent");

    CompoClock.prototype = Object.create(GeneralComponent.prototype);
    CompoClock.prototype.constructor = CompoClock;

    Object.defineProperties(CompoClock.prototype, {
        playerNo:{
            value:0,
            writable:true
        },
        TimeCount:{
            value:15,
            writable:true
        },
        CallBackFunctionOnUpdate:{
            value:null,
            writable:true
        },
        CallBackFunctionOnComplete:{
            value:null,
            writable:true
        }
    });

    /**
     *
     * @param preLoader
     * @constructor
     */
    function CompoClock(preLoader) {
        GeneralComponent.call(this, preLoader);

        this.init();
    }

    /**
     *Create UserInterface of this component
     */
    CompoClock.prototype.init = function () {
        GeneralComponent.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;
        }

        this._isDispatchEvent = true;
        this._timer = new PIXI.ticker.Ticker();
        this._timer.add(this._onUpdateTimer,this);
        var _atlas = ResourceManager.Atlas.AtlasCompoClock.textures.CompoClockImage_;
        this._curFrame = null;

        this._curDate= null;
        this._dateStartClock= null;
        this._timeGone = 0;
        var atlasArr = _atlas;
        //for(var i = 1; i <= 295; i++)
        //{
            //atlasArr.push(_atlas['CompoClockImage_'+i+'.png']);
       //}

        this._canvas = new PIXI.extras.MovieClip(atlasArr);
        this._canvas.x = -6;
        this._canvas.y = -5;
        this._canvas.height = 110;
        this._canvas.visible = false;
        this.addChild(this._canvas);
    };

    CompoClock.prototype._onUpdateTimer = function(){
        this._curDate = new Date();
        this._timeGone = this._curDate.getTime() - this._dateStartClock.getTime();
        if (this._timeGone >= this.TimeCount * 1000)
        {
            this._timer.stop();
            this._timeGone = this.TimeCount * 1000;
            this._canvas.visible = false;
            this.onTimerComplete();
        }

        this.drawFrame();

        var timeGonePerSecond = parseInt(this._timeGone / 1000);
        //KF.showLog("timeGone: " + timeGonePerSecond + " __ " + getCurIndexBitmap());
        if (this.CallBackFunctionOnUpdate != null )
        {
            this.CallBackFunctionOnUpdate(timeGonePerSecond);
        }
    }
    /**
     *
     * @param {Number} _index
     * @param {Texture}_texture
     */
    CompoClock.prototype.drawImage = function(_index, _texture){
        //console.log('drawImage:' + _index);
        this._canvas.gotoAndStop(_index);
    }

    /**
     *
     * @param {Boolean}  _needDispatchEvent
     */
    CompoClock.prototype.drawFrame = function(){
        //canvas.graphics.clear();
        this.drawImage(this.getCurIndexBitmap() , this._curFrame);
        /*canvas.graphics.beginBitmapFill(curFrame, new Matrix(1,0,0,1), false,true);
         canvas.graphics.drawRect(0, 0, curFrame.width, curFrame.height);
         canvas.graphics.endFill();*/
    }

    CompoClock.prototype.Start = function(needDispatchEvent){
        needDispatchEvent = needDispatchEvent || false;
        //if(needDispatchEvent === undefined)
        //    needDispatchEvent = false;
        this._isDispatchEvent = needDispatchEvent;
        this._timer.stop();
        //this._timer.reset();
        this._delay = (this.TimeCount * 1000) / 295;
        //this._timer.repeatCount = 295;
        this._timer.start();
        this._canvas.visible = true;
        this._timeGone = 0;
        this._dateStartClock = new Date();
        this.drawFrame();
    }

    CompoClock.prototype.Stop = function(){
        this._timer.stop();
        this._canvas.visible = false;
    }

    CompoClock.prototype.getCurIndexBitmap = function(){
        var indexBitmap = parseInt(this._timeGone / this._delay);
        return indexBitmap;
    }

    CompoClock.prototype.onTimerComplete = function(){
        //console.log('onTimerComplete');
        if(this.CallBackFunctionOnComplete != null && this._isDispatchEvent == true){
            this.CallBackFunctionOnComplete(this.playerNo);
        }
    }

    CompoClock.prototype.onUpdateTimer = function(){

    }

    /**
     *Destroy UserInterface of this component
     */
    CompoClock.prototype.dispose = function () {
        GeneralComponent.prototype.dispose.call(this);
    };

    /**
     *Resize all UserInterface of this component IF NEED
     * @param {Window.Event} event
     */
    CompoClock.prototype.onResize = function (event) {
        GeneralComponent.prototype.onResize.call(this, event);
    };

    /**
     *Use to animate UserInterface of this component IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    CompoClock.prototype.onEnterFrame = function (deltaTime) {
        GeneralComponent.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this component IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    CompoClock.prototype.updateUserInfo = function (userInfo) {
        GeneralComponent.prototype.updateUserInfo.call(this, userInfo);
    };

    return CompoClock;
});