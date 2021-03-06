/**
 * Created by MegaMan on 1/28/2016.
 */
'use strict';
define(function (require) {
    ResourceTLMN.prototype = Object.create(Object.prototype);
    ResourceTLMN.prototype.constructor = ResourceTLMN;

    Object.defineProperties(ResourceTLMN.prototype, {});

    function ResourceTLMN() {
        throw new Error('Cannot instance this class');
    }

    ResourceTLMN.registerResource = function() {
        Object.assign(ResourceManager.Atlas, {
            AtlasLoadingTLMN: {
                name: 'AtlasLoadingTLMN',
                url: '',
                textures: {
					LoadingBGTLMN: null,
					LoadingBarBGTLMN: null,
					LoadingBarProgressTLMN: null
                }
            },
			AtlasLoadingTLMN_1: {
                name: 'AtlasLoadingTLMN_1',
                url: '',
                textures: {
					LoadingBGTLMN: null,
					LoadingBarBGTLMN: null,
					LoadingBarProgressTLMN: null
                }
            },
			AtlasLoadingTLMN_2: {
                name: 'AtlasLoadingTLMN_2',
                url: '',
                textures: {
					LoadingBGTLMN: null,
					LoadingBarBGTLMN: null,
					LoadingBarProgressTLMN: null
                }
            },
			AtlasLoadingTLMN_3: {
                name: 'AtlasLoadingTLMN_3',
                url: '',
                textures: {
					LoadingBGTLMN: null,
					LoadingBarBGTLMN: null,
					LoadingBarProgressTLMN: null
                }
            },
			AtlasLoadingTLMN_4: {
                name: 'AtlasLoadingTLMN_4',
                url: '',
                textures: {
					LoadingBGTLMN: null,
					LoadingBarBGTLMN: null,
					LoadingBarProgressTLMN: null
                }
            },
			AtlasLoadingTLMN_5: {
                name: 'AtlasLoadingTLMN_5',
                url: '',
                textures: {
					LoadingBGTLMN: null,
					LoadingBarBGTLMN: null,
					LoadingBarProgressTLMN: null
                }
            }
        });
    };

    return ResourceTLMN;
});
