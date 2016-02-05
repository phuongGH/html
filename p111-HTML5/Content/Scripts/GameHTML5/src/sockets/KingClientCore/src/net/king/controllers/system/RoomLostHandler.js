/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {

    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');


    RoomLostHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    RoomLostHandler.prototype.constructor = RoomLostHandler;

    Object.defineProperties(RoomLostHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {RoomLostHandler}
     */
    function RoomLostHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    RoomLostHandler.prototype._init = function () {

    };

    RoomLostHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    RoomLostHandler.prototype.handleResponse = function (message, controller, kingClient) {

        var roomId = (message.content[JSONKeysCore.ROOM_ID]);

        var room = kingClient.getRoomManager().getRoomById(roomId);
        if (room)
        {
            var roomName = room.getName();
            kingClient.getRoomManager().removeRoomById(roomId);

            kingClient.onRoomLost(new KingServerEvent(KingServerEvent.ROOM_LOST,
                {
                    roomId: roomId,
                    roomName: roomName
                }));


           /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.ROOM_LOST,
                {
                    roomId: roomId,
                    roomName: roomName
                }));*/
            room = null;
        }
    };


    return RoomLostHandler;
});