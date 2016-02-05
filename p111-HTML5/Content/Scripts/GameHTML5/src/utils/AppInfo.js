/**
 * Created by datnt on 1/22/2016.
 */
'use strict';
define(function () {
    AppInfo.prototype = Object.create(Object.prototype);
    AppInfo.prototype.constructor = AppInfo;

    Object.defineProperties(AppInfo.prototype, {});

    function AppInfo() {
        Object.call(this);
    }

    AppInfo.gameID = 0;

    AppInfo.appRealWidth = PreLoaderConfig.AppRealWidth;
    AppInfo.appRealHeight = PreLoaderConfig.AppRealHeight;
    AppInfo.appScreenWidth = PreLoaderConfig.AppRealWidth;
    AppInfo.appScreenHeight = PreLoaderConfig.AppRealHeight;
    AppInfo.appScaleWidth = 1;
    AppInfo.appScaleHeight = 1;
    AppInfo.appScaleMin = 1;
    AppInfo.appScaleMax = 1;

    AppInfo.gameSetting = {
        MachineValue: null
    };

    AppInfo.myInfo = {
        userID: 0,
        email: '',
        password: '',
        zoneName: '',
        roomToJoinInfo: {},
        loginState: 0,
        flashVars: '',
        userValidationData: ''
    };

    AppInfo.socketConfig = {
        socketKey: '',
        timeToDelayReconnect: 0,
        numRepeatReconnect: 0,
        socketTimeOut: 0
    };

    AppInfo.getScaleHorizontal = function(xPosittion){
        return xPosittion * AppInfo.appScaleWidth;
    };

    AppInfo.getScaleVertical = function(yPosittion){
        return yPosittion * AppInfo.appScaleHeight;
    };

    AppInfo.setToCenterScreen = function(displayObject){
        displayObject.x = (AppInfo.appScreenWidth - displayObject.width) / 2;
        displayObject.y = (AppInfo.appScreenHeight - displayObject.height) / 2;
    };

    global.AppInfo = AppInfo;

    return AppInfo;
});