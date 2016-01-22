/**
 * Created by phuongtv on 1/12/2016.
 */
define(function(require) {


    var ResourceName = require('../ResourceName');

    function ButtonOption() {

        this.textureButtonUp = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN+"Up.png"];
        this.textureButtonOver = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN+"Over.png"];
        this.textureButtonDown = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN+"Down.png"];

    };


    ButtonOption.prototype.setButtonTexture = function(atlasName,textureName){
        this.textureButtonUp = window.PIXI.loader.resources[atlasName].textures[textureName+"Up.png"];
        this.textureButtonOver = window.PIXI.loader.resources[atlasName].textures[textureName+"Over.png"];
        this.textureButtonDown = window.PIXI.loader.resources[atlasName].textures[textureName+"Down.png"];
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