/**
 * Created by phund on 18/01/2016.
 */
define(function(require)
{
    //Define libs
    //var PIXI = require('http://localhost:63342/Test/Content/Scripts/GameHTML5/lib/pixi.min.js');
    //Define const

    //Define private variable
    // var _this;

    //Define public variable

    //Define Layers

    //Define Contructor
    function StarLevel(parent)
    {
        //_this = this;
        this.StarPanel = parent;
        PIXI.Container.call(this);   //This is code for inheritance
        this.on('added', _onAddedToParent);

    };
    StarLevel.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    StarLevel.prototype.constructor = StarLevel;
    //Define Property



    //Define Function
    StarLevel.prototype.init = function(){
        //var atlasJSON = PIXI.loader.resources["http://localhost:63342/Test/Content/Theme/GameHTML5/images/Atlas/LevelStar/LevelStarAtlas.json"].textures;
        var starMCArray = ResourceManager.Atlas.AtlasLevelStar.textures.StarLevel;
        //for(var i = 1; i <= 32; i++){
        //    starMCArray.push(atlasJSON['StarLevel' + i + '.png'])
        //}

        this.starMC = new PIXI.extras.MovieClip(starMCArray);
        //this.starMC.animationSpeed = 0.5;
        this.starMC.gotoAndStop(1);
        //this.starMC.x = -this.starMC.width;
        //this.starMC.play();
        this.addChild(this.starMC);
        this.stopEffect();
    }
    //Define private function
    StarLevel.prototype.playEffect =function(){
        this.starMC.play();
    }
    StarLevel.prototype.stopEffect =function(){
        this.starMC.stop();
    }
    function _onAddedToParent(parent){
        this.init();
    }
    return StarLevel;
});