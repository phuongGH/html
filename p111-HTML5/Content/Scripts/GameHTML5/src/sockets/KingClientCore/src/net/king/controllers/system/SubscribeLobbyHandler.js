/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {


    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    SubscribeLobbyHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    SubscribeLobbyHandler.prototype.constructor = SubscribeLobbyHandler;

    Object.defineProperties(SubscribeLobbyHandler.prototype, {});


    /**
     *
     * @constructor
     */
    function SubscribeLobbyHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    /**
     *
     * @private
     */
    SubscribeLobbyHandler.prototype._init = function () {

    };

    SubscribeLobbyHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    SubscribeLobbyHandler.prototype.handleResponse = function (message, controller, kingClient) {
        var systemController = controller ;
        if (systemController)
        {
            systemController.populateRoomList(message.content[JSONKeysCore.ROOM_LIST]);

            kingClient.onSubScribeLobby(new KingServerEvent(KingServerEvent.SUBSCRIBE_LOBBY, {
                listRooms: kingClient.getRoomManager().getRoomList()
            }));
            systemController = null;

            /*kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.SUBSCRIBE_LOBBY, {
         listRooms: kingClient.getRoomManager().getRoomList()
         }));*/


        }
        systemController = null;
    };

    return SubscribeLobbyHandler;
});