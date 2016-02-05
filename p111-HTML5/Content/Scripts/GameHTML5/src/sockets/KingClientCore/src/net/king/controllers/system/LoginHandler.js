/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    var JSONKeysCore                = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var User                    = require('sockets/KingClientCore/src/net/king/entities/User');
    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var IHandlerResponseMessage = require('sockets/KingClientCore/src/net/king/controllers/system/IHandlerResponseMessage');

    LoginHandler.prototype = Object.create(IHandlerResponseMessage.prototype);
    LoginHandler.prototype.constructor = LoginHandler;

    Object.defineProperties(LoginHandler.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {LoginHandler}
     */
    function LoginHandler() {
        IHandlerResponseMessage.call(this);
        this._init();
    }

    LoginHandler.prototype._init = function () {

    };

    LoginHandler.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Message} message
     * @param {IController} controller
     * @param {KingClient} kingClient
     */
    LoginHandler.prototype.handleResponse = function (message, controller, kingClient) {
        if (message.content[JSONKeysCore.ERROR])
        {
            kingClient.onLoginFailed(new KingServerEvent(KingServerEvent.LOGIN_FAILED));
           // kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.LOGIN_FAILED));
        }
        else
        {
            var user = new User(message.content[JSONKeysCore.USER_ID],
            message.content[JSONKeysCore.USER_NAME], true);

            user.setPrivilegeId(message.content[JSONKeysCore.PRIVILEGE_ID]);

            kingClient.setME(user);

            var zoneName = message.content[JSONKeysCore.ZONE];
            kingClient.currentZone = zoneName;
            kingClient.serverTimeLoginOk = message.content[JSONKeysCore.SERVER_TIME];

            var groupList = message.content[JSONKeysCore.GROUP_LIST];
            kingClient.listGroups = [];

            groupList.forEach(function(groupName){
                kingClient.listGroups.push(groupName);
            });
          /*  for each (var groupName:String in groupList)
            {
                kingClient.listGroups.push(groupName);
            }*/

            var data = {
            zone: zoneName,
            user: user,
            serverTime: kingClient.serverTimeLoginOk
        };
            //kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.LOGIN_OK, data));
            kingClient.onLoginOk(new KingServerEvent(KingServerEvent.LOGIN_OK, data));
            user = null;
            data = null;
            groupList = null;
        }
    };

    return LoginHandler;
});