/**
 * Created by phund on 22/01/2016.
 */
define(function (require) {
    //var ClasName = require("PathToClassName");

    Mask_mc.prototype = Object.create(PIXI.Container.prototype);
    Mask_mc.prototype.constructor = Mask_mc;

    Object.defineProperties(Mask_mc.prototype, {});

    function Mask_mc(_parent) {
        this._compoUser = _parent._compoUserInfoPlayParent;
        PIXI.Container.call(this);
        this.init();
    }

    //Mask_mc.StaticVariable = StaticVariable;
    //Mask_mc.StaticFunction = function(){};
    Mask_mc.prototype.init = function(){

        this.mask_mc = new PIXI.Sprite();
        this.mask_mc.buttonMode = true;
        var gp = new PIXI.Graphics();
        gp.beginFill(0x000000,0);
        //gp.drawRect(0,0,85,100);
        gp.drawRect(0,0,35,76);
        gp.drawRect(20,17,60,83);
        gp.drawRect(47,0,38,100);
        gp.endFill();
        this.mask_mc.texture = gp.generateTexture();
        this.addChild(this.mask_mc);
        //this.mask_mc.hitArea = new PIXI.Rectangle(0,0,100,80);

        this.maskEmoticon_mc = new PIXI.Sprite();
        var gp2 = new PIXI.Graphics();
        gp2.beginFill(0x000000,0);
        gp2.drawRect(0,0,8,40);
        gp2.drawRect(8,0,57,65);
        gp2.endFill();
        this.maskEmoticon_mc.texture = gp2.generateTexture();
        this.maskEmoticon_mc.x = 3.85;
        this.maskEmoticon_mc.y = 17.1;
        this.maskEmoticon_mc.buttonMode = true;
        this.addChild(this.maskEmoticon_mc);

        this.interactive = true;

        this.mask_mc.interactive= true;
        this.mouseover = this.onOver.bind(this);
        this.mousedown = this.onDown.bind(this);

        this.maskEmoticon_mc.interactive = true;
        this.maskEmoticon_mc.mousedown = this.onEmotionDown.bind(this);

    }

    Mask_mc.prototype.onDown = function(){

        this._compoUser.isClick = this._compoUser.main_movie.iconPopUp.isClick;
        if (!this._compoUser.IsMe && !this._compoUser.isClick)
        {
            //main_movie.setChildIndex(main_movie.iconPopUp, main_movie.numChildren - 1);
            this._compoUser.main_movie.iconPopUp.visible = true;
            this._compoUser.main_movie.iconPopUp.isClick = true;
            this._compoUser.main_movie.mouseout = null;
            this._compoUser.isClick = this._compoUser.main_movie.iconPopUp.isClick;
        }else if (!this._compoUser.IsMe) {
            this._compoUser.main_movie.iconPopUp.visible = false;
            this._compoUser.main_movie.iconPopUp.isClick = false;
            this._compoUser.isClick = this._compoUser.main_movie.iconPopUp.isClick;
        }
    }

    Mask_mc.prototype.onEmotionDown = function(){
        console.log('onEmotionDown');
        if(this._compoUser.IsMe == true/* && this._compoUser.CallBackEmotionListEventLoad != null*/){
            if(this._compoUser.preloader.compoEmoticonList.visible == false) {
                this._compoUser.preloader.compoEmoticonList.show(this._compoUser);
            }
            else{
                this._compoUser.preloader.compoEmoticonList.hide();
            }
        }
    }

    Mask_mc.prototype.onOut = function(){
        if(this._compoUser.main_movie.iconPopUp.onFocus == false)
        {
            this._compoUser.main_movie.iconPopUp.visible = false;
        }
        this.mouseout = null;
    }

    Mask_mc.prototype.onOver = function(){
        if (this._compoUser.IsMe == true)
        {
            this._compoUser.main_movie.iconPopUp.visible = true;
            this.mouseout = this.onOut.bind(this);
        }
    }
    return Mask_mc;
});