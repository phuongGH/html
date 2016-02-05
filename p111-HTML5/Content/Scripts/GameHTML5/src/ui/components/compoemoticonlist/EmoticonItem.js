/**
 * Created by phund on 26/01/2016.
 */
define(function (require) {
    //var ClasName = require("PathToClassName");
    'use strict';
    EmoticonItem.prototype = Object.create(PIXI.Sprite.prototype);
    EmoticonItem.prototype.constructor = EmoticonItem;

    Object.defineProperties(EmoticonItem.prototype, {});

    /**
     *
     * @param {CompoEmoticonList} _parent
     * @param {Texture} _texture
     * @param {String} _name
     * @constructor
     */
    function EmoticonItem(_parent, _texture, _name, _callBackClick) {

        PIXI.Sprite.call(this);
        this.compoEmoticon =  _parent;
        this.texture = _texture;
        this.name = _name;
        this.interactive = true;
        this.callBackClick = _callBackClick;
        this.mouseover = this.onOver.bind(this);
        this.mouseout = this.onOut.bind(this);
        this.mousedown = this.onDown.bind(this);
        this.buttonMode = true;
        this.init();
    }

    EmoticonItem.prototype.onDown = function(){
        this.callBackClick.bind(this.compoEmoticon)(this);
    }

    EmoticonItem.prototype.init = function(){
        this.mask_mc = new PIXI.Graphics();
        this.mask_mc.beginFill(0x000B15, 0.2);
        this.mask_mc.drawRect(0,0,this.width,this.height);
        this.mask_mc.endFill();
        this.mask_mc.visible = true;
        this.addChild(this.mask_mc);
    }

    EmoticonItem.prototype.onOut = function(){
        this.mask_mc.visible = true;
    }

    EmoticonItem.prototype.onOver = function(){
        this.mask_mc.visible = false;
    }
    //EmoticonItem.StaticVariable = StaticVariable;
    //EmoticonItem.StaticFunction = function(){};

    return EmoticonItem;
});