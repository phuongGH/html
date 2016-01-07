/**
 * Created by phuongtv on 1/5/2016.
 */
MapAsset = function(parent){

    this.getTextureByName = getTextureByName;
    this.getTilesMap = getTilesMap;

    //var curFile = 1;
    var mapAsset = {};
    var assetName = ["Bang1.png","Bang2.png","Bang3.png","Bang4.png","Bang5.png","DaBien1.png","DaBien2.png","DaBien3.png","DaBien4.png","DaBien5.png","HoaBien1.png","HoaBien10.png","HoaBien11.png","HoaBien12.png","HoaBien2.png","HoaBien3.png","HoaBien4.png","HoaBien5.png","HoaBien6.png","HoaBien7.png","HoaBien8.png","HoaBien9.png","MangBam1.png","MangBam2.png","PhoiCanh1.png","PhoiCanh10.png","PhoiCanh11.png","PhoiCanh12.png","PhoiCanh2.png","PhoiCanh3.png","PhoiCanh4.png","PhoiCanh5.png","PhoiCanh6.png","PhoiCanh7.png","PhoiCanh8.png","PhoiCanh9.png","Candy.png","CayThong1.png","CayThong2.png","Hole.png","QuayTay.png","RongBien.png","RongBien1.png","SanHo.png","SanHo1.png","SanHo2.png","SanHo3.png","SanHoChum.png","SaoBien.png","SaoBien1.png","ThuyTuc.png","ThuyTuc1.png","ThuyTuc2.png","VoOc1.png","VoOc2.png","VoOc3.png"];
    var tilesMap = [];

    PIXI.loader.add('asset/AtlasObjectMap1.json').add('asset/AtlasObjectMap2.json').add('asset/AtlasObjectMap3.json').load(onLoadObjComplite);

    function onLoadObjComplite(data)
    {
        for(index in assetName)
        {
            //console.log(assetName[index]);
            mapAsset[assetName[index]] = PIXI.Texture.fromFrame(assetName[index]);
        }
        //mapAsset.push(PIXI.Texture.fromFrame(frameName + i + '.png'));
        $.getJSON( "asset/Map2.json",  onloadMapComplite );
    }

    /*loadMapObjects();

    function loadMapObjects()
    {
        $.getJSON( 'asset/AtlasObjectMap'+curFile+'.json',  onloadObjectComplite );
    }

    function onloadObjectComplite(data)
    {
        console.log(data.frames);
    }*/



    function onloadMapComplite(data)
    {
        //console.log(data.layers[1]);
        tilesMap = data.layers[1].objects;
        parent.init();
    };

    function getTilesMap(){
        return tilesMap;
    }

    function getTextureByName(name){
        return mapAsset[name+".png"];
    }

    //PIXI.loader.add('asset/Map2.json',function(res)
    //{
    //    console.log(res.tiledMap);
    //   // var map = res.tiledMap;
    //    callBack();
    //}).load();

}