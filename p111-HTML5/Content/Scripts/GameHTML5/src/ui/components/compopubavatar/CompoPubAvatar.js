/**
 * Created by linhvt on 2/2/2016.
 */
'use strict';
define(function (require) {
    var GeneralComponent = require("ui/components/GeneralComponent");
    var Sprite = PIXI.Sprite;
    var Loader = PIXI.loaders.Loader;
    var Graphic = PIXI.Graphics;
    var Text = PIXI.Text;
    var Container = PIXI.Container;
    var size = 65;

    CompoPubAvatar.prototype = Object.create(GeneralComponent.prototype);
    CompoPubAvatar.prototype.constructor = CompoPubAvatar;

    Object.defineProperties(CompoPubAvatar.prototype, {
        _background: {
            value: null,
            writable: true
        },
        _txtNickName: {
            value: null,
            writable: true
        },
        _txtCoin: {
            value: null,
            writable: true
        },
        _avatarLoader: {
            value: null,
            writable: true
        },
        _iconVip: {
            value: null,
            writable: true
        },
        _iconLevel: {
            value: null,
            writable: true
        },
        _level: {
            value: null,
            writable: true
        },
        _avatar: {
            value: "",
            writable: true
        },
        _categoryUser: {
            value: null,
            writable: true
        },
        _currency: {
            value: "G",
            writable: true
        },
        _coin: {
            value: 0,
            writable: true
        },
        _imageLoader: {
            value: null,
            writable: true
        }
    });

    Object.defineProperty(CompoPubAvatar.prototype, 'NickName', {
        get: function() {
            return this._txtNickName.text;
        },
        set: function(value) {
            if(value.length > 14)
                value = value.substr(0, 12) + "...";
            this._txtNickName.text = value;
        }
    });

    Object.defineProperty(CompoPubAvatar.prototype, 'Avatar', {
        get: function() {
            return this._avatar;
        },
        set: function(value) {
            if(value == "")
            {
                this._avatar = "";
                this._avatarLoader.texture = this._texture[ResourceManager.Atlas.AtlasCompoPubAvatar.textures.noimage];
                this._avatarLoader.scale.set(1, 1);
            }
            else if(this._avatar != value) {
                this._avatar = value;
                if (this._imageLoader.resouces && !this._imageLoader.resources[this._avatar])
                    this._showAvatar();
                else {
                    this._imageLoader.add(this._avatar).load(this._showAvatar.bind(this));
                }
            }
        }
    });

    Object.defineProperty(CompoPubAvatar.prototype, 'CategoryUser', {
        get: function() {
            return this._categoryUser;
        },
        set: function(value) {
            value =  value < 0 ? 0 : value;
            this._categoryUser = value;
            this._iconVip.texture = ResourceManager.Atlas.AtlasCompoPubAvatar.textures.Vip_[value];
        }
    });

    Object.defineProperty(CompoPubAvatar.prototype, 'Level', {
        get: function() {
            return this._level;
        },
        set: function(value) {
            this._level = value;
            this._drawLevel();
        }
    });

    Object.defineProperty(CompoPubAvatar.prototype, 'Coin', {
        get: function() {
            return this._coin;
        },
        set: function(value) {
            this._coin = value;
            this._txtCoin.text = this._currency + " " + Utilities.Coin(value.toString());
        }
    });

    /**
     *
     * @param preLoader
     * @constructor
     */
    function CompoPubAvatar(preLoader) {
        GeneralComponent.call(this, preLoader);
        this.init();
    }

    /**
     *Create UserInterface of this component
     */
    CompoPubAvatar.prototype.init = function () {
        GeneralComponent.prototype.init.call(this);

        if(this._isDisposed)
        {
            this._isDisposed = false;
            this._background = new Graphic();
            this._background.beginFill(0x96918D, 1);
            this._background.lineStyle(2, 0x292929, 0.5);
            this._background.drawRoundedRect(0, 0, 80, 100, 5);
            this._background.endFill();
            this._background.x = this._background.y = 0;
            this.width = this._background.width = 80;
            this.height = this._background.height = 100;
            this._background.visible = false;
            this.addChild(this._background);

            this._styleNickname = {
                font : 'regular 11pt Arial',
                //fill : '#D4D4D4',
                fill : '#000000',
                wordWrap : true,
                wordWrapWidth : 85
            };

            this._txtNickName = new Text("", this._styleNickname);
            this._txtNickName.x = 2;
            this._txtNickName.y = 0;
            this._txtNickName.visible = false;
            this.addChild(this._txtNickName);

            this._styleCoin = {
                font : 'regular 11pt Arial',
                fill : '#FFFF00',
                wordWrap : true,
                align: 'center',
                wordWrapWidth : 85
            };
            this._txtCoin = new Text("", this._styleCoin);
            this._txtCoin.x = 2;
            this._txtCoin.y = 82;
            this._txtCoin.visible = false;
            this.addChild(this._txtCoin);

            if(this._avatarLoader == null) {
                this._avatarLoader = new Sprite();
                this.addChild(this._avatarLoader);
            }

            if(this._iconLevel == null)
            {
                this._iconLevel = new GeneralComponent();
                this.addChild(this._iconLevel);
                this._iconLevel.visible = false;
            }

            if(this._iconVip == null)
            {
                this._iconVip = new Sprite();
                this.addChild(this._iconVip);
                this._iconVip.visible = false;
            }

            this._imageLoader = new Loader()
            this.mouseover = this._onButtonOver;
            this.mouseout = this._onButtonOut;
            this.buttonMode = true;
            this.interactive = true;
            this.visible = false;
        }
    };

    /**
     *
     * @private
     */
    CompoPubAvatar.prototype._onButtonOver = function()
    {
        this._styleNickname.fill = '#D4D4D4';
        this._txtNickName.style = this._styleNickname;
        this._background.visible = true;
        this._txtCoin.visible = true;
        this._iconVip.visible = true;
        this._iconLevel.visible = true;
    }

    /**
     *
     * @private
     */
    CompoPubAvatar.prototype._onButtonOut = function()
    {
        this._styleNickname.fill = '#000000';
        this._txtNickName.style = this._styleNickname;
        this._background.visible = false;
        this._txtCoin.visible = false;
        this._iconVip.visible = false;
        this._iconLevel.visible = false;
    }

    /**
     *
     * @private
     */
    CompoPubAvatar.prototype._showAvatar = function()
    {
        //Phòng trường hợp đang load avatar mà dispose component
        this._avatarLoader.texture = this._imageLoader.resources[this._avatar].texture;
        var scale = size / Math.max(this._avatarLoader.width, this._avatarLoader.height);
        this._avatarLoader.scale.set(scale, scale);
        this._avatarLoader.x = 2;
        this._avatarLoader.y = this._txtNickName.y + this._txtNickName.height + 5;
        this._iconLevel.x = this._background.width - this._iconLevel.width;
        this._iconLevel.y = this._avatarLoader.y;
    }

    /**
     *
     */
    CompoPubAvatar.prototype.hide = function()
    {
        this.visible = false;
    }

    /**
     *
     */
    CompoPubAvatar.prototype.show = function()
    {
        this.visible = true;
        this._txtNickName.visible = true;

        if(this._avatar != "")
        {
            if(this._imageLoader.resouces && this._imageLoader.resouces[this._avatar])
                this._showAvatar();
            else {
                try {
                    this._imageLoader.add(this._avatar)
                        .load(this._showAvatar.bind(this));
                }
                catch (e) { //Resource hình đã được thêm vào vẫn còn đang load, lúc này Loader.resources rỗng
                    //this._imageLoader.load(this._showAvatar.bind(this));
                }
            }
        }
        else
        {
            this._avatarLoader.texture = ResourceManager.Atlas.AtlasCompoPubAvatar.textures.noimage;
            this._avatarLoader.x = 2;
            this._avatarLoader.y = this._txtNickName.y + this._txtNickName.height + 5;
        }

        this._iconLevel.x = this._background.width - this._iconLevel.width;
        this._iconLevel.y = this._avatarLoader.y;
        if(this._level != 0)
        {
            this._drawLevel();
        }

        this._iconVip.visible = false;
        if(this._categoryUser != null && this._categoryUser != 0)
            this._iconVip.texture = ResourceManager.Atlas.AtlasCompoPubAvatar.textures.Vip_[this._categoryUser];
        else if (this._categoryUser != null)
            this._iconVip.texture = ResourceManager.Atlas.AtlasCompoPubAvatar.textures.Vip_[0];
        this._iconVip.x = 13;
        this._iconVip.y = -28;
    }

    /**
     *
     * @private
     */
    CompoPubAvatar.prototype._drawLevel = function()
    {
        if(!this._iconLevel)
        {
            this._iconLevel = new Container();
            this.addChild(this._iconLevel);
        }
        this._iconLevel.removeChildren();
        var star, child;
        var levelStar = 1;
        var nLevel = this._level;
        var mod = 5;
        var index = (this._level % mod == 0) ? mod : this._level % mod;

        if (nLevel > 50)
        {
            levelStar = 10;
            nLevel = 0;
            index = 5;
        }

        while (nLevel > mod)
        {
            nLevel -= mod;
            levelStar++;
        }

        for (var j = 1; j <= index; j++)
        {
            star = new Sprite(ResourceManager.Atlas.AtlasCompoPubAvatar.textures.Star_[(levelStar * 2 - 1)]);
            if(j != 1) {
                child = this._iconLevel.getChildAt(j - 2);
                star.y = child.y + child.height - 3;
            }
            this._iconLevel.addChild(star);
        }

        for (j = index + 1; j <= mod; j++)
        {
            star = new Sprite(ResourceManager.Atlas.AtlasCompoPubAvatar.textures.Star_["STAR_" + (levelStar * 2)]);
            child = this._iconLevel.getChildAt(j - 2);
            star.y = child.y + child.height - 3;
            this._iconLevel.addChild(star);
        }

        this._iconLevel.x = this._background.width - this._iconLevel.width;
        this._iconLevel.y = this._avatarLoader.y;
    }

    /**
     *Destroy UserInterface of this component
     */
    CompoPubAvatar.prototype.dispose = function () {
        if(!this._isDisposed)
        {
            GeneralComponent.prototype.dispose.call(this);
            this.removeChild(this._background);
            this.removeChild(this._txtNickName);
            this.removeChild(this._txtCoin);
            this.removeChild(this._iconLevel);
            this.removeChild(this._iconVip);
            this.removeChild(this._avatarLoader);

            this._iconLevel.dispose();

            this._background = null;
            this._txtNickName = null;
            this._txtCoin = null;
            this._iconLevel = null;
            this._iconVip = null;
            this._avatarLoader = null;

            //Phòng trường hợp đang load avatar mà dispose component
            this._imageLoader.reset();
        }
    };

    /**
     *Resize all UserInterface of this component IF NEED
     * @param {Window.Event} event
     */
    CompoPubAvatar.prototype.onResize = function (event) {
        GeneralComponent.prototype.onResize.call(this, event);
    };

    /**
     *Use to animate UserInterface of this component IF NEED
     * @param {Number} deltaTime Time has passed in miliseconds
     */
    CompoPubAvatar.prototype.onEnterFrame = function (deltaTime) {
        GeneralComponent.prototype.onEnterFrame.call(this, deltaTime);
    };

    /**
     *Update user infomation of this component IF NEED
     * @param {Ojbect} userInfo User Infomation Object
     */
    CompoPubAvatar.prototype.updateUserInfo = function (userInfo) {
        GeneralComponent.prototype.updateUserInfo.call(this, userInfo);
    };

    return CompoPubAvatar;
});