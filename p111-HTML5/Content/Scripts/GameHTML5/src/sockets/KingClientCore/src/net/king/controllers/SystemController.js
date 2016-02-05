/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {


    var KingSystemControllerKeys    = require('sockets/KingClientCore/src/net/king/keys/KingSystemControllerKeys');
    var Room                        = require('sockets/KingClientCore/src/net/king/entities/Room');
    var IController                 = require('sockets/KingClientCore/src/net/king/controllers/IController');
    var LoginHandler                = require('sockets/KingClientCore/src/net/king/controllers/system/LoginHandler');
    var JoinRoomHandler             = require('sockets/KingClientCore/src/net/king/controllers/system/JoinRoomHandler');
    var RoomCountChangeHandler      = require('sockets/KingClientCore/src/net/king/controllers/system/RoomCountChangeHandler');
    var SetRoomVariablesHandler     = require('sockets/KingClientCore/src/net/king/controllers/system/SetRoomVariablesHandler');
    var SetUserVariablesHandler     = require('sockets/KingClientCore/src/net/king/controllers/system/SetUserVariablesHandler');
    var UserLostHandler             = require('sockets/KingClientCore/src/net/king/controllers/system/UserLostHandler');
    var RoomLostHandler             = require('sockets/KingClientCore/src/net/king/controllers/system/RoomLostHandler');
    var SubscribeLobbyHandler       = require('sockets/KingClientCore/src/net/king/controllers/system/SubscribeLobbyHandler');
    var CreateRoomHandler           = require('sockets/KingClientCore/src/net/king/controllers/system/CreateRoomHandler');
    var UserEnterRoomHandler        = require('sockets/KingClientCore/src/net/king/controllers/system/UserEnterRoomHandler');
    var UserExitRoomHandler         = require('sockets/KingClientCore/src/net/king/controllers/system/UserExitRoomHandler');
    var LobbyUpdateHandler          = require('sockets/KingClientCore/src/net/king/controllers/system/LobbyUpdateHandler');
    var HandShakeHandler            = require('sockets/KingClientCore/src/net/king/controllers/system/HandShakeHandler');
    var SpectatorToPlayerHandler    = require('sockets/KingClientCore/src/net/king/controllers/system/SpectatorToPlayerHandler');
    var PlayerToSpectatorHandler    = require('sockets/KingClientCore/src/net/king/controllers/system/PlayerToSpectatorHandler');
    var RoomOwnerChangeHandler      = require('sockets/KingClientCore/src/net/king/controllers/system/RoomOwnerChangeHandler');
    var UpdateRoomDataHandler       = require('sockets/KingClientCore/src/net/king/controllers/system/UpdateRoomDataHandler');
    var PublicMessageHandler        = require('sockets/KingClientCore/src/net/king/controllers/system/PublicMessageHandler');

    SystemController.prototype = Object.create(IController.prototype);
    SystemController.prototype.constructor = SystemController;

    Object.defineProperties(SystemController.prototype, {
        kingClient:{
            value:null,
            writable:true
        },

        listSystemClasses:{
            value:[],
            writable:true
        },

        listInstancedClasses:{
            value:[],
            writable:true
        },

        id:{
            value:-1,
            writable:true
        }
    });


    /**
     *
     * @param {KingClient} kingClient
     * @constructor
     */
    function SystemController(kingClient) {
        if(kingClient == undefined || kingClient == null)
        throw new Error ('SystemController error constructor kingClient is not null');

        IController.call(this);
        this.kingClient = kingClient;
        this._init();
    }

    SystemController.prototype._init = function () {
        this.intSystemClasses();
    };

    SystemController.prototype.intSystemClasses = function () {

        this.listSystemClasses = [];
        this.listInstancedClasses = [];
        this.listSystemClasses[KingSystemControllerKeys.LOGIN] = LoginHandler;
        this.listSystemClasses[KingSystemControllerKeys.JOIN_ROOM] = JoinRoomHandler;

        this.listSystemClasses[KingSystemControllerKeys.ROOM_COUNT_CHANGE] = RoomCountChangeHandler;
        this.listSystemClasses[KingSystemControllerKeys.SET_ROOM_VARIABLES] = SetRoomVariablesHandler;
        this.listSystemClasses[KingSystemControllerKeys.SET_USER_VARIABLES] = SetUserVariablesHandler;

        this.listSystemClasses[KingSystemControllerKeys.USER_LOST] = UserLostHandler;
        this.listSystemClasses[KingSystemControllerKeys.ROOM_LOST] = RoomLostHandler;
        this.listSystemClasses[KingSystemControllerKeys.SUBSCRIBE_LOBBY] = SubscribeLobbyHandler;
        this.listSystemClasses[KingSystemControllerKeys.ROOM_COUNT_CHANGE] = RoomCountChangeHandler;
        this.listSystemClasses[KingSystemControllerKeys.CREATE_ROOM] = CreateRoomHandler;
        this.listSystemClasses[KingSystemControllerKeys.USER_ENTER_ROOM] = UserEnterRoomHandler;
        this.listSystemClasses[KingSystemControllerKeys.USER_EXIT_ROOM] = UserExitRoomHandler;
        this.listSystemClasses[KingSystemControllerKeys.LOBBY_UPDATE] = LobbyUpdateHandler;
        this.listSystemClasses[KingSystemControllerKeys.HAND_SHAKE] = HandShakeHandler;

        this.listSystemClasses[KingSystemControllerKeys.SPECTATOR_TO_PLAYER] = SpectatorToPlayerHandler;
        this.listSystemClasses[KingSystemControllerKeys.PLAYER_TO_SPECTATOR] = PlayerToSpectatorHandler;

        this.listSystemClasses[KingSystemControllerKeys.ROOM_OWNER_CHANGE] = RoomOwnerChangeHandler;

        this.listSystemClasses[KingSystemControllerKeys.UPDATE_ROOM_DATA] = UpdateRoomDataHandler;

        this.listSystemClasses[KingSystemControllerKeys.PUBLIC_MESASAGE] = PublicMessageHandler;
    };

    /**
     * @param {Message] message
     */
    SystemController.prototype.handleMessage = function (message) {
        var currentClass = this.listSystemClasses[message.requestId];
        if (currentClass)
        {
            var classHandler = this.listInstancedClasses[message.requestId];
            if (classHandler == null)
            {
                classHandler = new currentClass();
                this.listInstancedClasses[message.requestId] = classHandler;
            }
            classHandler.handleResponse(message, this, this.kingClient);
            classHandler = null;
            currentClass = null;
        }
        else
        {
            this.kingClient.trace("==> There is no class with requestId = " + message.requestId);
        }
    };

    /**
     * @param {Array] listRooms
     */
    SystemController.prototype.populateRoomList = function (listRooms) {
        var roomManager = this.kingClient.getRoomManager();
        roomManager.clearRoom();
        var len = listRooms.length;
        var roomInList;
        for (var j = 0; j < len; j++)
        {
            roomInList = listRooms[j];
            Room.fromJSON(roomInList);
            roomInList = null;
        }

        listRooms = null;
        roomManager = null;
    };

    SystemController.prototype.onEnterFrame = function () {

    };
    return SystemController;
});