/**
 * Created by hungtd on 2/2/2016.
 */
"use strict";
define(function (require) {

    KF.prototype = Object.create(Object.prototype);
    KF.prototype.constructor = KF;

    Object.defineProperties(KF.prototype, {});


    /**
     *
     * @constructor
     */
    function KF() {
        Object.call(this);
        this._init();
    }

    KF.prototype._init = function () {

    }

    KF.prototype.onEnterFrame = function () {

    }

    KF.stage = null;
    KF.socket = null;
    KF.isShowLog = false;

    /**
     *
     * @param {Number} _x
     * @param {Number}_y
     * @param {Number}_width
     * @param {Number}_height
     * @param {Boolean}isAutoAlignAtBottom
     */
    KF.setShowLogSize = function(_x, _y, _width, _height, isAutoAlignAtBottom){
        if(isAutoAlignAtBottom===undefined || isAutoAlignAtBottom === null)
            isAutoAlignAtBottom = false;

       /* var textArea:TextArea = KF.stage.getChildByName("kf-debug_txt") as TextArea;
        if (textArea == null)
            textArea = createLogSprite();

        textArea.width = _width; textArea.height = _height;
        if (isAutoAlignAtBottom)
        {
            textArea.x = 0;
            textArea.y = KF.stage.stageHeight - textArea.height;
        }
        else
        {
            textArea.x = _x; textArea.y = _y;
        }*/

    }

    /**
     *
     * @param {String} message
     * @param {Boolean} isClear
     */
    KF.showLog = function(message, isClear){
        if(isClear===undefined || isClear === null)
            isClear = false;

        if (isShowLog == false)
        {
            return;
        }
      /*  var textArea:TextArea = KF.stage.getChildByName("kf-debug_txt") as TextArea;
        if (textArea == null)
            textArea = createLogSprite();

        if (isClear)
        {
            textArea.text = "";
        }
        textArea.appendText(getCurrentTime() + ": " +message.toString() + "\n");
        textArea.verticalScrollPosition = textArea.maxVerticalScrollPosition;*/
        KF.stage.setChildIndex(textArea, KF.stage.numChildren - 1);
    }

    /**
     * @return {TextArea}textArea
     */
    KF.createLogSprite = function(){
        /*var textArea:TextArea = new TextArea();
        textArea.name = "kf-debug_txt";
        textArea.width = 250; textArea.height = 150;
        textArea.alpha = 0.75;
        textArea.y = KF.stage.stageHeight - textArea.height;
        KF.stage.addChildAt(textArea, KF.stage.numChildren - 1);

        var lblHideLog:Label = new Label();
        lblHideLog.text = "Hide";
        lblHideLog.name = "ToogleLog";
        lblHideLog.autoSize = TextFieldAutoSize.CENTER;
        lblHideLog.width = 30;
        lblHideLog.height = 15;
        lblHideLog.buttonMode = true;
        lblHideLog.mouseChildren = false;

        lblHideLog.graphics.beginFill(0x000000, 0.75);
        lblHideLog.graphics.drawRect(0, 0, lblHideLog.width, lblHideLog.height);
        lblHideLog.graphics.endFill();

        lblHideLog.x = 0;
        lblHideLog.y = -lblHideLog.height;

        lblHideLog.addEventListener(MouseEvent.CLICK, onLblHideLogClicked);

        var lblDrag:Label = new Label();
        lblDrag.text = "Drag";
        lblDrag.name = "DragLog";
        lblDrag.autoSize = TextFieldAutoSize.CENTER;
        lblDrag.width = 30;
        lblDrag.height = 15;
        lblDrag.buttonMode = true;
        lblDrag.mouseChildren = false;

        lblDrag.graphics.beginFill(0x000000, 0.75);
        lblDrag.graphics.drawRect(0, 0, lblDrag.width, lblDrag.height);
        lblDrag.graphics.endFill();

        lblDrag.x = 32;
        lblDrag.y = -lblDrag.height;

        lblDrag.addEventListener(MouseEvent.MOUSE_DOWN, onLblDragDowned);

        textArea.addChild(lblHideLog);
        textArea.addChild(lblDrag);

        return textArea;*/
    }

    /**
     *
     * @param {Event}mouseEvent
     */
    KF.onLblHideLogClicked =function(mouseEvent){
        /*var textArea:TextArea = KF.stage.getChildByName("kf-debug_txt") as TextArea;
        var lblHideLog:Label = textArea.getChildByName("ToogleLog") as Label;
        if (textArea.y == KF.stage.stageHeight)
        {
            textArea.y = KF.stage.stageHeight - textArea.height;
            lblHideLog.text = "Hide";
        }
        else
        {
            textArea.y = KF.stage.stageHeight;
            lblHideLog.text = "Show";
        }*/
    }

    /**
     *
     * @param {Event}mouseEvent
     */
    KF.onLblDragDowned =function(mouseEvent){
        /*var textArea:TextArea = KF.stage.getChildByName("kf-debug_txt") as TextArea;
         var lblHideLog:Label = textArea.getChildByName("ToogleLog") as Label;
         if (textArea.y == KF.stage.stageHeight)
         {
         textArea.y = KF.stage.stageHeight - textArea.height;
         lblHideLog.text = "Hide";
         }
         else
         {
         textArea.y = KF.stage.stageHeight;
         lblHideLog.text = "Show";
         }*/
    }

    /**
     *
     * @param {Event}mouseEvent
     */
    KF.onLblDragUped =function(mouseEvent){
        /*var textArea:TextArea = KF.stage.getChildByName("kf-debug_txt") as TextArea;
         var lblHideLog:Label = textArea.getChildByName("ToogleLog") as Label;
         if (textArea.y == KF.stage.stageHeight)
         {
         textArea.y = KF.stage.stageHeight - textArea.height;
         lblHideLog.text = "Hide";
         }
         else
         {
         textArea.y = KF.stage.stageHeight;
         lblHideLog.text = "Show";
         }*/
    }

    /**
     *
     * @return {String} CurrentTime
     */
    KF.getCurrentTime =function(){
        return new Date().toLocaleString();
    }


    /**
     *
     * @param {Number} min
     * @param {Number} max
     * @returns {number}
     */
    KF.randomMinMax =function( min, max){
        return Math.round(min + (max - min) * Math.random());
    }

    global.KF = KF;

    return KF;
});