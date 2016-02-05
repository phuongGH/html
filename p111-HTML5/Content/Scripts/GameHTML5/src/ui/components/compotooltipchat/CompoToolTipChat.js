/**
 * Created by phund on 01/02/2016.
 */
'use strict';
define(function (require) {
    var GeneralComponent = require("ui/components/GeneralComponent");
    var TimerMgame = Utilities.Timer;
    CompoToolTipChat.prototype = Object.create(GeneralComponent.prototype);
    CompoToolTipChat.prototype.constructor = CompoToolTipChat;

    CompoToolTipChat.TOP_RIGHT      = 1;
    CompoToolTipChat.TOP_LEFT       = 2;
    CompoToolTipChat.BOTTOM_LEFT    = 3;
    CompoToolTipChat.BOTTOM_RIGHT   = 4;

    Object.defineProperties(CompoToolTipChat.prototype, {
        Orient:{
            value:CompoToolTipChat.TOP_LEFT,
            writable:true
        }
    });

    /**
     *
     * @param preLoader
     * @constructor
     */
    function CompoToolTipChat(preLoader) {
        GeneralComponent.call(this, preLoader);

        this.init();
    }

    /**
     *Create UserInterface of this component
     */
    CompoToolTipChat.prototype.init = function () {
        GeneralComponent.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;
        }

        this.theTip = new PIXI.Sprite(PIXI.Texture.EMPTY);
        this.addChild(this.theTip);
        var bg = new PIXI.Graphics();
        bg.beginFill(0xF1DB5F,0.8);
        bg.lineStyle(2,0xF1DB5F,0.7);
        bg.drawRoundedRect(0,0,80,100,7);
        bg.endFill();
        this.theTip.texture = bg.generateTexture();

        var _style3 = {font: "bold 13px Arial", fill: 0x000000, align: "left", wordWrapWidth:265, wordWrap: true};
        this.theText = new PIXI.Text('',_style3);
        this.theText.x = 3;
        this.theText.y = 1;
        this.theTip.addChild(this.theText);

        this.useTimer = true;
        this.totalMessage = 0;
        this.messageChat = '';

        this.timer = new TimerMgame();
        this.timer.delay = 1500;
        this.timer.CallBackFunctionOnUpdate = this.WaitTimeOut.bind(this);
    };

    CompoToolTipChat.prototype.draw_baloon = function(ax, ay, w, h, dir, orient){
        //var textField:TextField = this.theText as TextField;
        var distance = 10;
        if (this.theText.width >= 70)
        {
            distance = 70 - this.theText.width;
        }

        var r = 3; //radius
        var w2 = w / 2;
        var bg = new PIXI.Graphics();
        bg.clear();
        bg.beginFill(0xF1DB5F, 0.8);
        bg.lineStyle(1, 0xF1DB5F, 0.8);
        bg.moveTo(r, 0);
        /* this.theTip.graphics.clear();
         this.theTip.graphics.beginFill(0xF1DB5F, 80);
         this.theTip.graphics.lineStyle(1, 0xF1DB5F, 80);
         this.theTip.graphics.moveTo(r, 0);*/
        if (dir == 1)
        {
            if (orient == CompoToolTipChat.BOTTOM_RIGHT)
            {
                //bg.lineTo(30, 0);
                bg.lineTo(30, 0);
                bg.lineTo(32, ay + 7);
                bg.lineTo(45, 0);

            }
            else if (orient == CompoToolTipChat.BOTTOM_LEFT)
            {
                bg.lineTo(30 - distance, 0);
                bg.lineTo(40 - distance, ay + 7);
                bg.lineTo(42 - distance, 0);
                //trace(distance);
            }
        }
        bg.lineTo(w - r, 0);
        bg.quadraticCurveTo(w, 0, w, r);
        //bg.curveTo(w, 0, w, r);
        bg.lineTo(w, h - r);
        bg.quadraticCurveTo(w, h,  w - r, h);
        //bg.curveTo(w, h, w - r, h);
        if (dir != 1)
        {
            if (orient == CompoToolTipChat.TOP_LEFT)
            {
                bg.lineTo(33 - distance, h);
                bg.lineTo(45 - distance, ay - 7);
                bg.lineTo(46 - distance, h);
                //trace(distance);
            }
            else if (orient == CompoToolTipChat.TOP_RIGHT)
            {
                bg.lineTo(55, h);
                bg.lineTo(35, ay - 7);
                bg.lineTo(39, h);
            }
        }
        bg.lineTo(r, h);
        bg.quadraticCurveTo(0, h, 0, h - r);
        //bg.curveTo(0, h, 0, h - r);
        bg.lineTo(0, r);
        bg.quadraticCurveTo(0, 0, r, 0);
        //bg.curveTo(0, 0, r, 0);
        bg.endFill();

        this.theTip.texture = bg.generateTexture();
        if(orient == CompoToolTipChat.BOTTOM_LEFT || orient == CompoToolTipChat.BOTTOM_RIGHT)
        {
            this.theText.y = 15;
        }
        else{
            this.theText.y = 1;
        }
    }

    CompoToolTipChat.prototype.AppendText = function(_text){
        if (this.totalMessage == 4)
            return;
        this.totalMessage += 1;
        switch(this.Orient){
            case CompoToolTipChat.TOP_RIGHT:
            case CompoToolTipChat.TOP_LEFT:
                if (this.messageChat != "")
                    this.messageChat += "\r" + _text;
                else
                    this.messageChat += _text;
                break;
            case CompoToolTipChat.BOTTOM_RIGHT:
            case CompoToolTipChat.BOTTOM_LEFT:
                if (this.messageChat != "")
                    this.messageChat = _text + "\r" + this.messageChat;
                else
                    this.messageChat += _text;
                break;
        }
        this.drawTooltip();
    }

    CompoToolTipChat.prototype.WaitTimeOut = function(){
        this.totalMessage--;
        switch(this.Orient) {
            case CompoToolTipChat.TOP_RIGHT:
            case CompoToolTipChat.TOP_LEFT:
                if (this.messageChat.indexOf("\r") == -1)
                {
                    this.messageChat = "";
                    this.theText.text = "";
                }
                else
                {
                    this.messageChat = this.messageChat.substr(this.messageChat.indexOf("\r") + 1, this.messageChat.length);
                }
                break;
            case CompoToolTipChat.BOTTOM_RIGHT:
            case CompoToolTipChat.BOTTOM_LEFT:
                if (this.messageChat.lastIndexOf("\r") == -1)
                {
                    this.messageChat = "";
                    this.theText.text = "";
                }
                else
                {
                    this.messageChat = this.messageChat.substr(0, this.messageChat.lastIndexOf("\r"));
                }
                break;
        }

        if (this.totalMessage == 0){
            this.timer.Stop();
            this.theText.text = "";
            this.messageChat = "";
            this.Hide();
        }
        else
        {
            this.Show();
        }
        this.drawTooltip();
    }

    CompoToolTipChat.prototype.showTip = function(_mess, _orient, xpos, ypos, dir){
        //var textField:TextField = this.theText;
        this.theText.text = _mess;
        var dwidth = this.theText.width + 12;
        var dheight = this.theText.height + 6;

        switch (_orient)
        {
            case 1:
            case 2:
                dir = 0;
                break;
            case 3:
            case 4:
                dir = 1;
                break;
        }

        if (dwidth < 70)
            dwidth = 70;
        if (dwidth > 265)
            dwidth = 265;

        if (dheight < 10)
            dheight = 10;
        var offseth = 20; //y offset
        var xx;
        var yy;
        var defpeak;
        if (ypos + dwidth < dwidth + 32)
        {
            xx = 8;
        }
        else
        {
            xx = xpos - 26;
        }
        this.theTip.x = xx;
        if (dir == 1)
        {
            yy = ypos + offseth;
        }
        else
        {
            yy = ypos - (offseth + dheight);

        }
        this.theTip.y = yy;
        this.draw_baloon(xpos - xx, ypos - yy, dwidth, dheight, dir, _orient);
        this.theTip.visible = true;
    }

    CompoToolTipChat.prototype.Hide = function(){
        this.visible = false;
    }

    CompoToolTipChat.prototype.Show = function(){
        this.visible = true;
    }

    CompoToolTipChat.prototype.removeTip = function(){
        this.theTip.visible = false;
    }

    CompoToolTipChat.prototype.drawTooltip = function(){
        this.removeTip();
        if (this.totalMessage == 0)
        {
            this.Hide();
            return;
        }

        if (this.messageChat == "")
            return;

        if (this.useTimer)
        {
            if (this.totalMessage == 1/* && this.timer == null*/)
            {
                /*timer = new Timer(1500);//3500
                 timer.addEventListener(TimerEvent.TIMER, WaitTimeOut);*/
                this.timer.Start();
            }
            if (this.timer.running == false && this.totalMessage > 0)
            {
                this.timer.Start();
            }
        }
        this.Show();
        this.showTip(this.messageChat, this.Orient, 0, 0, 0);

        switch(this.Orient)
        {
            case CompoToolTipChat.TOP_RIGHT:
                this.theTip.x = 0;
                break;
            case CompoToolTipChat.TOP_LEFT:
                if (this.theText.width >= 70)
                {
                    this.theTip.x = 70 - this.theText.width;
                }
                else
                {
                    this.theTip.x = 10;
                }
                break;
            case CompoToolTipChat.BOTTOM_LEFT:
                if (this.theText.width >= 70)
                {
                    this.theTip.x = 70 - this.theText.width;
                }
                else
                {
                    this.theTip.x = 10;
                }
                this.theTip.y = 75;
                break;
            case CompoToolTipChat.BOTTOM_RIGHT:
                this.theTip.x = 0;
                this.theTip.y = 75;
                break;
        }

    }

    /**
     *Destroy UserInterface of this component
     */
    CompoToolTipChat.prototype.dispose = function () {
        GeneralComponent.prototype.dispose.call(this);
        this.theTip.dispose();
        this.theText.dispose();
    };

    /**
     *Resize all UserInterface of this component IF NEED
     * @param {Window.Event} event
     */
    CompoToolTipChat.prototype.onResize = function (event) {
        GeneralComponent.prototype.onResize.call(this, event);
    };

    /**
     *Use to animate UserInterface of this component IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    CompoToolTipChat.prototype.onEnterFrame = function (deltaTime) {
        GeneralComponent.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this component IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    CompoToolTipChat.prototype.updateUserInfo = function (userInfo) {
        GeneralComponent.prototype.updateUserInfo.call(this, userInfo);
    };

    return CompoToolTipChat;
});