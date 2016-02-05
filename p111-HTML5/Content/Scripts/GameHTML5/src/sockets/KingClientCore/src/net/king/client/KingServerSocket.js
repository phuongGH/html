/**
 * Created by hungtd on 1/25/2016.
 */
"use strict";
define(function (require) {

    var KingJson                    = require('sockets/KingClientCore/src/net/king/data/KingJson');
    var KingSystemControllerKeys    = require('sockets/KingClientCore/src/net/king/keys/KingSystemControllerKeys');
    var Message                     = require('sockets/KingClientCore/src/net/king/models/Message');
    var JSONKeysCore                    = require('sockets/KingClientCore/src/net/king/keys/JSONKeysCore');
    var KingKeys                    = require('sockets/KingClientCore/src/net/king/keys/KingKeys');
    var MessageFilter               = require('sockets/KingClientCore/src/net/king/client/MessageFilter');

    KingServerSocket.prototype = Object.create(Object.prototype);
    KingServerSocket.prototype.constructor = KingServerSocket;

    Object.defineProperties(KingServerSocket.prototype, {
        socket:{
            value:null,
            writable:true
        },

        hostname:{
            value:'127.0.0.1',
            writable:true
        },

        port:{
            value:8888,
            writable:true
        },

        messageFilter:{
            value:null,
            writable:true
        },

        socketKey:{
            value:'',
            writable:true
        },

        timeDelayToReconnect:{
            value:3000,
            writable:true
        },

        numRepeatReconnect:{
            value:5,
            writable:true
        },

        isReconnected:{
            value:false,
            writable:true
        },

        timerToReconnect:{
            value:null,
            writable:true
        },

        timerToTryConnect:{
            value:null,
            writable:true
        },

        sessionToken:{
            value:'',
            writable:true
        },

        isDisconnected:{
            value:false,
            writable:true
        },

        firstTimeConnect:{
            value:false,
            writable:true
        },

        timeOut:{
            value:0,
            writable:true
        },

        kingClient:{
            value:null,
            writable:true
        }


    });

    /**
     *
     * @param {KingClient} kingClient
     * @param {String} hostName
     * @param {Number} port
     * @param {String} socketKey
     * @param {Number} timeDelayToReconnect
     * @param {Number} numRepeatReconnect
     * @param {Number} timeOut
     * @constructor {KingServerSocket}
     */
    function KingServerSocket(kingClient,hostName, port, socketKey, timeDelayToReconnect, numRepeatReconnect,timeOut) {
        Object.call(this);


        this.kingClient = kingClient;
        this.socketKey = socketKey;
        this.hostname = hostName;
        this.port = port;

        if(timeDelayToReconnect== undefined)
            timeDelayToReconnect =3000;

        if(numRepeatReconnect== undefined)
            numRepeatReconnect =5;

        if(timeOut==undefined)
            timeOut =20000;

        this.timeDelayToReconnect = timeDelayToReconnect;
        this.numRepeatReconnect = numRepeatReconnect;
        this.timeOut = timeOut;

        this._init();
    }

    KingServerSocket.prototype._init = function () {

        if(this.socket)
            this.socket.close();



        this.messageFilter = new MessageFilter(this.kingClient);
    };

    /**
     *
     * @param {Event} event
     *
     */
    KingServerSocket.prototype.closeHandler = function (event) {

        var data = {
            hostName: this.hostname,
            port:  this.port
        };
        this.kingClient.onConnectionClose(data);

        if (socket != null && this.isDisconnected == false)
        {
            this.resetMessageBuffer();
            this.tryToReconnect();
        }
    };

    KingServerSocket.prototype.ioErrorHandler = function (event) {

        var data = {
            hostName: this.hostname,
            port:  this.port
        };
        this.kingClient.trace("[ioErrorHandler] - " + this.socketKey + " is unavailable.");
        this.kingClient.onErrorConncHandler(data);
    };
    /**
     *
     * @param {Event} event
     *
     */
    KingServerSocket.prototype.dataHandler = function (event) {

       /* var data = event.data;
        event.origin;
        var dv = new DataView(data);

        for(var i=0;i<dv.byteLength;i++)
        {
            console.log(dv.getInt8(i));
        }*/

        /**
         * messageFilter dispatch KingServerEvent.RECEIVE_DATA after reading data from Socket
         */
       // var buf:ByteArray = new ByteArray();
        //socket.readBytes(buf, 0, socket.bytesAvailable);

        //var dv = new DataView(event.data);
        this.messageFilter.receive(event.data);

    };

    /**
     *
     * @param {Event} event
     *
     */
    KingServerSocket.prototype.connectHandler = function (event) {


       // this.socket.send('hello');
        this.kingClient.trace("connectHandler");
        this.firstTimeConnect = true;
        var data = {
            hostName: this.hostname,
            port:  this.port,
            isReconnected: this.isReconnected
        };

        if (this.kingClient.listSockets.hasOwnProperty(this.socketKey) == false)
        {
            this.kingClient.listSockets.push({
                key:this.socketKey,
                value:this
            });
        }
        else
        {
            var kingServerSocket = this.kingClient.listSockets[this.socketKey];
            if (kingServerSocket)
            {
                if (kingServerSocket.isConnected() == false)
                {
                    this.kingClient.listSockets.push({
                        key:this.socketKey,
                        value: this});
                }
                kingServerSocket = null;
            }
        }
        this.kingClient.onConnected(data);
        //kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.CONNECTED, data));

        this.sendHandShake(this.isReconnected);

        data = null;
        //Reset reconnect info
        this.isReconnected = false;
        if (this.timerToReconnect)
        {
            this.timerToReconnect.stop();
            this.timerToReconnect.remove(this.onReconnect.bind(this));
            this.timerToReconnect = null;
        }
    };

    /**
     *
     * @param {Boolean} isReconnect
     */
    KingServerSocket.prototype.sendHandShake = function(isReconnect){
        var data ={};
        if (this.isReconnect)
        {
            data[JSONKeysCore.RECONNECT_TOKEN] = this.sessionToken;
        }
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.HAND_SHAKE, data);
        this.sendMessage(message);
        message = null;
    }

    KingServerSocket.prototype.connect = function () {



        this.isDisconnected = false;

        if(this.socket) {
            this.socket.close();
            this.socket = new WebSocket('ws://'+this.hostname+':'+this.port);

        }
        else
        if (this.socket === undefined || this.socket === null)
        {
           this.socket = new WebSocket('ws://'+this.hostname+':'+this.port);
           // this.socket = new WebSocket("ws://192.168.1.60:9997");
            //this.socket.close();

            this.socket.onopen = this.connectHandler.bind(this);
            this.socket.onerror = this.ioErrorHandler.bind(this);
            this.socket.onmessage = this.dataHandler.bind(this);
            this.socket.onclose = this.closeHandler.bind(this);
            this.socket.binaryType = 'arraybuffer';
        }

    };

    KingServerSocket.prototype.disconnect = function () {

        this.isDisconnected = true;

        try
        {
            var data = {
            hostName: hostname,
            port:  port
        };
            this.socket.close();
            this.kingClient.onConnectionClose(data);

            //kingClient.dispatchEvent(new KingServerEvent(KingServerEvent.CONNECTION_CLOSE, data));
        }
        catch(err)
        {
            this.kingClient.trace(err.getStackTrace());
        }
    };

    /**
     *
     *
     * @param  {Number}delayToReconnect
     * @return {Room}
     */
    KingServerSocket.prototype.disconnectToReconnect = function (delayToReconnect) {

        if (this.socket == null)
            return;

        var data = {
            hostName: hostname,
            port:  port
        };
        this.socket.close();
        this.kingClient.onConnectionClose(data);

        setTimeout(this.onTimeOutReconnect, delayToReconnect);
    };

    /**
     *
     *
     *
     *
     */
    KingServerSocket.prototype.onTimeOutReconnect = function (delayToReconnect) {
        this.resetMessageBuffer();
        this.tryToReconnect();
    };

    /**
     *
     *
     *@return {Boolean}
     *
     */
    KingServerSocket.prototype.isConnected = function () {
        return this.socket.readyState === KingServerSocket.OPEN;
    };

    /**
     *
     *
     *@param {String} message
     *
     */
    KingServerSocket.prototype.sendMessage = function (message) {
        try
        {
            if (this.isConnected())
            {
                var content = KingJson.stringify(message.content);
                if (content.length == 0)
                    return;
                //content = RC4.encrypt(content);
               // content='hello';
               console.log(KingServerSocket.getByteLen(content));
                var bytearray = new Uint8Array(content);

                var buffer = new DataView(new ArrayBuffer(content.length+2))
                console.log(buffer.byteLength);
                buffer.setUint8(0,message.controllerId);
                buffer.setUint8(1,message.requestId);
                for (var i = 0; i < content.length; i++) {
                    console.log(i);

                    buffer.setUint8(2 + i, content.charCodeAt(i), true);
                    console.log(content.charCodeAt(i));
                }

               // buffer.setUint8(2,'aaaa');
               // buffer.p
               this.socket.send(buffer);

                /*var byteArray = new ByteArray();
                byteArray.writeUTFBytes(content);
                var ln = byteArray.length + 2;
                this.socket.writeUnsignedInt(ln); 			//header length
                this.socket.writeByte(message.controllerId); //controlId
                this.socket.writeByte(message.requestId); 	//requestId
                this.socket.writeUTFBytes(content); 			//content
                this.socket.flush();
                byteArray = null;*/

            }
            else
            {
                this.kingClient.trace(this.socket + " don't connect.");
                this.kingClient.trace("messageID: " + message.requestId + ". content: " +  KingJson.stringify(message.content));
            }
        }
        catch(err)
        {
            this.kingClient.trace(err.getStackTrace());
            this.kingClient.trace(err.getStackTrace());
        }
    };

    KingServerSocket.stringToUint = function(normal_val)
    {
        var string = btoa(unescape(encodeURIComponent(string))),
            charList = string.split(''),
            uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    }

    KingServerSocket.getByteLen = function(normal_val)
    {
        normal_val = String(normal_val);

        var byteLen = 0;
        for (var i = 0; i < normal_val.length; i++) {
            var c = normal_val.charCodeAt(i);
            byteLen += c < (1 <<  7) ? 1 :
                c < (1 << 11) ? 2 :
                    c < (1 << 16) ? 3 :
                        c < (1 << 21) ? 4 :
                            c < (1 << 26) ? 5 :
                                c < (1 << 31) ? 6 : Number.NaN;
        }
        return byteLen;
    }
    /**
     *
     * @param {String} sessionToken
     */
    KingServerSocket.prototype.updateSessionToken = function (sessionToken) {
        this.sessionToken = sessionToken;
    };

    /**
     *
     * @param {String} sessionToken
     */
    KingServerSocket.prototype.resetMessageBuffer = function () {
        if (this.messageFilter)
        {
            this.messageFilter.reset();
        }
    };

    /**
     *
     *
     */
    KingServerSocket.prototype.tryToReconnect = function () {
        if (this.timerToReconnect == null)
        {
            this.timerToReconnect = new PIXI.ticker.Ticker();
            this.timerToReconnect.add(this.onReconnect.bind(this));
        }
        this.timerToReconnect.stop();
        this.timerToReconnect.start();
    };

    /**
     *@param {TimeEvent} timeEvent
     *
     */
    KingServerSocket.prototype.onReconnect = function (timeEvent) {
        if(timeEvent >= this.timeDelayToReconnect)
        {
            if (this.isConnected() == false) {
                this.isReconnected = true;
                this.connect();
                this.kingClient.trace("onReconnect: " + (timeEvent.currentTarget).currentCount);
            }
            else {
                if (this.timerToReconnect) {
                    this.timerToReconnect.stop();
                    this.timerToReconnect.remove(this.onReconnect.bind(this));
                    this.timerToReconnect = null;
                }
            }
        }
    };

    /**
     *
     *
     */
    KingServerSocket.prototype.stopReconnect = function () {
        if (this.timerToReconnect)
        {
            this.timerToReconnect.stop();
            this.timerToReconnect.remove(this.onReconnect.bind(this));
            this.timerToReconnect = null;
        }
        this.isDisconnected = true;
    };

    /**
     *@param {Boolean} isReconnect
     *
     */
    KingServerSocket.prototype.stopReconnect = function (isReconnect) {
        var data = { };
        if (isReconnect)
        {
            data[JSONKeysCore.RECONNECT_TOKEN] = this.sessionToken;
        }
        var message = Message.build(KingKeys.CORE_SYSTEM_CONTROLLER_ID,
            KingSystemControllerKeys.HAND_SHAKE, data);
        this.sendMessage(message);
        message = null;
    };

    /**
     *
     *
     */
    KingServerSocket.prototype.tryConnect = function () {
        this.timerToTryConnect = new PIXI.ticker.Ticker();
        this.timerToTryConnect.add(this.onTimerTryConnect.bind(this));
        this.timerToTryConnect.start();
    };

    /**
     *
     *
     */
    KingServerSocket.prototype.onTimerTryConnect = function (e) {
        this.kingClient.trace("onTimerTryConnect: " + this.isConnected());
        if (this.isConnected())
        {
            this.timerToTryConnect.stop();
            this.timerToTryConnect.remove(this.onTimerTryConnect.bind(this));
            this.timerToTryConnect = null;
        }
        else
        {
            this.connect();
        }
    };

    /**
     *
     *
     */
    KingServerSocket.prototype.destroy = function () {
        if(socket != null){
            this.socket.close();
            this.socket = null;
            this.messageFilter = null;
        }
    };

    KingServerSocket.prototype.onEnterFrame = function () {

    };

    KingServerSocket.prototype.onEnterFrame = function () {

    };

    KingServerSocket.OPEN = 1;
    KingServerSocket.CONNECTING = 0;
    KingServerSocket.CLOSING = 2;
    KingServerSocket.CLOSED = 3;

    return KingServerSocket;
});