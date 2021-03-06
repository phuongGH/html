/**
 * Created by phuongtv on 12/11/2015.
 */
function Mid() {
    var texture  = PIXI.Texture.fromImage("images/bg-mid.png");
    PIXI.TilingSprite.call(this, texture, 512, 256);
    this.position.x = 0;
    this.position.y = 128;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.TilingSprite.prototype);

/*
Mid.prototype.update = function() {
    this.tilePosition.x -= 0.64;
};*/

Mid.DELTA_X = 0.64;

Mid.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};
