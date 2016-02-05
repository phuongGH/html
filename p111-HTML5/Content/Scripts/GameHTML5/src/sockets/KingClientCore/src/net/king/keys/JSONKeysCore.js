/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    JSONKeysCore.prototype = Object.create(Object.prototype);
    JSONKeysCore.prototype.constructor = JSONKeysCore;

    Object.defineProperties(JSONKeysCore.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {JSONKeysCore}
     */
    function JSONKeysCore() {
        Object.call(this);
        this._init();
    }

    JSONKeysCore.prototype._init = function () {

    };

    JSONKeysCore.prototype.onEnterFrame = function () {

    };

    JSONKeysCore.ROOM_ID = "r";
    JSONKeysCore.ROOM_INFO = "r";
    JSONKeysCore.VAR_LIST = "vl";
    JSONKeysCore.USER_LIST = "ul";
    JSONKeysCore.USER_NAME = "un";
    JSONKeysCore.USER_ID = "id";
    JSONKeysCore.PASSWORD = "pw";
    JSONKeysCore.ZONE = "zn";
    JSONKeysCore.PRIVILEGE_ID = "pi";
    JSONKeysCore.ROOM_LIST = "rl";
    JSONKeysCore.USER_INFO = "u";
    JSONKeysCore.LIST_JOINED_ROOM = "ljr";
    JSONKeysCore.USER_COUNT = "uc";
    JSONKeysCore.SPECTATOR_COUNT = "sc";
    JSONKeysCore.ERROR = "ep";
    JSONKeysCore.MAX_USER = "mu";
    JSONKeysCore.MAX_SPECTATOR = "ms";
    JSONKeysCore.ROOM_PASSWORD = "p";
    JSONKeysCore.ROOM_NAME = "n";
    JSONKeysCore.IS_SPECTATOR = "sp";
    JSONKeysCore.GROUP_LIST = "gl";
    JSONKeysCore.GROUP_NAME = "gr";
    JSONKeysCore.SESSION_TOKEN = "st";
    JSONKeysCore.RECONNECT_TOKEN = "rt";
    JSONKeysCore.SOCKET_KEY = "si";
    JSONKeysCore.RECONNECT_RESULT = "rs";
    JSONKeysCore.LOGIN_DATA = "ld";
    JSONKeysCore.SERVER_TIME = "ste";
    JSONKeysCore.PLAYER_ID = "p";
    JSONKeysCore.ROOM_OWNER_ID = "ron";
    JSONKeysCore.LIST_ROOM_OWNER_ID = "lro";

    global.JSONKeysCore = JSONKeysCore;
    return JSONKeysCore;
});