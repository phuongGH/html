/**
 * Created by datnt on 1/28/2016.
 */
'use strict';
define(function (require) {
    var GeneralScreen = require("ui/screens/GeneralScreen");

    GameScreen.prototype = Object.create(GeneralScreen.prototype);
    GameScreen.prototype.constructor = GameScreen;

    Object.defineProperties(GameScreen.prototype, {});

    /**
     *
     * @param preLoader
     * @constructor
     */
    function GameScreen(preLoader) {
        GeneralScreen.call(this, preLoader);
    }

    /**
     *Create UserInterface of this screen
     */
    GameScreen.prototype.init = function () {
        GeneralScreen.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;

            var gameText = new PIXI.extras.BitmapText("This is Game Screen", {font: '40px ' + PreLoaderConfig.FontResource.Yummy, align: "center"});
            gameText.setToCenterScreen();
            this.addChild(gameText);
        }
    };

    /**
     *Destroy UserInterface of this screen
     */
    GameScreen.prototype.dispose = function () {
        GeneralScreen.prototype.dispose.call(this);
    };

    /**
     *Resize all UserInterface of this screen IF NEED
     * @param {Window.Event} event
     */
    GameScreen.prototype.onResize = function (event) {
        GeneralScreen.prototype.onResize.call(this, event);
    };

    /**
     *Use to animate UserInterface of this screen IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    GameScreen.prototype.onEnterFrame = function (deltaTime) {
        GeneralScreen.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this screen IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    GameScreen.prototype.updateUserInfo = function (userInfo) {
        GeneralScreen.prototype.updateUserInfo.call(this, userInfo);
    };

    return GameScreen;
});