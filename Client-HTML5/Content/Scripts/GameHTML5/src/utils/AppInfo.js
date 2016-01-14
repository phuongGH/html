/**
 * Created by datnt on 12/15/2015.
 */

define(function(require) {
    //var PIXI = require('../lib/js/pixi');

    function AppInfo(preLoader) {
        this.preLoader = preLoader;

        this.appRealHeight = 690;

        var initValue = "initValue";
    }

    AppInfo.prototype.constructor = AppInfo;

    Object.defineProperties(AppInfo.prototype, {
        preLoader: {
            value: undefined,
            writable: true
        }
    });

    AppInfo.prototype.init = function(){

    }

    /*var AppInfo = {
        appRealWidth: 1000,
        appRealHeight: 690,
        appScaleWidth: 1,
        appScaleHeight: 1,
        appScreenWidth: 1000,
        appScreenHeight: 690
    };*/

    return AppInfo;
});
