/**
 * Created by datnt on 1/26/2016.
 */
'use strict';
define(function (require) {
    LoadingScreen.prototype = Object.create(Object.prototype);
    LoadingScreen.prototype.constructor = LoadingScreen;

    Object.defineProperties(LoadingScreen.prototype, {});

    function LoadingScreen() {
        Object.call(this);
    }

    return LoadingScreen;
});