/**
 * Created by phund on 19/01/2016.
 */
define(function(require)
{
    'use strict';
    //Define libs
    //var PIXI = require('http://localhost:63342/Test/Content/Scripts/GameHTML5/lib/pixi.min.js');
    //Define const
    PopupIcon.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    PopupIcon.prototype.constructor = PopupIcon;
    PopupIcon.IconAsset     = 1;
    PopupIcon.IconCastMoney = 2;
    PopupIcon.IconLockChat  = 3;
    PopupIcon.IconStandUp   = 4;
    PopupIcon.IconInviteFriend = 5;
    PopupIcon.IconBangHoi   = 6;
    PopupIcon.IconUserInfo  = 7;
    PopupIcon.IconBoardBlackList = 8;
    //Define private variable
    // var _this;

    //Define public variable

    //Define Layers

    //Define Contructor
    /**
     *
     * @param {PopupControlUser} parent
     * @param {Number} _type
     * @param {String} _name
     * @param {Texture} _texture
     * @param {Function} _callbackOver
     * @param {Function} _callbackClick
     * @constructor
     */
    function PopupIcon(parent, _type, _name, _texture, _callbackOver, _callbackClick)
    {
        this.typeIcon = _type;
        this._texture = _texture;
        this.popupControl = parent;
        this.callBackOver = _callbackOver;
        this.callBackClick = _callbackClick;
        this.iconName = _name;
        PIXI.Container.call(this);   //This is code for inheritance
        this.on('added', _onAddedToParent);
        this.interactive = true;
        this.mouseover = this.onOver.bind(this);
        this.mousedown = this.onClick.bind(this);
        this.buttonMode = true;
        //this.createIconBG();

    };

    //Define Property
    PopupIcon.prototype.onOver = function(){
        this.callBackOver(this.iconName,this);
    }

    PopupIcon.prototype.onClick = function(){
        this.callBackClick();
    }

    Object.defineProperties(PopupIcon.prototype, {


    });

    //Define Function
    PopupIcon.prototype.init = function(){
        this.bg = new PIXI.Sprite(this._texture);
        this.addChild(this.bg);
    }

    PopupIcon.prototype.changeIcon = function(_texture){
        this._texture = _texture;
        this.bg.texture = this._texture;
    }
    //Define private function

    function _onAddedToParent(parent){
        this.init();
    }
    return PopupIcon;
});