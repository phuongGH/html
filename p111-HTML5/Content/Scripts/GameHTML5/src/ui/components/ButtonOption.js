/**
 * Created by phuongtv on 1/12/2016.
 */
define(function(require) {


    //var ResourceName = require('../ResourceName');

    function ButtonOption() {

        this.textureButtonUp = ResourceManager.Atlas.AtlasButton.textures.BTN_DefaultGreenUp;
        this.textureButtonOver = ResourceManager.Atlas.AtlasButton.textures.BTN_DefaultGreenOver;
        this.textureButtonDown = ResourceManager.Atlas.AtlasButton.textures.BTN_DefaultGreenDown;

    };


    ButtonOption.prototype.setButtonTexture = function(upTexture,overTexture, downTexture){
        if(upTexture === undefined){
            return;
        }
        if(overTexture === undefined)
            overTexture = upTexture;
        if(downTexture === undefined)
            downTexture = upTexture;
        this.textureButtonUp = upTexture;
        this.textureButtonOver = overTexture;
        this.textureButtonDown = downTexture;
    };

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonUp: {
            value: null,
            writable: true
        },
        textureButtonDown: {
            value: null,
            writable: true
        },
        textureButtonOver: {
            value: null,
            writable: true
        },
        textures: {
            value: null,
            writable: true
        },
        textStyleUp: {
            value: {
                font : '14pt Arial',
                fill : '#FFFFFF',
            },
            writable: true
        },
        textStyleDown: {
            value: {
                font : '14pt Arial',
                fill : '#FFFF92',
            },
            writable: true
        },
        textStyleOver: {
            value: {
                font : '14pt Arial',
                fill : '#FFFF92',
            },
            writable: true
        }

    });

    return ButtonOption;
});