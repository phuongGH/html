(function($,window){

    window.App = {};

    App = {
        init:function(){

            var w_width = $(window).width(),
                w_height = $(window).height(),
                renderer = PIXI.autoDetectRenderer(w_width,w_height,{transparent:true}),
                gameAsset,
                screne = new PIXI.Container(),
                layerFish = new PIXI.Container(),
                layerControl = new PIXI.Container(),
                //myFish = new PIXI.Container(),
                myFish,
                listFoods = [],
                tick = 0;

            amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;

            if(amount == 5)
            {
                renderer.context.mozImageSmoothingEnabled = false;
                renderer.context.webkitImageSmoothingEnabled = false;
            }

            $("body").append(renderer.view);

            gameAsset = new GameAsset(loadResourcesComplete);

            function loadResourcesComplete()
            {
                initMyFish();
                initFood();
                animate();
            }

            function initMyFish()
            {
                myFish = new Fish("socden1",true);
                layerFish.addChild(myFish);
                screne.addChild(layerFish);
                screne.addChild(layerControl);
            }

            function initFood(){

                for(var i = 100;i>0;i--)
                {
                    var food = new Fish("small_gold_fish",false);
                    food.scale.x = 0.2;
                    food.scale.y = 0.2;
                    food.radius = food.width/4;
                    food.position.set(Math.random()*w_width,Math.random()*w_height);
                    layerFish.addChild(food);
                    listFoods.push(food);
                }
            }

           function onMouseMove (eventData) {
               if(myFish)
               {
                   myFish.moveToX = eventData.clientX;
                   myFish.moveToY = eventData.clientY;
                   myFish.rotation = -( Math.atan2(myFish.x - eventData.clientX, myFish.y - eventData.clientY) - (Math.PI/2));
               }
            }

            document.addEventListener("mousemove",function(event){
                onMouseMove(event);
            });


            function animate(){

                tick ++;

                if(tick == 1)
                {
                    enterFrame1();
                }

                if(tick == 2)
                {
                    enterFrame2();
                }

                if(tick >= 3)
                {
                    enterFrame3();
                    tick = 0;
                }

                requestAnimationFrame(animate);
                renderer.render(screne);
            }

            function enterFrame1()
            {
                var len = listFoods.length - 1;
                var food;
                var i = len;

                for(i;i>=0;i--)
                {
                    food = listFoods[i];
                    food.direction += food.turningSpeed * 0.01;
                    food.position.x += Math.sin(food.direction) * food.getSpeed();
                    food.position.y += Math.cos(food.direction) * food.getSpeed();
                    food.rotation = -food.direction - Math.PI / 2;
                }
            }

            function enterFrame2()
            {
                if(myFish)
                {
                    if(Math.abs(myFish.position.x - myFish.moveToX)>2 && Math.abs(myFish.position.y - myFish.moveToY)>2)
                    {
                        myFish.position.y -= Math.sin(myFish.rotation) * myFish.getSpeed();
                        myFish.position.x -= Math.cos(myFish.rotation) * myFish.getSpeed();
                    }
                }
            }

            function enterFrame3()
            {
                var len = listFoods.length - 1;
                var food;
                var i = len;

                for(i;i>=0;i--)
                {
                    food = listFoods[i];
                    if(myFish.checkCollision(food))
                    {
                        layerFish.removeChild(food);
                    }
                }
            }

        }
    };

    App.init();
}(jQuery, this));