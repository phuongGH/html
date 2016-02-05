/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    var IHandlerResponseMessage         = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');
    var KingServerEvent                 = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var JSONKeysCore                        = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    HandShakeHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    HandShakeHandler.prototype.constructor = HandShakeHandler;

    Object.defineProperties(HandShakeHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {HandShakeHandler}
     */
    function HandShakeHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    HandShakeHandler.prototype._init = function () {

    };

    HandShakeHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    HandShakeHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var reconnectResult = message.content[JSONKeysCore.RECONNECT_RESULT];
        var sessionToken = message.content[JSONKeysCore.SESSION_TOKEN];
        var socketKey = message.content[JSONKeysCore.SOCKET_KEY];
        socketKey = socketKey.substr(1, socketKey.length);
        if (message.content[JSONKeysCore.RECONNECT_RESULT] != null)
        {
            if (reconnectResult == false)
                kingClient.stopReconnect(socketKey);

            kingClient.onReconnect(new KingServerEvent(KingServerEvent.RECONNECT, {  result: reconnectResult } ));

            //kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.RECONNECT, {  result: reconnectResult } ));
        }
        kingClient.updateSessionToken(sessionToken, socketKey);
    };

    return HandShakeHandler;
});