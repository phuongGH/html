/**
 * Created by MegaMan on 1/18/2016.
 */
'use strict';
define(function (require) {
    var NumberUtils = require('utils/utilities/NumberUtils');

    DateUtils.prototype.constructor = NumberUtils;

    Object.defineProperties(DateUtils.prototype, {});

    function DateUtils() {
        throw new Error('Cannot instance this class');
    }

    DateUtils.getDateStr = function (separator) {
        separator = String(separator.trim());
        if (separator.length < 1)
            separator = '/';
        var currentDateTime = new Date();
        return currentDateTime.getDate() + separator + (currentDateTime.getMonth() + 1) + separator + currentDateTime.getFullYear();
    };

    DateUtils.getTimeStr = function (separator) {
        separator = String(separator.trim());
        if (separator.length < 1)
            separator = ':';
        var currentDateTime = new Date();
        return currentDateTime.getHours() + separator + currentDateTime.getMinutes() + separator + currentDateTime.getSeconds();
    };

    DateUtils.getNowStr = function (dateSeparator, timeSeparator) {
        dateSeparator = String(dateSeparator.trim());
        timeSeparator = String(timeSeparator.trim());
        if (dateSeparator.length < 1)
            dateSeparator = '/';
        if (timeSeparator.length < 1)
            timeSeparator = ':';
        var currentDateTime = new Date();
        return currentDateTime.getDate() + dateSeparator + (currentDateTime.getMonth() + 1) + dateSeparator + currentDateTime.getFullYear() + ' ' + currentDateTime.getHours() + timeSeparator + currentDateTime.getMinutes() + timeSeparator + currentDateTime.getSeconds();
    };

    return DateUtils;
});