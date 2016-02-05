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
    function StarOwner(parent)
    {
        //_this = this;
        //this.StarPanel = parent;
        PIXI.Container.call(this);   //This is code for inheritance
        this.init();

    };
    StarOwner.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    StarOwner.prototype.constructor = StarOwner;
    //Define Property



    //Define Function
    StarOwner.prototype.init = function(){
        //var atlasJSON = PIXI.loader.resources["http://localhost:63342/Test/Content/Theme/GameHTML5/images/Atlas/OwnerStar/OwnerStarAtlas.json"].textures;
        var starMCArray = ResourceManager.Atlas.AtlasOwnerStar.textures.OwnerStar;
        //for(var i = 1; i <= 101; i++){
        //    starMCArray.push(atlasJSON['OwnerStar' + i + '.png'])
        //}

        this.starMC = new PIXI.extras.MovieClip(starMCArray);
        /*starMC.x = 100;
        starMC.y = 50;*/
        this.starMC.animationSpeed = 0.5;
        this.starMC.x = -this.starMC.width;
        //this.starMC.play();
        this.addChild(this.starMC);
        this.stopEffect();
    }
    //Define private function
    StarOwner.prototype.playEffect =function(){
        this.starMC.play();
    }
    StarOwner.prototype.stopEffect =function(){
        this.starMC.stop();
    }

    return StarOwner;
});