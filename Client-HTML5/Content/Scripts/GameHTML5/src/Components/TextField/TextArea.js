/**
 * Created by phuongtv on 1/27/2016.
 */
'use strict';
define
(function(require){

    TextArea.prototype = Object.create(PIXI.Container.prototype);
    TextArea.prototype.constructor = TextArea;

    Object.defineProperties(TextArea.prototype,{
        background:{
            value:'undefined',
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
        _texts:{
            value:{},
            writable:true
        },
        _currLine:{
            value:0,
            writable:true
        },
        _isForcus:{
            value:false,
            writable:true
        },
        _keyEvent:{
            value:{},
            writable:true
        },
        _onTick:{
            value:'undefined',
            writable:true
        }
    });

    /**
     *
     * @constructor
     */
    function TextArea(){
        PIXI.Container.call(this);

        this._init();
    };

    /**
     * khởi tạo các thành phần cho TextArea
     * @private
     */
    TextArea.prototype._init = function(){

        this.background = new PIXI.Graphics();
        this.addChild(this.background);

        this.interactive = true;
        this.on('mousedown',this._onMouseDown.bind(this));

        this._keyEvent.keyPress = this._onKeyPress.bind(this);
        this._keyEvent.keyDown = this._onKeyDown.bind(this);
        this._keyEvent.keyUp = this._onKeyUp.bind(this);
    }

    /**
     *
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     */
    TextArea.prototype.setBounds = function(x, y, width, height){

        this.background.clear();
        this.background.beginFill(0xEEEEEE);
        this.background.lineStyle(1,0x0);
        this.background.drawRect(0,0,width,height);
        this.background.endFill();

        this._width = width;
        this._height = height;
    }

    /**
     * sử lí sự kiện khi textArea được nhấn
     * @private
     */
    TextArea.prototype._onMouseDown = function(){
        if(!this._isForcus)
        {
            this._forcusIn();
        }
    }

    /**
     * sử lí sự kiện khi textArea được forcus
     * @private
     */
    TextArea.prototype._forcusIn = function(){
        this._isForcus = true;
        document.addEventListener('keypress',this._keyEvent.keyPress);
        document.addEventListener('keydown',this._keyEvent.keyDown);
        document.addEventListener('keyup',this._keyEvent.keyUp);
        this._onTick = setInterval(this._onTimeTick,300);
    }

    TextArea.prototype._forcusOut = function(){
        this._isForcus = false;
        document.removeEventListener('keypress',this._keyEvent.keyPress);
        document.removeEventListener('keydown',this._keyEvent.keyDown);
        document.removeEventListener('keyup',this._keyEvent.keyUp);
        clearInterval(this._onTick);
    }

    TextArea.prototype._onTimeTick = function(){

    }

    /**
     *
     * @param event {object} Mouse event
     * @private
     */
    TextArea.prototype._onKeyPress = function(event){

    }

    /**
     *
     * @param event {object} Mouse event
     * @private
     */
    TextArea.prototype._onKeyDown = function(event){

    }

    /**
     *
     * @param event {object} Mouse event
     * @private
     */
    TextArea.prototype._onKeyUp = function(event){

    }
    return TextArea;
});
