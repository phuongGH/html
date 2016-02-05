/**
 * Created by phund on 19/01/2016.
 */
define(function(require){
    //Define libs
    'use strict';
    var PopupIcon = require('ui/components/compouserinfoplay/popupuserinfoplay/PopupIcon');
    //var CompoUserInfoPlay = require('../CompoUserInfoPlay');
    //var PIXI = require('http://localhost:63342/Test/Content/Scripts/GameHTML5/lib/pixi.min.js');
    //Define const

    //Define private variable
    // var _this;

    //Define public variable

    //Define Layers

    //Define Contructor
    function PopupControlUser(parent)
    {
        //this.parent = parent;
        this.CompoUser = parent._compoUserInfoPlayParent;
        //this.StarPanel = parent;
        PIXI.Container.call(this);   //This is code for inheritance
        //this.on('added', this._onAddedToParent);
        this.init();
    };
    PopupControlUser.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    PopupControlUser.prototype.constructor = PopupControlUser;

    //Define Property
    Object.defineProperties(PopupControlUser.prototype, {
        DUNGDAY:{
            value:"Đứng dậy",
            writable:false
        },
        CHUYENTIEN:{
            value:"Chuyển tiền",
            writable:false
        },
        TAISAN:{
            value:"Tài sản",
            writable:false
        },
        CAMCHAT:{
            value:"Cấm chat",
            writable:false
        },
        KETBAN:{
            value:"Kết bạn",
            writable:false
        },
        CANHAN:{
            value:"Cá nhân",
            writable:false
        },
        BANGHOI:{
            value:"Bang hội",
            writable:false
        },
        BLACKLIST:{
            value:"Black List",
            writable:false
        },
        RIGHT_6:{
            value:1,
            writable:false
        },
        LEFT_6:{
            value:2,
            writable:false
        },
        RIGHT_3:{
            value:3,
            writable:false
        },
        LEFT_3:{
            value:4,
            writable:false
        },
        RIGHT_9:{
            value:5,
            writable:false
        },
        LEFT_9:{
            value:6,
            writable:false
        },
        direction:{
            value:1,
            writable:true
        }
    });


    //Define Function
    PopupControlUser.prototype.init = function(){
        this.mcMask = new PIXI.Sprite();
        var gp = new PIXI.Graphics();
        gp.beginFill(0x000000,0);
        gp.drawRect(0,0,22,105);
        gp.endFill();
        this.mcMask.texture = gp.generateTexture();
        this.mcMask.x = -9.5
        this.addChild(this.mcMask);

        this.popupBG = new PIXI.Graphics();
        this.addChild(this.popupBG);
        //this.drawBG(this.RIGHT_6);
        this.popupHeight = 105;
        this.popupWidth3 = 36;
        this.popupWidth6 = 70;
        this.popupWidth9 = 105;
        this.popupArrowWidth = 10;
        //this.atlasJSON = PIXI.loader.resources["http://localhost:63342/Test/Content/Theme/GameHTML5/images/Atlas/PopupIcon/PopupIconAtlas.json"].textures;
        this.onFocus = false;
        this.iconAsset      = new PopupIcon(this, PopupIcon.IconAsset, this.TAISAN, ResourceManager.Atlas.AtlasPopupIcon.textures.IconAsset, this.ShowIconName.bind(this),this.onIconAsset.bind(this) );
        this.iconCastMoney  = new PopupIcon(this, PopupIcon.IconCastMoney, this.CHUYENTIEN, ResourceManager.Atlas.AtlasPopupIcon.textures.IconCastMoney,this.ShowIconName.bind(this),this.onIconCastMoney.bind(this));
        this.iconLockChat   = new PopupIcon(this, PopupIcon.IconLockChat, this.CAMCHAT, ResourceManager.Atlas.AtlasPopupIcon.textures.IconLockChatLock,this.ShowIconName.bind(this),this.onIconLockChat.bind(this));
        this.iconStandUp    = new PopupIcon(this, PopupIcon.IconStandUp, this.DUNGDAY, ResourceManager.Atlas.AtlasPopupIcon.textures.IconStandUp,this.ShowIconName.bind(this),this.onIconStandUp.bind(this));
        this.iconInviteFriend = new PopupIcon(this, PopupIcon.IconInviteFriend, this.KETBAN, ResourceManager.Atlas.AtlasPopupIcon.textures.IconInviteFriend,this.ShowIconName.bind(this),this.onIconInviteFriend.bind(this));
        this.iconBangHoi    = new PopupIcon(this, PopupIcon.IconBangHoi,this.BANGHOI, ResourceManager.Atlas.AtlasPopupIcon.textures.IconBangHoi,this.ShowIconName.bind(this),this.onIconBangHoi.bind(this));
        this.iconUserInfo   = new PopupIcon(this, PopupIcon.IconUserInfo,this.CANHAN, ResourceManager.Atlas.AtlasPopupIcon.textures.IconUserInfo,this.ShowIconName.bind(this),this.onIconUserInfo.bind(this));
        this.iconBoardBlackList = new PopupIcon(this, PopupIcon.IconBoardBlackList,this.BLACKLIST, ResourceManager.Atlas.AtlasPopupIcon.textures.IconBoardBlackList,this.ShowIconName.bind(this),this.onIconBoardBlackList.bind(this));

        this.addChild(this.iconAsset);
        this.addChild(this.iconCastMoney);
        this.addChild(this.iconLockChat);
        this.addChild(this.iconStandUp);
        this.addChild(this.iconInviteFriend);
        this.addChild(this.iconBangHoi);
        this.addChild(this.iconUserInfo);
        this.addChild(this.iconBoardBlackList);

        this.interactive = true;
        this.mouseover = this.onOver.bind(this);
        this.mouseout = this.onOut.bind(this);
        this.isClick = false;
        this.isLockChat = false;

        this.nameToolTip = new PIXI.Sprite();
        var tgp = new PIXI.Graphics();
        tgp.beginFill(0xffffff,0.8);
        tgp.lineStyle(1,0x0505050,0.5);
        tgp.drawRoundedRect(0,0,60.75,20.05,3);
        tgp.endFill();
        this.nameToolTip.texture = tgp.generateTexture();
        var _style4 = {font: "9px Arial", fill: 0x000000, align:"center"};
        var IconName = new PIXI.Text('',_style4);

        //IconName.pivot = new PIXI.Point(-15,-5);
        //IconName.width = 60.75;
        //IconName.height = 20.05;
        IconName.x = 12;
        IconName.y = 5;
        this.nameToolTip.IconName = IconName;
        this.nameToolTip.addChild(IconName);
        this.nameToolTip.visible = false;
        this.nameToolTip.interactive = false;
        this.nameToolTip.hitArea = new PIXI.Rectangle(0,0,0,0);
        this.addChild(this.nameToolTip);

    }

    PopupControlUser.prototype.onOut = function(){
        this.visible = false;
        this.isClick = false;
        this.nameToolTip.visible = false;
        this.onFocus = false;

    }

    PopupControlUser.prototype.onIconBoardBlackList = function(){
        console.log('onIconBoardBlackList');
        if(this.CompoUser.CallBackBoardBlackList != null){
            this.CompoUser.CallBackBoardBlackList(1,this.CompoUser.NickName, this.CompoUser.Coin, this.CompoUser.UserId);
        }
        /*dispatchEvent(new IconUserFullEvent(IconUserFullEvent.BOARD_BLACK_LIST,
            {
                Command:1, // Add User
                Name:NickName,
                Coin:Coin,
                UserId: UserId
            },true));*/
    }

    PopupControlUser.prototype.onIconBangHoi = function(){
        console.log('onIconBangHoi');
        if(this.CompoUser.CallBackJoinBangHoi != null){
            this.CompoUser.CallBackJoinBangHoi(this.CompoUser.UserId);
        }
        //dispatchEvent(new IconUserFullEvent(IconUserFullEvent.JOIN_GROUP, { UserId: UserId }, true));
    }

    PopupControlUser.prototype.onIconUserInfo = function(){
        console.log('onIconUserInfo');
        if(this.CompoUser.CallBackShowUserInfoAbstract != null){
            this.CompoUser.CallBackShowUserInfoAbstract(this.CompoUser.UserId);
        }
        /*dispatchEvent(new IconUserFullEvent(IconUserFullEvent.USER_INFO, {
            UserId:UserId
        }, true));*/
    }

    PopupControlUser.prototype.onIconInviteFriend = function(){
        console.log('onIconInviteFriend');
        if(this.CompoUser.CallBackMakeFriend != null){
            this.CompoUser.CallBackMakeFriend(this.CompoUser.UserId, this.CompoUser.NickName);
        }
        /*this.dispatchEvent(new MakeFriendEvent(MakeFriendEvent.MAKE_FRIEND, {
            UserId: UserId,
            NickName: NickName
            },true));*/
    }

    PopupControlUser.prototype.onIconStandUp = function(){
        console.log('onIconStandUp');
        if(this.CompoUser.CallBackStandUp != null){
            this.CompoUser.CallBackStandUp(this.CompoUser.UserId);
        }
         //dispatchEvent(new IconUserFullEvent(IconUserFullEvent.STAND_UP, { UserId: UserId }, true));
    }

    PopupControlUser.prototype.onIconLockChat = function(){
        console.log('onIconLockChat');
        if(this.isLockChat == false){
            this.iconLockChat.changeIcon(ResourceManager.Atlas.AtlasPopupIcon.textures.IconLockChatLock);
            this.isLockChat = true;
        }
        else{
            this.iconLockChat.changeIcon(ResourceManager.Atlas.AtlasPopupIcon.textures.IconLockChatRelease);
            this.isLockChat = false;
        }
        /*var obj:MovieClip = e.currentTarget as MovieClip;

        if (obj != null)
        {
            if (obj.currentFrame == 1)
            {
                isLockChat = false;
                obj.gotoAndStop(2);
            }
            else
            {
                isLockChat = true;
                obj.gotoAndStop(1);
            }
        }

        dispatchEvent(new IconUserFullEvent(IconUserFullEvent.LOCK_CHAT, { }, true));*/
    }

    PopupControlUser.prototype.onIconCastMoney = function(){
        console.log('onIconCastMoney');
        if(this.CompoUser.CallBackOpenPopupTransferMoney != null){
            this.CompoUser.CallBackOpenPopupTransferMoney(this.CompoUser.UserId);
        }
       //dispatchEvent(new IconUserFullEvent(IconUserFullEvent.CAST_MONEY, { UserId: UserId }, true));
    }

    PopupControlUser.prototype.onIconAsset = function(){
        console.log('onIconAsset');
        if(this.CompoUser.CallBackShowPersonalAssets != null){
            this.CompoUser.CallBackShowPersonalAssets(this.CompoUser.UserId);
        }


    }

    /**
     *
     * @param {String} _name
     * @param {PopupIcon} _target
     * @constructor
     */
    PopupControlUser.prototype.ShowIconName = function(_name, _target){
        if(this.nameToolTip != null)
        {
            var objs = [];
            if (this.iconAsset.visible) objs.push(this.iconAsset);
            if (this.iconCastMoney.visible) objs.push(this.iconCastMoney);
            if (this.iconLockChat.visible) objs.push(this.iconLockChat);
            if (this.iconStandUp.visible) objs.push(this.iconStandUp);
            if (this.iconInviteFriend.visible) objs.push(this.iconInviteFriend);
            if (this.iconBangHoi.visible) objs.push(this.iconBangHoi);
            if (this.iconUserInfo.visible) objs.push(this.iconUserInfo);
            if (this.iconBoardBlackList.visible) objs.push(this.iconBoardBlackList);
            this.nameToolTip.visible = true;
            this.nameToolTip.IconName.text = _name;
            this.nameToolTip.IconName.x = (60.75 -  this.nameToolTip.IconName.width)/2;
            this.nameToolTip.x = _target.x - 15;
            this.nameToolTip.y = _target.y - 20;
            if (this.CompoUser.IndexStartFromMe == 3)
            {
                if (_target.iconName == objs[0].iconName )
                {
                    this.nameToolTip.x = _target.x - this.nameToolTip.width;
                    this.nameToolTip.y = _target.y;
                }
                if (_target.iconName == objs[1].iconName ) {
                    this.nameToolTip.x = _target.x + _target.width;
                    this.nameToolTip.y = _target.y;
                }
                if (objs.length > 6)
                {
                    if (_target.iconName == objs[2].iconName)
                    {
                        this.nameToolTip.x = _target.x + _target.width;
                        this.nameToolTip.y = _target.y;
                    }
                }
            }

            /*var gameLoader:GameLoader = GameLoader.getInstance();
            if (gameLoader.global.gameID == GlobalConstants.TaiXiuId)
            {
                nameToolTip.x = e.target.x + 60;
                nameToolTip.y = e.target.y + 15;
            }*/
        }

    }

    PopupControlUser.prototype.onOver = function(){
        this.visible = true;
        this.onFocus = true;
        //this.draw();
    }
    //Define private function

    /*PopupControlUser.prototype._onAddedToParent = function(parent){
        this.init();
    }*/

    PopupControlUser.prototype.draw = function(){
        var objs = [];
        var t1 = 0;
        var t2 = 0;
        var ix = 4;
        var iy = 3;
        if (this.iconAsset.visible) objs.push(this.iconAsset);
        if (this.iconCastMoney.visible) objs.push(this.iconCastMoney);
        if (this.iconLockChat.visible) objs.push(this.iconLockChat);
        if (this.iconStandUp.visible) objs.push(this.iconStandUp);
        if (this.iconInviteFriend.visible) objs.push(this.iconInviteFriend);
        if (this.iconBangHoi.visible) objs.push(this.iconBangHoi);
        if (this.iconUserInfo.visible) objs.push(this.iconUserInfo);
        if (this.iconBoardBlackList.visible) objs.push(this.iconBoardBlackList);
        if (objs.length > 3)
        {
            if (objs.length > 6)
            {
                if (this.direction == this.CompoUser.RIGHT)
                {
                    this.drawBG(this.RIGHT_9);

                    for (var i = 0; i < objs.length; i++)
                    {
                        t1 = i % 3;
                        t2 = Math.floor(i / 3);
                        objs[i].x = 12 + t1 * (objs[i].width + ix);
                        objs[i].y = 4 + t2 * (objs[i].height + iy);
                    }
                }
                else
                {
                    this.drawBG(this.LEFT_9);

                    for (i = 0; i < objs.length; i++)
                    {
                        t1 = i % 3;
                        t2 = Math.floor(i / 3);
                        objs[i].x = - 102 + t1 * (objs[i].width + ix);
                        objs[i].y = 4 + t2 * (objs[i].height + iy);
                    }
                }
            }
            else
            {
                if (this.direction == this.CompoUser.RIGHT)
                {
                    this.drawBG(this.RIGHT_6);

                    for (i = 0; i < objs.length; i++)
                    {
                        t1 = i % 2;
                        t2 = Math.floor(i / 2);

                        objs[i].x = 12 + t1 * (objs[i].width + ix);
                        objs[i].y = 4 + t2 * (objs[i].height + iy);
                    }
                }
                else
                {
                    this.drawBG(this.LEFT_6);

                    for (i = 0; i < objs.length; i++)
                    {
                        t1 = i % 2;
                        t2 = Math.floor(i / 2);
                        objs[i].x = - 67 + t1 * (objs[i].width + ix);
                        objs[i].y = 4 + t2 * (objs[i].height + iy);
                    }
                }
            }
        }
        else if (objs.length == 1)
        {
            if (this.direction == this.CompoUser.RIGHT)
            {
                this.drawBG(this.RIGHT_3);
                objs[0].x = 12;
                objs[0].y = 4 + (objs[0].height + iy);
            }
            else
            {
                this.drawBG(this.LEFT_3);

                for (i = 0; i < objs.length; i++)
                {
                    objs[0].x = -33;
                    objs[0].y = 4 + (objs[i].height + iy);
                }
            }
        }
        else
        {
            if (this.direction == this.CompoUser.RIGHT)
            {
                this.drawBG(this.RIGHT_3);

                for (i = 0; i < objs.length; i++)
                {
                    objs[i].x = 12;
                    objs[i].y = 4 + i * (objs[i].height + iy);
                }
            }
            else
            {
                this.drawBG(this.LEFT_3);

                for (i = 0; i < objs.length; i++)
                {
                    objs[i].x = -33;
                    objs[i].y = 4 + i * (objs[i].height + iy);
                }
            }
        }
    }

    PopupControlUser.prototype.drawBG = function(_type){
        this.popupBG.clear();
        switch (_type){
            case this.RIGHT_6:
            {
                var p = new PIXI.Polygon(0,42,this.popupArrowWidth,30,this.popupArrowWidth,55);
                this.popupBG.beginFill(0x000B15, 0.8);
                this.popupBG.lineStyle(2,0x365269,0);
                this.popupBG.drawRoundedRect(this.popupArrowWidth,0,this.popupWidth6,this.popupHeight,5);
                this.popupBG.drawPolygon(p);

                this.popupBG.endFill();

                this.popupBG.beginFill(0x000B15, 0);
                this.popupBG.lineStyle(2,0x365269,1);
                this.popupBG.moveTo(0,42);
                this.popupBG.lineTo(this.popupArrowWidth,30);
                this.popupBG.moveTo(this.popupArrowWidth,30);
                this.popupBG.lineTo(this.popupArrowWidth,0);
                this.popupBG.moveTo(this.popupArrowWidth,0);
                this.popupBG.lineTo(this.popupArrowWidth+ this.popupWidth6,0);
                this.popupBG.moveTo(this.popupArrowWidth+ this.popupWidth6,0);
                this.popupBG.lineTo(this.popupArrowWidth+ this.popupWidth6,this.popupHeight);
                this.popupBG.moveTo(this.popupArrowWidth+ this.popupWidth6,this.popupHeight);
                this.popupBG.lineTo(this.popupArrowWidth,this.popupHeight);
                this.popupBG.moveTo(this.popupArrowWidth,this.popupHeight);
                this.popupBG.lineTo(this.popupArrowWidth,55);
                this.popupBG.moveTo(0,42);
                this.popupBG.lineTo(this.popupArrowWidth,55);
                this.popupBG.endFill();
            }
                break;
            case this.LEFT_6:
            {
                var p = new PIXI.Polygon(0, 30, this.popupArrowWidth, 42, 0, 55);
                this.popupBG.beginFill(0x000B15, 0.8);
                this.popupBG.lineStyle(2, 0x365269, 0);
                this.popupBG.drawRoundedRect(-this.popupWidth6, 0, this.popupWidth6, this.popupHeight, 5);
                this.popupBG.drawPolygon(p);

                this.popupBG.endFill();

                this.popupBG.beginFill(0x000B15, 0);
                this.popupBG.lineStyle(2, 0x365269, 1);
                this.popupBG.moveTo(0, 30);
                this.popupBG.lineTo(this.popupArrowWidth, 42);
                this.popupBG.moveTo(0, 30);
                this.popupBG.lineTo(0, 0);
                this.popupBG.moveTo(0, 0);
                this.popupBG.lineTo(-this.popupWidth6, 0);
                this.popupBG.moveTo(-this.popupWidth6, 0);
                this.popupBG.lineTo(-this.popupWidth6, this.popupHeight);
                this.popupBG.moveTo(-this.popupWidth6, this.popupHeight);
                this.popupBG.lineTo(0, this.popupHeight);
                this.popupBG.moveTo(0, this.popupHeight);
                this.popupBG.lineTo(0, 55);
                this.popupBG.moveTo(0, 55);
                this.popupBG.lineTo(this.popupArrowWidth, 42);
                this.popupBG.endFill();
            }
                break;
            case this.RIGHT_3:
            {
                var p = new PIXI.Polygon(0, 42, this.popupArrowWidth, 30, this.popupArrowWidth, 55);
                this.popupBG.beginFill(0x000B15, 0.8);
                this.popupBG.lineStyle(2, 0x365269, 0);
                this.popupBG.drawRoundedRect(this.popupArrowWidth, 0, this.popupWidth3, this.popupHeight, 5);
                this.popupBG.drawPolygon(p);

                this.popupBG.endFill();

                this.popupBG.beginFill(0x000B15, 0);
                this.popupBG.lineStyle(2, 0x365269, 1);
                this.popupBG.moveTo(0, 42);
                this.popupBG.lineTo(this.popupArrowWidth, 30);
                this.popupBG.moveTo(this.popupArrowWidth, 30);
                this.popupBG.lineTo(this.popupArrowWidth, 0);
                this.popupBG.moveTo(this.popupArrowWidth, 0);
                this.popupBG.lineTo(this.popupArrowWidth + this.popupWidth3 , 0);
                this.popupBG.moveTo(this.popupArrowWidth + this.popupWidth3, 0);
                this.popupBG.lineTo(this.popupArrowWidth + this.popupWidth3, this.popupHeight);
                this.popupBG.moveTo(this.popupArrowWidth + this.popupWidth3, this.popupHeight);
                this.popupBG.lineTo(this.popupArrowWidth, this.popupHeight);
                this.popupBG.moveTo(this.popupArrowWidth, this.popupHeight);
                this.popupBG.lineTo(this.popupArrowWidth, 55);
                this.popupBG.moveTo(0, 42);
                this.popupBG.lineTo(this.popupArrowWidth, 55);
                this.popupBG.endFill();
            }
                break;
            case this.LEFT_3:
            {
                var p = new PIXI.Polygon(0, 30, this.popupArrowWidth, 42, 0, 55);
                this.popupBG.beginFill(0x000B15, 0.8);
                this.popupBG.lineStyle(2, 0x365269, 0);
                this.popupBG.drawRoundedRect(-this.popupWidth3, 0, this.popupWidth3, this.popupHeight, 5);
                this.popupBG.drawPolygon(p);

                this.popupBG.endFill();

                this.popupBG.beginFill(0x000B15, 0);
                this.popupBG.lineStyle(2, 0x365269, 1);
                this.popupBG.moveTo(0, 30);
                this.popupBG.lineTo(this.popupArrowWidth, 42);
                this.popupBG.moveTo(0, 30);
                this.popupBG.lineTo(0, 0);
                this.popupBG.moveTo(0, 0);
                this.popupBG.lineTo(-this.popupWidth3, 0);
                this.popupBG.moveTo(-this.popupWidth3, 0);
                this.popupBG.lineTo(-this.popupWidth3, this.popupHeight);
                this.popupBG.moveTo(-this.popupWidth3, this.popupHeight);
                this.popupBG.lineTo(0, this.popupHeight);
                this.popupBG.moveTo(0, this.popupHeight);
                this.popupBG.lineTo(0, 55);
                this.popupBG.moveTo(0, 55);
                this.popupBG.lineTo(this.popupArrowWidth, 42);
                this.popupBG.endFill();
            }
                break;
            case this.RIGHT_9:
            {
                var p = new PIXI.Polygon(0, 42, this.popupArrowWidth, 30, this.popupArrowWidth, 55);
                this.popupBG.beginFill(0x000B15, 0.8);
                this.popupBG.lineStyle(2, 0x365269, 0);
                this.popupBG.drawRoundedRect(this.popupArrowWidth, 0, this.popupWidth9, this.popupHeight, 5);
                this.popupBG.drawPolygon(p);

                this.popupBG.endFill();

                this.popupBG.beginFill(0x000B15, 0);
                this.popupBG.lineStyle(2, 0x365269, 1);
                this.popupBG.moveTo(0, 42);
                this.popupBG.lineTo(this.popupArrowWidth, 30);
                this.popupBG.moveTo(this.popupArrowWidth, 30);
                this.popupBG.lineTo(this.popupArrowWidth, 0);
                this.popupBG.moveTo(this.popupArrowWidth, 0);
                this.popupBG.lineTo(this.popupArrowWidth + this.popupWidth9 , 0);
                this.popupBG.moveTo(this.popupArrowWidth + this.popupWidth9, 0);
                this.popupBG.lineTo(this.popupArrowWidth + this.popupWidth9, this.popupHeight);
                this.popupBG.moveTo(this.popupArrowWidth + this.popupWidth9, this.popupHeight);
                this.popupBG.lineTo(this.popupArrowWidth, this.popupHeight);
                this.popupBG.moveTo(this.popupArrowWidth, this.popupHeight);
                this.popupBG.lineTo(this.popupArrowWidth, 55);
                this.popupBG.moveTo(0, 42);
                this.popupBG.lineTo(this.popupArrowWidth, 55);
                this.popupBG.endFill();
            }
                break;
            case this.LEFT_9:
            {
                var p = new PIXI.Polygon(0, 30, this.popupArrowWidth, 42, 0, 55);
                this.popupBG.beginFill(0x000B15, 0.8);
                this.popupBG.lineStyle(2, 0x365269, 0);
                this.popupBG.drawRoundedRect(-this.popupWidth9, 0, this.popupWidth9, this.popupHeight, 5);
                this.popupBG.drawPolygon(p);

                this.popupBG.endFill();

                this.popupBG.beginFill(0x000B15, 0);
                this.popupBG.lineStyle(2, 0x365269, 1);
                this.popupBG.moveTo(0, 30);
                this.popupBG.lineTo(this.popupArrowWidth, 42);
                this.popupBG.moveTo(0, 30);
                this.popupBG.lineTo(0, 0);
                this.popupBG.moveTo(0, 0);
                this.popupBG.lineTo(-this.popupWidth9, 0);
                this.popupBG.moveTo(-this.popupWidth9, 0);
                this.popupBG.lineTo(-this.popupWidth9, this.popupHeight);
                this.popupBG.moveTo(-this.popupWidth9, this.popupHeight);
                this.popupBG.lineTo(0, this.popupHeight);
                this.popupBG.moveTo(0, this.popupHeight);
                this.popupBG.lineTo(0, 55);
                this.popupBG.moveTo(0, 55);
                this.popupBG.lineTo(this.popupArrowWidth, 42);
                this.popupBG.endFill();
            }
                break;
        }

    }

    return PopupControlUser;
});