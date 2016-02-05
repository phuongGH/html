/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    Message.prototype = Object.create(Object.prototype);
    Message.prototype.constructor = Message;

    Object.defineProperties(Message.prototype, {
        controllerId:{
            value:-1,
            writable:true
        },

        requestId:{
            value:-1,
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
     * @param room {Number} controllerId
     * @param room {Number} requestId
     * @param room {Object} content
     * @return {Message}
     */
    function Message(controllerId, requestId, content) {
        Object.call(this);
        this.controllerId = controllerId;
        this.requestId = requestId;
        this.content = content;

        this._init();
    }



    Message.prototype._init = function () {

    };

    Message.prototype.onEnterFrame = function () {

    };

    /**
     *
     *
     * @param room {Number} controllerId
     * @param room {Number} requestId
     * @param room {Object} content
     * @return {Message}
     */
    Message.build = function (controllerId, requestId, content) {
        return new Message(controllerId, requestId, content);
    };
    return Message;
});