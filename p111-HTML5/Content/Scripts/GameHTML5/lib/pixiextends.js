/**
 * Created by datnt on 1/28/2016.
 */
'use strict';
define(function (require) {
    pixiextends.prototype = Object.create(Object.prototype);
    pixiextends.prototype.constructor = pixiextends;

    Object.defineProperties(pixiextends.prototype, {});

    function pixiextends() {
        throw new Error('Cannot instance this class');
    }

    Object.defineProperties(PIXI.DisplayObject.prototype, {
        _mouseclickcallback: {
            value: null,
            writable: true
        },
        mouseclick: {
            get: function ()
            {
                return this._mouseclickcallback;
            },
            set: function (value)
            {
                this._mouseclickcallback = value;
                this.on('click', value);
            }
        }
    });

    Object.defineProperties(PIXI.Container.prototype, {
        numChildren: {
            get: function ()
            {
                return this.children.length;
            }
        }
    });

    PIXI.DisplayObject.prototype.setToCenterScreen = function() {
        this.x = (this.stage.stageWidth - this.width) / 2;
        this.y = (this.stage.stageHeight - this.height) / 2;
    };

    PIXI.DisplayObject.prototype.setXToCenterScreen = function() {
        this.x = (this.stage.stageWidth - this.width) / 2;
    };

    PIXI.DisplayObject.prototype.setYToCenterScreen = function() {
        this.y = (this.stage.stageHeight - this.height) / 2;
    };

    PIXI.Graphics.Rectangle = function(x, y, width, height, fillColor, fillAlpha, lineWidth, lineColor, lineAlpha) {
        return (new PIXI.Graphics()).beginFill(fillColor, fillAlpha).lineStyle(lineWidth, lineColor, lineAlpha).drawRect(x, y, width, height).endFill();
    };

    PIXI.Graphics.RoundedRect = function(x, y, width, height, radius, fillColor, fillAlpha, lineWidth, lineColor, lineAlpha) {
        return (new PIXI.Graphics()).beginFill(fillColor, fillAlpha).lineStyle(lineWidth, lineColor, lineAlpha).drawRoundedRect(x, y, width, height, radius).endFill();
    };

    PIXI.Graphics.Circle = function(x, y, radius, fillColor, fillAlpha, lineWidth, lineColor, lineAlpha) {
        return (new PIXI.Graphics()).beginFill(fillColor, fillAlpha).lineStyle(lineWidth, lineColor, lineAlpha).drawCircle(x, y, radius).endFill();
    };

    PIXI.Graphics.Ellipse = function(x, y, width, height, fillColor, fillAlpha, lineWidth, lineColor, lineAlpha) {
        return (new PIXI.Graphics()).beginFill(fillColor, fillAlpha).lineStyle(lineWidth, lineColor, lineAlpha).drawEllipse(x, y, width, height).endFill();
    };

    return PIXI;
});