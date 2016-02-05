/**
 * Created by MegaMan on 1/18/2016.
 */
'use strict';
define(function () {

    BrowserUtils.prototype.constructor = BrowserUtils;

    Object.defineProperties(BrowserUtils.prototype, {});

    function BrowserUtils() {
        throw new Error('Cannot instance this class');
    }

    /**
     * Helper function that detect browser is ie and it's version
     * IE 10: ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
     * IE 11: ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
     * IE 12: ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
     * Edge : ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
     *
     * @static
     * @return {Number} {False} A number (version of ie browser) if it detect browser is ie or false if it detect browser is not ie
     */
    BrowserUtils.detectIE = function () {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0)
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

        if (ua.indexOf('Trident/') > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0)
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

        return false;
    };

    var hidden, visibilityChange, visibilityChangeListeners = [];
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange(isActive) {
        if(typeof isActive !== 'boolean')
            isActive = !document[hidden];

        for(var i = 0; i < visibilityChangeListeners.length; i++) {
            if (typeof visibilityChangeListeners[i] == 'function')
                visibilityChangeListeners[i](isActive);
        }
    }

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    window.addEventListener("focus", function (event) {handleVisibilityChange(true);});
    window.addEventListener("blur", function (event) {handleVisibilityChange(false);});
    window.addEventListener("focusin", function (event) {handleVisibilityChange(true);});
    window.addEventListener("focusout", function (event) {handleVisibilityChange(false);});

    BrowserUtils.addTabActiveListener = function (listener) {
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined")
            console.log("This browser does not supports the Page Visibility API. tabActiveChange will not support");
        else
            visibilityChangeListeners.push(listener);
    };

    return BrowserUtils;
});