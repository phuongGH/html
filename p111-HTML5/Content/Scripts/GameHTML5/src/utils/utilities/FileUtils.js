/**
 * Created by MegaMan on 1/18/2016.
 */
'use strict';
define(function () {

    FileUtils.prototype.constructor = FileUtils;

    Object.defineProperties(FileUtils.prototype, {});

    function FileUtils() {
        throw new Error('Cannot instance this class');
    }

    return FileUtils;
});