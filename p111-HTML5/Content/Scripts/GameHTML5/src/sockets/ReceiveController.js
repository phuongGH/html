/**
 * Created by hungtd on 2/2/2016.
 */
"use strict";
define(function (require) {

    ReceiveController.prototype = Object.create(Object.prototype);
    ReceiveController.prototype.constructor = ReceiveController;

    Object.defineProperties(ReceiveController.prototype, {
        preLoader:{
            value:null,
            writable:true
        },

        timerToCheckLogin:{
            value:null,
            writable:true
        },

        timeDelayDisconnect:{
            value:30000,
            writable:true
        },

        timeOutDisconnectId:{
            value:0,
            writable:true
        },

        pingDelay:{
            value:1000,
            writable:true
        },

        pingTimer:{
            value:null,
            writable:true
        },

        listClasses:{
            value:[],
            writable:true
        },

        _listInstancedClasses:{
            value:[],
            writable:true
        },

        isInstanced:{
            value:false,
            writable:true
        }
    });

    /**
     *
     *
     * @param room {@param}
     * @return {ReceiveController}
     */
    function ReceiveController(preLoader) {
        Object.call(this);
        this.preLoader = preLoader;
        this._init();

        this.timerToCheckLogin = new Utilities.Timer(5000,1);
        this.timerToCheckLogin.CallBackFunctionOnComplete =this.onTimeOutCheckLogin.bind(this);
    }

    ReceiveController.prototype.onTimeOutCheckLogin = function(event) {
        this.preLoader.popUpController.showPopupNotify(AppInfo.cannotConnectMessage, false, false);
    }

    ReceiveController.prototype._init = function () {
        KF.socket.callBackOnConnected = this.onConnected.bind(this);
        KF.socket.callBackOnConnectionClose = this.onConnectionClose.bind(this);
        KF.socket.callBackOnIoErrorHandler = this.onConnectErrorHandler.bind(this);
        KF.socket.callBackOnLoginOk = this.onLoginOk.bind(this);
        KF.socket.callBackOnLoginFailed = this.onLoginFailed.bind(this);
        KF.socket.callBackOnReconnect = this.onReconnect.bind(this);
        KF.socket.callBackOnCreateRoom = this.onCreateRoom.bind(this);
        KF.socket.callBackOnJoinRoom = this.onJoinRoom.bind(this);
        KF.socket.callBackOnRoomLost = this.onRoomLost.bind(this);
        KF.socket.callBackOnSubScribeLobby = this.onSubScribeLobby.bind(this);
        KF.socket.callBackOnUserEnterRoom = this.onUserEnterRoom.bind(this);
        KF.socket.callBackOnUserExitRoom = this.onUserExitRoom.bind(this);
        KF.socket.callBackOnUserLost = this.onUserLost.bind(this);
        KF.socket.callBackOnSpectatorToPlayer = this.onSpectatorToPlayer.bind(this);
        KF.socket.callBackOnPlayerToSpectator = this.onPlayerToSpectator.bind(this);
        KF.socket.callBackOnSetRoomVariables = this.onSetRoomVariables.bind(this);
        KF.socket.callBackOnSetUserVariables = this.onSetUserVariables.bind(this);
        KF.socket.callBackOnRoomChangeOwner = this.onRoomChangeOwner.bind(this);
        KF.socket.callBackOnReceiveExtData = this.onReceiveExtData.bind(this);

        KF.socket.defaultSocket = AppInfo.socketConfig.socketKey;


        if (AppInfo.isDebug)
        {
            KF.isShowLog = AppInfo.isDebug;
            KF.setShowLogSize(800, 400, 250, 150, true);

            KF.socket.callBackFuncTrace =  this.onTrace;
        }

    }

    ReceiveController.prototype.onEnterFrame = function (detaTime) {

    }

    ReceiveController.prototype.onConnected = function (event) {
        Utilities.log(event);
        var isReconnected = event.data.isReconnected;
        if (isReconnected)
        {
            KF.showLog("Reconnect succusses");
            return;
        }

        if(this.preLoader != undefined && this.preLoader !=null && this.preLoader.requestController !=null) {
            this.preLoader.requestController.login();
            this.timerToCheckLogin.start();
        }
    }

    ReceiveController.prototype.onConnectionClose = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onConnectErrorHandler = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onLoginOk = function (event) {
        Utilities.log(event);
        this.timerToCheckLogin.stop();
    }

    ReceiveController.prototype.onLoginFailed = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onReconnect = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onCreateRoom = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onJoinRoom = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onRoomLost = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onSubScribeLobby = function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onUserEnterRoom= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onUserExitRoom= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onUserLost= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onSpectatorToPlayer= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onPlayerToSpectator= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onSetRoomVariables= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onSetUserVariables= function (event) {
        Utilities.log(event);
    }

    ReceiveController.prototype.onRoomChangeOwner= function () {
        Utilities.log(event);
    }

    ReceiveController.prototype.onReceiveExtData= function () {
        Utilities.log(event);
    }

    ReceiveController.prototype.onTrace= function () {
        Utilities.log(event);
    }

    ReceiveController.isInstanced= false;

    return ReceiveController;
});