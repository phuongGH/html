/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {


    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');


    SpectatorToPlayerHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    SpectatorToPlayerHandler.prototype.constructor = SpectatorToPlayerHandler;

    Object.defineProperties(SpectatorToPlayerHandler.prototype, {});

    /**
     * @return {SpectatorToPlayerHandler}
     */
    function SpectatorToPlayerHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    SpectatorToPlayerHandler.prototype._init = function () {

    };

    SpectatorToPlayerHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    SpectatorToPlayerHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var userId = (message.content[JSONKeysCore.USER_INFO]);
        var roomId = (message.content[JSONKeysCore.ROOM_ID]);
        var playerId = (message.content[JSONKeysCore.PLAYER_ID]);
        var room = kingClient.getRoomManager().getRoomById(roomId);

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

               /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.ROOM_CHANGE_OWNER,
                    {
                        roomId: roomId,
                        previousOwnerId: previousOwnerId,
                        newOwnerId: newOwnerId
                    }));*/
            }

            var user = room.getUserById(userId);
            if (user)
            {
                user.setPlayerId(playerId);
                kingClient.onSpectatorToPlayer(new KingServerEvent(KingServerEvent.SPECTATOR_TO_PLAYER,
                    {
                        userId: userId,
                        roomId: roomId
                    }));

               /* kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.SPECTATOR_TO_PLAYER,
                    {
                        userId: userId,
                        roomId: roomId
                    }));*/
            }
            room = null;
        }
    };

    return SpectatorToPlayerHandler;
});