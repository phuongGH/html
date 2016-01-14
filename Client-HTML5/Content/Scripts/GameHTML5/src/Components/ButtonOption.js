/**
 * Created by phuongtv on 1/12/2016.
 */
define(function(require) {

    ButtonOption.BUTTON_DEFAULT_GREEN = 1;
    ButtonOption.BUTTON_IMAGES = 2;
    //ButtonOption.BUTTON_CLOSE1 = 3;

    function ButtonOption() {

    };

    Object.defineProperties(ButtonOption.prototype, {
        type: {
            value: 1,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonUp: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonDown: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textureButtonOver: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        textures: {
            value: null,
            writable: true
        }
    });

    Object.defineProperties(ButtonOption.prototype, {
        text: {
            value: "",
            writable: true
        }
    });


    return ButtonOption;
});