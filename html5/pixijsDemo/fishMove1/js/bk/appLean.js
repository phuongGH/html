(function($,window){

    window.App = {};

    App = {
        init:function(){

            var w_width = $(window).width(),
                w_height = $(window).height(),
                renderer = PIXI.autoDetectRenderer(w_width,w_height,{transparent:true}),
                // stage = new PIXI.Container(),
                screne = new PIXI.Container(),
                layerFish = new PIXI.Container(),
                layerControl = new PIXI.Container(),
                movie,
                dotTexture = new PIXI.Texture.fromImage("images/reddot.png"),
                readDot = new PIXI.Sprite(dotTexture),
                listFoods = [],
                graphics = new PIXI.Graphics();

            amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;

            if(amount == 5)
            {
                renderer.context.mozImageSmoothingEnabled = false
                renderer.context.webkitImageSmoothingEnabled = false;
            }

            $("body").append(renderer.view);

            PIXI.loader.add('images/socden1.json').load(onAssetsLoaded);

            graphics.name = "graphics";


            init();

            screne.on('mousemove', onMouseMove);

            initFood();

            function init()
            {
                readDot.position.set(300);
                readDot.anchor.set(0.5);
                layerControl.addChild(readDot);

                screne.addChild(layerFish);
                screne.addChild(layerControl);
            }


            function onAssetsLoaded()
            {
                var frames = [];

                for (var i = 1; i < 10; i++) {

                     frames.push(PIXI.Texture.fromFrame('Blue_butter00' + i + '.png'));
                }

                movie = new PIXI.extras.MovieClip(frames);
                movie.position.set(300);
                movie.anchor.set(0.5);
                movie.animationSpeed = 0.2;
                movie.play();
                layerFish.addChild(movie);
                animate();
            }


            function initFood(){
                // for (var i = 10 ; i >= 0; i--) {
                PIXI.loader.add('images/small_gold_fish.json').load(onLoadedFood);
                // };
            }
            

            function onLoadedFood(){
                var frames = [];

                for (var i = 1; i < 11; i++) {
                    var temp = "";
                    if(i<10)
                    {
                        temp = "0"+i;
                    }
                    else
                    {
                        temp = i+"";
                    }

                    frames.push(PIXI.Texture.fromFrame('small_gold_fish00' + temp + '.png'));
                }

                //for (var i = 100 ; i >= 0; i--) {
                    var food = new PIXI.extras.MovieClip(frames);
                    //food.position.x = Math.random()*w_width;
                    //food.position.y = Math.random()*w_height;
                    food.position.x = 300;
                    food.position.y = 220;
                    food.anchor.set(0.5);
                    food.animationSpeed = 0.2;
                    food.scale.x = 0.3;
                    food.scale.y = 0.3;
                    food.play();
                    layerFish.addChild(food);
                    listFoods.push(food);
                //}
            }

            function isIntersecting(r1, r2) {

                    var xdist = r1.position.x - r2.position.x;

                    //if(xdist > -r1.width/2 && xdist < r1.width/2)
                    //{
                    //    var ydist = r1.position.y - r2.position.y;
                    //
                    //    if(ydist > -r1.height/2 && ydist < r1.height/2)
                    //    {
                    //        return true;
                    //    }
                    //}
                if(xdist > -r1.width && xdist < r1.width)
                {
                    var ydist = r1.position.y - r2.position.y;

                    if(ydist > -r1.height && ydist < r1.height)
                    {
                        return true;
                    }
                }


                return false;
            }
            
            // function onMouseMove (eventData) {
            //     console.log("MOUSE MOVE!");
            // }
            /*screne.mousemove = function(mouseData){
                movie.stop();
               console.log("MOUSE MOVE!");
            } */

           function onMouseMove (eventData) {
                //movie.stop();

                /*var a = distance(movie.position.x,movie.position.y,0,0);
                var b = distance(movie.position.x,movie.position.y,eventData.clientX,eventData.clientY);
                var c = distance(eventData.clientX,eventData.clientY,0,0);*/
                //console.log("a " + a + ", b " + b + ", c " + c);

                // var r = Math.atan2(movie.position.x - eventData.clientX, movie.position.y - eventData.clientY) - (Math.PI/2); //* 180 / Math.PI);
                // var r = Math.acos((a*a+ b*b - c*c)/(2*a*b)) + 0.78;
               /* if(movie.position.y < eventData.clientY)
                {
                    movie.rotation = -r;
                }
                else
                {
                    movie.rotation = r;
                }
                */

               if(layerFish.getChildByName("graphics"))
               {
                   layerFish.removeChild(graphics);
               }
               graphics.lineStyle(2, 0x0000FF, 1);
               //graphics.beginFill(0xFF700B, 1);
               //graphics.drawRect(movie.x-movie.width/2, movie.y-movie.height/2, movie.width/2, movie.height/2);
               graphics.drawRect(movie.x - movie.width/4, movie.y - movie.height/4, movie.width/2, movie.height/2);
               graphics.endFill();
               layerFish.addChild(graphics);

               movie.rotation = - Math.atan2(movie.x - eventData.clientX, movie.y - eventData.clientY) + (Math.PI/2);
                // console.log(r);
            }

            function distance(x1,y1,x2,y2){
                return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
            }

            //animate();
            document.addEventListener("mousemove",function(event){
                onMouseMove(event);
            });


            function animate(){
                //console.log("aasdfs"+listFoods.length);
               /*for (var i = listFoods.length - 1; i >= 0; i--) {
                    // console.log(isIntersecting(listFoods[i],movie));
                    if( isIntersecting(listFoods[i],movie))
                    {
                        console.log("listFoods["+i+"] x " + (listFoods[i].position.x));
                        listFoods[i].position.x += 2;
                        movie.position.x += 4;
                    }
                };*/

                requestAnimationFrame(animate);
                renderer.render(screne);
            }
        }
    };

    App.init();
}(jQuery, this));