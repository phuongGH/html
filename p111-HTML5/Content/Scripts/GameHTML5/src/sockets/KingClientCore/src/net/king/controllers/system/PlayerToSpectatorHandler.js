/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');


    PlayerToSpectatorHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    PlayerToSpectatorHandler.prototype.constructor = PlayerToSpectatorHandler;

    Object.defineProperties(PlayerToSpectatorHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {PlayerToSpectatorHandler}
     */
    function PlayerToSpectatorHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    PlayerToSpectatorHandler.prototype._init = function () {

    };

    PlayerToSpectatorHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    PlayerToSpectatorHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var userId = (message.content[JSONKeysCore.USER_INFO]);
        var roomId = (message.content[JSONKeysCore.ROOM_ID]);
        var room = kingClient.getRoomManager().getRoomById(roomId);
        var previousPlayerId = int(message.content[JSONKeysCore.PLAYER_ID]);

        if (room != null)
        {
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

            var user = room.getUserById(userId);
            if (user)
            {
                user.setPlayerId(-1);
                kingClient.onPlayerToSpectator(new KingServerEvent(KingServerEvent.PLAYER_TO_SPECTATOR,
                    {
                        userId: userId,
                        roomId: roomId,
                        previousPlayerId: previousPlayerId
                    }));

                /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.PLAYER_TO_SPECTATOR,
                    {
                        userId: userId,
                        roomId: roomId,
                        previousPlayerId: previousPlayerId
                    }));*/
            }
            room = null;
        }
    };

    return PlayerToSpectatorHandler;
});