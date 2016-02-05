/**
 * Created by phund on 12/01/2016.
 */
define(function(require)
{

    //Define libs
    //var PIXI = require('../../../../lib/pixi.min');
    //var AppInfo = require('../../../utils/AppInfo');
    //var Utilities = require('../../../utils/Utilities');
    var UserInGame_mc = require('ui/components/compouserinfoplay/UserInGame_mc');
    var CompoClock = require('ui/components/compouserinfoplay/compoclock/CompoClock');
    var CompoToolTipChat = require('ui/components/compotooltipchat/CompoToolTipChat');
    var Texture = PIXI.Texture;
    //Load hình ảnh bằng loader
    var Loader = PIXI.loader;
    var Container = PIXI.Container;
    //Graphic để vẽ hình
    var Graphic = PIXI.Graphics;
    //Sprite để add hình
    var Sprite = PIXI.Sprite;
    CompoUserInfoPlay.prototype = Object.create(Container.prototype);          //This is code for inheritance
    CompoUserInfoPlay.prototype.constructor = CompoUserInfoPlay;
    //Define const
    CompoUserInfoPlay.LEFT  = 1;
    CompoUserInfoPlay.RIGHT = 2;

    //Define private variable
    CompoUserInfoPlay.prototype._isClick                = false;
    CompoUserInfoPlay.prototype._coinToAdd              = 0;
    CompoUserInfoPlay.prototype._maxAddCoin             = 0;
    //var _gameLoader = AppInfo;

    //Define public variable
    //CompoUserInfoPlay.prototype.emotionTime             = 10000;
    //CompoUserInfoPlay.prototype.largeEmotionPath        = "";
    //Define Layers

    //Define Contructor
    function CompoUserInfoPlay(_preloader)
    {
        this.LEFT  = 1;
        this.RIGHT = 2;
        this.preloader = _preloader;
        Container.call(this);   //This is code for inheritance
        //this.on('added', _onAddedToParent);
        this.LayerBG = new Container();
        this.addChild(this.LayerBG);

        this.LayerItem = new Container();
        this.addChild(this.LayerItem);
        this.LayerItem.interactive = true;

        this.LayerPopup = new Container();
        this.LayerPopup.interactive = true;
        this.addChild(this.LayerPopup);

        this.LayerEffect = new Container();
        this.LayerEffect.hitArea = new PIXI.Rectangle(0,0,0,0);
        this.addChild(this.LayerEffect);

        this.main_movie = new UserInGame_mc(this);
        this.timerEmotion = new PIXI.ticker.Ticker();
        this.timerEmotion.add(this._onTimerEmotionComplete,this);
        this.interactive = true;

        this.loader = new PIXI.loaders.Loader();
        //this.mousedown = this.onDown.bind(this);
        this.clock_mc = new CompoClock();
        this.LayerEffect.addChild(this.clock_mc);

        this.tooltipChat_mc = new CompoToolTipChat(this);
        this.LayerEffect.addChild(this.tooltipChat_mc);

    };
    //Define Property

    Object.defineProperties(CompoUserInfoPlay.prototype, {

        UserType:{
            value:0,
            writable:true
        },

        BangName:{
            value: "",
            writable:true
        },

        LevelBang:{
            value: 0,
            writable:true
        },

        IsBangChu:{
            value: 0,
            writable:true
        },

        PositionSeat:{
            value: -1,
            writable:true
        },

        IsMe:{
            value:false,
            writable:true
        },

        _nickName:{
            value:"",
            writable:true
        },
        NickName: {
            get: function () {
                return this._nickName;
            },
            set: function (newValue) {
                this._nickName = newValue;

                /*main_movie.iconPopUp.NickName = value;
                if (gameLoader.global.isVongGiauMat())
                    this.nickName =  gameLoader.global.defaultNickName;
                */
                if (this._nickName.length > 12)
                {
                    this.main_movie.txtNickName.text = this._nickName.substr(0, 12) + "..";
                }
                else
                {
                    this.main_movie.txtNickName.text = this._nickName;
                }
            }
        },

        _coin:{
            value:0,
            writable:true
        },
        Coin: {
            get: function () {
                return this._coin;
            },
            set: function (newValue) {
                this._coin = newValue;

                //main_movie.iconPopUp.Coin = newValue;
                this.main_movie.txtCoin.text = this._currency + " " +  Utilities.Number.FormatCoin(newValue.toString());

                /*if (gameLoader.global.isVongGiauMat())
                 {
                     if (gameLoader.global.gameID == GlobalConstants.XiToGameId ||
                     gameLoader.global.gameID == GlobalConstants.LiengId ||
                     gameLoader.global.gameID == GlobalConstants.PokerGameId || gameLoader.global.MyInfo.userId == this.userId)
                     {
                         main_movie.txtCoin.visible = true;
                     }
                     else
                     {
                         main_movie.txtCoin.visible = false;
                     }
                 }*/
            }
        },

        _avatar:{
            value:"",
            writable:true
        },
        Avatar:{
            get: function()
            {
                return this._avatar;
            },
            set: function(newValue)
            {

                //if (gameLoader.global.isVongGiauMat())
                //    newValue = gameLoader.global.avatarPath + gameLoader.global.defaultAvatar;
                if (newValue != this._avatar)
                {
                    this._avatar = newValue;
                    this.ShowAvatar(this._avatar);
                }
            }

        },

        _level:{
            value:0,
            writable:true
        },
        Level:{
            get: function()
            {
                return this._level;
            },
            set: function(newValue)
            {
                this._level = newValue;
                this._SetStar();
            }
        },

        _toolTipChatPosition:{
            value:CompoToolTipChat.TOP_RIGHT,
            writable:true
        },
        ToolTipChatPosition:{
            get: function()
            {
                return this._toolTipChatPosition;
            },
            set: function(newValue)
            {
                this._toolTipChatPosition = newValue;
                this.tooltipChat_mc.Orient = newValue;
                switch(newValue)
                {
                    case CompoToolTipChat.BOTTOM_RIGHT:
                        this.tooltipChat_mc.x = 0;
                        this.tooltipChat_mc.y = 20;
                        break;
                    case CompoToolTipChat.BOTTOM_LEFT:
                        this.tooltipChat_mc.x = 0;
                        this.tooltipChat_mc.y = 20;
                        break;
                    case CompoToolTipChat.TOP_RIGHT:
                        this.tooltipChat_mc.x = 0;
                        this.tooltipChat_mc.y = 15;
                        break;
                    case CompoToolTipChat.TOP_LEFT:
                        this.tooltipChat_mc.x = 0;
                        this.tooltipChat_mc.y = 15;
                        break;
                }
            }
        },

        /*_popUpDirection:{
            value:CompoUserInfoPlay.LEFT,
            writable:true
        },*/
        PopUpDirection:{
            get: function () {
                return this.main_movie.iconPopUp.direction;
            },
            set: function (newValue) {
                //this._popUpDirection = newValue;
                this.main_movie.iconPopUp.direction = newValue;
                this.main_movie.iconPopUp.draw();

                if (newValue == CompoUserInfoPlay.LEFT)
                {
                    this.main_movie.iconPopUp.x = -10;
                }
                else
                {
                    this.main_movie.iconPopUp.x = 90;
                }
            }
        },

        _indexStartFromMe:{
            value:1,
            writable:true
        },
        IndexStartFromMe:{
            get: function () {
                return this._indexStartFromMe;
            },
            set: function (newValue) {
                this._indexStartFromMe = newValue;
                //main_movie.iconPopUp.indexStartFromMe = _indexStartFromMe;
            }
        },

        _currency:{
            value:"G",
            writable:true
        },
        currency:{
            get:function(){
                return this._currency;
            },

            set:function(newValue){
                this._currency = newValue;
                this.Coin = this._coin;
            }
        },

        _noPlayer:{
            value:1,
            writable:true
        },
        NoPlayer:{
            get:function(){
                return this._noPlayer;
            },

            set:function(newValue){
                this._noPlayer = newValue;
                this.clock_mc.playerNo = value;
                if (this._noPlayer > 0)
                {
                    this.main_movie.alpha = 1;
                }
                else
                {
                    this.main_movie.alpha = 0.5;
                }

                //if(categoryMc)
                    //categoryMc.setProperties( { alpha:this.main_movie.alpha} );
            }
        },

        _sex:{
            value:"",
            writable:true
        },
        Sex:{
            get:function(){
                return this._sex;
            },
            set:function(newValue){
                this._sex = newValue;
                var textColor = '#FFFF00';
                //if (gameLoader.global.isVongGiauMat())
                //    textColor = 0xffff00;
                this.main_movie.txtNickName.style.fill = textColor;
            }
        },

        _elo:{
            value:"",
            writable:true
        },
        Elo:{
            get:function(){
                return this._elo;
            },
            set:function(newValue){
                this._elo = newValue;
                this.main_movie.txtElo.visible = true;
                this.main_movie.txtElo.text = newValue + " Elo";
                //var textColor = 0xffff00;
                //main_movie.txtElo.textColor = textColor;
            }
        },

        _isOwner:{
            value:false,
            writable:true
        },
        IsOwner:{
            get: function(){
                return this._isOwner;
            },
            set: function(newValue){
                this._isOwner = newValue;
                if (newValue)
                {
                    this.main_movie.owner_mc.visible = true;
                    this.main_movie.owner_mc.star1.playEffect();
                }
                else
                {
                    this.main_movie.owner_mc.visible = false;
                    this.main_movie.owner_mc.star1.stopEffect();
                }
            }
        },

        _userId:{
            value:0,
            writable:true
        },
        UserId:{
            get: function(){
                return this._userId;
            },
            set: function(newValue){
                this._userId = newValue;
                //main_movie.iconPopUp.UserId = value;
                //drawIConEvent(gameLoader.global.getEmotionLink(value, _AssociationId));
            }
        },

        _AssociationId:{
            value:0,
            writable:true
        },
        AssociationId:{
            get: function(){
                return this._AssociationId;
            },
            set: function(newValue){
                this._AssociationId = newValue;
                //drawIConEvent(gameLoader.global.getEmotionLink(UserId,value));
            }
        },

        ItemBetPos:{
            get:function(){
                return this._itemBetPos;
            },
            set:function(newValue){
                this._itemBetPos = newValue;
                if (newValue == LEFT)
                {
                    //main_movie.itemBetLoader.x = -19;
                }
                else
                {
                    //main_movie.itemBetLoader.x = 76;
                }
            }
        },

        ItemBetPath:{
            get:function(){
                return this._itemBetPath;
            },
            set: function(newValue){

                if (newValue.length == 0)
                {
                    //main_movie.itemBetLoader.source = null;
                }
                else
                {
                    if (this._itemBetPath != newValue)
                    {
                        //main_movie.itemBetLoader.source = newValue;
                        this._itemBetPath = newValue;
                    }
                }
            }
        },

        _isAssWinnerTournament:{
            value:false,
            writable:true
        },
        IsAssWinnerTournament:{
            get:function(){
                return this._isAssWinnerTournament;
            },
            set:function(newValue){
                this._isAssWinnerTournament = newValue;
                if (this._isAssWinnerTournament == true) {
                    showEffectWinnerTournament(true,false);
                }
            }
        },

        _isUserWinnerTournament:{
            value:false,
            writable:true
        },
        IsUserWinnerTournament:{
            get: function(){
                return this._isUserWinnerTournament;
            },
            set:function(newValue){
                this._isUserWinnerTournament = newValue;
                if (this._isUserWinnerTournament == true) {
                    showEffectWinnerTournament(false,true);
                }
            }
        },

        _myInfoUserType:{
            value:0,
            writable:true
        },
        MyInfoUserType:{
            get: function(){
                return this._myInfoUserType;
            },
            set:function(newValue){
                this._myInfoUserType = newValue;
                //user Admin
                if (newValue == 55 || newValue == 44)
                {
                    /*var delete_mc:CompoPUBKickOut_mc = this.getChildByName("delete_mc") as CompoPUBKickOut_mc;
                    if (!delete_mc)
                    {
                        delete_mc = new CompoPUBKickOut_mc;
                        delete_mc.name = "delete_mc";
                        delete_mc.x = 75;
                        delete_mc.y = 8.4;
                        delete_mc.buttonMode = true;
                        delete_mc.addEventListener(MouseEvent.CLICK, onClick, false, 0, true);
                        this.addChild(delete_mc);
                    }
                    delete_mc.visible = true;
                    if (UserType == 55 || UserType == 44)
                    {
                        delete_mc.visible = false;
                    }*/
                }
            }
        },

        _categoryUser:{
            value:'',
            writable:true
        },
        CategoryUser:{
            get:function(){
                return this._categoryUser;
            },
            set:function(newValue){
                this._categoryUser = newValue;
                /*if (categoryMc)
                {
                    if (gameLoader.global.isVongGiauMat() == false)
                    {
                        categoryMc.gotoAndStop(value);
                    }
                    else
                        categoryMc.gotoAndStop(1);
                }*/
            }


        },

        BoardOwnerIconPosition:{
            set:function(value){
                if (value == CompoUserInfoPlay.LEFT)
                {
                    this.main_movie.owner_mc.x = 0;
                }
                else
                {
                    this.main_movie.owner_mc.x = 105;
                }
            }
        },

        EnableIconAsset:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconAsset.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconInviteFriend:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconInviteFriend.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconStandUp:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconStandUp.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconCastMoney:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconCastMoney.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconLockChat:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconLockChat.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconBangHoi:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconBangHoi.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconUserInfo:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconUserInfo.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }
        },

        EnableIconBoardBlackList:{
            set:function(newValue){
                this.main_movie.iconPopUp.iconBoardBlackList.visible = newValue;
                //this.main_movie.iconPopUp.draw();
            }

        },

        CallBackEmotionListEventLoad:{
            value:null,
            writable:true
        },

        CallBackShowPersonalAssets:{
            value:null,
            writable:true
        },

        CallBackOpenPopupTransferMoney:{
            value:null,
            writable:true
        },

        CallBackStandUp:{
            value:null,
            writable:true
        },

        CallBackMakeFriend:{
            value:null,
            writable:true
        },

        CallBackShowUserInfoAbstract:{
            value:null,
            writable:true
        },

        CallBackJoinBangHoi:{
            value:null,
            writable:true
        },

        CallBackBoardBlackList:{
            value:null,
            writable:true
        },

        _callBackTimeClockUpdate:{
            value:null,
            writable:true
        },
        CallBackTimeClockUpdate:{
            get:function(){
                //"use strict";
                return this._callBackTimeClockUpdate;
            },
            set:function(newValue){
                this._callBackTimeClockUpdate = newValue;
                this.clock_mc.CallBackFunctionOnUpdate = this._callBackTimeClockUpdate;
            }
        },

        _callBackTimeClockComplete:{
            value:null,
            writable:true
        },
        CallBackTimeClockComplete:{
            get:function(){
                //"use strict";
                return this._callBackTimeClockComplete;
            },
            set:function(newValue){
                this._callBackTimeClockComplete = newValue;
                this.clock_mc.CallBackFunctionOnComplete = this._callBackTimeClockComplete;
            }
        },

    });

    //Define Function
    CompoUserInfoPlay.prototype.updatePopupIcon = function(){
        this.main_movie.iconPopUp.draw();
    }

    CompoUserInfoPlay.prototype.updateCoinWithEffect = function(coinToAdd, maxAddCoin){
        /*if (timerDisplayScore.running)
            return;

        _coinToAdd = coinToAdd;
        _maxAddCoin = maxAddCoin;
        timerDisplayScore.addEventListener(TimerEvent.TIMER, onTimerDisplayCoin);
        timerDisplayScore.reset();
        timerDisplayScore.start();*/
    }

    //Define private function
    // CompoUserInfoPlay.prototype._onAddedToParent = function(parent){

    /**
     *
     * @param {Number} _coin
     * @param {String} _note
     * @constructor
     */
    CompoUserInfoPlay.prototype.ShowEffectCoin = function(_coin, _note){
        if (_coin >= 0)
        {
            this.main_movie.effectCoin.txtCoin.style.fill = '#e9d30c';
            this.main_movie.effectCoin.txtCoin.text = "+" + Utilities.Number.FormatCoin(_coin.toString()) + _note ;
            //this.main_movie.glowFilterGoldWin.textureWidth = this.main_movie.effectCoin.txtCoin.width;
            //this.main_movie.glowFilterGoldWin.textureHeight = this.main_movie.effectCoin.txtCoin.height;
            this.main_movie.effectCoin.txtCoin.filters = this.main_movie.goldWinFilter;
        }
        else
        {
            this.main_movie.effectCoin.txtCoin.style.fill = '#ffffff';
            this.main_movie.effectCoin.txtCoin.text = Utilities.Number.FormatCoin(_coin.toString()) + _note;
            this.main_movie.effectCoin.txtCoin.filters = this.main_movie.goldLoseFilter;
        }
        this.main_movie.PlayEffectCoin();
    }

    /**
     *
     * @param {String} _emoticonName
     * @constructor
     */
    CompoUserInfoPlay.prototype.ShowFunnyEmotion = function(_emoticonName){

        //ClearEmotion(main_movie.emotionLoader);

        if (this.timerEmotion != null)
        {
            if (this.timerEmotion.started == true)
            {
                this.timerEmotion.stop();
            }
        }
        //var emotionName = _emoticonName.split(".")[0];
        //var path:String = this.largeEmotionPath + emotionName;
        //this.main_movie.emotionLoader.soundTransform = new SoundTransform(0);
        this.main_movie.emotionLoader.playEmotion(_emoticonName);

    }

    CompoUserInfoPlay.prototype._onTimerEmotionComplete = function(deltaTime){

    }

    /**
     *
     * @param {String} path_str
     * @constructor
     */
    CompoUserInfoPlay.prototype.ShowAvatar = function(path_str){
        this.ClearOldAvatar();

        this.loader.add([path_str]).on('error',this.onLoadAvatarError.bind(this)).load(this.onLoadAvatarComplete.bind(this, path_str));
        //this.main_movie.avatarLoader.texture = Texture.fromImage(path_str, true, PIXI.SCALE_MODES.DEFAULT);
    }

    CompoUserInfoPlay.prototype.onLoadAvatarComplete = function(path_str){
        this.main_movie.avatarLoader.texture = this.loader.resources[path_str].texture;
    }

    CompoUserInfoPlay.prototype.onLoadAvatarError = function(){
        this.main_movie.avatarLoader.texture = Texture.fromImage("https://38.media.tumblr.com/avatar_0de1334e8084_128.png", true, PIXI.SCALE_MODES.DEFAULT);
    }

    CompoUserInfoPlay.prototype.ClearOldAvatar = function(){
        //console.log(""+_this);
        if(this.main_movie.avatarLoader.texture != PIXI.Texture.EMPTY)
        {
            this.main_movie.avatarLoader.texture.destroy(true);
        }

    }

    CompoUserInfoPlay.prototype._SetStar = function(){
        /*if (gameLoader.global.isVongGiauMat())
        {
            this.main_movie.starPanel_mc.visible = false;
            return;
        }*/

        var levelStar = 1;
        var nLevel = this.Level;
        var mod = 5;
        var index = (this.Level % mod == 0) ? mod : this.Level % mod;

        if (nLevel > 50)
        {
            levelStar = 10;
            nLevel = 0;
            index = 5;
        }

        while (nLevel > mod)
        {
            nLevel -= mod;
            levelStar++;
        }

        // Fill sao theo level hien tai
        for (var j = 1; j <= index; j++)
        {
            this.main_movie.starPanel_mc.setStarLevel(j,(levelStar * 2 - 1) - 1);
        }

        // Unfill cac sao con lai neu level le (level %5 != 0)
        for (j = index + 1; j <= mod; j++)
        {
            this.main_movie.starPanel_mc.setStarLevel(j,((levelStar * 2)  - 1 ));
        }
    }

    function ClearEmotion(loader){

    }

    function drawIConEvent(path_Str){
        /*if (path != "")
        {
            if (iconEvent == null)
            {
                iconEvent = new Sprite();
                //iconEvent.mouseEnabled = false;
                //iconEvent.mouseChildren = false;
                iconEvent.x = -8;
                iconEvent.y = 18;
                iconEvent.addEventListener(MouseEvent.MOUSE_OVER, onIconEventOver);
                iconEvent.addEventListener(MouseEvent.MOUSE_OUT, onIconEventOut);
                this.main_movie.addChild(iconEvent);
            }

            if (iconEvent.numChildren > 0)
            {
                iconEvent.removeChildAt(0);
            }

            //this.setChildIndex(iconEvent, this.numChildren - 1);
            var imgLoader = new ImageLoader(path, { container:iconEvent , width:34 , height:34, scaleMode: "proportionalInside" } );
            imgLoader.load();
        }*/
    }

    function showEffectWinnerTournament(isShowAssEffect_BOOL, isShowWinnerEffect_BOOL){

    }

    function onTimerDisplayCoin(event)    {
        /*var coin = coinToAdd / 5;
        var realCoin = 0;
        if (coin > 0)
        {
            if (maxAddCoin == 0)
            {
                _this.Coin += coin;
            }
            else
            {
                if (_this.Coin < maxAddCoin)
                {
                    realCoin = _this.Coin + coin;
                    if (realCoin > maxAddCoin)
                    {
                        this.Coin = maxAddCoin;
                        timerDisplayScore.stop();
                        timerDisplayScore.reset();
                        return;
                    }
                    else
                    {
                        _this.Coin += coin;
                    }
                }
            }
        }*/
    }

    CompoUserInfoPlay.prototype.StartClock = function(timeCount, needDispatchEvent){

        //main_movie.setChildIndex(clock_mc, main_movie.numChildren - 1);
        if(needDispatchEvent === undefined)
            needDispatchEvent = true;
        this.clock_mc.TimeCount = timeCount;
        this.clock_mc.Start(needDispatchEvent);
    }

    CompoUserInfoPlay.prototype.AppendChat = function(_text){
        this.tooltipChat_mc.AppendText(_text);
    }
    return CompoUserInfoPlay;
});