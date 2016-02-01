/**
 * Created by phuongtv on 2/1/2016.
 */
define(function(require){

    CompoHeader.prototype = Object.create(PIXI.Container);
    CompoHeader.prototype.constructor = CompoHeader;

    Object.defineProperties(Compoheader.prototype,{

    });

    function CompoHeader(){
        PIXI.Container.call(this);

    };

    CompoHeader.prototype._init = function (){

    };

    return CompoHeader;
});