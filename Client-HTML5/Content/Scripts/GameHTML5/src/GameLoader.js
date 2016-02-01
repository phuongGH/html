/**
 * Created by phuongtv on 2/1/2016.
 */
define(function(require){

    var GlobalConstants = require('GlobalConstance');

    GameLoader.prototype = Object.create(PIXI.Container);
    GameLoader.prototype.constructor = GameLoader;

    Object.defineProperties(GameLoader.prototype,{

        _currentScreen:{
            value:0,
            writable:true
        }

    });

    function GameLoader(){
        PIXI.Container.call(this);
    };

    GameLoader.prototype.isGame = function(){
        return this._currentScreen == GlobalConstants.GAME_SCREEN;
    }

    GameLoader.prototype.isLobby = function(){
        return this._currentScreen == GlobalConstants.LOBBY_SCREEN;
    }

    GameLoader.goToGameScreen = function(){
        if(this.isGame())
        {
            return;
        }
        this._currentScreen = GlobalConstants.GAME_SCREEN;
    };

    return GameLoader;
})