/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    IController.prototype = Object.create(Object.prototype);
    IController.prototype.constructor = IController;

    Object.defineProperties(IController.prototype, {
        id:{
           value:0,
            writable:true
        }
    });

    /**
     *
     *
     * @param room {@param}
     * @return {IController}
     */
    function IController() {
        Object.call(this);
        this._init();
    }

    IController.prototype._init = function () {

    };

    IController.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {String} message
     * @private
     */
    IController.prototype.handleMessage = function (message) {

    };
    return IController;
});