/**
 * Created by datnt on 12/15/2015.
 */

requirejs(
    [
        "../lib/pixi.min",
        "../lib/stats.min",
        "../lib/Font",
        "../lib/proton-1.0.0.min",
        "utils/AppInfo",
        "utils/Utilities"
    ],
    function(PIXI, Stats, Font, Proton, AppInfo, Utilities) {
        var Loader = PIXI.loader;
        var Container = PIXI.Container;
        var ContainerOptimize = PIXI.ParticleContainer;//Faster render than Container from 2x to 5x but childern cannot have thier childs, and just use some x, y, width, height, scale, alpha, pivot, and visible
        var Graphic = PIXI.Graphics;
        var Sprite = PIXI.Sprite;
        var MovieClip = PIXI.extras.MovieClip;
        var Text = PIXI.Text;
        var BitmapText = PIXI.extras.BitmapText;

        stage = new Container();
        renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {  antialias: false, transparent: false,  resolution: 1 }, false);

        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";

        document.getElementById('container').appendChild(renderer.view);

        function PreLoader() {
            Container.call(this);
            console.log(PIXI);
            console.log(this);

            console.log((new AppInfo(this)).preLoader);
        };

        PreLoader.prototype = Object.create(PIXI.Container.prototype);
        PreLoader.prototype.constructor = PreLoader;

        //note: IE need font .woff. Font.js auto add fontFileName.woff to @font-face. Use this tool to generate fonts http://www.fontsquirrel.com/tools/webfont-generator
        var font = new Font();
        font.onload = onLoadFontComplete;
        font.onerror = function(error_message) { console.log("font has not loaded " + error_message); };
        font.fontFamily = "sedonascriptflfAnyThingYouWant";
        font.src = "../../Content/Theme/GameHTML5/fonts/sedonascriptflf.ttf";

        function onLoadFontComplete(){
            console.log("font has loaded");
            Loader.add([
                "http://localhost:63342/HTLM5/Content/Theme/GameHTML5/fonts/A Yummy Apology.fnt",
                "http://localhost:63342/HTLM5/Content/Theme/GameHTML5/images/AtlasButton.json",
                "http://localhost:63342/HTLM5/Content/Theme/GameHTML5/images/Foods.json",
                "http://localhost:63342/HTLM5/Content/Theme/GameHTML5/images/GoldFish.json"
            ]).on("progress", onLoadingProgress).load(onLoadingComplete);
        }

        function onLoadingProgress(loader, resource){
            console.log('Loading ' + resource.url);
            console.log('Progress ' + loader.progress);
        }

        function onLoadingComplete(){
            var textureButton = Loader.resources["http://localhost:63342/HTLM5/Content/Theme/GameHTML5/images/AtlasButton.json"].textures;
            var textureFish = Loader.resources["http://localhost:63342/HTLM5/Content/Theme/GameHTML5/images/GoldFish.json"].textures;

            preLoader = new PreLoader();
            preLoader.onChildrenChange = onChildrenChange;
            preLoader.on('added',onAddedToParent,preLoader);
            stage.addChild(preLoader);

            sprite1 = new Graphic();
            sprite1.x = 50;
            sprite1.y = 50;
            sprite1.beginFill(0xff00ff, 0.5);
            sprite1.lineStyle(2, 0x00ff00, 0.5);
            sprite1.drawRect(0, 0, 100, 100);
            sprite1.drawCircle(50, 50, 40);
            sprite1.endFill();

            sprite2 = new Sprite(textureButton["BtnCloseHover.png"]);
            sprite2.width = 100;
            sprite2.height = 100;
            sprite2.x = 50;
            sprite2.y = 50;

            normalFontText = new Text("Normal Font", {font: "40px sedonascriptflfAnyThingYouWant", fill: 0xff0000, align: "center", stroke: 0x0000ff, strokeThickness: 5});
            normalFontText.x = 50;
            normalFontText.y = 200;

            bitmapFontText = new BitmapText("Bitmap Font", {font: "40px A Yummy Apology", align: "center"});
            bitmapFontText.x = 50;
            bitmapFontText.y = 250;

            var containerOptimize = new ContainerOptimize(15000, {position: true, rotation: false, alpha: false, scale: false, uvs: true});

            var goldFishArray = [];
            for(var i = 1; i <= 11; i++){
                goldFishArray.push(textureFish['Gold_fish' + i + '.png'])
            }

            goldFish = new MovieClip(goldFishArray);
            goldFish.x = 100;
            goldFish.y = 50;
            goldFish.animationSpeed = 0.5;
            //goldFish.play();

            preLoader.addChild(sprite2);
            preLoader.addChild(sprite1);
            preLoader.addChild(goldFish);
            preLoader.addChild(normalFontText);
            preLoader.addChild(bitmapFontText);

            /*preLoader.removeChild(sprite1);
             sprite1.destroy(false, false);*/

            proton = createProton();

            if(renderer.type == PIXI.RENDERER_TYPE.WEBGL)
                var protonRenderer = new Proton.WebGLRender(proton, renderer.view);
            else
                var protonRenderer = new Proton.Renderer('other', proton);

            protonRenderer.onProtonUpdate = function() {

            };
            protonRenderer.onParticleCreated = function(particle) {
                var particleSprite = new PIXI.Sprite(particle.target);
                particle.sprite = particleSprite;
                preLoader.addChild(particle.sprite);
            };

            protonRenderer.onParticleUpdate = function(particle) {
                transformSprite(particle.sprite, particle);
            };

            protonRenderer.onParticleDead = function(particle) {
                preLoader.removeChild(particle.sprite);
            };

            protonRenderer.start();

            stats = new Stats();
            stats.setMode(0);
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.body.appendChild( stats.domElement );

            onEnterFrame();
        }

        function onEnterFrame() {
            stats.begin();
            /*preLoader.removeChild(normalFontText)
            normalFontText = new Text("Normal Font", {font: "", fill: 0xff0000, align: "center", stroke: 0x0000ff, strokeThickness: 5});
            normalFontText.x = 50;
            normalFontText.y = 200;
            preLoader.addChild(normalFontText);*/

            /*sprite1.x += Math.random() * 10 * (Math.round(Math.random() * 2) -1);
            sprite1.y += Math.random() * 10 * (Math.round(Math.random() * 2) -1);

            sprite2.x += Math.random() * 10 * (Math.round(Math.random() * 2) -1);
            sprite2.y += Math.random() * 10 * (Math.round(Math.random() * 2) -1);

            var collision = Utilities.contain(sprite1, stage);

            if(collision.hasCollision) {
                if(collision.left)
                    sprite1.x += Math.random() * 10;
                if(collision.right)
                    sprite1.x -= Math.random() * 10;
                if(collision.top)
                    sprite1.y += Math.random() * 10;
                if(collision.bottom)
                    sprite1.y -= Math.random() * 10;
            }

            Utilities.contain(sprite2, stage);*/

            proton.update();

            renderer.render(stage);

            stats.end();

            requestAnimationFrame(onEnterFrame);
        }

        function onAddedToParent(parent){
            /*console.log('onAdded to parent: ' + parent);
            console.log(parent);*/
        }

        function onChildrenChange(index){
            /*console.log('children was changed with current index ' + index);*/
        }

        function createProton() {
            var foodTexture = Loader.resources["http://localhost:63342/HTLM5/Content/Theme/GameHTML5/images/Foods.json"].textures;
            var proton = new Proton();
            var emitter = new Proton.BehaviourEmitter();
            //emitter.rate = new Proton.Rate(new Proton.Span(10, 20), new Proton.Span(1, 2));
            emitter.rate = new Proton.Rate(new Proton.Span(75, 110), new Proton.Span(.2, .5));
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.ImageTarget([foodTexture["moica_cam.png"], foodTexture["moica_xanhla.png"], foodTexture["moica_vang.png"]], 100, 100));
            emitter.addInitialize(new Proton.Life(2, 3));
            emitter.addInitialize(new Proton.Velocity(new Proton.Span(3, 9), new Proton.Span(0, 30, true), 'polar'));

            emitter.addBehaviour(new Proton.Gravity(8));
            emitter.addBehaviour(new Proton.Scale(new Proton.Span(1, 3), 0.3));
            emitter.addBehaviour(new Proton.Alpha(1, 0.5));
            emitter.addBehaviour(new Proton.Rotate(0, Proton.getSpan(-8, 9), 'add'));
            emitter.p.x = 1003 / 2;
            emitter.p.y = 100;
            emitter.emit();
            proton.addEmitter(emitter);

            emitter.addSelfBehaviour(new Proton.Gravity(5));
            emitter.addSelfBehaviour(new Proton.RandomDrift(30, 30, .1));
            emitter.addSelfBehaviour(new Proton.CrossZone(new Proton.RectZone(50, 0, 953, 610), 'bound'));

            return proton;
        }

        function transformSprite(particleSprite, particle) {
            particleSprite.position.x = particle.p.x;
            particleSprite.position.y = particle.p.y;
            particleSprite.scale.x = particle.scale;
            particleSprite.scale.y = particle.scale;
            particleSprite.anchor.x = 0.5;
            particleSprite.anchor.y = 0.5;
            particleSprite.alpha = particle.alpha;
            particleSprite.rotation = particle.rotation * Math.PI / 180;
        }
    }
);

window.addEventListener("resize", function(event) {
    renderer.view.style.position = "absolute";
    renderer.view.style.width = window.innerWidth + "px";
    renderer.view.style.height = window.innerHeight + "px";
    renderer.view.style.display = "block";
});