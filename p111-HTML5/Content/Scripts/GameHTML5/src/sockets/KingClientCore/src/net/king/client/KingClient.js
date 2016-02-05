/**
 * Created by hungtd on 1/25/2016.
 */
"user trick";
define(function (require) {

    var KingKeys                        = require('sockets/KingClientCore/src/net/king/keys/KingKeys');
    var JSONKeysCore                    = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingSystemControllerKeys        = require('sockets/KingClientCore/src/net/king/keys/KingSystemControllerKeys');
    var Message                         = require('sockets/KingClientCore/src/net/king/models/Message');
    var RoomManager                     = require('sockets/KingClientCore/src/net/king/entities/manager/RoomManager');
    var SystemController                = require('sockets/KingClientCore/src/net/king/controllers/SystemController');
    var ExtensionController             = require('sockets/KingClientCore/src/net/king/controllers/ExtensionController');
    var KingServerSocket                = require('sockets/KingClientCore/src/net/king/client/KingServerSocket');

    KingClient.prototype = Object.create(Object.prototype);
    KingClient.prototype.constructor = KingClient;

    Object.defineProperties(KingClient.prototype, {
        roomManager:{
            value:null,
            writable:true
        },

        me:{
            value:null,
            writable:true
        },

        myId:{
            value:0,
            writable:true
        },

        currentZone:{
            value:'',
            writable:true
        },

        currentGroup:{
            value:'',
            writable:true
        },

        serverTimeLoginOk:{
            value:0,
            writable:true
        },

        listControllers:{
            value:[],
            writable:true
        },

        lobbyRoomId:{
            value:-1,
            writable:true
        },

        listSockets:{
            value:[],
            writable:true
        },

        defaultSocket:{
            value:'',
            writable:true
        },

        listGroups:{
            value:[],
            writable:true
        },

        instance:{
            value:[],
            writable:true
        },

        callBackFuncTrace:{
            value:null,
            writable:true
        },

        callBackOnConnectionClose:{
            value:null,
            writable:true
        },

        callBackOnConnected:{
            value:null,
            writable:true
        },

        callBackOnIoErrorHandler:{
            value:null,
            writable:true
        },

        callBackOnReceiveExtData:{
            value:null,
            writable:true
        },

        callBackOnCreateRoom:{
            value:null,
            writable:true
        },

        callBackOnReconnect:{
            value:null,
            writable:true
        },

        callBackOnJoinRoom:{
            value:null,
            writable:true
        },

        callBackOnLoginFailed:{
            value:null,
            writable:true
        },

        callBackOnLoginOk:{
            value:null,
            writable:true
        },

        callBackOnRoomChangeOwner:{
            value:null,
            writable:true
        },

        callBackOnPlayerToSpectator:{
            value:null,
            writable:true
        },

        callBackOnPublicMessage:{
            value:null,
            writable:true
        },

        callBackOnRoomCountChange:{
            value:null,
            writable:true
        },

        callBackOnRoomLost:{
            value:null,
            writable:true
        },

        callBackOnSetRoomVariables:{
            value:null,
            writable:true
        },

        callBackOnSetUserVariables:{
            value:null,
            writable:true
        },

        callBackOnSpectatorToPlayer:{
            value:null,
            writable:true
        },

        callBackOnSubScribeLobby:{
            value:null,
            writable:true
        },

        callBackOnUserEnterRoom:{
            value:null,
            writable:true
        },

        callBackOnUserExitRoom:{
            value:null,
            writable:true
        },

        callBackOnUserLost:{
            value:null,
            writable:true
        }


    });

    /**
     *
     *
     * @param room {@param}
     * @return {KingClient}
     */
    function KingClient() {
        Object.call(this);
        this._init();
    }

    KingClient.prototype._init = function () {

        this.listSockets = [];
        this.listGroups =[];
        this.roomManager = new RoomManager();
        this.initControllers();
        this.configEventListeners();
        //Xử lý close all Socket khi user đóng trình duyệt
        //window.onbeforeunload =handleCloseBrowser.bind(this);
        window.addEventListener("beforeunload",this.handleCloseBrowser.bind(this));

    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onConnectionClose = function (event) {
        if(this.callBackOnConnectionClose!=undefined || this.callBackOnConnectionClose!=null )
            this.callBackOnConnectionClose(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onConnected = function (event) {
        if(this.callBackOnConnected!=undefined || this.callBackOnConnected!=null )
            this.callBackOnConnected(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onErrorConncHandler = function (event) {
        if(this.callBackOnIoErrorHandler!=undefined || this.callBackOnIoErrorHandler!=null )
            this.callBackOnIoErrorHandler(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onReceiveExtData = function (event) {
        if(this.callBackOnReceiveExtData!=undefined || this.callBackOnReceiveExtData!=null )
            this.callBackOnReceiveExtData(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onCreateRoom = function (event) {
        if(this.callBackOnCreateRoom!=undefined || this.callBackOnCreateRoom!=null )
            this.callBackOnCreateRoom(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onReconnect = function (event) {
        if(this.callBackOnReconnect!=undefined || this.callBackOnReconnect!=null )
            this.callBackOnReconnect(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onJoinRoom = function (event) {
        if(this.callBackOnJoinRoom!=undefined || this.callBackOnJoinRoom!=null )
            this.callBackOnJoinRoom(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onLoginFailed = function (event) {
        if(this.callBackOnLoginFailed!=undefined || this.callBackOnLoginFailed!=null )
            this.callBackOnLoginFailed(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onLoginOk = function (event) {
        if(this.callBackOnLoginOk!=undefined || this.callBackOnLoginOk!=null)
            this.callBackOnLoginOk(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onRoomChangeOwner = function (event) {
        if(this.callBackOnRoomChangeOwner!=undefined || this.callBackOnRoomChangeOwner!=null )
            this.callBackOnRoomChangeOwner(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onPlayerToSpectator = function (event) {
        if(this.callBackOnPlayerToSpectator!=undefined || this.callBackOnPlayerToSpectator!=null)
            this.callBackOnPlayerToSpectator(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onSpectatorToPlayer = function (event) {
        if(this.callBackOnSpectatorToPlayer!=undefined || this.callBackOnSpectatorToPlayer!=null)
            this.callBackOnSpectatorToPlayer(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onPublicMessage = function (event) {
        if(this.callBackOnPublicMessage!=undefined || this.callBackOnPublicMessage!=null)
            this.callBackOnPublicMessage(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onRoomCountChange = function (event) {
        if(this.callBackOnRoomCountChange!=undefined || this.callBackOnRoomCountChange!=null)
            this.callBackOnRoomCountChange(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onRoomLost = function (event) {
        if(this.callBackOnRoomLost!=undefined || this.callBackOnRoomLost!=null)
            this.callBackOnRoomLost(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onSetRoomVariables = function (event) {
        if(this.callBackOnSetRoomVariables!=undefined || this.callBackOnSetRoomVariables!=null)
            this.callBackOnSetRoomVariables(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onSetUserVariables = function (event) {
        if(this.callBackOnSetUserVariables!=undefined || this.callBackOnSetUserVariables!=null)
            this.callBackOnSetUserVariables(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onSubScribeLobby = function (event) {
        if(this.callBackOnSubScribeLobby!=undefined || this.callBackOnSubScribeLobby!=null)
            this.callBackOnSubScribeLobby(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onUserEnterRoom = function (event) {
        if(this.callBackOnUserEnterRoom!=undefined || this.callBackOnUserEnterRoom!=null)
            this.callBackOnUserEnterRoom(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onUserExitRoom = function (event) {
        if(this.callBackOnUserExitRoom!=undefined || this.callBackOnUserExitRoom!=null)
            this.callBackOnUserExitRoom(event);
    };

    /**
     * @param {KingServerEvent} event
     *
     */
    KingClient.prototype.onUseLost = function (event) {
        if(this.callBackOnUserLost!=undefined || this.callBackOnUserLost!=null)
            this.callBackOnUserLost(event);
    };

    /**
     *
     * @param	{String} message
     *
     */
    KingClient.prototype.trace = function (message) {
        //this.dispatchEvent(new KingServerEvent("trace", message));
        if(this.callBackFuncTrace != undefined || this.callBackFuncTrace!=null )
            this.callBackFuncTrace(message);
    };


    /**
     *
     *
     * @param {String} socketKey
     * @param {Number} timerToDelayReconnect
     * @param {Number} numRepeatReconnect
     * @param {Number} timeOut
     *
     */
    KingClient.prototype.connectSocket = function (socketKey, timerToDelayReconnect, numRepeatReconnect, timeOut) {

        if(timerToDelayReconnect==undefined)
            timerToDelayReconnect =3000;

        if(numRepeatReconnect==undefined)
            numRepeatReconnect = 5;

        if(timeOut==undefined)
            timeOut =20000;

        var ipAndPort = socketKey.split(":");
        var socketManager = new KingServerSocket(this,ipAndPort[0], ipAndPort[1], socketKey, timerToDelayReconnect, numRepeatReconnect, timeOut);
        socketManager.connect();
    };

    /**
     *
     *
     * @param {String} socketKey
     *
     */
    KingClient.prototype.closeSocket = function (socketKey) {
        var socket = this.listSockets[socketKey];
        if (socket)
        {
            socket.disconnect();
            socket = null
        }
        else
        {
           this.trace(socketKey + " don't connect yet.");
        }
    };

    KingClient.prototype.closeAllSocket = function () {
        var arrSockets = this.listSockets;
        arrSockets.forEach(function(socket){
            "use strict";
            socket.disconnect();
            socket = null;
        })   ;
    };

    /**
     *
     *
     * @param {String} socketKey
     * @return {Boolean}
     */
    KingClient.prototype.isConnected = function (socketKey) {
        var socket = this.listSockets[socketKey] ;
        if (socket)
        {
            return socket.isConnected();
        }
        return false;
    };

    /**
     * Send message to Server with Message object
     * @param	{Message} message
     * @param	{String} socketKey
     */
    KingClient.prototype.sendMessage = function (message, socketKey) {

        if (socketKey.length == 0)
        {
            socketKey = this.defaultSocket;
        }

        if (socketKey.length == 0)
        {
            throw new Error("Socket IP is empty. Please set default socket IP or pass socket IP in the parameter.");
            return;
        }

        var socket = this.listSockets[socketKey];
        if (socket)
        {
            socket.sendMessage(message);
            socket = null
        }
        else
        {
            this.trace(socketKey + " don't connect yet.");
        }
    };

    /**
     * Send message to Server with Message object
     * @param	{RequestCommand} requestCommand
     * @param	{String} socketKey
     */
    KingClient.prototype.sendRequest = function (requestCommand, socketKey) {
        if (socketKey.length == 0)
        {
            socketKey = this.defaultSocket;
        }

        if (socketKey.length == 0)
        {
            throw new Error("Socket IP is empty. Please set default socket IP or pass socket IP in the parameter.");
            return;
        }

        var socket = this.listSockets[socketKey] ;
        if (socket)
        {
            var message = new Message(KingKeys.CORE_EXTENSIONS_CONTROLLER_ID, 0,
            {
                c: requestCommand.command,
                p: requestCommand.content
            });
            socket.sendMessage(message);
            socket = null
        }
        else
        {
            this.trace(socketKey + " don't connect yet.");
        }
    };


    /**
     *
     * @return	{RoomManager} roomManager
     *
     */
    KingClient.prototype.getRoomManager = function () {
        return this.roomManager;
    };

    /**
     *
     * @return {User} me
     *
     */
    KingClient.prototype.getME = function () {
        return this.me;
    };

    /**
     *
     * @param	{User} me
     *
     */
    KingClient.prototype.setME = function (user) {
        this.myId = user.getId();
        this.me = user;
    };

    /**
     *
     *
     *
     */
    KingClient.prototype.resetGroupInfo = function () {
        if(this.roomManager)
        {
            this.roomManager.clearAll();
        }
    };



    /**
     *
     *@param {KingServerEvent} event
     *
     */
    KingClient.prototype.onReceiveServerData = function (event) {
        var message = event.data ;
        if (message)
        {
            var controller = this.listControllers[message.controllerId];
            if (controller)
            {
                controller.handleMessage(message);
                controller = null;
            }
            else
            {
                this.trace("==> There is no class with controllerId = " + message.controllerId);
            }
            message = null;
        }
    };

    /**
     *
     *  @param {String} sessionToken
     *  @param {String} socketKey
     *
     */
    KingClient.prototype.updateSessionToken = function (sessionToken,socketKey) {
        var socket = this.listSockets[socketKey];
        if (socket)
        {
            socket.updateSessionToken(sessionToken);
            socket = null;
        }
    };

    /**
     *
     *  @return {Array} listSockets
     *
     *
     */
    KingClient.prototype.getListSockets = function () {
        return this.listSockets;
    };

    /***********FUNCTION FOR USER*****************/
    /**
     *  @param {String} userName
     *  @param {String} password
     *  @param {String} zone
     *  @param {Object} loginData
     *  @param {String} socketKey
     */
    KingClient.prototype.login = function (userName, password, zone, loginData, socketKey) {
        if(socketKey==undefined)
            socketKey='';

        var data = { };
        data[JSONKeysCore.USER_NAME] = userName;
        data[JSONKeysCore.PASSWORD] = password;
        data[JSONKeysCore.ZONE] = zone;
        data[JSONKeysCore.LOGIN_DATA] = loginData;
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.LOGIN, data);
        this.sendMessage(message, socketKey);
        data = null;
        message = null;

    };

    /**
     *  @param {String} roomName
     *  @param {Number} maxUser
     *  @param {String} password
     *  @param {Number} maxSpectator
     *  @param {String} socketKey
     */
    KingClient.prototype.createRoom = function (roomName, maxUser, password, maxSpectator, socketKey) {
        if(socketKey==undefined)
            socketKey='';

        var data = { };
        data[JSONKeysCore.MAX_USER] = maxUser;
        data[JSONKeysCore.MAX_SPECTATOR] = maxSpectator;
        data[JSONKeysCore.ROOM_PASSWORD] = password;
        data[JSONKeysCore.ROOM_NAME] = roomName;
        var message = new Message(KingKeys.CORE_SYSTEM_CONTROLLER_ID, KingSystemControllerKeys.CREATE_ROOM, data);
        this.sendMessage(message, socketKey);
        data = null;
        message = null;

    };

    /**
     *  @param {Number} roomId
     *  @param {String} password
     *  @param {Boolean} isViewer
     *  @param {String} socketKey
     *
     */
    KingClient.prototype.joinRoom = function (roomId, password, isViewer,socketKey) {
        if(isViewer==undefined)
            isViewer = false;

        if(socketKey==undefined)
            socketKey='';

        var data = { };
        data["i"] = roomId;
        data[JSONKeysCore.ROOM_PASSWORD] = password;
        data[JSONKeysCore.IS_SPECTATOR] = isViewer;
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.JOIN_ROOM, data);
        this.sendMessage(message, socketKey);
        message = null;
        data = null;

    };

    /**
     *  @param {String} socketKey
     *
     */
    KingClient.prototype.joinLobby = function (socketKey) {

        if(socketKey==undefined)
            socketKey='';

        this.joinGroup(this.currentGroup, socketKey);

    };

    /**
     * @param {String} groupId
     *  @param {String} socketKey
     *
     */
    KingClient.prototype.joinGroup = function (groupId,socketKey) {

        if(groupId==undefined)
            groupId='';

        if(socketKey==undefined)
            socketKey='';

        this.resetGroupInfo();
        var data = { };
        if (groupId.length > 0)
        {
            data[JSONKeysCore.GROUP_NAME] = groupId;
        }
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.JOIN_LOBBY, data);
        this.sendMessage(message, socketKey);
        data = null;

    };

    /**
     * @param {Number} roomId
     *  @param {String} socketKey
     *
     */
    KingClient.prototype.leaveRoom = function (roomId,socketKey) {

        if(socketKey==undefined)
            socketKey='';

        var data = { };
        data[JSONKeysCore.ROOM_ID] = roomId;
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.LEAVE_ROOM, data);
        this.sendMessage(message, socketKey);
        message = null;
        data = null;

    };

    /**
     * @param {Number} userId
     *  @param {String} socketKey
     *
     */
    KingClient.prototype.playerToSpectator = function (userId,socketKey) {

        if(socketKey==undefined)
            socketKey='';

        var data = { };
        data[JSONKeysCore.USER_ID] = userId;
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.PLAYER_TO_SPECTATOR, data);
        this.sendMessage(message, socketKey);
        message = null;
        data = null;

    };

    /**
     * @param {Number} userId
     * @param {Number} position
     * @param {String} socketKey
     *
     */
    KingClient.prototype.spectatorToPlayer = function (userId,position,socketKey) {

        if(socketKey==undefined)
            socketKey='';

        var data = { };
        data[JSONKeysCore.USER_ID] = userId;
        data[JSONKeysCore.PLAYER_ID] = position;
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.SPECTATOR_TO_PLAYER, data);
        this.sendMessage(message, socketKey);
        message = null;
        data = null;

    };

    /**
     * @param {String} socketKey
     *
     */
    KingClient.prototype.destroy = function (socketKey) {
        var socket = this.listSockets[socketKey] ;
        if (socket) {
            socket.destroy();
        }
    };



    /**
     * @param {String} socketKey
     *
     */
    KingClient.prototype.stopReconnect = function (socketKey) {
        var socket = this.listSockets[socketKey] ;
        if (socket) {
            socket.stopReconnect();
        }
    };

    /**
     * @param {String} socketKey
     * @param {Number} socketKey = 5000
     *
     */
    KingClient.prototype.disconnectToReconnect = function (socketKey,delayToReconnect) {
        if(delayToReconnect==undefined)
            delayToReconnect =5000;

        var socket = this.listSockets[socketKey];
        if (socket) {
            socket.disconnectToReconnect(delayToReconnect);
        }
    };

    KingClient.prototype.initControllers = function () {
        this.listControllers = [];
        var systemController = new SystemController(this);
        systemController.id = KingKeys.CORE_SYSTEM_CONTROLLER_ID;
        this.listControllers[systemController.id] = systemController;

        var extensionController = new ExtensionController();
        extensionController.id = KingKeys.CORE_EXTENSIONS_CONTROLLER_ID;
        this.listControllers[extensionController.id] = extensionController;
    };

    KingClient.prototype.handleCloseBrowser = function () {
        this.closeAllSocket();
    };

    KingClient.prototype.configEventListeners = function () {

    };

    KingClient.prototype.onEnterFrame = function () {

    };

    KingClient.getInstance = function () {
        if (this.instance == null)
        {
            this.instance = new KingClient();
        }
        return this.instance;
    };

    return KingClient;
});