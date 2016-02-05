/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {

    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    RoomOwnerChangeHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    RoomOwnerChangeHandler.prototype.constructor = RoomOwnerChangeHandler;

    Object.defineProperties(RoomOwnerChangeHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {RoomOwnerChangeHandler}
     */
    function RoomOwnerChangeHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    RoomOwnerChangeHandler.prototype._init = function () {

    };

    RoomOwnerChangeHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    RoomOwnerChangeHandler.prototype.handleResponse = function (message, controller, kingClient) {

        var roomId = Number(message.content[JSONKeysCore.ROOM_ID]);
        var newOwnerId = Number(message.content[JSONKeysCore.USER_INFO]);
        var room = kingClient.getRoomManager().getRoomById(roomId);

        if (room != null)
        {
            var previousOwnerId = room.getOwnerId();
            if (previousOwnerId != newOwnerId)
            {
                room.setOwnerId(newOwnerId);

                kingClient.onRoomChangeOwner(new KingServerEvent(KingServerEvent.ROOM_CHANGE_OWNER,
                    {
                        roomId: roomId,
                        previousOwnerId: previousOwnerId,
                        newOwnerId: newOwnerId
                    }));

               /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.ROOM_CHANGE_OWNER,
                    {
                        roomId: roomId,
                        previousOwnerId: previousOwnerId,
                        newOwnerId: newOwnerId
                    }));*/
            }
        }

    };


    return RoomOwnerChangeHandler;
});