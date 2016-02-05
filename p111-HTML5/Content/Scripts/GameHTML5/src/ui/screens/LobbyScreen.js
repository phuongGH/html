/**
 * Created by datnt on 1/28/2016.
 */
'use strict';
define(function (require) {
    var GeneralScreen = require("ui/screens/GeneralScreen");
    var CompoUserInfoPlay = require('ui/components/compouserinfoplay/CompoUserInfoPlay');
    var CompoPubAvatar = require('ui/components/compopubavatar/CompoPubAvatar')
    LobbyScreen.prototype = Object.create(GeneralScreen.prototype);
    LobbyScreen.prototype.constructor = LobbyScreen;

    Object.defineProperties(LobbyScreen.prototype, {});

    /**
     *
     * @param preLoader
     * @constructor
     */
    function LobbyScreen(preLoader) {
        GeneralScreen.call(this, preLoader);
    }

    /**
     *Create UserInterface of this screen
     */
    LobbyScreen.prototype.init = function () {
        GeneralScreen.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;

            var lobbyText = new PIXI.Text("This is Lobby Screen", {font: '40px ' + PreLoaderConfig.FontResource.SedonaScript, fill: 0xff0000, align: "center", stroke: 0x0000ff, strokeThickness: 5});
            lobbyText.setToCenterScreen();
            this.addChild(lobbyText);
        }

        this.compo = new CompoUserInfoPlay(this._preLoader);
        //compo._this = compo;
        this.compo.IsOwner = true;
        this.compo.x = 200;
        this.compo.y = 200;
        this.compo.Coin = 100000000;
        this.compo.BoardOwnerIconPosition = CompoUserInfoPlay.RIGHT;
        this.compo.NickName = 'takazamy';
        this.compo.PopUpDirection = CompoUserInfoPlay.RIGHT;
        this.compo.EnableIconAsset = true;
        this.compo.EnableIconBangHoi = true;
        this.compo.EnableIconBoardBlackList = true;
        this.compo.EnableIconCastMoney = true;
        this.compo.EnableIconInviteFriend = true;
        this.compo.EnableIconLockChat = true;
        this.compo.EnableIconStandUp = true;
        this.compo.EnableIconUserInfo = true;
        this.compo.updatePopupIcon();
        //this.compo.CallBackEmotionListEventLoad = this.preLoader.onLoadEmotion.bind(this);
        this.compo.Elo = 50000;
        this.compo.IsMe = true;
        this.compo.ShowEffectCoin(10000,"");
        //this.compo.ShowFunnyEmotion("");
        this.compo.StartClock(6,false);
        //compo.Sex = 1;
        this.compo.Level = 9;
        this.compo.Avatar = "https://38.media.tumblr.com/avatar_0de1334e8084_128.png";
        this.compo.ToolTipChatPosition = 2;
        this.compo.AppendChat('Anh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu Em');
        this.compo.AppendChat('Anh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu Em');
        this.compo.AppendChat('Anh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu Em');
        this.compo.AppendChat('Anh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu EmAnh Yêu Em');
        //this.preLoader.compo.AppendChat('Anh Yêu Em');
        //this.preLoader.compo.AppendChat('Anh Yêu Em');
        //this.preLoader.compo.AppendChat('Anh Yêu Em');
        //compo.Avatar = "http://4.bp.blogspot.com/-Ui6DCJzFvn8/Vh2CMfoHsvI/AAAAAAAAHM0/9BY2ZBuiU9c/s1600/image%2B%25288%2529.jpg";
        this.addChild(this.compo);


        this.compoPubAvatar = new CompoPubAvatar(this._preLoader);
        this.compoPubAvatar.x = 10;
        this.compoPubAvatar.y = 10;
        this.addChild(this.compoPubAvatar);

        //Example 1
        //this.compoPubAvatar.NickName = "thaihoangduylinh";
        //this.compoPubAvatar.show();

        //Example 2
        this.compoPubAvatar.NickName = "thaihoangduylinh";
        this.compoPubAvatar.Coin = 1000000;
        this.compoPubAvatar.Level = 10;
        this.compoPubAvatar.CategoryUser = 1;
        this.compoPubAvatar.Avatar = "http://localhost:63342/P111-HTML5/Content/Scripts/GameHTML5/lib/resources/TestLoadImages/test2.jpg";
        this.compoPubAvatar.show();
    };

    /**
     *Destroy UserInterface of this screen
     */
    LobbyScreen.prototype.dispose = function () {
        GeneralScreen.prototype.dispose.call(this);
    };

    /**
     *Resize all UserInterface of this screen IF NEED
     * @param {Window.Event} event
     */
    LobbyScreen.prototype.onResize = function (event) {
        GeneralScreen.prototype.onResize.call(this, event);
    };

    /**
     *Use to animate UserInterface of this screen IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    LobbyScreen.prototype.onEnterFrame = function (deltaTime) {
        GeneralScreen.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this screen IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    LobbyScreen.prototype.updateUserInfo = function (userInfo) {
        GeneralScreen.prototype.updateUserInfo.call(this, userInfo);
    };

    return LobbyScreen;
});