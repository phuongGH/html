/**
 * Created by phuongtv on 2/1/2016.
 */
define(function(require){

    GameScreen.prototype = Object.create(PIXI.Container);
    GameScreen.prototype.constructor = GameScreen;

    Object.defineProperties(GameScreen.prototype,{

    });

    function GameScreen(){
        PIXI.Container.call(this);

    };

    GameScreen.prototype._init = function(){

    };

    return GameScreen;
});