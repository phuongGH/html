/**
 * Created by datnt on 1/18/2016.
 */
'use strict';
define(function(require){
    var gameConfig = {};
    switch (document.getElementById('gameContainer').getAttribute('data-gameID')) {
        case '40':
            gameConfig = require('./TLMNConfig');
            break;
        default:
            console.log('GameID ' + document.getElementById('gameContainer').getAttribute('data-gameID') + ' is not exist');
            break;
    }

    var rootURL = 'http://localhost:63342/';

    var PreLoaderConfig = {
        PathToWebRoot: rootURL,
        PathToLibCode: rootURL + 'P111-HTML5/Content/Scripts/GameHTML5/lib/',
        PathToSrcCode: rootURL + 'P111-HTML5/Content/Scripts/GameHTML5/src/',
        PathToLibTheme: rootURL + 'P111-HTML5/Content/Theme/GameHTML5/',
        PathToResource: rootURL + 'P111-HTML5/Content/Scripts/GameHTML5/lib/resources/default/',
        PathToLoadingClass: 'ui/screens/LoadingScreen',                                                                 //can be overwrite by gameConfig to use special loading screen
        PathToResourceGameClass: '',                                                                                    //will be overwrite by gameconfig

        GameID: 0,                                                                                                      //will be overwrite by gameconfig
        ServerAndPort: '',                                                                                              //will be overwrite by gameconfig
        AppRealWidth: 1000,
        AppRealHeight: 670,

        FontResource: {                                                                                                 //can be overwrite by gameConfig to set font special for game
            SedonaScript: {
                name: "sedonascript",
                src: 'sedonascriptflf.ttf',
                type: 0
            },
            Yummy: {
                name: "A Yummy Apology",
                src: 'A Yummy Apology.fnt',
                type: 1
            }
        },

        ResourceLoading: ['AtlasLoadingDefault.json'],                                                                  //can be overwrite by gameConfig to use special loading screen
        ResourceGeneral: [                                                                                              //don't overwrite by gameConfig, use ResourceGameApp to set resource for game
            'AtlasLoadingDefault_1.json',
            'AtlasLoadingDefault_2.json',
            'AtlasLoadingDefault_3.json',
            'AtlasLoadingDefault_4.json',
            'AtlasLoadingDefault_5.json',
            'AtlasButton.json',
            'AtlasCompoClock.json',
            'AtlasEmoticon_11_15.json',
            'AtlasEmoticon_16_20.json',
            'AtlasEmoticon_1_5.json',
            'AtlasEmoticon_21_25.json',
            'AtlasEmoticon_26_30.json',
            'AtlasEmoticon_6_10.json',
            'AtlasEmotionList.json',
            'AtlasLevelStar.json',
            'AtlasOwnerStar.json',
            'AtlasPopupIcon.json',
            'AtlasCompoPubAvatar.json'
        ],
        ResourceGameApp: []                                                                                             //can be overwrite by gameConfig to set resource special for game
    };

    Object.assign(PreLoaderConfig, gameConfig);                                                                         //gameConfig can overwrite any property of PreloaderConfig or add more property config

    global.PreLoaderConfig = PreLoaderConfig;

    return PreLoaderConfig;
});