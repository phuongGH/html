/**
 * Created by phuongtv on 1/19/2016.
 */
define(function(require) {
    //Import

    var PIXI = require('../lib/pixi.min');
    var ButtonOption = require('../Components/ButtonOption');
    var Button = require('../Components/Button');
    var ResourceName = require('ResourceName');


    function PreLoader() {
        PIXI.Container.call(this);
        window.PIXI = PIXI;
        this.on('added', this._onAddedToParent);
    };

    PreLoader.prototype = Object.create(PIXI.Container.prototype);
    PreLoader.prototype.constructor = PreLoader;


    PreLoader.prototype._onAddedToParent = function(parent){
        PIXI.loader.add(ResourceName.ATLAS_BUTTON,"http://localhost:63342/pixi-button/images/AtlasButton.json")
            .load(this._onLoadingComplete.bind(this));
    }


    PreLoader.prototype._onLoadingComplete = function(){

        var textureButton = PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures;


        var btn1 = new Button();
        btn1.position.x = 300;
        btn1.text = "OK aaa";
        this.addChild(btn1);

        var btnOption = new ButtonOption();
        var btn3 = new Button(btnOption);
        btn3.position.x = 300;
        btn3.position.y = 80;
        btn3.text = "OK bbb";
        this.addChild(btn3);

        btnOption.setButtonTexture(ResourceName.ATLAS_BUTTON,ResourceName.BTN_CHECK);
        var btn2 = new Button(btnOption);
        btn2.position.x = 500;
        this.addChild(btn2);
        btn2.text = "OK cccc";

    }

    return PreLoader;
});