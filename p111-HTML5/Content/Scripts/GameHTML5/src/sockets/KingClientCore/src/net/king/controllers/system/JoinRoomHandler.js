/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    var Room                    = require('sockets/KingClientCore/src/net/king/entities/Room');
    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    JoinRoomHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    JoinRoomHandler.prototype.constructor = JoinRoomHandler;

    Object.defineProperties(JoinRoomHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {JoinRoomHandler}
     */
    function JoinRoomHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    JoinRoomHandler.prototype._init = function () {

    };

    JoinRoomHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    JoinRoomHandler.prototype.handleResponse = function (message, controller, kingClient) {
        if (message.content[JSONKeysCore.ERROR] == null)
        {
            var room = Room.fromJSON(message.content[JSONKeysCore.ROOM_INFO]);
            var userList = message.content[JSONKeysCore.USER_LIST];
            var len = userList.length;
            var user;
            for (var j = 0; j < len; j++)
            {
                user = User.fromJSONArray(userList[j]);
                room.addUser(user);
                user = null;
            }

            if (room.IsGame() == false)
            {
                kingClient.lobbyRoomId = room.getId();
            }

            kingClient.currentGroup = room.getGroupId();

            kingClient.onJoinRoom(new KingServerEvent(KingServerEvent.JOIN_ROOM,
                {
                    room: room
                }));

           /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.JOIN_ROOM,
                {
                    room: room
                }));*/

            room = null;
            userList = null;
        }
        else
        {
            kingClient.trace(message.content[JSONKeysCore.ERROR]);
        }
    };

    return JoinRoomHandler;
});