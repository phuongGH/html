/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    var KingServerEvent         = require('sockets/KingClientCore/src/net/king/events/KingServerEvent');
    var Message                 = require('sockets/KingClientCore/src/net/king/models/Message');
    var KingJson                = require('sockets/KingClientCore/src/net/king/data/KingJson');

    MessageFilter.prototype = Object.create(Object.prototype);
    MessageFilter.prototype.constructor = MessageFilter;

    Object.defineProperties(MessageFilter.prototype, {
        messageBuffer:{
            value:null,
            writable:true
        },

        kingClient:{
            value:null,
            writable:true
        },

        controllerId:{
            value:-1,
            writable:true
        },

        requestId:{
            value:-1,
            writable:true
        },

        content:{
            value:-1,
            writable:true
        },

        message:{
            value:null,
            writable:true
        }

    });

    /**
     *
     *
     * @param  {KingClient} kingClient
     * @return {MessageFilter}
     */
    function MessageFilter(kingClient) {
        Object.call(this);
        this.kingClient = kingClient;
        this.messageBuffer = null;
        this.message = null;
        this._init();
    }

    MessageFilter.prototype._init = function () {

    };

    MessageFilter.prototype.onEnterFrame = function () {

    };

    /**
     *
     *
     * @param  {MessageEvent} data
     *
     */
    MessageFilter.prototype.receive = function (data) {

        this.messageBuffer = new DataView(data);
        this.controllerId =  this.messageBuffer.getInt8(0);
        this.requestId = this.messageBuffer.getInt8(1);
        this.content ='';
        for(var i=2;i<this.messageBuffer.byteLength;i++)
        {
               this.content +=  String.fromCharCode(this.messageBuffer.getInt8(i));
        }
        this.message = Message.build(this.controllerId, this.requestId, KingJson.parse(this.content));
        this.kingClient.onReceiveServerData(new KingServerEvent(KingServerEvent.RECEIVE_SERVER_DATA, this.message));
    };

    MessageFilter.prototype.reset = function () {
        this.messageBuffer ='';
    };
    return MessageFilter;
});