/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    KingKeys.prototype = Object.create(Object.prototype);
    KingKeys.prototype.constructor = KingKeys;

    Object.defineProperties(KingKeys.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {KingKeys}
     */
    function KingKeys() {
        Object.call(this);
        this._init();
    }

    KingKeys.prototype._init = function () {

    };

    KingKeys.prototype.onEnterFrame = function () {

    };

    KingKeys.CORE_SYSTEM_CONTROLLER_ID = 0;
    KingKeys.CORE_EXTENSIONS_CONTROLLER_ID = 1;

    global.KingKeys = KingKeys;

    return KingKeys;
});