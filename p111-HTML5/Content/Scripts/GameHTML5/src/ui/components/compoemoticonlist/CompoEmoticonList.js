/**
 * Created by phund on 01/02/2016.
 */
'use strict';
define(function (require) {
    var GeneralComponent = require("ui/components/GeneralComponent");
    var EmoticonItem = require('ui/components/compoemoticonlist/EmoticonItem');
    var Button = require('ui/components/Button');
    var ButtonOption = require('ui/components/ButtonOption');
    var CompoUserInfoPlay = require('ui/components/compouserinfoplay/CompoUserInfoPlay');
    CompoEmoticonList.prototype = Object.create(GeneralComponent.prototype);
    CompoEmoticonList.prototype.constructor = CompoEmoticonList;

    Object.defineProperties(CompoEmoticonList.prototype, {
        CallBackUseEmotion:{
            value:null,
            writable:true
        },
        _compoInUse:{
            value:null,
            writable:true
        }
    });

    /**
     *
     * @param preLoader
     * @constructor
     */
    function CompoEmoticonList(preLoader) {
        GeneralComponent.call(this, preLoader);

        this.init();
    }

    /**
     *Create UserInterface of this component
     */
    CompoEmoticonList.prototype.init = function () {
        GeneralComponent.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;
        }

        this.bgUser_mc = new PIXI.Graphics();
        this.bgUser_mc.beginFill(0x000B15,0.9);
        this.bgUser_mc.lineStyle(2,0xA6E9FF,1);
        this.bgUser_mc.drawRect(0,0,280,190);
        this.bgUser_mc.endFill();
        this.addChild(this.bgUser_mc);

       // var atlasJSON = ResourceManager.Atlas.AtlasEmotionList.textures.e_;
        var emotionArray = ResourceManager.Atlas.AtlasEmotionList.textures.e_;
        /*for(var i = 1; i <= 30; i++){
            emotionArray.push(atlasJSON['e_' +i + '.png'])
        }*/

        //var dx = 0;
        var yPos = -1;
        for(var i = 0; i< emotionArray.length; i++){
            var emoticon = new EmoticonItem(this, emotionArray[i],(i+1)+"", this.CallBackEmotionClick);
            var index = i%6;
            yPos = (index % 6 == 0)? yPos+1 : yPos;
            emoticon.x = 10 + index * 30 + 16 * index;
            emoticon.y = 10 + 35 * yPos;
            this.addChild(emoticon);
        }

        var btnOption = new ButtonOption();
        btnOption.setButtonTexture(ResourceManager.Atlas.AtlasButton.textures.BTN_CloseRoundUp,ResourceManager.Atlas.AtlasButton.textures.BTN_CloseRoundOver,ResourceManager.Atlas.AtlasButton.textures.BTN_CloseRoundDown);
        this.btnClose = new Button(btnOption);
        this.btnClose.x = this.width - this.btnClose.width/2;
        this.btnClose.y = -this.btnClose.height/2;
        this.addChild(this.btnClose);
        this.btnClose.on('mousedown',this.hide.bind(this));
    };

    /**
     *
     * @param {EmoticonItem} emoticonItem
     * @constructor
     */
    CompoEmoticonList.prototype.CallBackEmotionClick = function(emoticonItem){

        /*if(emoticonItem.compoEmoticon.CallBackUseEmotion != null){
            emoticonItem.compoEmoticon.CallBackUseEmotion(emoticonItem.name);
        }*/
        if(this._compoInUse != null && (this._compoInUse instanceof CompoUserInfoPlay)){
            this._compoInUse.ShowFunnyEmotion(emoticonItem.name);
        }
        emoticonItem.compoEmoticon.hide();
    }

    CompoEmoticonList.prototype.show = function(compo){
        this.visible = true;
        this._compoInUse = compo;
        //if(this._compoInUse typeof CompoUserInfoPlay)
        this.x = compo.x + 90;
        this.y = compo.y - 90;
    }

    CompoEmoticonList.prototype.hide = function(){
        this.visible = false;
        this._compoInUse = null;
    }

    /**
     *Destroy UserInterface of this component
     */
    CompoEmoticonList.prototype.dispose = function () {
        GeneralComponent.prototype.dispose.call(this);
        this.bgUser_mc.dispose();
    };

    /**
     *Resize all UserInterface of this component IF NEED
     * @param {Window.Event} event
     */
    CompoEmoticonList.prototype.onResize = function (event) {
        GeneralComponent.prototype.onResize.call(this, event);
    };

    /**
     *Use to animate UserInterface of this component IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    CompoEmoticonList.prototype.onEnterFrame = function (deltaTime) {
        GeneralComponent.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this component IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    CompoEmoticonList.prototype.updateUserInfo = function (userInfo) {
        GeneralComponent.prototype.updateUserInfo.call(this, userInfo);
    };

    return CompoEmoticonList;
});