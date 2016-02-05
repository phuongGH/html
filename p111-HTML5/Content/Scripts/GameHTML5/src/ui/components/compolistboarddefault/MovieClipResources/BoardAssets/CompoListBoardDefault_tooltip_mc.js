/**
 * Created by hungtd on 1/18/2016.
 */
define(function (require) {

    CompoListBoardDefault_tooltip_mc.prototype = Object.create(PIXI.Sprite.prototype);
    CompoListBoardDefault_tooltip_mc.prototype.constructor = CompoListBoardDefault_tooltip_mc;

    Object.defineProperties(CompoListBoardDefault_tooltip_mc.prototype, {
        texturesItem:{
            vaule:null,
            writable:true
        }

    });

    function CompoListBoardDefault_tooltip_mc()
    {
        PIXI.Sprite.call(this);
        this._init();
    }

    CompoListBoardDefault_tooltip_mc.prototype._init= function()
    {
        this.onAssetsLoaded();
    };

    CompoListBoardDefault_tooltip_mc.prototype.onEnterFrame = function () {

    };

    CompoListBoardDefault_tooltip_mc.prototype.onAssetsLoaded = function () {

        this.texturesItem = PIXI.Texture.fromFrame('icon_ban10van.png');
        this.texture = this.texturesItem;

    };

    return CompoListBoardDefault_tooltip_mc;
});