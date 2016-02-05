/**
 * Created by datnt on 1/26/2016.
 */
'use strict';
define(function () {
    var Container = PIXI.Container;

    GeneralComponent.prototype = Object.create(Container.prototype);
    GeneralComponent.prototype.constructor = GeneralComponent;

    Object.defineProperties(GeneralComponent.prototype, {
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
    function GeneralComponent(preLoader) {
        Container.call(this);

        this._preLoader = preLoader;
    }

    /**
     *Create UserInterface of this component
     */
    GeneralComponent.prototype.init = function() {

    };

    /**
     *Destroy UserInterface of this component
     */
    GeneralComponent.prototype.dispose = function() {
        this._isDisposed = true;
    };

    /**
     *Resize all UserInterface of this component IF NEED
     * @param {Window.Event} event
     */
    GeneralComponent.prototype.onResize = function(event) {

    };

    /**
     *Use to animate UserInterface of this component IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    GeneralComponent.prototype.onEnterFrame = function(deltaTime) {

    };

    /**
     *Update user infomation of this component IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    GeneralComponent.prototype.updateUserInfo = function(userInfo) {

    };

    return GeneralComponent;
});