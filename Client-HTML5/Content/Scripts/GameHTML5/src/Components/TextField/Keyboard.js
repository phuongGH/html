/**
 * Created by phuongtv on 1/25/2016.
 */
function Keyboard() {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
        if (key.isUp && key.press) key.press(event);
        key.isDown = true;
        key.isUp = false;
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (key.isDown && key.release) key.release(event);
        key.isDown = false;
        key.isUp = true;
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}