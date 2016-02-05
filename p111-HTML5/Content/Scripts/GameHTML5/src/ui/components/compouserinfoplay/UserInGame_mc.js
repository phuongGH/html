/**
 * Created by phund on 14/01/2016.
 */
define(function(require)
{
    //Define libs
    //var PIXI = require('../../../../lib/pixi.min');
    var OwnerStatus = require('ui/components/compouserinfoplay/ownermc/OwnerStatus');
    var StarPanelMC = require('ui/components/compouserinfoplay/starlevelmc/StarPanelMC');
    var PopupControl = require('ui/components/compouserinfoplay/popupuserinfoplay/PopupControlUser');
    var EmoticonMC = require('ui/components/compouserinfoplay/emoticonmc/EmoticonMC');
    var Mask_mc = require('ui/components/compouserinfoplay/maskmc/Mask_mc');
     /*var Utilities = require('../../../utils/Utilities');

    var Text = PIXI.Text;
    //Load hình ảnh bằng loader
    var Loader = PIXI.loader;
    var Container = PIXI.Container;
    //Graphic để vẽ hình
    var Graphic = PIXI.Graphics;
    //Sprite để add hình
    var Sprite = PIXI.Sprite;*/
    //Define const

    //Define private variable
   // UserInGame_mc.prototype._compoUserInfoPlayParent = null;
    //var _this;

    //Define public variable
    //UserInGame_mc.prototype.avatarLoader;
    //UserInGame_mc.prototype.starPanel_mc;
    //UserInGame_mc.prototype.txtNickName     = null;
    //UserInGame_mc.prototype.txtCoin         = null;
    //UserInGame_mc.prototype.bgUser_mc;
    //UserInGame_mc.prototype.owner_mc;
    //UserInGame_mc.prototype.iconPopUp;
    //UserInGame_mc.prototype.txtElo;
    //UserInGame_mc.prototype.thang_mc;
    //UserInGame_mc.prototype.thua_mc
    //UserInGame_mc.prototype.emotionLoader;
    /*
    //public var mask_mc:MovieClip;
    UserInGame_mc.prototype.mainMovie;
    UserInGame_mc.prototype.mask_mc;
    UserInGame_mc.prototype.iconShopAsset_mc;*/

    //Define Contructor
    function UserInGame_mc(parent)
    {
        //this.parent = parent;
        this._compoUserInfoPlayParent = parent;
        //Container.call(this);   //This is code for inheritance
        //this.on('added', _onAddedToParent);
        this.init();
    };
    //UserInGame_mc.prototype = Object.create(Container.prototype);          //This is code for inheritance
    UserInGame_mc.prototype.constructor = UserInGame_mc;

    //Define Property

    //Define Function

    //Define private function
    UserInGame_mc.prototype.init = function(){
        this.bgUser_mc = new PIXI.Graphics();
        this.bgUser_mc.beginFill(0x000000,0.4);
        this.bgUser_mc.lineStyle(2,0x292929,0.7);
        this.bgUser_mc.drawRoundedRect(0,0,85,100,7);
        this.bgUser_mc.endFill();
        this._compoUserInfoPlayParent.LayerBG.addChild(this.bgUser_mc);

        this.avatarLoader = new PIXI.Sprite();
        this.avatarLoader.width = 65;
        this.avatarLoader.height = 65;
        this.avatarLoader.x = 3;
        this.avatarLoader.y = 17;
        this._compoUserInfoPlayParent.LayerItem.addChild(this.avatarLoader);

        this.emotionLoader = new EmoticonMC(this);
        //this.emotionLoader.width = 65;
        //this.emotionLoader.height = 65;
        this.emotionLoader.x = 3;
        this.emotionLoader.y = 17;
        this._compoUserInfoPlayParent.LayerEffect.addChild(this.emotionLoader);

        var _style ={font: "13px Arial", fill: 0xff0000, align: "left"};
        this.txtNickName = new PIXI.Text('', _style);
        this.txtNickName.x = 5;
        this._compoUserInfoPlayParent.LayerItem.addChild(this.txtNickName);

        var _style2={font: "13px Arial", fill: 0xffff00, align: "left"};
        this.txtCoin = new PIXI.Text('',_style2);
        this.txtCoin.x = 2;
        this.txtCoin.y = 83;
        this._compoUserInfoPlayParent.LayerItem.addChild(this.txtCoin);

        var _style3 ={font: "13px Arial", fill: 0xffff00, align: "left"};
        this.txtElo = new PIXI.Text('',_style3);
        this.txtElo.x = 15;
        this.txtElo.y = 100;
        this.txtElo.style.align = "center";
        this.txtElo.visible = false;
        this._compoUserInfoPlayParent.LayerItem.addChild(this.txtElo);

        this.owner_mc = new OwnerStatus(this);
        this.owner_mc.visible = false;
        this._compoUserInfoPlayParent.LayerItem.addChild(this.owner_mc);

        this.starPanel_mc = new StarPanelMC(this);
        this.starPanel_mc.x = 64;
        this.starPanel_mc.y = 15;
        this._compoUserInfoPlayParent.LayerItem.addChild(this.starPanel_mc);

        this.effectCoin = new PIXI.Container();
        var _style4 = {font: "20px Arial", fill: 0xff0000, align: "left"};
        this.effectCoin.txtCoin = new PIXI.Text('',_style4);
        this.effectCoin.addChild(this.effectCoin.txtCoin);
        this.effectCoin.x = -30;
        this.effectCoin.y = 66;
        this._compoUserInfoPlayParent.LayerEffect.addChild(this.effectCoin);

        var winDropShadowFilter1 = new PIXI.filters.DropShadowFilter();
        winDropShadowFilter1.blurX = 0;
        winDropShadowFilter1.blurY = 0;
        winDropShadowFilter1.distance = 1;
        winDropShadowFilter1.angle = Math.PI/4;
        winDropShadowFilter1.color = 0x40400F;
        winDropShadowFilter1.strength = 100;
        winDropShadowFilter1.quality = 0.5;

        var winDropShadowFilter2 = new PIXI.filters.DropShadowFilter();
        winDropShadowFilter2.blurX = 2;
        winDropShadowFilter2.blurY = 2;
        winDropShadowFilter2.distance = 2;
        winDropShadowFilter2.angle = Math.PI/4;
        winDropShadowFilter2.color = 0x000000;
        winDropShadowFilter2.strength = 100;
        winDropShadowFilter2.quality = 0.5;

        var winDropShadowFilter3 = new PIXI.filters.DropShadowFilter();
        winDropShadowFilter3.blurX = 3;
        winDropShadowFilter3.blurY = 3;
        winDropShadowFilter3.distance = 3;
        winDropShadowFilter3.angle = Math.PI/4;
        winDropShadowFilter3.color = 0x515100;
        winDropShadowFilter3.strength = 200;
        winDropShadowFilter3.quality = 0.5;

        var wincolorMatrix = new PIXI.filters.ColorMatrixFilter();
        wincolorMatrix.saturate(1,false);

        this.goldWinFilter = [wincolorMatrix,winDropShadowFilter1,winDropShadowFilter2,winDropShadowFilter3];

        var losecolorMatrix = new PIXI.filters.ColorMatrixFilter();
        losecolorMatrix.saturate(-1,false);

        this.goldLoseFilter = [losecolorMatrix,winDropShadowFilter1,winDropShadowFilter2,winDropShadowFilter3];

        this.mask_mc = new Mask_mc(this);
        this.mask_mc.interactive = true;
        this._compoUserInfoPlayParent.LayerPopup.addChild(this.mask_mc);

        this.iconPopUp = new PopupControl(this);
        this.iconPopUp.visible = false;
        //this.iconPopUp.x = 100;
        this._compoUserInfoPlayParent.LayerPopup.addChild(this.iconPopUp);
    }

    UserInGame_mc.prototype.PlayEffectCoin= function(){
        this.effectCoin.visible = true;
        this.effectCoin.alpha = 1;
        this.effectCoin.y = 66;
        TweenLite.to(this.effectCoin, 2, {y:this.effectCoin.y-50, alpha:0});
    }
    return UserInGame_mc;
});