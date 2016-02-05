/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {

    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    RoomCountChangeHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    RoomCountChangeHandler.prototype.constructor = RoomCountChangeHandler;

    Object.defineProperties(RoomCountChangeHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {RoomCountChangeHandler}
     */
    function RoomCountChangeHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    RoomCountChangeHandler.prototype._init = function () {

    };

    RoomCountChangeHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    RoomCountChangeHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var roomId = Number(message.content[JSONKeysCore.ROOM_ID]);
        var numberOfUsers = int(message.content[JSONKeysCore.USER_COUNT]);
        var numberOfSpectators = int(message.content[JSONKeysCore.SPECTATOR_COUNT]);

        var room = kingClient.getRoomManager().getRoomById(roomId);
        if (room)
        {
            room.setUserCount(numberOfUsers);
            room.setSpectatorCount(numberOfSpectators);
        }

        kingClient.onRoomCountChange(new KingServerEvent(KingServerEvent.ROOM_COUNT_CHANGE,
            {
                roomId: roomId,
                numberOfUsers: numberOfUsers,
                numberOfSpectators: numberOfSpectators
            }));
       /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.ROOM_COUNT_CHANGE,
            {
                roomId: roomId,
                numberOfUsers: numberOfUsers,
                numberOfSpectators: numberOfSpectators
            }));*/

        room = null;
    };

    return RoomCountChangeHandler;
});