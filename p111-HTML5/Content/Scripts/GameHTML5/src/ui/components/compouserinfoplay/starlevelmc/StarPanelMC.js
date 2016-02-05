/**
 * Created by phund on 18/01/2016.
 */
define(function(require)
{
    //Define libs
    var StarLevel = require('ui/components/compouserinfoplay/starlevelmc/StarLevel');
    //var PIXI = require('http://localhost:63342/Test/Content/Scripts/GameHTML5/lib/pixi.min.js');
    //Define const

    //Define private variable
    // var _this;

    //Define public variable

    //Define Layers

    //Define Contructor
    function StarPanelMC(parent)
    {
        //_this = this;
        this.StarPanel = parent;
        PIXI.Container.call(this);   //This is code for inheritance
        this.on('added', _onAddedToParent);

    };
    StarPanelMC.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    StarPanelMC.prototype.constructor = StarPanelMC;
    //Define Property



    //Define Function
    StarPanelMC.prototype.setStarLevel = function(starMC_Num, level_Num) {
        var star;
        switch (starMC_Num)
        {
            case 1:
                star = this.star1;
                break;
            case 2:
                star = this.star2;
                break;
            case 3:
                star = this.star3;
                break;
            case 4:
                star = this.star4;
                break;
            case 5:
                star = this.star5;
                break;
        }
        star.starMC.gotoAndStop(level_Num);
    }
    StarPanelMC.prototype.init = function(){
        this.star1 = new StarLevel(this);
        this.star2 = new StarLevel(this);
        this.star3 = new StarLevel(this);
        this.star4 = new StarLevel(this);
        this.star5 = new StarLevel(this);
        this.addChild(this.star1);
        this.addChild(this.star2);
        this.addChild(this.star3);
        this.addChild(this.star4);
        this.addChild(this.star5);

        this.star2.y = this.star1.height - 5;
        this.star3.y = this.star2.y + this.star1.height - 5;
        this.star4.y = this.star3.y + this.star1.height - 5;
        this.star5.y = this.star4.y + this.star1.height - 5;


    }

    function _onAddedToParent(parent){
        this.init();
    }
    return StarPanelMC;
});