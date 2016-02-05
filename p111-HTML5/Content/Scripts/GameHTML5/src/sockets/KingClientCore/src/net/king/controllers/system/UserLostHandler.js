/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {


    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');
    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');

    UserLostHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    UserLostHandler.prototype.constructor = UserLostHandler;

    Object.defineProperties(UserLostHandler.prototype, {});

    /**
     * @return {UserLostHandler}
     */
    function UserLostHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    UserLostHandler.prototype._init = function () {

    };

    UserLostHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    UserLostHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var userObject = message.content[JSONKeysCore.USER_INFO];
        var userId = (userObject[0]);
        var listJoinedRoom = message.content[JSONKeysCore.LIST_JOINED_ROOM];
        var listRoomOwnerId = message.content[JSONKeysCore.LIST_ROOM_OWNER_ID];

        if (listJoinedRoom == null)
        {
            room = kingClient.getRoomManager().getRoomById(kingClient.lobbyRoomId);
            if (room)
            {
                user = room.getUserById(userId);
                if (user)
                {
                    kingClient.onUseLost(new KingServerEvent(KingServerEvent.USER_LOST,
                        {
                            user: user
                        }));

                    /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.USER_LOST,
                        {
                            user: user
                        }));*/
                    room.removeUser(user);
                    user = null;
                }
                room = null;
            }
        }
        else
        {
            var length = listJoinedRoom.length;
            var room;
            var user;
            var roomId;
            for (var i = 0; i < length; i++)
            {
                roomId = (listJoinedRoom[i]);
                room = kingClient.getRoomManager().getRoomById(roomId);
                if (room)
                {
                    if (room.IsGame())
                    {
                        //var roomOwnerId:Number = Number(listRoomOwnerId[i]);
                        //room.setOwnerId(roomOwnerId);
                        var previousOwnerId = room.getOwnerId();
                        var newOwnerId = (listRoomOwnerId[i]);
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

                    user = room.getUserById(userId);
                    if (user)
                    {
                        kingClient.onUseLost(new KingServerEvent(KingServerEvent.USER_LOST,
                            {
                                user: user
                            }));

                       /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.USER_LOST,
                            {
                                user: user
                            }));*/
                        room.removeUser(user);
                        user = null;
                    }
                    room = null;
                }
            }
        }
        userObject = null;
        user = null;
    };

    return UserLostHandler;
});