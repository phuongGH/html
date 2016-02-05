/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {


    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    UserExitRoomHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    UserExitRoomHandler.prototype.constructor = UserExitRoomHandler;

    Object.defineProperties(UserExitRoomHandler.prototype, {});

    /**
     * @return {UserExitRoomHandler}
     */
    function UserExitRoomHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    UserExitRoomHandler.prototype._init = function () {

    };

    UserExitRoomHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    UserExitRoomHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var userObject = message.content[JSONKeysCore.USER_INFO];
        var userId = (userObject[0]);
        var roomId = (message.content[JSONKeysCore.ROOM_ID]);

        var room = kingClient.getRoomManager().getRoomById(roomId);

        if (room != null)
        {
            if (room.IsGame())
            {
                //var roomOwnerId:Number = Number(message.content[JSONKeysCore.ROOM_OWNER_ID]);
                //room.setOwnerId(roomOwnerId);
                var previousOwnerId = room.getOwnerId();
                var newOwnerId = (message.content[JSONKeysCore.ROOM_OWNER_ID]);
                if (previousOwnerId != newOwnerId)
                {
                    room.setOwnerId(newOwnerId);
                    kingClient.onRoomChangeOwner(new KingServerEvent(KingServerEvent.ROOM_CHANGE_OWNER,
                        {
                            roomId: roomId,
                            previousOwnerId: previousOwnerId,
                            newOwnerId: newOwnerId
                        }));

                    /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.ROOM_CHANGE_OWNER,
                        {
                            roomId: roomId,
                            previousOwnerId: previousOwnerId,
                            newOwnerId: newOwnerId
                        }));*/
                }
            }

            var user = room.getUserById(userId);
            if (user)
            {
                kingClient.onUserExitRoom(new KingServerEvent(KingServerEvent.USER_EXIT_ROOM,
                    {
                        user: user,
                        room: room
                    }));

                /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.USER_EXIT_ROOM,
                    {
                        user: user,
                        room: room
                    }));*/

                room.removeUser(user);
                user = null;
            }
            room = null;
        }

        userObject = null;
    };

    return UserExitRoomHandler;
});