/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {

    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');


    SetRoomVariablesHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    SetRoomVariablesHandler.prototype.constructor = SetRoomVariablesHandler;

    Object.defineProperties(SetRoomVariablesHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {SetRoomVariablesHandler}
     */
    function SetRoomVariablesHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    SetRoomVariablesHandler.prototype._init = function () {

    };

    SetRoomVariablesHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    SetRoomVariablesHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var roomId = message.content[JSONKeysCore.ROOM_ID];
        var listVariables = message.content[JSONKeysCore.VAR_LIST];

        var room = kingClient.getRoomManager().getRoomById(roomId);
        if (room)
        {
            room.setVariables(listVariables);

            kingClient.onSetRoomVariables(new KingServerEvent(KingServerEvent.SET_ROOM_VARIABLES,
                {
                    roomId: roomId,
                    listVariables: room.getVariables()
                }));

           /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.SET_ROOM_VARIABLES,
                {
                    roomId: roomId,
                    listVariables: room.getVariables()
                }));*/
            room = null;
        }
        listVariables = null;
    };


    return SetRoomVariablesHandler;
});