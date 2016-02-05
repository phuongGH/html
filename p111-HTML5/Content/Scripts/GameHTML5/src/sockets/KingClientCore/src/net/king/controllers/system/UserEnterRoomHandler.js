/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {


    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');
    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var User                    = require('sockets/KingClientCore/src/net/king/entities/User');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');

    UserEnterRoomHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    UserEnterRoomHandler.prototype.constructor = UserEnterRoomHandler;

    Object.defineProperties(UserEnterRoomHandler.prototype, {});

    /**
     * @return {UserEnterRoomHandler}
     */
    function UserEnterRoomHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    UserEnterRoomHandler.prototype._init = function () {

    };

    UserEnterRoomHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    UserEnterRoomHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var roomId = (message.content[JSONKeysCore.ROOM_ID]);
        var room = kingClient.getRoomManager().getRoomById(roomId);
        if (room != null)
        {
            var userObj = message.content[JSONKeysCore.USER_INFO];

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

                   /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.ROOM_CHANGE_OWNER,
                        {
                            roomId: roomId,
                            previousOwnerId: previousOwnerId,
                            newOwnerId: newOwnerId
                        }));*/
                }
            }

            var user = User.fromJSONArray(userObj);
            room.addUser(user);

            kingClient.onUserEnterRoom(new KingServerEvent(KingServerEvent.USER_ENTER_ROOM,
                {
                    user: user,
                    room: room
                }));

            /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.USER_ENTER_ROOM,
                {
                    user: user,
                    room: room
                }));*/

            room = null;
            userObj = null;
            user = null;
        }
    };

    return UserEnterRoomHandler;
});