/**
 * Created by ${USER} on ${DATE}.
 */
'use strict';
define(function (require) {
    var GeneralScreen = require("ui/screens/GeneralScreen");

    ${NAME}.prototype = Object.create(GeneralScreen.prototype);
    ${NAME}.prototype.constructor = ${NAME};

    Object.defineProperties(${NAME}.prototype, {

    });

    function ${NAME}(preLoader) {
        GeneralScreen.call(this, preLoader);

        this.on("added", this._onAddedToParent)
    }

    ${NAME}.prototype._onAddedToParent = function(parent) {
        this.init();
    }

    ${NAME}.prototype.init = function() {
        GeneralScreen.prototype.init.call(this);

        if (this._isDisposed) {
            this._isDisposed = false;
        }
    };

    ${NAME}.prototype.dispose = function() {
        GeneralScreen.prototype.dispose.call(this);
    };

    ${NAME}.prototype.onResize = function(event) {
        GeneralScreen.prototype.onResize.call(this, event);
    };

    ${NAME}.prototype.onEnterFrame = function(deltaTime) {
        GeneralScreen.prototype.onEnterFrame.call(this, deltaTime);
    };

    ${NAME}.prototype.updateUserInfo = function(userInfo) {
        GeneralScreen.prototype.updateUserInfo.call(this, userInfo);
    };

    return ${NAME};
});