/**
 * Created by BTW-HIDE on 11/29/2015.
 */
(function($,window){

    window.App = {};

    App = {
        init:function(){

            var w_width = $(window).width(),
                w_height = $(window).height(),
                //w_width = 800,
                //w_height = 600,
                renderer = PIXI.autoDetectRenderer(w_width,w_height,{transparent:true}),
            //    renderer = PIXI.autoDetectRenderer(800,600,{transparent:true}),
                stage = new PIXI.Container(),
                stage1 = new PIXI.Container(),
                stage2 = new PIXI.Container(),
                texture = new PIXI.Texture.fromImage("bunny.png"),
                //bunny = new PIXI.Sprite(texture);
                //texture = new PIXI.Texture.fromImage("cat.gif"),
                //cat = new PIXI.Sprite(texture),
                bunnies = [],
                reverse = false,
                numOfBunny = 1000,
                amount = 100,
                count = 0,
                basicText = new PIXI.Text('BUNNIES');

            amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;

            if(amount == 5)
            {
                renderer.context.mozImageSmoothingEnabled = false
                renderer.context.webkitImageSmoothingEnabled = false;
            }

            $("body").append(renderer.view);

            stats = new Stats();

            document.body.appendChild( stats.domElement );
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0px";

            basicText.x = 0;
            basicText.y = 80;

            stage2.addChild(basicText);

            stage.addChild(stage1);
            stage.addChild(stage2);
            //stage.width = w_width;
            //stage.height = w_height;

            /*cat.anchor.set(.5);
            cat.position.x = 20;
            cat.position.y = 80;
            stage.addChild(cat);*/

            /*stage.interactive = true;
            stage.on('mousedown', onDown);
            stage.on('touchstart', onDown);
             */
            function onDown (eventData) {

                for (var i = 0; i < numOfBunny; i++)
                {
                    var bunny = new PIXI.Sprite(texture);
                    bunny.position.x = Math.random()*100;
                    bunny.position.y = Math.random()*100;
                    bunny.vx = Math.random()*8+2;
                    bunny.vy = Math.random()*8+2;
                    stage1.addChild(bunny);
                    bunnies.push(bunny);
                }
            }

            document.addEventListener("click",function(event){
                onDown();
            });

            animate();

            function animate(){
                stats.begin();
                //cat.position.x += 4;

               /* if(cat.position.x < renderer.width - cat.width && reverse == false){
                    cat.position.x += 4;
                    cat.scale.x = -1;
                }else {
                    cat.position.x -= 4;
                    cat.scale.x = 1;

                    reverse = true;

                    if (cat.position.x < cat.width){
                        reverse = false;
                    }
                }*/
                var len = bunnies.length
                basicText.text = len + " BUNNIES";
                for (var i = 0; i < len ; i++) {

                    var bunny = bunnies[i];
                    bunny.position.x += bunny.vx;
                    bunny.position.y += bunny.vy;

                    if(bunny.position.x > w_width)
                    {
                        bunny.vx *= -1;
                        bunny.position.x = w_width;
                    }else if (bunny.position.x < 0)
                    {
                        bunny.vx *= -1;
                        bunny.position.x = 0;
                    }

                    if (bunny.position.y > w_height)
                    {
                        bunny.vy *= -0.85;
                        bunny.position.y = w_height;
                        if (Math.random() > 0.5)
                        {
                            bunny.vy -= Math.random() * 6;
                        }
                    }
                    else if(bunny.position.y < 0){
                        bunny.vy *= -1;
                        bunny.position.y = 0;
                    }

                }
                stats.end();
                requestAnimationFrame(animate);
                renderer.render(stage);
            }
        }
    };

    App.init();
}(jQuery, this));