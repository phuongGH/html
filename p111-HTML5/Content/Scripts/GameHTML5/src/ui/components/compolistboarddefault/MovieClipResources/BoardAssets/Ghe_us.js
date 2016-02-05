/**
 * Created by hungtd on 1/18/2016.
 */
define(function (require) {

    Ghe_us.prototype = Object.create(PIXI.Container.prototype);
    Ghe_us.prototype.constructor = Ghe_us;

    Object.defineProperties(Ghe_us.prototype, {
        texturesItem:{
            vaule:null,
            writable:true
        },

        item:{
            vaule:null,
            writable:true
        }

    });

    function Ghe_us()
    {
        PIXI.Container.call(this);
        this._init();
    }

    Ghe_us.prototype._init= function()
    {
        this.onAssetsLoaded();
        this.interactive = true;
        this.mouseover = this.onOver.bind(this);
        this.mousedown = this.onClick.bind(this);
        this.mouseout = this.onOut.bind(this);


    };

    Ghe_us.prototype.onEnterFrame = function () {

    };

    Ghe_us.prototype.onAssetsLoaded = function () {

        this.item = new PIXI.Sprite();
        this.texturesItem = PIXI.Texture.fromFrame('chair_bitmap.png');
        this.item.texture = this.texturesItem;
        this.item.anchor= new PIXI.Point(0.5,0.5);
        this.addChild(this.item);
    };

    Ghe_us.prototype.onOver = function () {
        TweenLite.to(this.item,0.5,{y: -20,onComplete:this.tweenComplete.bind(this)});
    };

    Ghe_us.prototype.onClick = function () {

    };

    Ghe_us.prototype.onOut = function () {

        TweenLite.to(this.item,0.5,{y:0,onComplete:this.tweenComplete.bind(this)});

    };

    Ghe_us.prototype.tweenComplete = function () {

        TweenLite.killTweensOf(this.item);

    };

    return Ghe_us;
});
