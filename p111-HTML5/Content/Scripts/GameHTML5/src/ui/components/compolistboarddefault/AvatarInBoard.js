/**
 * Created by hungtd on 1/15/2016.
 */
define(function (require) {


    var CompoPUBAvatar  = require("CompoPUBAvatar");
    var StarOwner_mc    = require("StarOwner_mc");
    var UILoader        = PIXI.Sprite;
    var TextField       = PIXI.Text;

    //contruc
    AvatarInBoard.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    AvatarInBoard.prototype.constructor = AvatarInBoard;

    //static var



    Object.defineProperties(AvatarInBoard.prototype, {

        uiImage_UILoader: {
            value: null,
            writable: true
        },

        PUBAvatar_CompoPUBAvatar: {
            value: null,
            writable: true
        },

        UserId_Num: {
            value: 0,
            writable: true
        },

        txtNickName_Text: {
            value: null,
            writable: true
        },

        maxPlayer_Num: {
            value: 0,
            writable: true
        },

        starOwner_mc_StarOwner_mc: {
            value: null,
            writable: true
        },

        MyUserType_Num: {
            value: null,
            writable: true
        },

        IsOwner: {
            value: false,
            writable: true
        },

        _position_Num:{
            value: 0,
            writable: true
        },

        _gameLoader:{
            value: null,
            writable: true
        },

        Position_Num: {
            get: function () { return _position_Num },
            set: function (value) {
                _position_Num = value;
                switch(maxPlayer_Num)
                {
                    case 2:
                        switch (value)
                        {
                            case 1:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 40;
                                break;
                            case 2:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 20;
                                break;
                        }
                        break;
                    case 4:
                        switch (value)
                        {
                            case 1:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 40;
                                break;
                            case 2:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 30;
                                break;
                            case 3:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 20;
                                break;
                            case 4:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 30;
                                break;
                        }
                        break;
                    case 5:
                        switch (value)
                        {
                            case 1:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 40;
                                break;
                            case 2:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 30;
                                break;
                            case 3:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 20;
                                break;
                            case 4:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 20;
                                break;
                            case 5:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 30;
                                break;
                        }
                        break;
                    case 6:
                        switch (value)
                        {
                            case 1:
                                _starOwner_mc_StarOwner_mc = 45;
                                _starOwner_mc_StarOwner_mc.y = 40;
                                break;
                            case 2:
                            case 3:
                                _starOwner_mc_StarOwner_mc.x = 45;
                                _starOwner_mc_StarOwner_mc.y = 20;
                                break;
                            case 4:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 20;
                                break;
                            case 5:
                            case 6:
                                _starOwner_mc_StarOwner_mc.x = -15;
                                _starOwner_mc_StarOwner_mc.y = 30;
                                break;
                        }
                        break;
                    case 9:
                        if (_gameLoader.global.gameID == GlobalConstants.PokerGameId)
                        {
                            switch (value)
                            {
                                case 1:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 2:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 3:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 4:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 5:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 30;
                                    break;
                                case 6:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 30;
                                    break;
                                case 7:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 8:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 9:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                            }
                        }
                        else
                        {
                            switch (value)
                            {
                                case 1:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 2:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 3:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 4:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 5:
                                    _starOwner_mc_StarOwner_mc.x = 45;
                                    _starOwner_mc_StarOwner_mc.y = 30;
                                    break;
                                case 6:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 30;
                                    break;
                                case 7:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 8:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                                case 9:
                                    _starOwner_mc_StarOwner_mc.x = -15;
                                    _starOwner_mc_StarOwner_mc.y = 40;
                                    break;
                            }
                        }
                        break;
                }
            }
        },

    });

    function AvatarInBoard(gameLoader) {
        Container.call(this);
        this._gameLoader = gameLoader;

    }
    AvatarInBoard.prototype._init= function()
    {
        _uiImage_UILoader = new UILoader();
        _uiImage_UILoader.x = 0;
        _uiImage_UILoader.y = 18.55;
        _uiImage_UILoader.width = _uiImage_UILoader.height = 40;
        this.addChild(_uiImage_UILoader);

        _PUBAvatar_CompoPUBAvatar = new CompoPUBAvatar();
        _PUBAvatar_CompoPUBAvatar.x = -13.1;
        _PUBAvatar_CompoPUBAvatar.y = -7.4;
        _PUBAvatar_CompoPUBAvatar.width = 75;
        _PUBAvatar_CompoPUBAvatar.height = 85.75;
        this.addChild(_PUBAvatar_CompoPUBAvatar);

        _txtNickName_Text = new TextField();
        _txtNickName_Text.x = -13;
        _txtNickName_Text.y = 0;
        _txtNickName_Text.width = 68.1;
        _txtNickName_Text.height = 29.5;
        this.addChild(_txtNickName_Text);

        _position_Num =1;

        _starOwner_mc_StarOwner_mc = new StarOwner_mc();
        this.addChild(_starOwner_mc_StarOwner_mc);
    };

    return AvatarInBoard;
});