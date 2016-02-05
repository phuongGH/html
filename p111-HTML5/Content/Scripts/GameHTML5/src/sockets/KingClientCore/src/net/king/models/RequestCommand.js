/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    RequestCommand.prototype = Object.create(Object.prototype);
    RequestCommand.prototype.constructor = RequestCommand;

    Object.defineProperties(RequestCommand.prototype, {
        command:{
            value:'',
            writable:true
        },

        content:{
            value:null,
            writable:true
        }
    });

    /**
     *
     *
     * @param {String} command
     * @param {Object} content
     * @return {RequestCommand}
     */
    function RequestCommand(command, content) {
        Object.call(this);

        this.command = command;
        this.content = content;

        this._init();
    }

    RequestCommand.prototype._init = function () {

    };

    RequestCommand.prototype.onEnterFrame = function () {

    };
    return RequestCommand;
});