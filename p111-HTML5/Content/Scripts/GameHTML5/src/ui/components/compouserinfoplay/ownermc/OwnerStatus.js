/**
 * Created by phund on 18/01/2016.
 */
define(function(require)
{
    //Define libs
    var Star = require('ui/components/compouserinfoplay/ownermc/StarOwner');
    //Define const

    //Define private variable
    // var _this;

    //Define public variable

    //Define Layers

    //Define Contructor
    function OwnerStatus(parent)
    {
        //_this = this;
        //this.userInGame = parent;
        PIXI.Container.call(this);   //This is code for inheritance
        this.on('added', _onAddedToParent);

    };
    OwnerStatus.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    OwnerStatus.prototype.constructor = OwnerStatus;
    //Define Property



    //Define Function
    OwnerStatus.prototype.init = function(){
        this.star1 = new Star(this);
        this.addChild(this.star1);
    }
    //Define private function
    function _onAddedToParent(parent){
        this.init();
    }
    return OwnerStatus;
});