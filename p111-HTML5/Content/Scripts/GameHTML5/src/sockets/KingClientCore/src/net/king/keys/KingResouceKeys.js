/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {

    KingResouceKeys.prototype = Object.create(Object.prototype);
    KingResouceKeys.prototype.constructor = KingResouceKeys;

    Object.defineProperties(KingResouceKeys.prototype, {});

    /**
     *
     *
     *
     * @return {KingResouceKeys}
     */
    function KingResouceKeys() {
        Object.call(this);
        this._init();
    }

    KingResouceKeys.prototype._init = function () {

    };

    KingResouceKeys.prototype.onEnterFrame = function () {

    };

    KingResouceKeys.DEFAULT_RESOURCES = 'DefaultResources';
    KingResouceKeys.DIALOG_RESOURCES = 'CompoDialogResouces';

    Global.KingResouceKeys = KingResouceKeys;

    return KingResouceKeys;
});