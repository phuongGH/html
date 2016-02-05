/**
 * Created by phund on 21/01/2016.
 */
define(function(require)
{
    //Define libs
    //var PIXI = require('http://localhost:63342/Test/Content/Scripts/GameHTML5/lib/pixi.min.js');
    //Define const

    //Define private variable
    // var _this;

    //Define public variable

    //Define Layers

    //Define Contructor
    function EmoticonMC(parent)
    {
        //_this = this;
        this.userInGame = parent;
        PIXI.Container.call(this);   //This is code for inheritance
        this.on('added', _onAddedToParent);

    };
    EmoticonMC.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    EmoticonMC.prototype.constructor = EmoticonMC;
    //Define Property



    //Define Function
    EmoticonMC.prototype.playEmotion = function(_emotionName){
        console.log('playEmotion');
        this.visible = true;
        this.userInGame.avatarLoader.visible = false;

        var atlas;
        var emoticonNum = parseInt(_emotionName);
        if(emoticonNum < 6) {
            atlas = this.atlas1_5;
        }
        else if(emoticonNum < 11){
            atlas = this.atlas6_10;
        }
        else if(emoticonNum < 16){
            atlas = this.atlas11_15;
        }
        else if(emoticonNum < 21){
            atlas = this.atlas16_20;
        }
        else if(emoticonNum < 26){
            atlas = this.atlas21_25;
        }
        else
        {
            atlas = this.atlas26_30;
        }
        var textureArr = atlas['e'+emoticonNum +'_'];
        /* var num = 100;
        if(emoticonNum == 3)
            num = 40;
        for(var i = 0; i< num; i++){
            if(i < 10) {
                //console.log(emoticonNum + '_00' + i + '.png');
                textureArr.push(atlas[emoticonNum + '_00' + i + '.png']);
            }else {
                //console.log(emoticonNum + '_0' + i + '.png');
                textureArr.push(atlas[emoticonNum + '_0' + i + '.png']);
            }
        }*/

        //console.log('textureArr[0] instanceof PIXI.Texture: ' + (textureArr[0] instanceof PIXI.Texture));
        this.emotionMovie.textures = textureArr;
        this.emotionMovie.gotoAndPlay(1);
    }

    EmoticonMC.prototype.init = function(){
        this.atlas1_5 = ResourceManager.Atlas.AtlasEmoticon_1_5.textures;
        this.atlas6_10 = ResourceManager.Atlas.AtlasEmoticon_6_10.textures;
        this.atlas11_15 = ResourceManager.Atlas.AtlasEmoticon_11_15.textures;
        this.atlas16_20 = ResourceManager.Atlas.AtlasEmoticon_16_20.textures;
        this.atlas21_25 = ResourceManager.Atlas.AtlasEmoticon_21_25.textures;
        this.atlas26_30 = ResourceManager.Atlas.AtlasEmoticon_26_30.textures;
        this.emotionMovie = new PIXI.extras.MovieClip([PIXI.Texture.EMPTY]);
        this.emotionMovie.animationSpeed = 0.3;
        this.emotionMovie.onComplete = this._onComplete.bind(this);
        this.emotionMovie.loop = false;
        this.addChild(this.emotionMovie);
    }
    //Define private function
    EmoticonMC.prototype._onComplete = function(){
        //console.log(this.emotionMovie.currentFrame);

        if(this.emotionMovie.currentFrame == this.emotionMovie.totalFrames - 1){
            this.visible = false;
            this.userInGame.avatarLoader.visible = true;
            this.emotionMovie.stop();
        }
        else{
            this.emotionMovie.gotoAndPlay(1);
        }
    }

    function _onAddedToParent(parent){
        this.init();
    }
    return EmoticonMC;
});