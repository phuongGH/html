/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    KingJson.prototype = Object.create(Object.prototype);
    KingJson.prototype.constructor = KingJson;

    Object.defineProperties(KingJson.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {KingJson}
     */
    function KingJson() {
        Object.call(this);
        this._init();
    }

    KingJson.prototype._init = function () {

    };

    KingJson.prototype.onEnterFrame = function () {

    };

    /**
     *
     * @param {Object} jsonObj
     * @return {String}
     */
    KingJson.stringify=function(jsonObj){

        if(jsonObj != null)
            return JSON.stringify(jsonObj);
        return "";

    };

    /**
     *
     * @param {String} jsonData
     * @return {Object}
     */
    KingJson.parse=function(jsonData){

        if(jsonData!= null && jsonData.length != 0)
            return JSON.parse(jsonData);
        return {};

    };

    global.KingJson = KingJson;

    return KingJson;
});