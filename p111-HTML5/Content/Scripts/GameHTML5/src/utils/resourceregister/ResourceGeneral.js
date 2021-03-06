/**
 * Created by MegaMan on 1/28/2016.
 */
'use strict';
define(function () {
    ResourceGeneral.prototype = Object.create(Object.prototype);
    ResourceGeneral.prototype.constructor = ResourceGeneral;

    Object.defineProperties(ResourceGeneral.prototype, {});

    function ResourceGeneral() {
        throw new Error('Cannot instance this class');
    }

    ResourceGeneral.registerResource = function() {
        ResourceManager.Atlas = {
            AtlasButton: {
                name: 'AtlasButton',
                url: '',
                textures: {
					BTN_CloseDown: null,
					BTN_CloseOver: null,
					BTN_CloseRoundDown: null,
					BTN_CloseRoundUp: null,
					BTN_CloseRoundOver: null,
					BTN_CloseUp: null,
					BTN_DefaultGreenDown: null,
					BTN_DefaultGreenOver: null,
					BTN_DefaultGreenUp: null,
					BtnCheckDown: null,
					BtnCheckOver: null,
					BtnCheckUp: null
                }
            },
			AtlasCompoClock: {
                name: 'AtlasCompoClock',
                url: '',
                textures: {
					CompoClockImage_: []
                }
            },
			AtlasCompoPubAvatar: {
                name: 'AtlasCompoPubAvatar',
                url: '',
                textures: {
					Star_: [],
					Vip_: [],
					Flag: null,
					noimage: null
                }
            },
			AtlasEmoticon_11_15: {
                name: 'AtlasEmoticon_11_15',
                url: '',
                textures: {
					e14_: [],
					e15_: [],
					e12_: [],
					e13_: [],
					e11_: []
                }
            },
			AtlasEmoticon_16_20: {
                name: 'AtlasEmoticon_16_20',
                url: '',
                textures: {
					e18_: [],
					e19_: [],
					e20_: [],
					e17_: [],
					e16_: []
                }
            },
			AtlasEmoticon_1_5: {
                name: 'AtlasEmoticon_1_5',
                url: '',
                textures: {
					e4_: [],
					e5_: [],
					e2_: [],
					e1_: [],
					e3_: []
                }
            },
			AtlasEmoticon_21_25: {
                name: 'AtlasEmoticon_21_25',
                url: '',
                textures: {
					e23_: [],
					e22_: [],
					e21_: [],
					e25_: [],
					e24_: []
                }
            },
			AtlasEmoticon_26_30: {
                name: 'AtlasEmoticon_26_30',
                url: '',
                textures: {
					e28_: [],
					e29_: [],
					e26_: [],
					e27_: [],
					e30_: []
                }
            },
			AtlasEmoticon_6_10: {
                name: 'AtlasEmoticon_6_10',
                url: '',
                textures: {
					e10_: [],
					e8_: [],
					e6_: [],
					e7_: [],
					e9_: []
                }
            },
			AtlasEmotionList: {
                name: 'AtlasEmotionList',
                url: '',
                textures: {
					e_: []
                }
            },
			AtlasLevelStar: {
                name: 'AtlasLevelStar',
                url: '',
                textures: {
					StarLevel: []
                }
            },
			AtlasLoadingDefault: {
                name: 'AtlasLoadingDefault',
                url: '',
                textures: {
					LoadingBGDefault: null,
					LoadingBarBGDefault: null,
					LoadingBarProgressDefault: null
                }
            },
			AtlasLoadingDefault_1: {
                name: 'AtlasLoadingDefault_1',
                url: '',
                textures: {
					LoadingBGDefault: null,
					LoadingBarBGDefault: null,
					LoadingBarProgressDefault: null
                }
            },
			AtlasLoadingDefault_2: {
                name: 'AtlasLoadingDefault_2',
                url: '',
                textures: {
					LoadingBGDefault: null,
					LoadingBarBGDefault: null,
					LoadingBarProgressDefault: null
                }
            },
			AtlasLoadingDefault_3: {
                name: 'AtlasLoadingDefault_3',
                url: '',
                textures: {
					LoadingBGDefault: null,
					LoadingBarBGDefault: null,
					LoadingBarProgressDefault: null
                }
            },
			AtlasLoadingDefault_4: {
                name: 'AtlasLoadingDefault_4',
                url: '',
                textures: {
					LoadingBGDefault: null,
					LoadingBarBGDefault: null,
					LoadingBarProgressDefault: null
                }
            },
			AtlasLoadingDefault_5: {
                name: 'AtlasLoadingDefault_5',
                url: '',
                textures: {
					LoadingBGDefault: null,
					LoadingBarBGDefault: null,
					LoadingBarProgressDefault: null
                }
            },
			AtlasOwnerStar: {
                name: 'AtlasOwnerStar',
                url: '',
                textures: {
					OwnerStar: []
                }
            },
			AtlasPopupIcon: {
                name: 'AtlasPopupIcon',
                url: '',
                textures: {
					IconAsset: null,
					IconBangHoi: null,
					IconBoardBlackList: null,
					IconCastMoney: null,
					IconInviteFriend: null,
					IconLockChatLock: null,
					IconLockChatRelease: null,
					IconStandUp: null,
					IconUserInfo: null
                }
            }
        };
    };

    return ResourceGeneral;
});
