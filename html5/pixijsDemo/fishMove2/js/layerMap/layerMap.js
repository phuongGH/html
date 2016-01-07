/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMap = function(){
    PIXI.Container.call(this);
    this.init = init;

    var asset = new MapAsset(this);
    var tilesMap = [];
    var tile;

    function init(){
        tilesMap = asset.getTilesMap();
        for(title in tilesMap)
        {
            //console.log(tilesMap[title].name);
            //console.log(asset.getTextureByName(tilesMap[title].name));
            tile = new PIXI.Sprite(asset.getTextureByName(tilesMap[title].name));
            tile.position.x = tilesMap[title].x;
            tile.position.y = tilesMap[title].y;
            this.addChild(tile);
        }

    }
}

LayerMap.prototype = Object.create(PIXI.Container.prototype);
LayerMap.prototype.constructor = LayerMap;