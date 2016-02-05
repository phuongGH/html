/**
 * Created by datnt on 1/19/2016.
 */
'use strict';
define(function () {
    var loader = PIXI.loader;

    var pathToResourceFont = PreLoaderConfig.PathToResource + 'fonts/';

    FontLibrary.prototype = Object.create(Object.prototype);
    FontLibrary.prototype.constructor = FontLibrary;

    Object.defineProperties(FontLibrary.prototype, {});

    function FontLibrary() {
        Object.call(this);
    }

    FontLibrary.fonts = PreLoaderConfig.FontResource;

    FontLibrary.loadNormalFontResource = function(onLoadAllFontResourceComplete){
        var fontObject;
        for(var key in PreLoaderConfig.FontResource) {
            if (PreLoaderConfig.FontResource.hasOwnProperty(key)) {
                fontObject = PreLoaderConfig.FontResource[key];
                if (fontObject.type == 0) {
                    _fontResoucreTotalNum += 1;
                    this.loadNormalFont(fontObject.name, pathToResourceFont + fontObject.src, _onLoadFontResourceComple.bind(undefined, onLoadAllFontResourceComplete))
                }
            }
        }
    };

    FontLibrary.loadNormalFont = function(fontName, fontSrc, onComplete, onError){
        var font = new Font();

        if(onComplete !== undefined)
            font.onload = onComplete;
        if(onError !== undefined)
            font.onerror = onError;

        font.fontFamily = fontName;
        font.src = fontSrc;
    };

    FontLibrary.loadBitmapFontResource = function(onLoadAllFontResourceComplete){
        var fontObject;
        for(var key in PreLoaderConfig.FontResource){
            if (PreLoaderConfig.FontResource.hasOwnProperty(key)) {
                fontObject = PreLoaderConfig.FontResource[key];
                if (fontObject.type == 1) {
                    _fontResoucreTotalNum += 1;
                    this.loadBitmapFont(fontObject.name, pathToResourceFont + fontObject.src, _onLoadFontResourceComple.bind(undefined, onLoadAllFontResourceComplete))
                }
            }
        }
    };

    FontLibrary.loadBitmapFont = function(fontName, fontSrc, onComplete, onError){
        loader.add([fontSrc]).on("progress", function(loader, resource){if (resource.error != null && onError !== undefined) onError(resource.error);}).load(onComplete);
    };

    var _fontResoucreLoadedNum = 0;
    var _fontResoucreTotalNum = 0;

    function _onLoadFontResourceComple(_onLoadAllFontResourceComplete){
        _fontResoucreLoadedNum += 1;

        if(_fontResoucreLoadedNum == _fontResoucreTotalNum) {
            _fontResoucreLoadedNum = 0;
            _fontResoucreTotalNum = 0;
            _onLoadAllFontResourceComplete();
        }
    }

    global.FontLibrary = FontLibrary;

    return FontLibrary;
});