/**
 * Created by hungtd on 1/18/2016.
 */
define(function (require) {


    Board.prototype = Object.create(PIXI.Sprite.prototype);
    Board.prototype.constructor = Board;



    Object.defineProperties(Board.prototype, {
        boardTextures:{
            vaule:null,
            writable:true
        }

    });

    function Board()
    {
        PIXI.Sprite.call(this);
        this._init();
    }

    Board.prototype._init= function()
    {
        this.onAssetsLoaded();

       // this.mouseChildren = false;
        this.interactive = true;
        this.mouseover = this.onOver;
    };

    Board.prototype.onOver = function () {
        console.log("Board Over");
    };

    Board.prototype.onAssetsLoaded = function () {

        this.boardTextures = PIXI.Texture.fromFrame('Board5_mc.png');
        this.texture = this.boardTextures;

    };

    Board.prototype.setBoard = function (i) {

        switch (i)
        {
            case 1:
                this.boardTextures = PIXI.Texture.fromFrame('Board5_mc.png');
                this.texture = this.boardTextures;
                break;
        }
    };

    return Board;
});