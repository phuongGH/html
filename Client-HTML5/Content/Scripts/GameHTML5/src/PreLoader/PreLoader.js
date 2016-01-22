/**
 * Created by datnt on 12/15/2015.
 */

define(function(require) {
    //Import

    var PIXI = require('../../lib/pixi.min');
    var Font = require('../../lib/Font');
    var Proton = require('../../lib/proton-1.0.0.min');
    var AppInfo = require('../utils/AppInfo');
    var Utilities = require('../utils/Utilities');
    var ResourceName = require('../ResourceName');
    var Button = require('../Components/Button');
    var ButtonOption = require('../Components/ButtonOption');
    var CompoNotify = require('../CompoNotify/CompoNotify');
    var CompoChat = require('../CompoChat/CompoChat');

    var Loader = PIXI.loader;
    var Container = PIXI.Container;
    var ContainerOptimize = PIXI.ParticleContainer;//Faster render than Container from 2x to 5x but childern cannot have thier childs, and just use some x, y, width, height, scale, alpha, pivot, and visible
    var Graphic = PIXI.Graphics;
    var Sprite = PIXI.Sprite;
    var MovieClip = PIXI.extras.MovieClip;
    var Text = PIXI.Text;
    var BitmapText = PIXI.extras.BitmapText;

    //Define Contructor

    function PreLoader() {
        Container.call(this);                                               //This is code for inheritance
        console.log(PIXI);
        console.log((new AppInfo(this)).preLoader);
        window.PIXI = PIXI;
        this.on('added', this._onAddedToParent.bind(this));
    };

    PreLoader.prototype = Object.create(Container.prototype);          //This is code for inheritance
    PreLoader.prototype.constructor = PreLoader;

    //Define Property

    Object.defineProperties(PreLoader.prototype, {
        compoNotify: {
            value: undefined,
            writable: true
        },
        compoChat: {
            value: undefined,
            writable: true
        }
    });

    //Define Functionc

    PreLoader.prototype._onAddedToParent = function(parent){
        //note: IE need font .woff. Font.js auto add fontFileName.woff to @font-face. Use this tool to generate fonts http://www.fontsquirrel.com/tools/webfont-generator
        var font = new Font();
        font.preLoader = this;
        font.onload = this._onLoadFontComplete.bind(this);
        font.onerror = function(error_message) { console.log("font has not loaded " + error_message); };
        font.fontFamily = "sedonascriptflfAnyThingYouWant";
        font.src = "../../Content/Theme/GameHTML5/fonts/sedonascriptflf.ttf";
    }

    PreLoader.prototype._onLoadFontComplete = function(){
        console.log("font has loaded");
        Loader.add(ResourceName.ATLAS_BUTTON,"http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/images/AtlasButton.json")
            .add("http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/fonts/A Yummy Apology.fnt")
            .on("progress", this._onLoadingProgress).load(this._onLoadingComplete.bind(this));
    }

    PreLoader.prototype._onLoadingProgress = function(loader, resource){
        console.log('Loading ' + resource.url);
        console.log('Progress ' + loader.progress);
    }

    PreLoader.prototype._onLoadingComplete = function(){
        var textureButton = Loader.resources[ResourceName.ATLAS_BUTTON].textures;

        var buttonOption = new ButtonOption();
        var btn = new Button();
        btn.text = "Open Notify";
        this.addChild(btn);

        btn.on('mousedown', this.onOpenNotify.bind(this))
            .on('touchstart', this.onOpenNotify.bind(this));

        this.compoNotify = new CompoNotify();

        this.compoChat = new CompoChat();
        this.compoChat.x = 10;
        this.compoChat.y = 100;
        this.addChild(this.compoChat);

    }

    PreLoader.prototype.onEnterFrame = function() {

    }

    PreLoader.prototype.onOpenNotify = function() {

        if(this.children.indexOf(this.compoNotify)===-1)
        {
           this.addChild(this.compoNotify);
        }
        this.compoNotify.showMessWidthClose("aaaassssssssssssssss\nwwwwwwwwwwwwwwwww");
        //this.compoNotify.showMessWidthButtonText("fff","Xác nhận");
    }

    return PreLoader;
});