/**
 * Created by datnt on 1/26/2016.
 */
'use strict';
define(function (require) {
    var LoadingScreen = require('LoadingScreen');
    var LobbyScreen = require('ui/screens/LobbyScreen');
    var GameScreen = require('ui/screens/GameScreen');

    ScreenController.prototype = Object.create(Object.prototype);
    ScreenController.prototype.constructor = ScreenController;

    Object.defineProperties(ScreenController.prototype, {
        _preLoader: {
            value: null,
            writable: true
        },
        currentScreen: {
            value: null,
            writable: true
        },

        //region List screen private, chỉ những biến screen private
        _loadingScreen: {
            value: null,
            writable: true
        },
        _lobbyScreen: {
            value: null,
            writable: true
        },
        _gameScreen: {
            value: null,
            writable: true
        },
        //endregion

        //region List screen public, chỉ những biến screen public
        loadingScreen: {
            get: function ()
            {
                if (this._loadingScreen == null)
                {
                    this._loadingScreen = new LoadingScreen(this._preLoader);
                    this._preLoader.layerScreen.addChild(this._loadingScreen);
                }

                return this._loadingScreen;
            }
        },
        lobbyScreen: {
            get: function ()
            {
                if (this._lobbyScreen == null)
                {
                    this._lobbyScreen = new LobbyScreen(this._preLoader);
                    this._preLoader.layerScreen.addChild(this._lobbyScreen);
                }

                return this._lobbyScreen;
            }
        },
        gameScreen: {
            get: function ()
            {
                if (this._gameScreen == null)
                {
                    this._gameScreen = new GameScreen(this._preLoader);
                    this._preLoader.layerScreen.addChild(this._gameScreen);
                }

                return this._gameScreen;
            }
        }
        //endregion
    });

    function ScreenController(preLoader) {
        Object.call(this);

        this._preLoader = preLoader;
    }

    ScreenController.prototype.showLoadingScreen = function(onLoadResourceCompleteFunc) {
        this.currentScreen = this.loadingScreen;
        this.loadingScreen.loadResource(onLoadResourceCompleteFunc);
    };

    ScreenController.prototype.showLobbyScreen = function() {
        this.lobbyScreen.init();

        this.tweenScreens(this.currentScreen, this.lobbyScreen, this.currentScreen  instanceof LoadingScreen ? this._onLoadingScreenTweenOutComplete.bind(this) : (this.currentScreen instanceof GameScreen ? this._onGameScreenTweenOutComplete.bind(this) : null), null, this._onLobbyScreenTweenInComplete.bind(this));

        this.currentScreen = this.lobbyScreen;
    };

    ScreenController.prototype.showGameScreen = function() {
        this.gameScreen.init();

        this.tweenScreens(this.currentScreen, this.gameScreen, this.currentScreen instanceof LobbyScreen ? this._onLobbyScreenTweenOutComplete.bind(this) : null, null, this._onGameScreenTweenInComplete.bind(this));

        this.currentScreen = this.gameScreen;
    };

    ScreenController.prototype.tweenScreens = function(screenOut, screenIn, onTweenScreenOutComplete, onTweenScreenOutCompleteParams, onTweenScreenInComplete, onTweenScreenInCompleteParams) {
        /*var directionOut = EffectOption.LEFT;
        var directionIn = EffectOption.RIGHT;

        if (screenOut instanceof GameScreen) {
            if (screenIn instanceof LobbyScreen) {
                directionOut = EffectOption.RIGHT;
                directionIn = EffectOption.LEFT;
                preLoader.saveSetting("isExit", false);
            }
        }
        else if (screenOut instanceof LobbyScreen) {
            /!*if (screenIn is LoginScreen)
             {
             directionOut = EffectOption.RIGHT;
             directionIn = EffectOption.LEFT;
             }*!/
        }

        Effects.slideOut(screenOut, new SlideOption(directionOut, preLoader.appInfo.appScreenWidth), 400, onTweenScreenOutComplete, onTweenScreenOutCompleteParams);
        Effects.slideIn(screenIn, new SlideOption(directionIn, preLoader.appInfo.appScreenWidth), 400, onTweenScreenInComplete, onTweenScreenInCompleteParams);*/

        screenOut.visible = false;
        screenIn.visible = true;
    };



    ScreenController.prototype._onLoadingScreenTweenOutComplete = function() {
        this._loadingScreen.dispose();
    };

    ScreenController.prototype._onLobbyScreenTweenOutComplete = function() {
        this._lobbyScreen.dispose();
    };

    ScreenController.prototype._onGameScreenTweenOutComplete = function() {
        this._gameScreen.dispose();
    };

    ScreenController.prototype._onLobbyScreenTweenInComplete = function() {

    };

    ScreenController.prototype._onGameScreenTweenInComplete = function() {

    };

    ScreenController.prototype.onResize = function(event) {
        this.currentScreen.onResize(event);
    };

    ScreenController.prototype.onEnterFrame = function(deltaTime) {
        this.currentScreen.onEnterFrame(deltaTime);
    };

    ScreenController.prototype.updateUserInfo = function(userInfo) {
        this.currentScreen.updateUserInfo(userInfo);
    };

    return ScreenController;
});