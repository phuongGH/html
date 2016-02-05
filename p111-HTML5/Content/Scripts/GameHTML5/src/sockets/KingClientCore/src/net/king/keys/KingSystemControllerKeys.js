/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    KingSystemControllerKeys.prototype = Object.create(Object.prototype);
    KingSystemControllerKeys.prototype.constructor = KingSystemControllerKeys;

    Object.defineProperties(KingSystemControllerKeys.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {KingSystemControllerKeys}
     */
    function KingSystemControllerKeys() {
        Object.call(this);
        this._init();
    }

    KingSystemControllerKeys.prototype._init = function () {

    };

    KingSystemControllerKeys.prototype.onEnterFrame = function () {

    };

    KingSystemControllerKeys.LOGIN = 1;
    KingSystemControllerKeys.JOIN_ROOM = 4;
    KingSystemControllerKeys.CREATE_ROOM = 6;
    KingSystemControllerKeys.SET_ROOM_VARIABLES = 11;
    KingSystemControllerKeys.SET_USER_VARIABLES = 12;
    KingSystemControllerKeys.LEAVE_ROOM = 14;
    KingSystemControllerKeys.SUBSCRIBE_LOBBY = 15;
    KingSystemControllerKeys.SPECTATOR_TO_PLAYER = 17;
    KingSystemControllerKeys.PLAYER_TO_SPECTATOR = 18;
    KingSystemControllerKeys.USER_ENTER_ROOM = 41;
    KingSystemControllerKeys.ROOM_COUNT_CHANGE = 42;
    KingSystemControllerKeys.USER_LOST = 43;
    KingSystemControllerKeys.ROOM_LOST = 44;
    KingSystemControllerKeys.USER_EXIT_ROOM = 45;
    KingSystemControllerKeys.ROOM_OWNER_CHANGE = 47;
    KingSystemControllerKeys.LOBBY_UPDATE = 48;
    KingSystemControllerKeys.HAND_SHAKE = 49;
    KingSystemControllerKeys.JOIN_LOBBY = 50;
    KingSystemControllerKeys.PUBLIC_MESASAGE = 20;
    KingSystemControllerKeys.UPDATE_ROOM_DATA = 53;

    global.KingSystemControllerKeys =KingSystemControllerKeys;

    return KingSystemControllerKeys;
});