/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {

    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    PublicMessageHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    PublicMessageHandler.prototype.constructor = PublicMessageHandler;

    Object.defineProperties(PublicMessageHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {PublicMessageHandler}
     */
    function PublicMessageHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    PublicMessageHandler.prototype._init = function () {

    };

    PublicMessageHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    PublicMessageHandler.prototype.handleResponse = function (message, controller, kingClient) {

        kingClient.onPublicMessage(new KingServerEvent(KingServerEvent.PUBLIC_MESSAGE,
            {
                userId: message.content.u,
                roomId: message.content.r,
                msg: message.content.m
            }));

        /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.PUBLIC_MESSAGE,
            {
                userId: message.content.u,
                roomId: message.content.r,
                msg: message.content.m
            }));*/
    };

    return PublicMessageHandler;
});