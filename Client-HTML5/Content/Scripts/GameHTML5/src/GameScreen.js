/**
 * Created by phuongtv on 2/1/2016.
 */
define(function(require){

    GameScreen.prototype = Object.create(PIXI.Container.prototype);
    GameScreen.prototype.constructor = GameScreen;

    Object.defineProperties(GameScreen.prototype,{

    });

    function GameScreen(){
        PIXI.Container.call(this);
        var textureBG = PIXI.Texture.fromImage("http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/images/BackGround.png");
        var backGround = new PIXI.Sprite(textureBG);
        this.addChild(backGround);
    };

    GameScreen.prototype._init = function(){

    };

    return GameScreen;
});