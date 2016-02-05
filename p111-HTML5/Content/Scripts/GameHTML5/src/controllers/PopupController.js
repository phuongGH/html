/**
 * Created by datnt on 1/25/2016.
 */
'use strict';
define(function (require) {

    //region Popup ID, mỗi Popup sẽ có 1 ID riêng để quản lý
    PopupController.POPUP_ID_NOTIFY = 0;
    //endregion

    PopupController.prototype = Object.create(Object.prototype);
    PopupController.prototype.constructor = PopupController;

    Object.defineProperties(PopupController.prototype, {
        _preLoader: {
            value: null,
            writable: true
        },
        _listPopup: {
            value: null,
            writable: true
        },
        lastPopupShow: {
            value: null,
            writable: true
        },
        overlay: {
            value: null,
            writable: true
        },

        //region List popup private, chỉ những biến popup private
        _popupNotify: {
            value: null,
            writable: true
        },
        //endregion

        //region List popup public, chỉ những biến popup public
        popupNotify: {
            get: function ()
            {
                if(this._popupNotify == null){
                    var popupSetting = this.getPopupSetting();
                    popupSetting.popupWidth = 0;
                    popupSetting.popupHeight = 0;
                    //popupSetting.popupTitleBG = this._preLoader.getBitmapDataTextureOfAtlas(ResourceName.TITLE_REGISTER, 0, ResourceName.ATLAS_TITLE);

                    //this._popupNotify = new PopupNotify(this.preLoader, this, popupSetting);
                    this._popupNotify = new PIXI.Graphics();
                    this._popupNotify.beginFill(0x884633, 1);
                    this._popupNotify.drawRect(0, 0, 100, 100);
                    this._popupNotify.endFill();

                    this._popupNotify.scaleX = AppInfo.appScaleMin;
                    this._popupNotify.scaleY = AppInfo.appScaleMin;
                    this._popupNotify.visible = false;

                    this._preLoader.layerPopup.addChild(this._popupNotify);
                    this._listPopup.push(this._popupNotify);
                }

                return this._popupNotify;
            }
        }
        //endregion
    });

    /**
     * A PopupController
     *
     * @class
     * @extends Object
     * @param preLoader {PreLoader} an array of {@link PreLoader} or frame objects that make up the animation
     */
    function PopupController(preLoader) {
        Object.call(this);

        this._preLoader = preLoader;
        this._listPopup = [];

        this.overlay = new PIXI.Graphics();
        this.overlay.beginFill(0xffffff, 0.5);
        this.overlay.drawRect(0, 0, AppInfo.appRealWidth, AppInfo.appRealHeight);
        this.overlay.endFill();
        this.overlay.visible = false;
        this.overlay.interactive = true;
        this.overlay.mouseclick = this.onOverlayClick.bind(this);

        this._preLoader.layerPopup.addChild(this.overlay);
    }

    //region List function show popup, chỉ những function show popup
    PopupController.prototype.showPopupNotify = function(message, onClose) {
        /*overlay.visible = true;
        overlay.scaleX = preLoader.appInfo.appScaleWidth;
        overlay.scaleY = preLoader.appInfo.appScaleHeight;
        overlay.parent.setChildIndex(overlay, overlay.parent.numChildren - 1);

        if (!overlay.hasEventListener(MouseEvent.CLICK))
            overlay.addEventListener(MouseEvent.CLICK, onOverlayClick);

        var array:Array = TweenLite.getTweensOf(popupNotify);
        for (var i:int = 0; i < array.length; i++)
        {
            (array[i] as TweenLite).progress(1);
        }

        popupNotify.parent.setChildIndex(popupNotify, popupNotify.parent.numChildren - 1);
        popupNotify.showMessage(message, onClose, true, EffectType.SLIDE_IN, new SlideOption(EffectOption.TOP, preLoader.stage.stageHeight));*/
    };

    PopupController.prototype.showPopupNotifyCannotClose = function(message, onClose) {

    };

    PopupController.prototype.showPopupNotifyWithBtnAgree = function(message, onAgree, onClose) {

    };

    PopupController.prototype.showPopupNotifyWithBtnAgreeAndDisagree = function(message, onAgree, onDisagree, onClose) {

    };

    PopupController.prototype.showPopupFoo = function() {
        if (this.lastPopupShow != null && this.lastPopupShow.visible)
            this.lastPopupShow.hide(true, EffectType.SLIDE_OUT, new SlideOption(0, preLoader.stage.fullScreenHeight), 400, onHideLastPopupComplete, [popupFoo, lastPopupShow]);
        else
            this.showPopup(popupFoo);
    };
    //endregion

    PopupController.prototype.onHideLastPopupComplete = function(fPopup, lastPopup) {
        if (lastPopup != fPopup)
            this.showPopup(fPopup);
    };

    PopupController.prototype.showPopup = function(fPopup) {
        /*if (fPopup)
        {
            var array:Array = TweenLite.getTweensOf(fPopup);

            for (var i:int = 0; i < array.length; i++)
            {
                (array[i] as TweenLite).progress(1);
            }
        }

        lastPopupShow = fPopup;
        lastPopupShow.scaleX = lastPopupShow.scaleY = Math.min(preLoader.appInfo.appScaleHeight, preLoader.appInfo.appScaleWidth);

        preLoader.setToCenterScreen(lastPopupShow);
        lastPopupShow.y -= lastPopupShow.setting.poupupTitleY * preLoader.appInfo.appScaleHeight;

        overlay.visible = true;
        overlay.scaleX = preLoader.appInfo.appScaleWidth;
        overlay.scaleY = preLoader.appInfo.appScaleHeight;
        overlay.parent.setChildIndex(overlay, overlay.parent.numChildren - 1);

        if (!overlay.hasEventListener(MouseEvent.CLICK))
            overlay.addEventListener(MouseEvent.CLICK, onOverlayClick);

        fPopup.parent.setChildIndex(fPopup, fPopup.parent.numChildren - 1);
        fPopup.show(true, EffectType.SLIDE_IN, new SlideOption(EffectOption.TOP, preLoader.stage.stageHeight));*/
    };

    PopupController.prototype.onPopupHide = function(popupID) {
        if (popupID != PopupController.POPUP_ID_NOTIFY)
        {
            this.lastPopupShow = null;
        }
    };

    PopupController.prototype.getPopupSetting = function(popupID) {
        //var popupSetting = new FPopupSetting();
        var popupSetting = {};

        return popupSetting;
    };

    PopupController.prototype.onOverlayClick = function(event) {
        console.log(event);
        /*if (this.popupNotify.visible)
         popupNotify.hide(true, EffectType.SLIDE_OUT, new SlideOption(EffectOption.TOP, preLoader.stage.stageHeight), 400, onHidePopupNotify);
         else if (popupSelectFish.visible)
         {
         this.preLoader.requestController.getUserInfo();
         }
         else if (lastPopupShow != null && lastPopupShow.visible)
         {
         lastPopupShow.hide(true, EffectType.SLIDE_OUT, new SlideOption(EffectOption.TOP, preLoader.stage.stageHeight));
         }*/
    };

    PopupController.prototype.onHidePopupNotify = function() {
        /*if (lastPopupShow != null) {
            overlay.parent.setChildIndex(overlay, overlay.parent.numChildren - 1);
            lastPopupShow.parent.setChildIndex(lastPopupShow, lastPopupShow.parent.numChildren - 1);
        }
        else {
            overlay.visible = false;
        }*/
    };

    PopupController.prototype.hideAllPopup = function() {
        var popup;
        for (var i = 0; i < this._listPopup.length; i++) {
            popup = this._listPopup[i];
            if (popup != null && popup.visible)
                popup.hide();
        }
    };

    PopupController.prototype.onEnterFrame = function(deltaTime) {
        if (this.lastPopupShow != null && this.lastPopupShow.visible && this.lastPopupShow.onEnterFrame !== undefined) {
            this.lastPopupShow.onEnterFrame(deltaTime);
        }
    };


    PopupController.prototype.onResize = function(event) {
        if (this._popupNotify != null && this._popupNotify.visible)
        {
            this._popupNotify.scaleX = AppInfo.appScaleMin;
            this._popupNotify.scaleY = AppInfo.appScaleMin;
            AppInfo.setToCenterScreen(_popupNotify);
            this._popupNotify.y -= this._popupNotify.setting.poupupTitleY * AppInfo.appScaleHeight;
        }
    };

    PopupController.prototype.setLastShowingPopupToTopIndex = function() {
        if (this.lastPopupShow != null && this.lastPopupShow.visible)
        {
            this.overlay.parent.setChildIndex(this.overlay, this.overlay.parent.numChildren - 1);
            this.lastPopupShow.parent.setChildIndex(this.lastPopupShow, this.lastPopupShow.parent.numChildren - 1);
        }

        if (this.popupNotify != null && this.popupNotify.visible)
        {
            this.overlay.parent.setChildIndex(this.overlay, this.overlay.parent.numChildren - 1);
            this.popupNotify.parent.setChildIndex(this.popupNotify, this.popupNotify.parent.numChildren - 1);
        }
    };

    PopupController.prototype.updateAvatar = function(avatarURL) {

    };

    PopupController.prototype.updateUserInfo = function(userInfo) {

    };

    return PopupController;
});