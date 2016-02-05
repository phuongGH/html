/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');
    var JSONKeysCore            = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');

    CreateRoomHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    CreateRoomHandler.prototype.constructor = CreateRoomHandler;

    Object.defineProperties(CreateRoomHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {CreateRoomHandler}
     */
    function CreateRoomHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    CreateRoomHandler.prototype._init = function () {

    };

    CreateRoomHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    CreateRoomHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var room = Room.fromJSON(message.content[JSONKeysCore.ROOM_INFO]);
        if (room.getOwnerId() == kingClient.getME().getId())
        {
            room.addUser(kingClient.getME());
        }

        kingClient.onCreateRoom(new KingServerEvent(KingServerEvent.CREATE_ROOM, {
            room:room
        }));

        /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.CREATE_ROOM, {
         room:room
        }));*/
        room = null;
    };

    return CreateRoomHandler;
});