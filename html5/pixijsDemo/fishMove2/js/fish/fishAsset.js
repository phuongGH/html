/**
 * Created by phuongtv on 12/7/2015.
 */
FishAsset =function(loadResourcesComplete)
{
    var listLoaded = [];
    FishAsset.listFish.push(new FishRes("socden1","Blue_butter00",10, loadFinish));
    FishAsset.listFish.push(new FishRes("small_gold_fish","small_gold_fish00",10, loadFinish));

    function loadFinish(value)
    {
        listLoaded.push(value);
        if(listLoaded.length == FishAsset.listFish.length)
        {
            loadResourcesComplete();
        }
    }

}

FishAsset.listFish = [];

/*GameAsset.initNewFish = function(fishName, frameName)
{

}*/

FishAsset.getFish = function(fishName)
{
    var len = FishAsset.listFish.length-1;
    for(var i = len; i >= 0; i--)
    {
        if(FishAsset.listFish[i].getName()== fishName) {
            return FishAsset.listFish[i];
        }
    }
    return null;
}

