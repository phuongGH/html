/**
 * Created by phuongtv on 1/5/2016.
 */
MapAsset = function(callBack){

    PIXI.loader.add('asset/Map2.json',function(res)
    {
        console.log(res.tiledMap);
       // var map = res.tiledMap;
        callBack();
    }).load();

}