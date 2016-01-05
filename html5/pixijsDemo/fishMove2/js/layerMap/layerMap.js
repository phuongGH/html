/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMap = function(){
    PIXI.Container.call(this);
    this.init = init;

    var asset = new MapAsset(this.init);
    function init(){

    }
}

LayerMap.prototype = Object.create(PIXI.Container.prototype);
LayerMap.prototype.constructor = LayerMap;