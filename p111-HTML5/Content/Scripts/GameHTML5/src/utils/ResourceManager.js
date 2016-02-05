/**
 * Created by datnt on 1/19/2016.
 */
'use strict';
define(function (require) {
    var Utilities = require("utils/utilities/Utilities");
    var ResourceGeneral = require("utils/resourceregister/ResourceGeneral");
    var ResourceGame = require('ResourceGame');
    var loader = PIXI.loader;

    var pathToResourceAtlas = PreLoaderConfig.PathToResource + 'atlas/';
    var pathToResourceSound = PreLoaderConfig.PathToResource + 'sounds/';
    var endByNumberExpression = /\d+$/;

    ResourceManager.prototype = Object.create(Object.prototype);
    ResourceManager.prototype.constructor = ResourceManager;

    Object.defineProperties(ResourceManager.prototype, {});

    function ResourceManager() {
        Object.call(this);
    }

    ResourceManager.loadResourceLoading = function(onLoadResourceLoadingComplete){
        var fileInfo = {}, resourceArray = [], resourceObject;
        for(var i = 0; i < PreLoaderConfig.ResourceLoading.length; i++) {
            Utilities.String.getExtension(PreLoaderConfig.ResourceLoading[i], fileInfo);
            if (fileInfo.extension == 'json') {
                resourceObject = {
                    name: fileInfo.fileName,
                    url: pathToResourceAtlas + PreLoaderConfig.ResourceLoading[i],
                    onComplete: _onLoadingResourceComplete.bind(this)
                };

                resourceArray.push(resourceObject);
            }
        }

        loader.add(resourceArray).load(onLoadResourceLoadingComplete);
    };

    ResourceManager.loadResource = function(onLoadResourceProgress, onLoadResourceComplete){
        var fileInfo = {}, resourceArray = [], resourceObject, i;
        for(i = 0; i < PreLoaderConfig.ResourceGeneral.length; i++){
            Utilities.String.getExtension(PreLoaderConfig.ResourceGeneral[i], fileInfo);
            if (fileInfo.extension == 'json') {
                resourceObject = {
                    name: fileInfo.fileName,
                    url: pathToResourceAtlas + PreLoaderConfig.ResourceGeneral[i],
                    onComplete: _onLoadingResourceComplete.bind(this)
                };

                resourceArray.push(resourceObject);
            }
        }

        for(i = 0; i < PreLoaderConfig.ResourceGameApp.length; i++){
            Utilities.String.getExtension(PreLoaderConfig.ResourceGameApp[i], fileInfo);
            if (fileInfo.extension == 'json') {
                resourceObject = {
                    name: fileInfo.fileName,
                    url: pathToResourceAtlas + PreLoaderConfig.ResourceGameApp[i],
                    onComplete: _onLoadingResourceComplete.bind(this)
                };

                resourceArray.push(resourceObject);
            }
        }

        loader.reset();
        loader.add(resourceArray).on("progress", onLoadResourceProgress).load(onLoadResourceComplete);
    };

    function  _onLoadingResourceComplete(resource){
        if(resource.error == null)
        {
            //console.log('Loaded Atlas ' + resource.name + ' with url ' + resource.url);

            if(resource.textures !== undefined) {
                var atlasObject = ResourceManager.Atlas[resource.name];

                if (atlasObject === undefined)
                    console.log('Atlas ' + resource.name + ' has not been set in resource register');
                else {
                    atlasObject.url = resource.url;

                    var i;
                    var isContinuousTexture;
                    var continuousIndex;
                    var continuousTextureNameList = [];
                    var textureName;
                    var keys = Object.keys(resource.textures);

                    for (i = 0; i < keys.length; i++) {
                        textureName = keys[i].substring(0, keys[i].lastIndexOf('.'));
                        isContinuousTexture = endByNumberExpression.test(textureName);
                        continuousIndex = endByNumberExpression.exec(textureName);

                        textureName = isContinuousTexture ? textureName.replace(endByNumberExpression, '') : textureName;

                        if (atlasObject.textures[textureName] === undefined)
                            console.log('Texture ' + keys[i].substring(0, keys[i].lastIndexOf('.')) + ' in atlas ' + resource.name + ' has not been set in resource register');
                        else {
                            if(isContinuousTexture) {
                                resource.textures[keys[i]].continuousIndex = continuousIndex[0];
                                atlasObject.textures[textureName].push(resource.textures[keys[i]]);

                                if(continuousTextureNameList.indexOf(atlasObject.textures[textureName]) == -1)
                                    continuousTextureNameList.push(atlasObject.textures[textureName]);
                            }
                            else
                                atlasObject.textures[textureName] = resource.textures[keys[i]];

                            //console.log('Builded texture ' + keys[i]);
                        }
                    }

                    for (i = 0; i < continuousTextureNameList.length; i++) {
                        continuousTextureNameList[i].sort(function(a,b){return a.continuousIndex - b.continuousIndex;});
                    }
                }
            }
        }
        else {
            console.log(resource.name + ' with url ' + resource.url + ' not found');
        }
    }

    global.ResourceManager = ResourceManager;

    ResourceGeneral.registerResource();
    ResourceGame.registerResource();

    return ResourceManager;
});