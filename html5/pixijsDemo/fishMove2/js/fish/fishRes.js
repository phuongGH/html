FishRes = function(fishName, frameName, numFrame, loadFinish){

    var name = "", Frames = [];

    this.getName = getName;

    this.getFrame = getFrame;

    PIXI.loader.add('asset/'+fishName+'.json').load(onAssetsLoaded);

    function onAssetsLoaded()
    {
        for (var i = 1; i < numFrame; i++) {

            Frames.push(PIXI.Texture.fromFrame(frameName + i + '.png'));
        }

        name = fishName;
        loadFinish(name);
    }

    function getName()
    {
        return name;
    }

    function getFrame()
    {
        return Frames;
    }
}