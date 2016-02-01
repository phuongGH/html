/**
 * Created by phuongtv on 1/12/2016.
 */
'use strict';
define(function(require) {

    var PIXI = require('../lib/pixi.min');
    var ButtonOption = require('./ButtonOption');

    /*
    * @param  [option] {object}  thiết lập các thông số cho nút(hình ảnh các trạng thái nút, font chử ...)
    * @return {Button}
    */
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
        this.buttonMode = true;
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

    Object.defineProperties(Button.prototype, {
        /**
         * nội dung các thiết lập cho nút
         *
         * @private
         * @member {ButtonOption}
         * @memberof Button#
         */
        option: {
            value: null,
            writable: true
        },

        /**
         * hình ảnh khi nút ở trạng thái bình thường
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textureButtonUp: {
            value: null,
            writable: true
        },

        /**
         * hình ảnh khi nút ở trạng thái được nhấn
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textureButtonDown: {
            value: null,
            writable: true
        },

        /**
         * hình ảnh khi nút ở trạng thái rê chuột lên
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textureButtonOver: {
            value: null,
            writable: true
        },

        /**
         * hình ảnh khi nút ở trạng thái rê chuột lên
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        _text: {
            value: null,
            writable: true
        }
    });

    /**
     * giá trị hiển thị cho nút
     *
     * @public
     * @param value {String}
     */
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


    /**
     * khởi tạo các giá trị cho button
     *
     * @private
     */
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

    //Button.prototype.setText = function(value){
    //    this._text.text = value;
    //}

    /**
     * cập nhận trạng thái nút nhấn
     *
     * @private
     */
    Button.prototype.onButtonDown = function(){

        this.isdown = true;

        this._text.style = this.option.textStyleDown;

        this._text.x = (this.textureButtonUp.width - this._text.width)/2;
        this._text.y = (this.textureButtonUp.height - this._text.height)/3 +1;

        this.texture = this.textureButtonDown;
    }

    /**
     * cập nhận trạng thái nút bình thường
     *
     * @private
     */
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

    /**
     * cập nhận trạng thái khi đưa chuột lên nút.
     *
     * @private
     */
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

    /**
     * cập nhận trạng thái khi đưa chuột ra khỏi nút
     *
     * @private
     */
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