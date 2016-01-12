/**
 * Created by BTW-HIDE on 1/9/2016.
 */
LayerFood = function() {
    PIXI.Container.call(this);
    var NUM_FISH = 1000;
    var _this = this;
    this.listFoods = [];

    init();
    this.update = update;

    function  init(){
        var fish;
        var i = 0;
        for(i;i<NUM_FISH;i++)
        {
            fish = new Fish("small_gold_fish",false);
            fish.setCurPosition({x:-Math.random()*10000+200,y:-Math.random()*10000+200});
            fish.position.x = -fish.getCurPosition().x;
            fish.position.y = -fish.getCurPosition().y;
            fish.size = AppInfo.FoodDefaultSize;
            fish.scale.x = fish.scale.y =  fish.size*AppInfo.ratio;
            _this.addChild(fish);
            _this.listFoods.push(fish);
        }
    }

    function update(MyFishPosition)
    {
        this.position.x =  MyFishPosition.x;
        this.position.y = MyFishPosition.y;

        var len = _this.listFoods.length - 1;
        var fish;
        var i = len;

        for(i;i>=0;i--)
        {
            fish = _this.listFoods[i];
            fish.direction += fish.turningSpeed * 0.01;
            fish.position.x += Math.sin(fish.direction) * fish.getSpeed();
            fish.position.y += Math.cos(fish.direction) * fish.getSpeed();
            fish.rotation = -fish.direction - Math.PI / 2;
        }
    }
}
LayerFood.prototype = Object.create(PIXI.Container.prototype);
LayerFood.prototype.constructor = LayerFood;