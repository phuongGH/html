/**
 * Created by hungtd on 1/27/2016.
 */
"use strict";
define(function (require) {


    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');
    var KingJson                = require('sockets/KingClientCore/src/net/king/data/KingJson');
    var User                    = require('sockets/KingClientCore/src/net/king/entities/User');
    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');

    UpdateRoomDataHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    UpdateRoomDataHandler.prototype.constructor = UpdateRoomDataHandler;

    Object.defineProperties(UpdateRoomDataHandler.prototype, {});

    /**
     * @return {UpdateRoomDataHandler}
     */
    function UpdateRoomDataHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    UpdateRoomDataHandler.prototype._init = function () {

    };

    UpdateRoomDataHandler.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    UpdateRoomDataHandler.prototype.handleResponse = function (message, controller, kingClient) {
        kingClient.trace("UpdateRoomDataHandler: " + KingJson.stringify(message.content));
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
    };

    return UpdateRoomDataHandler;
});