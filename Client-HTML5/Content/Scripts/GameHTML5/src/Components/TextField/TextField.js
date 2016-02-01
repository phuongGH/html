/**
 * Created by phuongtv on 1/25/2016.
 */
'use strict';
define(function(require){

    //var Keyboard = require("../../../src/Components/TextField/Keyboard");
    var Log = require("../../../src/Log");

    /**
     *
     * @type {PIXI.Container}
     */
    TextField.prototype = Object.create(PIXI.Container.prototype)
    TextField.prototype.constructor = TextField;


    Object.defineProperties(TextField.prototype,{
        background:{
            value:'undefined',
            writable:true
        },
        _isForcus:{
            value:false,
            writable:true
        },
        _cursor:{
            value:'undefined',
            writable:true
        },
        _text:{
            value:'undefined',
            writable:true
        },
        //_textStyle:{
        //    value:null,
        //    writable:true
        //},
        _ontimeTick:{
            value:'undefined',
            writable:true
        },
        _keyEvent:{
            value:{},
            writable:true
        },
        _width:{
            value:0,
            writable:true
        },
        _height:{
            value:0,
            writable:true
        },
        _textMask:{
            value:'undefined',
            writable:true
        }
    });

    /**
     *
     * @constructor
     */
    function TextField(){
        PIXI.Container.call(this);
        this._init();
    };

    /**
     * khỏi tạo các thành phần trong textField
     * @private
     */
    TextField.prototype._init = function(){

        this.background = new PIXI.Graphics();
        this.addChild(this.background);

        this._textMask = new PIXI.Graphics();
        this._textMask.x = 2;
        this._textMask.y = 2;
        this.addChild(this._textMask);

        var _textStyle = {font : '24px Arial'};

        this._text = new PIXI.Text("",_textStyle);
        this._text.y = 2;
        this.addChild(this._text);
        this._text.anchor = new PIXI.Point(0,0);
        this._text.mask = this._textMask;

        //this._cursor = new PIXI.Sprite();
        this._cursor = new PIXI.Graphics();
        this.addChild(this._cursor);
        this._cursor.visible = false;

        //this.setBounds(0,0,190,30);

        this.interactive = true;
        this.on('mousedown', this._mouseDown.bind(this));

        this._keyEvent.keyUp = this._keyup.bind(this);
        this._keyEvent.keyDown = this._keydown.bind(this);
        this._keyEvent.keyPress = this._keypress.bind(this);
    };

    /**
     *
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     */
    TextField.prototype.setBounds = function(x,y,width,height){

        this.background.clear();
        this.background.beginFill(0xEEEEEE);
        this.background.lineStyle(1,0x0);
        this.background.drawRect(0,0,width,height);
        this.background.endFill();

        this._textMask.clear();
        this._textMask.beginFill(0,.5);
        this._textMask.drawRect(0,0,width-4,height-4);
        this._textMask.drawRect();
        this._textMask.endFill();

        this._cursor.clear();
        this._cursor.moveTo(0,0);
        this._cursor.lineStyle(1,Number(this._text.style.fill.replace(/^#+/, "0x")),1);
        this._cursor.lineTo(0,Number(this._text.style.font.slice(0,this._text.style.font.indexOf('p'))));
        this._cursor.endFill();
        this._cursor.x = 2;
        this._cursor.y = 2;

        this._width = width;
        this._height = height;

        this.x = x;
        this.y = y;
    };

    /**
     *
     * @param style {object}
     */
    TextField.prototype.style = function(style) {

        this._text.style = style;
        this._cursor.clear();
        this._cursor.moveTo(0,0);
        this._cursor.lineStyle(1,Number(this._text.style.fill.replace(/^#+/, "0x")),1);
        this._cursor.lineTo(0,Number(this._text.style.font.slice(0,this._text.style.font.indexOf('p'))));
        this._cursor.endFill();

    }


    /**
     *
     * @returns {String}
     */
    TextField.prototype.getText = function(){
        return this._text.text;
    }


    /**
     *
     * @param value {String}
     */
    TextField.prototype.setText = function(value){
        this._text.text = value;
        if(this._text.width>this._width)
        {
            this._text.x = this._width - this._text.width ;
            this._cursor.x =  this._width - 2;
        }
        else
        {
            this._cursor.x =  this._text.width + 2;
        }
    }

    /**
     *
     * @param value {Boolean}
     */
    TextField.prototype.visibleBackground = function (value) {
        this.background.visible = value;
    }

    /**
     *
     * @param event {object} mouse event
     * @private
     */
    TextField.prototype._mouseDown = function(event){

        if(!this._isForcus)
        {
            this._forcusIn();
        }
    }

    /**
     *
     * @param event {object} key event
     * @private
     */
    TextField.prototype._keydown = function(event){

        switch (event.keyCode)
        {
            case 8:
                this._keyBackspace();
                break;
        }

        Log.textFieldLog("_keydown "+event.keyCode);
    };

    /**
     *
     * @param event {object} key event
     * @private
     */
    TextField.prototype._keypress = function(event){
        if(event.keyCode > 26){// && event.keyCode < 123) {
            this._text.text += String.fromCharCode(event.keyCode);

            if(this._text.width>this._width)
            {
                this._text.x = this._width - this._text.width ;
                this._cursor.x =  this._width - 2;
            }
            else
            {
                this._cursor.x =  this._text.width + 2;
            }
        }
        Log.textFieldLog("_keypress " + event.keyCode);
    };

    /**
     *
     * @param event {object} key event
     * @private
     */
    TextField.prototype._keyup = function(event){
        switch (event.keyCode)
        {
            case 13:
                if(this.onEnter)
                {
                    this.onEnter();
                }
                break;
        }
        Log.textFieldLog("_keyup " + event.keyCode);
    };

    /**
     * xử lý sự kiện ấn phím xóa một ký tự
     * @private
     */
    TextField.prototype._keyBackspace = function(){

        this._text.text = this._text.text.slice(0, -1);
        Log.textFieldLog("text Content"+this._text.text );
        if(this._text.width>this._width)
        {
            this._text.x = this._width - this._text.width ;
            this._cursor.x =  this._width - 2;
        }
        else
        {
            this._cursor.x =  this._text.width + 2;
        }

    };

    //TextField.prototype._keyEnter = function(){
    //
    //    if(this._text.height > this._height)
    //    {
    //        this._text.y = this._height - this._text.height ;
    //        //this._cursor.x =  this._width - 2;
    //    }
    //    else
    //    {
    //        //this._cursor.x =  this._text.width + 2;
    //    }
    //};

    /**
     * Sự kiện focus vào textField
     * @private
     */
    TextField.prototype._forcusIn = function(){

        this._isForcus = true;
        document.addEventListener('keydown', this._keyEvent.keyDown);
        document.addEventListener('keypress', this._keyEvent.keyPress);
        document.addEventListener('keyup', this._keyEvent.keyUp);
        this._ontimeTick = setInterval(this.ontimeTick.bind(this), 300);

    };

    /**
     * Sự kiện mất forcus
     * @private
     */
    TextField.prototype._forcusOut = function(){
        clearInterval(this._ontimeTick);
        this._isForcus = false;
        this._cursor.visible = false;
        document.removeEventListener('keydown', this._keyEvent.keyDown);
        document.removeEventListener('keypress', this._keyEvent.keyPress);
        document.removeEventListener('keyup', this._keyEvent.keyUp);
    };

    /**
     * sự kiện mỗi 300 ms khi textfield được forcus
     */
    TextField.prototype.ontimeTick = function() {
        this._cursor.visible = !this._cursor.visible;
    };

    return TextField;
});
