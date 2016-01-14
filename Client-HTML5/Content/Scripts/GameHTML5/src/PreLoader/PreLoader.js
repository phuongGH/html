/**
 * Created by datnt on 12/15/2015.
 */

define(function(require) {
    //Import

    var PIXI = require('../../lib/pixi.min');
    var Font = require('../../lib/Font');
    var Proton = require('../../lib/proton-1.0.0.min');
    var AppInfo = require('../utils/AppInfo');
    var Utilities = require('../utils/Utilities');
    var ButtonOption = require('../Components/ButtonOption');
    var Button = require('../Components/Button');
    var ResourceName = require('ResourceName');
    var CompoNotify = require('../CompoNotify/CompoNotify');

    var Loader = PIXI.loader;
    var Container = PIXI.Container;
    var ContainerOptimize = PIXI.ParticleContainer;//Faster render than Container from 2x to 5x but childern cannot have thier childs, and just use some x, y, width, height, scale, alpha, pivot, and visible
    var Graphic = PIXI.Graphics;
    var Sprite = PIXI.Sprite;
    var MovieClip = PIXI.extras.MovieClip;
    var Text = PIXI.Text;
    var BitmapText = PIXI.extras.BitmapText;
    var _this;
    var compoNotify;
    //Define Contructor

    function PreLoader() {
        Container.call(this);                                               //This is code for inheritance
        console.log(PIXI);
        console.log((new AppInfo(this)).preLoader);
        //AppInfo.PIXI = PIXI;
        window.PIXI = PIXI;
        _this = this;
        this.on('added', this._onAddedToParent);
    };

    PreLoader.prototype = Object.create(Container.prototype);          //This is code for inheritance
    PreLoader.prototype.constructor = PreLoader;

    //Define Property

    Object.defineProperties(PreLoader.prototype, {
        proton: {
            value: undefined,
            writable: true
        }
    });

    //Define Functionc

    PreLoader.prototype._onAddedToParent = function(parent){
        //note: IE need font .woff. Font.js auto add fontFileName.woff to @font-face. Use this tool to generate fonts http://www.fontsquirrel.com/tools/webfont-generator
        var font = new Font();
        font.preLoader = this;
        font.onload = this._onLoadFontComplete;
        font.onerror = function(error_message) { console.log("font has not loaded " + error_message); };
        font.fontFamily = "sedonascriptflfAnyThingYouWant";
        font.src = "../../Content/Theme/GameHTML5/fonts/sedonascriptflf.ttf";
    }

    PreLoader.prototype._onLoadFontComplete = function(){
        console.log("font has loaded");
        Loader.preLoader = this.preLoader;
        Loader.add(ResourceName.ATLAS_BUTTON,"http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/images/AtlasButton.json")
            .add(ResourceName.FONT_APOLOGY,"http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/fonts/A Yummy Apology.fnt")
            .on("progress", this.preLoader._onLoadingProgress).load(this.preLoader._onLoadingComplete);
    }

    PreLoader.prototype._onLoadingProgress = function(loader, resource){
        console.log('Loading ' + resource.url);
        console.log('Progress ' + loader.progress);
    }

    PreLoader.prototype._onLoadingComplete = function(){
        var textureButton = Loader.resources[ResourceName.ATLAS_BUTTON].textures;
        //var textureFish = Loader.resources["http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/images/GoldFish.json"].textures;

        var btnOption = new ButtonOption();
        /*btnOption.type = ButtonOption.BUTTON_IMAGES;
        btnOption.textureButtonUp = textureButton[ResourceName.BTN_CLOSE_UP];
        btnOption.textureButtonOver = textureButton[ResourceName.BTN_CLOSE_OVER];
        btnOption.textureButtonDown = textureButton[ResourceName.BTN_CLOSE_DOWN];*/

        btnOption.type = ButtonOption.BUTTON_DEFAULT_GREEN;
       // btnOption.textures = textureButton;
        btnOption.text = "OK aaa";
        var btn = new Button(btnOption);
        btn.position.x = 300;
        _this.addChild(btn);

        btn.on('mousedown', _this.onButtonDown)
            .on('touchstart', _this.onButtonDown);
        compoNotify = new CompoNotify(textureButton);
        _this.addChild(compoNotify);
        //compoNotify.showMessWidthClose("This is the text!");//,CompoNotify.MESSAGE);
        compoNotify.showMessWidthAgree("This is the text!");//,CompoNotify.MESSAGE);
       /* sprite1 = new Graphic();
        sprite1.x = 50;
        sprite1.y = 50;
        sprite1.beginFill(0xff00ff, 0.5);
        sprite1.lineStyle(2, 0x00ff00, 0.5);
        sprite1.drawRect(0, 0, 100, 100);
        sprite1.drawCircle(50, 50, 40);
        sprite1.endFill();*/

       /* sprite2 = new Sprite(textureButton["BtnCloseHover.png"]);
        sprite2.width = 100;
        sprite2.height = 100;
        sprite2.x = 50;
        sprite2.y = 50;*/

        /*normalFontText = new Text("Normal Font", {font: "40px sedonascriptflfAnyThingYouWant", fill: 0xff0000, align: "center", stroke: 0x0000ff, strokeThickness: 5});
        normalFontText.x = 50;
        normalFontText.y = 200;*/

       /* bitmapFontText = new BitmapText("Bitmap Font", {font: "40px A Yummy Apology", align: "center"});
        bitmapFontText.x = 50;
        bitmapFontText.y = 250;*/

        /*var containerOptimize = new ContainerOptimize(15000, {position: true, rotation: false, alpha: false, scale: false, uvs: true});

        var goldFishArray = [];
        for(var i = 1; i <= 11; i++){
            goldFishArray.push(textureFish['Gold_fish' + i + '.png'])
        }

        goldFish = new MovieClip(goldFishArray);
        goldFish.x = 100;
        goldFish.y = 50;
        goldFish.animationSpeed = 0.5;*/
        //goldFish.play();

        //this.preLoader.addChild(sprite2);
        //this.preLoader.addChild(sprite1);
        //this.preLoader.addChild(goldFish);
        //this.preLoader.addChild(normalFontText);
        //this.preLoader.addChild(bitmapFontText);

        /*this.preLoader.removeChild(sprite1);
        sprite1.destroy(false, false);*/

        //this.preLoader.proton = createProton();

        if(renderer.type == PIXI.RENDERER_TYPE.WEBGL)
            var protonRenderer = new Proton.WebGLRender(this.preLoader.proton, renderer.view);
        //else
        //    var protonRenderer = new Proton.Renderer('other', this.preLoader.proton);

        protonRenderer.preLoader = this.preLoader;

        /*protonRenderer.onProtonUpdate = function() {

        };
        protonRenderer.onParticleCreated = function(particle) {
            var particleSprite = new PIXI.Sprite(particle.target);
            particle.sprite = particleSprite;
            this.preLoader.addChild(particle.sprite);
        };

        protonRenderer.onParticleUpdate = function(particle) {
            transformSprite(particle.sprite, particle);
        };

        protonRenderer.onParticleDead = function(particle) {
            this.preLoader.removeChild(particle.sprite);
        };

        protonRenderer.start();*/

        /*function createProton() {
            var foodTexture = Loader.resources["http://localhost:63342/Client-HTML5/Content/Theme/GameHTML5/images/Foods.json"].textures;
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
        }*/
    }

    PreLoader.prototype.onEnterFrame = function() {
        if(this.proton)
            this.proton.update();
    }

    PreLoader.prototype.onButtonDown = function(event){
        compoNotify.test();
    }

    return PreLoader;
});