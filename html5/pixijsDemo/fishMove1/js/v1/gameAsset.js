/**
 * Created by phuongtv on 12/7/2015.
 */
GameAsset =function(loadResourcesComplete)
{
    var listLoaded = [];
    GameAsset.listFish.push(new FishRes("socden1","Blue_butter00",10, loadFinish));
    GameAsset.listFish.push(new FishRes("small_gold_fish","small_gold_fish00",10, loadFinish));

    function loadFinish(value)
    {
        listLoaded.push(value);
        if(listLoaded.length == GameAsset.listFish.length)
        {
            loadResourcesComplete();
        }
    }

}

GameAsset.listFish = [];

/*GameAsset.initNewFish = function(fishName, frameName)
{

}*/

GameAsset.getFish = function(fishName)
{
    var len = GameAsset.listFish.length-1;
    for(var i = len; i >= 0; i--)
    {
        if(GameAsset.listFish[i].getName()== fishName) {
            return GameAsset.listFish[i];
        }
    }
    return null;
}

