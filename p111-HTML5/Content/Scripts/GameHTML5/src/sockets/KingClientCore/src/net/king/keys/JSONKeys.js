/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    JSONKeys.prototype = Object.create(Object.prototype);
    JSONKeys.prototype.constructor = JSONKeys;

    Object.defineProperties(JSONKeys.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {JSONKeys}
     */
    function JSONKeys() {
        Object.call(this);
        this._init();
    }

    JSONKeys.prototype._init = function () {

    };

    JSONKeys.prototype.onEnterFrame = function () {

    };

    JSONKeys.ROOM_ID = "r";
    JSONKeys.ROOM_INFO = "r";
    JSONKeys.VAR_LIST = "vl";
    JSONKeys.USER_LIST = "ul";
    JSONKeys.USER_NAME = "un";
    JSONKeys.USER_ID = "id";
    JSONKeys.PASSWORD = "pw";
    JSONKeys.ZONE = "zn";
    JSONKeys.PRIVILEGE_ID = "pi";
    JSONKeys.ROOM_LIST = "rl";
    JSONKeys.USER_INFO = "u";
    JSONKeys.LIST_JOINED_ROOM = "ljr";
    JSONKeys.USER_COUNT = "uc";
    JSONKeys.SPECTATOR_COUNT = "sc";
    JSONKeys.ERROR = "ep";
    JSONKeys.MAX_USER = "mu";
    JSONKeys.MAX_SPECTATOR = "ms";
    JSONKeys.ROOM_PASSWORD = "p";
    JSONKeys.ROOM_NAME = "n";
    JSONKeys.IS_SPECTATOR = "sp";
    JSONKeys.GROUP_LIST = "gl";
    JSONKeys.GROUP_NAME = "gr";
    JSONKeys.SESSION_TOKEN = "st";
    JSONKeys.RECONNECT_TOKEN = "rt";
    JSONKeys.SOCKET_KEY = "si";
    JSONKeys.RECONNECT_RESULT = "rs";
    JSONKeys.LOGIN_DATA = "ld";
    JSONKeys.SERVER_TIME = "ste";
    JSONKeys.PLAYER_ID = "p";
    JSONKeys.ROOM_OWNER_ID = "ron";
    JSONKeys.LIST_ROOM_OWNER_ID = "lro";

    global.JSONKeys = JSONKeys;
    return JSONKeys;
});