/**
 * Created by phuongtv on 2/1/2016.
 */
define(function(require){

    var GlobalConstants = require('GlobalConstants');
    var GameScreen = require('GameScreen')

    GameLoader.prototype = Object.create(PIXI.Container.prototype);
    GameLoader.prototype.constructor = GameLoader;

    Object.defineProperties(GameLoader.prototype,{

        _currentScreen:{
            value:0,
            writable:true
        },
        lobbyScreen:{
            value:'undefined',
            writable:true
        },
        gameScreen:{
            value:'undefined',
            writable:true
        }
    });

    function GameLoader(){
        PIXI.Container.call(this);
        this.gameScreen = new GameScreen(this);
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

        if(this.children.indexOf(this.lobbyScreen)>=0)
        {
            this.removeChild(this.lobbyScreen);
        }

        this.addChild(this.gameScreen);

    };

    return GameLoader;
})