/**
 * Created by phuongtv on 1/13/2016.
 */
define(function (require) {

    var PIXI = require('../../lib/pixi.min');
    var ButtonOption = require('../Components/ButtonOption');
    var Button = require('../Components/Button');
    var ResourceName = require('../ResourceName');
    var Container = PIXI.Container;
    var Graphics = PIXI.Graphics;
    var _textureButton;
    var _this;

    CompoNotify.MESSAGE = 1;

    function CompoNotify(textureButton) {

        Container.call(this);

        _this = this;

        _textureButton = textureButton;

        init();
        this.visible = false;


    }

    CompoNotify.prototype = Object.create(Container.prototype);
    CompoNotify.prototype.constructor = CompoNotify;


    Object.defineProperties(ButtonOption.prototype, {
        background: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        btnClose: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        btnAgree: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        text: {
            value: null,
            writable: true
        }
    });


    function init() {
        var btnOption = new ButtonOption();
        btnOption.type = ButtonOption.BUTTON_IMAGES;
        btnOption.textureButtonUp = _textureButton[ResourceName.BTN_CLOSE_UP];
        btnOption.textureButtonOver = _textureButton[ResourceName.BTN_CLOSE_OVER];
        btnOption.textureButtonDown = _textureButton[ResourceName.BTN_CLOSE_DOWN];

        _this.background = new Graphics();
        _this.addChild(_this.background);

        _this.btnClose = new Button(btnOption);
        _this.addChild(_this.btnClose);

        btnOption.type = ButtonOption.BUTTON_DEFAULT_GREEN;
        btnOption.text = "Đồng ý"
        _this.btnAgree = new Button(btnOption);
        _this.addChild(_this.btnAgree);

        _this.btnClose.on('mousedown', _this._onButtonDown)
            .on('touchstart', _this._onButtonDown);

        var style = {
            font: '14pt Arial'
        };
        _this.text = new PIXI.Text("", style);
        _this.addChild(_this.text);
        /* var btnOption = new ButtonOption();
         btnOption.type = ButtonOption.BUTTON_NORMAL_GREEN;
         //btnOption.textures = textureButton;
         btnOption.text = "OK abv";
         var btn = new Button(btnOption);
         btn.position.x = 0;
         _this.addChild(btn);*/


    }

    /*    Object.defineProperties(CompoNotify.prototype,{
     type:{
     value:1,
     writable:true
     }
     });*/

    CompoNotify.prototype._onButtonDown = function (eventData) {
        _this.visible = false;
    }

    CompoNotify.prototype.test = function (mess) {
        this.showMessWidthAgree("This is the text!");
    }

    CompoNotify.prototype.drawBackground = function () {
        var w = this.text.width + 40;
        var h = this.text.height + 60;
        if (w < 300)
            w = 300;
        if (h < 200)
            h = 200;

        this.background.clear();
        this.background.beginFill(0xE6E6E6);
        this.background.lineStyle(4, 0, 1);
        this.background.drawRect(0, 0, w, h);
        this.background.endFill();
    }

    CompoNotify.prototype.hideAllButton = function () {
        this.btnClose.visible = false;
        this.btnAgree.visible = false;
    }

    CompoNotify.prototype.showMessWidthClose = function (mess) {
        /* if(type == CompoNotify.MESSAGE)
         {*/
        this.visible = true;

        this.text.text = mess;

        this.drawBackground();

        this.hideAllButton();

        this.btnClose.visible = true;
        this.btnClose.position.x = this.width - this.btnClose.width - 7;
        this.btnClose.position.y = 3;

        this.text.position.x = (this.width - this.text.width) / 2;
        this.text.position.y = (this.height - this.text.height) / 2;

        this.position.x = (window.innerWidth - w) / 2;
        this.position.y = (window.innerHeight - h) / 2;
        //}
    }

    CompoNotify.prototype.showMessWidthAgree = function (mess) {
        /* if(type == CompoNotify.MESSAGE)
         {*/
        this.visible = true;

        this.text.text = mess;

        this.drawBackground();

        this.hideAllButton();

        this.btnAgree.visible = true;

        this.btnAgree.position.x = (this.width - this.btnAgree.width) / 2;
        this.btnAgree.position.y = (this.height - this.btnAgree.height - 30);

        this.text.position.x = (this.width - this.text.width) / 2;
        this.text.position.y = (this.height - this.text.height) / 3;

        this.position.x = (window.innerWidth - this.width) / 2;
        this.position.y = (window.innerHeight - this.height) / 2;
        //}
    }

    return CompoNotify;
});
