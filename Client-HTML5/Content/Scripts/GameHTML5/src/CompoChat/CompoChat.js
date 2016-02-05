/**
 * Created by phuongtv on 1/21/2016.
 */
define(function (require) {
    //var PIXI = require("../../lib/pixi.min");
    var TextField = require("../../src/Components/TextField/TextField");
    var TextArea = require("../../src/Components/TextField/TextArea");

    function CompoChat() {
        PIXI.Container.call(this);
        this._init();
    }

    CompoChat.prototype = Object.create(PIXI.Container.prototype);
    CompoChat.prototype.constructor = CompoChat;

    Object.defineProperties(CompoChat.prototype,
        {
            inputBackground: {
                value: 'undefined',
                writable: true
            },
            txtInput:{
                value: 'undefined',
                writable:true
            },
            chatContent:{
                value: 'undefined',
                writable:true
            }
        }
    );

    CompoChat.prototype._init = function () {

        this.chatContent = new TextArea();
        this.chatContent.setBounds(0,0,245,135);
        this.addChild(this.chatContent);

        this.inputBackground = new PIXI.Graphics();
        this.inputBackground.beginFill(0x000000, .2);
        this._drawRoundRectComplex(this.inputBackground, 0, 135, 205, 50, 0, 0, 5, 5);
        this.inputBackground.beginFill(0x5C5C5C,.4);
        this.inputBackground.drawRoundedRect(3,160,199,21,3)
        this.inputBackground.endFill();
        this.addChild(this.inputBackground);

        this.txtInput = new TextField();
        this.txtInput.setBounds(3,160,198,20);
        this.txtInput.style({font : '12px Arial',fill:0xFFFFFF});
        this.txtInput.visibleBackground(false);
        this.addChild(this.txtInput);

        this.txtInput.onEnter = this.onEnter.bind(this);
    }

    CompoChat.prototype.onEnter = function()
    {
        console.log(this.txtInput.getText());
        this.txtInput.setText("");
    }

    /**
     * Helper function that draw a round rectangle complex.
     *
     * @private
     * @param graphics {PIXI.Graphics}
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     * @param tlRadius {number} top left radius
     * @param trRadius {number} top right radius
     * @param brRadius {number} bottom right radius
     * @param blRadius {number} bottom left radius
     * @return {PIXI.Graphics} A Graphics
     */
    CompoChat.prototype._drawRoundRectComplex = function (graphics, x, y, width, height, tlRadius, trRadius, brRadius, blRadius) {

        var delta = 4;

        graphics.moveTo(x, y + tlRadius);

        graphics.quadraticCurveTo(
            x + tlRadius / delta, y + tlRadius / delta,
            x + tlRadius, y);

        graphics.lineTo(x + width - trRadius, y);

        graphics.quadraticCurveTo(
            x + width - trRadius / delta, y + trRadius / delta,
            x + width, y + trRadius);

        graphics.lineTo(x + width, y + height - brRadius);

        graphics.quadraticCurveTo(
            x + width - brRadius / delta, y + height - brRadius / delta,
            x + width - brRadius, y + height);

        graphics.lineTo(x + blRadius, y + height);

        graphics.quadraticCurveTo(
            x + blRadius / delta, y + height - blRadius / delta,
            x, y + height - blRadius);

        return graphics;
    }

    return CompoChat;
});