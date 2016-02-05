/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    var Message                 = require('sockets/KingClientCore/src/net/king/models/Message');
    var Message                 = require('sockets/KingClientCore/src/net/king/models/Message');
    var KingKeys                = require('sockets/KingClientCore/src/net/king/keys/KingKeys');
    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');

    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    LobbyUpdateHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    LobbyUpdateHandler.prototype.constructor = LobbyUpdateHandler;

    Object.defineProperties(LobbyUpdateHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {LobbyUpdateHandler}
     */
    function LobbyUpdateHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    LobbyUpdateHandler.prototype._init = function () {

    };

    LobbyUpdateHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    LobbyUpdateHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var arrUserList = message.content[JSONKeysCore.USER_LIST];
        var userList;
        var message;
        var len = arrUserList.length;
        for (var i = 0; i < len; i++)
        {
            userList = arrUserList[i];
            message = new Message(KingKeys.CORE_SYSTEM_CONTROLLER_ID,  int(userList.a), userList);
            controller.handleMessage(message);
            message = null;
            userList = null;
        }
        arrUserList = null;
    };
    return LobbyUpdateHandler;
});