/**
 * Created by datnt on 1/26/2016.
 */
'use strict';
define(function () {
    var Container = PIXI.Container;

    GeneralScreen.prototype = Object.create(Container.prototype);
    GeneralScreen.prototype.constructor = GeneralScreen;

    Object.defineProperties(GeneralScreen.prototype, {
        _preLoader: {
            value: null,
            writable: true
        },
        _isDisposed: {
            value: true,
            writable: true
        }
    });

    /**
     *
     * @param preLoader
     * @constructor
     */
    function GeneralScreen(preLoader) {
        Container.call(this);

        this._preLoader = preLoader;
    }

    /**
     *Create UserInterface of this screen
     */
    GeneralScreen.prototype.init = function() {

    };

    /**
     *Destroy UserInterface of this screen
     */
    GeneralScreen.prototype.dispose = function() {
        this._isDisposed = true;
    };

    /**
     *Resize all UserInterface of this screen IF NEED
     * @param {Window.Event} event
     */
    GeneralScreen.prototype.onResize = function(event) {

    };

    /**
     *Use to animate UserInterface of this screen IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    GeneralScreen.prototype.onEnterFrame = function(deltaTime) {

    };

    /**
     *Update user infomation of this screen IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    GeneralScreen.prototype.updateUserInfo = function(userInfo) {

    };

    return GeneralScreen;
});