/**
 * Created by phuongtv on 1/12/2016.
 */
define(function(require) {

    var PIXI = require('../../lib/pixi.min');
    var ButtonOption = require('./ButtonOption');
    function Button(option) {

        PIXI.Sprite.call(this);

        if (typeof(option)==='undefined')
        {
            this.option = new ButtonOption();
        }
        else
        {
            this.option = option;
        }

        this.interactive = true;
        this.on('mousedown', this.onButtonDown)
            .on('touchstart', this.onButtonDown)
            .on('mouseup', this.onButtonUp)
            .on('touchend', this.onButtonUp)
            .on('mouseupoutside', this.onButtonUp)
            .on('touchendoutside', this.onButtonUp)
            .on('mouseover', this.onButtonOver)
            .on('mouseout', this.onButtonOut);
        this._init();
    };

    Button.prototype = Object.create(PIXI.Sprite.prototype);
    Button.prototype.constructor = Button;

    Object.defineProperties(ButtonOption.prototype, {
        option: {
            value: null,
            writable: true
        },
        textureButtonUp: {
            value: null,
            writable: true
        },
        textureButtonDown: {
            value: null,
            writable: true
        },
        textureButtonOver: {
            value: null,
            writable: true
        },
        _text: {
            value: null,
            writable: true
        },
        style: {
            value: null,
            writable: true
        }

    });

    Object.defineProperty(Button.prototype, 'text', {
        get: function() {
            return this._text.text;
        },
        set: function(value) {
            this._text.text = value;
            this._text.x = (this.textureButtonUp.width - this._text.width)/2;
            this._text.y = (this.textureButtonUp.height - this._text.height)/3;;
        }
    });


    Button.prototype._init = function(){

        if(this.option.textureButtonUp)
        {
            this.textureButtonUp = this.option.textureButtonUp;
            this.texture = this.textureButtonUp;
        }

        if(this.option.textureButtonDown)
        {
            this.textureButtonDown = this.option.textureButtonDown;
        }

        if(this.option.textureButtonOver)
        {
            this.textureButtonOver = this.option.textureButtonOver;
        }

        this._text = new PIXI.Text("",this.option.textStyleUp);
        this.addChild(this._text);

    }

    Button.prototype.setText = function(value){
        this._text.text = value;
    }

    Button.prototype.onButtonDown = function(){

        this.isdown = true;

        this._text.style = this.option.textStyleDown;

        this._text.x = (this.textureButtonUp.width - this._text.width)/2;
        this._text.y = (this.textureButtonUp.height - this._text.height)/3 +1;

        this.texture = this.textureButtonDown;
    }

    Button.prototype.onButtonUp = function(){
        this.isdown = false;

        if (this.isOver)
        {
            this.texture = this.textureButtonOver;
            this._text.style = this.option.textStyleOver;
            this._text.x = (this.textureButtonUp.width - this._text.width)/2;
            this._text.y = (this.textureButtonUp.height - this._text.height)/3;
        }
        else
        {
            this.texture = this.textureButtonUp;
            this._text.style = this.option.textStyleUp;
            this._text.x = (this.textureButtonUp.width - this._text.width)/2;
            this._text.y = (this.textureButtonUp.height - this._text.height)/3;
        }
    }

    Button.prototype.onButtonOver = function(){
        this.isOver = true;

        if (this.isdown)
        {
            return;
        }

        this._text.style = this.option.textStyleOver;
        this._text.x = (this.textureButtonUp.width - this._text.width)/2;
        this._text.y = (this.textureButtonUp.height - this._text.height)/3;
        this.texture = this.textureButtonOver;

    }

    Button.prototype.onButtonOut = function(){
        this.isOver = false;

        if (this.isdown)
        {
            return;
        }

        this._text.style = this.option.textStyleUp;
        this._text.x = (this.textureButtonUp.width - this._text.width)/2;
        this._text.y = (this.textureButtonUp.height - this._text.height)/3;
        this.texture = this.textureButtonUp;

    }

    return Button;
});