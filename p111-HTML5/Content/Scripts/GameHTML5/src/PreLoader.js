/**
 * Created by datnt on 12/15/2015.
 */
'use strict';
//PreLoader->constructor->_loadResourceLoading->_onLoadResourceLoadingComplete
define(function(require) {
    var Utilities           = require("utils/utilities/Utilities");
    var FontLibrary         = require("utils/FontLibrary");
    var ResourceManager     = require("utils/ResourceManager");
    var AppInfo             = require("utils/AppInfo");
    var PopupController     = require("controllers/PopupController");
    var ScreenController    = require("controllers/ScreenController");
    var CompoEmoticonList   = require('ui/components/compoemoticonlist/CompoEmoticonList');
    var KF                  = require("sockets/KingClientCore/src/net/king/utils/KF");
    var KingClient          = require("sockets/KingClientCore/src/net/king/client/KingClient");
    var JSONKeys            = require("keys/JSONKeys");
    var ReceiveController   = require("sockets/ReceiveController");
    var RequestController   = require("sockets/RequestController");


    var Container = PIXI.Container;

    PreLoader.prototype = Object.create(Container.prototype);
    PreLoader.prototype.constructor = PreLoader;

    Object.defineProperties(PreLoader.prototype, {
        test: {
            value: 'just for test',
            writable: true
        },
        layerScreen: {
            value: null,
            writable: true
        },
        layerPopup: {
            value: null,
            writable: true
        },
        popUpController: {
            value: null,
            writable: true
        },
        screenController: {
            value: null,
            writable: true
        },
        _compoEmoticonList:{
            value:null,
            writable:true
        },
        compoEmoticonList: {
            get: function ()
            {
                if (this._compoEmoticonList == null)
                {
                    this._compoEmoticonList = new CompoEmoticonList(this._preLoader);
                    this._compoEmoticonList.hide();
                    this.layerScreen.addChild(this._compoEmoticonList);
                }

                return this._compoEmoticonList;
            }
        },

        receiveController:{
            value:null,
            writable:true
        },

        requestController:{
            value:null,
            writable:true
        }

    });

    function PreLoader() {
        Container.call(this);

        this.init();
    }

    PreLoader.prototype.init = function(){
        /*TODO mobile - implement WebserviceInfo for mobile compatible
        webserviceInfo = new WebserviceInfo();*/
        this._initGameSetting();
        this._initScreenSize();
        this._initLayer();
        this._initController();

        this.screenController.showLoadingScreen(this._onLoadResourceComplete.bind(this));
    };

    PreLoader.prototype._initGameSetting = function(){
        AppInfo.gameID = PreLoaderConfig.GameID;

        if(typeof(Storage) !== "undefined") {
            //Use localStorage to assign value to AppInfo.GameSetting. Remember to check if getItem('itemName') == null
            //localStorage.setItem("lastname", "Smith");
            //localStorage.getItem("lastname");
            //localStorage.removeItem("lastname");
        } else {
            console.log('This browser do not support Storage');
            //Try to use default game settings
        }
    };

    PreLoader.prototype._initScreenSize = function(){
        AppInfo.appScreenWidth = this.stage.stageWidth;
        AppInfo.appScreenHeight = this.stage.stageHeight;
        AppInfo.appScaleWidth = this.stage.stageWidth / AppInfo.appRealWidth;
        AppInfo.appScaleHeight = this.stage.stageHeight / AppInfo.appRealHeight;
        AppInfo.appScaleMin = Math.min(AppInfo.appScaleWidth, AppInfo.appScaleHeight);
        AppInfo.appScaleMax = Math.max(AppInfo.appScaleWidth, AppInfo.appScaleHeight);

        Utilities.Browser.addTabActiveListener(this._onTabActiveChange.bind(this));
    };

    PreLoader.prototype._initLayer = function(){
        this.layerScreen = new Container();
        this.layerScreen.interactive = true;
        this.layerPopup = new Container();

        this.addChild(this.layerScreen);
        this.addChild(this.layerPopup);
    };

    PreLoader.prototype._initController = function(){
        /*TODO mobile - implement WebserviceInfo for mobile compatible
        WebServiceControler.getDeviceInfo = appInfo.getDeviceInfo;
        WebServiceControler.getInfoReToken = appInfo.getInfoReToken;
        WebServiceControler.setLoginToken = appInfo.setLoginToken;
        WebServiceControler.getUserLoginID = appInfo.getUserLoginID;

        this.webServiceController = new WSController(this);*/
        this.popUpController = new PopupController(this);
        this.screenController = new ScreenController(this);
    };

    PreLoader.prototype._onLoadResourceComplete = function(loader, resources) {
        this._setWebConfig();
        this._initSocket();
        this.screenController.showLobbyScreen();
    };

    PreLoader.prototype._setWebConfig = function() {
        AppInfo.socketConfig.socketKey = PreLoaderConfig.ServerAndPort;

        var flashvar = gameContainer.getAttribute('data-flashvar');

        if(flashvar == null) {
            AppInfo.myInfo.userID = parseInt(gameContainer.getAttribute('data-userID'));
            AppInfo.myInfo.email = gameContainer.getAttribute('data-email');
            AppInfo.myInfo.password = gameContainer.getAttribute('data-pass');
            AppInfo.myInfo.zoneName = gameContainer.getAttribute('data-zone');
            AppInfo.myInfo.roomToJoinInfo = {};
            AppInfo.myInfo.loginState = 0;
            AppInfo.myInfo.flashVars = null;
            AppInfo.myInfo.userValidationData = '';
        }
        else {
            //TODO parse flashvar
        }

    };

    PreLoader.prototype._initSocket = function() {
        KF.socket = new KingClient();

        this.receiveController = new ReceiveController(this);

        this.requestController = new RequestController(this);
        //this.requestController.connect();

    }

    PreLoader.prototype.onEnterFrame = function(deltaTime){
        this.screenController.onEnterFrame(deltaTime);
        this.popUpController.onEnterFrame(deltaTime);
    };

    PreLoader.prototype.onResize = function(event){
        AppInfo.appScreenWidth = this.stage.stageWidth;
        AppInfo.appScreenHeight = this.stage.stageHeight;
        AppInfo.appScaleWidth = this.stage.stageWidth / AppInfo.appRealWidth;
        AppInfo.appScaleHeight = this.stage.stageHeight / AppInfo.appRealHeight;
        AppInfo.appScaleMin = Math.min(AppInfo.appScaleWidth, AppInfo.appScaleHeight);
        AppInfo.appScaleMax = Math.max(AppInfo.appScaleWidth, AppInfo.appScaleHeight);

        //TODO resize all screen
        //this.screenController.onResize(e);
        //this.popUpController.onResize(e);
        /*for (var i = 0; i < stage.children.length; i++) {
            if (stage.children[i].onResize !== undefined) {
                stage.children[i].onResize(event);
            }
        }*/
    };

    PreLoader.prototype._onTabActiveChange = function(isActive){
        //TODO change UI for game when game tab is active and deactive
    };

   

    return PreLoader;
});