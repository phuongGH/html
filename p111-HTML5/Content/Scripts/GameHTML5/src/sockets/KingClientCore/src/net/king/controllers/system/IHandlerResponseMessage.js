/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    IHandlerResponseMessage.prototype = Object.create(Object.prototype);
    IHandlerResponseMessage.prototype.constructor = IHandlerResponseMessage;

    Object.defineProperties(IHandlerResponseMessage.prototype, {});

    /**
     *
     *
     *
     * @return {IHandlerResponseMessage}
     */
    function IHandlerResponseMessage() {
        Object.call(this);
        this._init();
    }

    IHandlerResponseMessage.prototype._init = function () {

    };

    IHandlerResponseMessage.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    IHandlerResponseMessage.prototype.handleResponse = function (message, controller, kingClient) {

    };

    return IHandlerResponseMessage;
});