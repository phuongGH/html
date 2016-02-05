/**
 * Created by datnt on 1/18/2016.
 */
'use strict';
define(function(){
    return {
        PathToLoadingClass: 'games/tlmn/ui/screens/LoadingScreen',
        PathToResourceGameClass: 'utils/resourceregister/ResourceTLMN',
        GameID: 40,
        ServerAndPort: '192.168.1.60:9997',
        ResourceLoading: ['tlmn/AtlasLoadingTLMN.json'/*, 'backgroundMusicMenuGame.mp3'*/],
        ResourceGameApp: [
            'tlmn/AtlasLoadingTLMN_1.json',
            'tlmn/AtlasLoadingTLMN_2.json',
            'tlmn/AtlasLoadingTLMN_3.json',
            'tlmn/AtlasLoadingTLMN_4.json',
            'tlmn/AtlasLoadingTLMN_5.json'
        ]
    };
});