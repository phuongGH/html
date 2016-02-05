/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {

    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');
    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');

    SetUserVariablesHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    SetUserVariablesHandler.prototype.constructor = SetUserVariablesHandler;

    Object.defineProperties(SetUserVariablesHandler.prototype, {});

    /**
     * @return {SetUserVariablesHandler}
     */
    function SetUserVariablesHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    SetUserVariablesHandler.prototype._init = function () {

    };

    SetUserVariablesHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    SetUserVariablesHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var userId = message.content[JSONKeysCore.USER_INFO];
        var roomId = message.content[JSONKeysCore.ROOM_ID];
        var listVariables = message.content[JSONKeysCore.VAR_LIST];

        var room = kingClient.getRoomManager().getRoomById(roomId);
        var user;
        if (room)
        {
            user = room.getUserById(userId);
            if (user)
            {
                user.setVariables(listVariables);
                kingClient.onSetUserVariables(new KingServerEvent(KingServerEvent.SET_USER_VARIABLES,
                    {
                        roomId: roomId,
                        userId: userId,
                        listVariables: user.getVariables()
                    }));

                /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.SET_USER_VARIABLES,
                    {
                        roomId: roomId,
                        userId: userId,
                        listVariables: user.getVariables()
                    }));*/
                user = null;
            }
            room = null;
        }
        else
        {
            user = kingClient.getME();
            if (user.getId() == userId)
            {
                user.setVariables(listVariables);
                kingClient.onSetUserVariables(new KingServerEvent(KingServerEvent.SET_USER_VARIABLES,
                    {
                        roomId: roomId,
                        userId: userId,
                        listVariables: user.getVariables()
                    }));

               /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.SET_USER_VARIABLES,
                    {
                        roomId: roomId,
                        userId: userId,
                        listVariables: user.getVariables()
                    }));*/
            }
        }



        listVariables = null;
    };

    return SetUserVariablesHandler;
});