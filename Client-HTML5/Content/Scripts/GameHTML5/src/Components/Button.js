/**
 * Created by phuongtv on 1/12/2016.
 */
define(function(require) {

    var PIXI = require('../../lib/pixi.min');
    var ButtonOption = require('./ButtonOption');
    var ResourceName = require('../ResourceName');
    var Sprite = PIXI.Sprite;
    var Graphics = PIXI.Graphics;
    //var _this;
    var _option;

    function Button(option) {

        Sprite.call(this);

        //_this = this;

        _option = option;


        this.type = option.type;
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

    Button.prototype = Object.create(Sprite.prototype);
    Button.prototype.constructor = Button;

    Object.defineProperties(ButtonOption.prototype, {
        type: {
            value: 1,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonUp: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonDown: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonOver: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        text: {
            value: "",
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        style: {
            value: null,
            writable: true
        }
    });

    Button.prototype._init = function(){
        if(this.type == ButtonOption.BUTTON_DEFAULT_GREEN)
        {

            this.textureButtonUp = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN_UP];
            this.textureButtonOver = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN_OVER];
            this.textureButtonDown = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN_DOWN];

            this.texture = this.textureButtonUp;

            this.style = {
                font : '14pt Arial',
                fill : '#FFFFFF',
                //stroke : '#4a1850',
               // strokeThickness : 5,
               // dropShadow : true,
               // dropShadowColor : '#000000',
               // dropShadowAngle : Math.PI / 6,
               // dropShadowDistance : 6,
               // wordWrap : true,
              //  wordWrapWidth : 440
            };


            //text = new PIXI.Text(_option.text,style);
            this.text = new PIXI.Text(_option.text,this.style);
            this.text.y = 8;
            this.text.x = (this.textureButtonUp.width - this.text.width)/2;
            this.addChild(this.text);

        }

        if(this.type == ButtonOption.BUTTON_IMAGES)
        {
            if(_option.textureButtonUp)
            {
                this.textureButtonUp = _option.textureButtonUp;
                this.texture = this.textureButtonUp;
            }

            if(_option.textureButtonDown)
            {
                this.textureButtonDown = _option.textureButtonDown;
            }

            if(_option.textureButtonOver)
            {
                this.textureButtonOver = _option.textureButtonOver;
            }
        }

    }

    Button.prototype.onButtonDown = function(){
        this.isdown = true;
        if(this.type == ButtonOption.BUTTON_DEFAULT_GREEN)
        {
            this.style = { font : '14pt Arial',
                fill : '#FFFF92',
            };
            this.text.style = this.style;
            this.text.y = 9;
        }

        this.texture = this.textureButtonDown;
    }

    Button.prototype.onButtonUp = function(){
        this.isdown = false;

        if (this.isOver)
        {
            this.texture = this.textureButtonOver;
            if(this.type == ButtonOption.BUTTON_DEFAULT_GREEN)
            {
                this.style = { font : '14pt Arial',
                    fill : '#FFFF92',
                };
                this.text.style = this.style;
                this.text.y = 8;
            }
        }
        else
        {
            this.texture = this.textureButtonUp;
            if(this.type == ButtonOption.BUTTON_DEFAULT_GREEN)
            {
                this.style = { font : '14pt Arial',
                    fill : '#FFFFFF',
                };
                this.text.style = this.style;
                this.text.y = 8;
            }
        }
    }

    Button.prototype.onButtonOver = function(){
        this.isOver = true;

        if (this.isdown)
        {
            return;
        }

        if(this.type == ButtonOption.BUTTON_DEFAULT_GREEN)
        {
            this.style = { font : '14pt Arial',
                fill : '#FFFF92',
            };
            this.text.style = this.style;
            this.text.y = 8;
        }

        this.texture = this.textureButtonOver;

    }

    Button.prototype.onButtonOut = function(){
        this.isOver = false;

        if (this.isdown)
        {
            return;
        }
        if(this.type == ButtonOption.BUTTON_DEFAULT_GREEN)
        {
            this.style = { font : '14pt Arial',
                fill : '#FFFFFF',
            };
            this.text.style = this.style;
            this.text.y = 8;
        }

        this.texture = this.textureButtonUp;

    }

    return Button;
});