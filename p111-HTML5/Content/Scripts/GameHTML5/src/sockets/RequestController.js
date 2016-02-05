/**
 * Created by hungtd on 2/2/2016.
 */
"use strict";
define(function (require) {

    RequestController.prototype = Object.create(Object.prototype);
    RequestController.prototype.constructor = RequestController;

    Object.defineProperties(RequestController.prototype, {
        preLoader:{
            value:null,
            writable:true
        },

        loginData:{
            value:{},
            writable:true
        }
    });

    /**
     *
     *
     * @param room {@param}
     * @return {RequestController}
     */
    function RequestController(preLoader) {
        Object.call(this);
        this.preLoader = preLoader;
        this._init();
    }

    RequestController.prototype._init = function () {

    }

    RequestController.prototype.onEnterFrame = function () {

    }

    RequestController.prototype.onConnect = function () {
        KF.socket.connectSocket(AppInfo.socketConfig.socketKey,AppInfo.socketConfig.timeToDelayReconnect,AppInfo.socketConfig.numRepeatReconnect,AppInfo.socketConfig.socketTimeOut);
    }

    RequestController.prototype.onLogin = function () {
        this.loginData ={};

        this.loginData[JSONKeys.USER_ID]                = AppInfo.myInfo.userID;
        this.loginData[JSONKeys.EMAIL]                  = AppInfo.myInfo.email;
        this.loginData[JSONKeys.PASSWORD]               = AppInfo.myInfo.password;
        this.loginData[JSONKeys.GAME_ID]                = AppInfo.myInfo.gameID;
        this.loginData[JSONKeys.ROOM_INFO]              = AppInfo.myInfo.roomToJoinInfo;
        AppInfo.myInfo.roomToJoinInfo = {};
        this.loginData[JSONKeys.LOGIN_TYPE]             = AppInfo.myInfo.loginState;
        this.loginData[JSONKeys.FLASH_VAR]              = AppInfo.myInfo.flashVars;
        this.loginData[JSONKeys.USER_VALIDATION_DATA]   = AppInfo.myInfo.userValidationData;

        if(!AppInfo.gameSetting.MachineValue)
        {
            var randomNumber = Number.MIN_VALUE + (Math.random() * (Number.MAX_VALUE + Number.MIN_VALUE));
            AppInfo.gameSetting.MachineValue = randomNumber.toString();//+ gameLoader.global.myUserId.toString();
        }

        this.loginData[JSONKeys.MACHINE_VALUE] = AppInfo.gameSetting.MachineValue;
        KF.socket.login(AppInfo.global.userID.toString(), AppInfo.myInfo.password, AppInfo.myInfo.zoneName, this.loginData);
    }

    RequestController.prototype.onCreateRoom = function () {

    }

    RequestController.prototype.onJoinRoom = function () {

    }

    RequestController.prototype.onRemoveRoom = function () {

    }

    RequestController.prototype.onEnterRoom = function () {

    }

    RequestController.prototype.onExitRoom = function () {

    }

    RequestController.prototype.onSpectatorToPlayer = function () {

    }

    RequestController.prototype.onPlayerToSpectator = function () {

    }

    return RequestController;
});