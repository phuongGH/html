/**
 * Created by phuongtv on 1/12/2016.
 */
define(function(require) {


    var ResourceName = require('../ResourceName');
    /*
     * Tạo các thiết lập cho nút.
     * Hình ảnh các trạng thái nút nhấn , bình thường, khi rê chuột lên
     * định dạng font chữ, màu sắc chữ khi nút ở các trạng thái bình thường, nhấn, rê chuột
     *
     * @class
     */
    function ButtonOption() {

        this.textureButtonUp = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN+"Up.png"];
        this.textureButtonOver = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN+"Over.png"];
        this.textureButtonDown = window.PIXI.loader.resources[ResourceName.ATLAS_BUTTON].textures[ResourceName.BTN_DEFAULT_GREEN+"Down.png"];

    };

    /**
     * Cập nhật hình ảnh cho các trạng thái của nút (phải đảm bảo trong atlas có đủ 3 trạng thái Up.png, Down.png, Over.png)
     *
     * @public
     * @param atlasName {String} tên atlas chứa ảnh
     * @param textureName {String}tên ảnh sau khi đã loại bỏ hậu tố "Up.png, Over.png, Down.png"
     */
    ButtonOption.prototype.setButtonTexture = function(atlasName,textureName){
        this.textureButtonUp = window.PIXI.loader.resources[atlasName].textures[textureName+"Up.png"];
        this.textureButtonOver = window.PIXI.loader.resources[atlasName].textures[textureName+"Over.png"];
        this.textureButtonDown = window.PIXI.loader.resources[atlasName].textures[textureName+"Down.png"];
    };

    Object.defineProperties(ButtonOption.prototype, {
        /**
         * hình ảnh khi nút ở trạng thái bình thường
         *
         * @private
         * @member {PIXI.texture}
         * @memberof ButtonOption#
         */
        textureButtonUp: {
            value: null,
            writable: true
        },

        /**
         * hình ảnh khi nút ở trạng thái được nhấn
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textureButtonDown: {
            value: null,
            writable: true
        },

        /**
         * hình ảnh khi nút ở trạng thái rê chuột lên
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textureButtonOver: {
            value: null,
            writable: true
        },

        //textures: {
        //    value: null,
        //    writable: true
        //},

        /**
         * font chữ khi nút ở trạng thái bình thường
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textStyleUp: {
            value: {
                font : '14pt Arial',
                fill : '#FFFFFF',
            },
            writable: true
        },

        /**
         * font chử khi nút ở trạng thái được nhấn
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
        textStyleDown: {
            value: {
                font : '14pt Arial',
                fill : '#FFFF92',
            },
            writable: true
        },

        /**
         * font chử khi nút ở trạng thái rê chuột lên
         *
         * @private
         * @member {PIXI.texture}
         * @memberof Button#
         */
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