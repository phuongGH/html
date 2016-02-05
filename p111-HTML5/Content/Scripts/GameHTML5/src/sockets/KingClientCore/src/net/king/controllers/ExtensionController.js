/**
 * Created by hungtd on 1/26/2016.
 */
"use strict";
define(function (require) {


    var IController = require('sockets/KingClientCore/src/net/king/controllers/IController');


    ExtensionController.prototype = Object.create(IController.prototype);
    ExtensionController.prototype.constructor = ExtensionController;

    Object.defineProperties(ExtensionController.prototype, {
        kingClient:{
            value:null,
            writable:true
        },

        id:{
            value:-1,
            writable:true
        }
    });

    /**
     *
     *
     * @param  {KingClient} kingClient
     * @return {ExtensionController}
     */
    function ExtensionController(kingClient) {
        IController.call(this);
        this.kingClient =kingClient;
        this._init();
    }

    ExtensionController.prototype._init = function () {

    };

    /**
     *
     * @param {Message} message
     */
    ExtensionController.prototype.handleMessage = function (message) {
        var requestCommand = new RequestCommand(message.content.c, message.content.p);
        //kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.RECEIVE_EXTENSION_DATA, requestCommand));
        this.kingClient.onReceiveExtData(requestCommand);
        message = null;
        requestCommand = null;
    };

    ExtensionController.prototype.onEnterFrame = function () {

    };
    return ExtensionController;
});