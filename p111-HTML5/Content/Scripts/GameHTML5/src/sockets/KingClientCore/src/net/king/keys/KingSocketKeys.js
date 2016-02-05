/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    KingSocketKeys.prototype = Object.create(Object.prototype);
    KingSocketKeys.prototype.constructor = KingSocketKeys;

    Object.defineProperties(KingSocketKeys.prototype, {});

    /**
     *
     *
     *
     * @return {KingSocketKeys}
     */
    function KingSocketKeys() {
        Object.call(this);
        this._init();
    }

    KingSocketKeys.prototype._init = function () {

    };

    KingSocketKeys.prototype.onEnterFrame = function () {

    };

    KingSocketKeys.SOCKET1 = '127.0.0.1:8888';
    KingSocketKeys.SOCKET2 = '127.0.0.1:8889';
    KingSocketKeys.SOCKET3 = '127.0.0.1:8890';

    Global.KingSocketKeys =KingSocketKeys ;
    return KingSocketKeys;
});