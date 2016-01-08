/**
 * Created by phuongtv on 12/30/2015.
 */
LayerMap = function(){
    PIXI.Container.call(this);
    this.init = init;
    this.onMouseMove = onMouseMove;
    this.update = update;

    var asset = new MapAsset(this);
    var tilesMap = [];
    var tile;
    var background = new PIXI.Graphics()
    background.beginFill(0x3fd9ff,1);
    background.drawRect(0,0,12000,14000);
    background.endFill();

    this.addChild(background);

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

    function onMouseMove(eventData)
    {

    }

    function update(MyFishPosition)
    {
        this.position.x =  MyFishPosition.x;
        this.position.y = MyFishPosition.y;
        //console.log(MyFishPosition.x + " " + MyFishPosition.y)
    }
}

LayerMap.prototype = Object.create(PIXI.Container.prototype);
LayerMap.prototype.constructor = LayerMap;