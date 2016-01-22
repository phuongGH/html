/**
 * Created by phuongtv on 1/13/2016.
 */
define(function (require) {

    var PIXI = require('../../lib/pixi.min');
    var ButtonOption = require('../Components/ButtonOption');
    var Button = require('../Components/Button');
    var ResourceName = require('../ResourceName');
    var txtMarginTop = 30;
    var btnMarginTop = 10;
    var btnMarginBotton = 20;
    CompoNotify.MESSAGE = 1;

    function CompoNotify() {

        PIXI.Container.call(this);

        this._init();

    }

    CompoNotify.prototype = Object.create(PIXI.Container.prototype);
    CompoNotify.prototype.constructor = CompoNotify;


    Object.defineProperties(ButtonOption.prototype, {
        shadowBackground: {
            value: null,
            writable: true
        },
        shadowGraphics: {
            value: null,
            writable: true
        },
        background: {
            value: null,
            writable: true
        },
        btnClose: {
            value: null,
            writable: true
        },
        btnAgree: {
            value: null,
            writable: true
        },
        btnNotAgree: {
            value: null,
            writable: true
        },
        btnText: {
            value: null,
            writable: true
        },
        text: {
            value: null,
            writable: true
        },
        callBackAgree: {
            value: null,
            writable: true
        },
        callBackNotAgree: {
            value: null,
            writable: true
        },
        callBackButtonText:{
            value: null,
            writable: true
        },
        blurFilter:{
            value:null,
            writable: true
        }
    });


    CompoNotify.prototype._init = function () {

        this.shadowBackground = new PIXI.Sprite();
        this.shadowBackground.x = -10;
        this.shadowBackground.y = -10;
        this.addChild(this.shadowBackground);

        var blurFilter  = new PIXI.filters.BlurFilter();
        this.shadowBackground.filters = [blurFilter];
        blurFilter.blur = 20;

        this.shadowGraphics = new PIXI.Graphics();

        this.background = new PIXI.Graphics();
        this.addChild(this.background);

        this.btnAgree = new Button();
        this.btnAgree.text = "Đồng ý";
        this.addChild(this.btnAgree);

        this.btnNotAgree = new Button();
        this.btnNotAgree.text = "Không đồng ý";
        this.addChild(this.btnNotAgree);

        this.btnText = new Button();
        this.addChild(this.btnText);

        var btnOption = new ButtonOption();
        btnOption.setButtonTexture(ResourceName.ATLAS_BUTTON,ResourceName.BTN_CLOSE);
        this.btnClose = new Button(btnOption);

        this.addChild(this.btnClose);


        var style = {
            font: '14pt Arial'
        };
        this.text = new PIXI.Text("", style);
        this.addChild(this.text);


        //init event
        this.btnClose.on('mousedown', this._onButtonCloseDown.bind(this))
            .on('touchstart', this._onButtonCloseDown.bind(this));

        this.btnAgree.on('mousedown', this._onButtonAgreeDown.bind(this))
            .on('touchstart', this._onButtonAgreeDown.bind(this));

        this.btnNotAgree.on('mousedown', this._onButtonNotAgreeDown.bind(this))
            .on('touchstart', this._onButtonNotAgreeDown.bind(this));

        this.btnText.on('mousedown', this._onButtonTextDown.bind(this))
            .on('touchstart', this._onButtonTextDown.bind(this));

        this.visible = false;

    }

    CompoNotify.prototype._onButtonCloseDown = function (eventData) {
        this.visible = false;
        this.parent.removeChild(this);
    }

    CompoNotify.prototype._onButtonAgreeDown = function (eventData) {
        this.visible = false;
        this.parent.removeChild(this);
        if(this.callBackAgree)
        {
            this.callBackAgree();
        }
    }

    CompoNotify.prototype._onButtonNotAgreeDown = function (eventData) {
        this.visible = false;
        this.parent.removeChild(this);
        if(this.callBackNotAgree)
        {
            this.callBackNotAgree();
        }
    }
    CompoNotify.prototype._onButtonTextDown = function (eventData) {
        this.visible = false;
        this.parent.removeChild(this);
        if(this.callBackButtonText)
        {
            this.callBackButtonText();
        }
    }


    CompoNotify.prototype.drawBackground = function () {

        var w = this.text.width + 40;
        var h = this.text.height + txtMarginTop + btnMarginTop + this.btnAgree.height + btnMarginBotton;
        if (w < 200)
            w = 200;

        this.background.clear();
        this.background.beginFill(0xE6E6E6);
        this.background.lineStyle(4, 0, 1);
        this.background.drawRect(0, 0, w, h);
        this.background.endFill();

        this.shadowGraphics.clear();
        this.shadowGraphics.beginFill(0,.1);
        this.shadowGraphics.drawRoundedRect(0,0,w+20,h+20,10,10);
        this.shadowGraphics.endFill();

        this.shadowBackground.texture = this.shadowGraphics.generateTexture();

        this.position.x = (window.innerWidth - this.width) / 2;
        this.position.y = (window.innerHeight - this.height) / 2;


    }

    CompoNotify.prototype.hideAllButton = function () {
        this.btnClose.visible = false;
        this.btnAgree.visible = false;
        this.btnNotAgree.visible = false;
        this.btnText.visible = false;
    }

    CompoNotify.prototype.showMessWidthClose = function (mess) {

        this.visible = true;

        this.text.text = mess;

        this.drawBackground();

        this.hideAllButton();

        this.btnClose.visible = true;
        this.btnClose.position.x = this.width - this.btnClose.width - 23;
        this.btnClose.position.y = 3;

        this.text.position.x = (this.width - this.text.width) / 2;
        this.text.position.y = txtMarginTop;

    }

    CompoNotify.prototype.showMessWidthAgree = function (mess, callBackAgree) {

        this.visible = true;

        this.text.text = mess;

        this.drawBackground();

        this.hideAllButton();

        this.btnAgree.visible = true;

        this.btnAgree.position.x = (this.width - this.btnAgree.width) / 2;
        this.btnAgree.position.y = (this.height - this.btnAgree.height - 20);

        this.text.position.x = (this.width - this.text.width) / 2;
        this.text.position.y = txtMarginTop;

        this.callBackAgree = callBackAgree;

    }

    CompoNotify.prototype.showArgreeNotAgree = function (mess, callBackAgree, callBackNotAgree) {

        this.visible = true;

        this.text.text = mess;

        this.drawBackground();

        this.hideAllButton();

        this.btnAgree.visible = true;

        this.btnAgree.position.x = (this.width / 4) - (this.btnAgree.width/2);
        this.btnAgree.position.y = (this.height - this.btnAgree.height - 20);

        this.btnNotAgree.visible = true;

        this.btnNotAgree.position.x = (this.width*3/4) -(this.btnNotAgree.width/ 2);
        this.btnNotAgree.position.y = (this.height - this.btnNotAgree.height - 20);

        this.text.position.x = (this.width - this.text.width) / 2;
        this.text.position.y = txtMarginTop;

        this.callBackAgree = callBackAgree;
        this.callBackNotAgree = callBackNotAgree;
    }

    CompoNotify.prototype.showMessWidthButtonText = function (mess,btnText, callBackButtonText) {

        this.visible = true;

        this.text.text = mess;

        this.drawBackground();

        this.hideAllButton();

        this.btnText.text = btnText;
        this.text.position.x = (this.width - this.text.width) / 2;
        this.text.position.y = txtMarginTop;

        this.btnText.visible = true;
        this.btnText.position.x = (this.width - this.btnText.width)/2;
        this.btnText.position.y = (this.height - this.btnText.height - 20);

        this.btnClose.visible = true;
        this.btnClose.position.x = this.width - this.btnClose.width - 23;
        this.btnClose.position.y = 3;

        this.callBackButtonText = callBackButtonText;
    }

    return CompoNotify;
});
