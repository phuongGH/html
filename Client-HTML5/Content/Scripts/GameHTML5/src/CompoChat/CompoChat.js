/**
 * Created by phuongtv on 1/21/2016.
 */
define(function (require) {
    var PIXI = require("../../lib/pixi.min");

    function CompoChat() {
        PIXI.Container.call(this);
        this._init();
    }

    CompoChat.prototype = Object.create(PIXI.Container.prototype);
    CompoChat.prototype.constructor = CompoChat;

    Object.defineProperties(CompoChat.prototype,
        {
            inputBackground: {
                value: null,
                writable: true
            }
        }
    );

    CompoChat.prototype._init = function () {

        this.inputBackground = new PIXI.Graphics();
        this.inputBackground.beginFill(0x000000, .4);
        this._drawRoundRectComplex(this.inputBackground, 0, 0, 205, 50, 0, 0, 5, 5);
        this.inputBackground.endFill();
        this.addChild(this.inputBackground);
    }

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