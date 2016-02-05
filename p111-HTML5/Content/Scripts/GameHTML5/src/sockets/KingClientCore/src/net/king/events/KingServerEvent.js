/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    KingServerEvent.prototype = Object.create(Object.prototype);
    KingServerEvent.prototype.constructor = KingServerEvent;

    Object.defineProperties(KingServerEvent.prototype, {
        eventType:{
            value:'',
            writable:true
        },

        data:{
            value:null,
            writable:true
        }
    });

    /**
     *
     *
     * @param room {@param}
     * @return {KingServerEvent}
     */
    function KingServerEvent(eventType , data ) {
        Object.call(this);

        this.eventType = eventType;
        this.data = data;
        this._init();
    }

    KingServerEvent.prototype._init = function () {

    };

    KingServerEvent.prototype.onEnterFrame = function () {

    };

    KingServerEvent.CONNECTED = 'CONNECTED';
    KingServerEvent.CONNECTION_CLOSE = 'NOT_CONNECTED';
    KingServerEvent.LOGIN_OK = 'LOGIN_OK';
    KingServerEvent.LOGIN_FAILED = 'LOGIN_FAILED';
    KingServerEvent.JOIN_ROOM = 'JOIN_ROOM';
    KingServerEvent.USER_EXIT_ROOM = 'USER_EXIT_ROOM';
    KingServerEvent.USER_ENTER_ROOM = 'USER_ENTER_ROOM';
    KingServerEvent.USER_LOST = 'USER_LOST';
    KingServerEvent.CREATE_ROOM = 'CREATE_ROOM';
    KingServerEvent.CONNECTION_ERROR = 'ERROR_IO';
    KingServerEvent.SECURITY_ERROR = 'ERROR_SECURITY';
    KingServerEvent.RECEIVE_SERVER_DATA = 'RECEIVE_SERVER_DATA';
    KingServerEvent.RECEIVE_EXTENSION_DATA = 'RECEIVE_EXTENSION_DATA';
    KingServerEvent.SUBSCRIBE_LOBBY = 'SUBSCRIBE_LOBBY';
    KingServerEvent.ROOM_COUNT_CHANGE = 'ROOM_COUNT_CHANGE';
    KingServerEvent.ROOM_LOST = 'ROOM_LOST';
    KingServerEvent.RECONNECT = 'RECONNECT';
    KingServerEvent.PUBLIC_MESSAGE = 'PUBLIC_MESSAGE';
    KingServerEvent.SPECTATOR_TO_PLAYER = 'SPECTATOR_TO_PLAYER';
    KingServerEvent.PLAYER_TO_SPECTATOR = 'PLAYER_TO_SPECTATOR';
    KingServerEvent.SET_ROOM_VARIABLES = 'SET_ROOM_VARIABLES';
    KingServerEvent.SET_USER_VARIABLES = 'SET_USER_VARIABLES';
    KingServerEvent.ROOM_CHANGE_OWNER = 'ROOM_CHANGE_OWNER';

    global.KingServerEvent = KingServerEvent;

    return KingServerEvent;
});