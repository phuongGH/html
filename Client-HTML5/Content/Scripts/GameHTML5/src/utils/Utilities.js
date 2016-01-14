define(function() {
    function Utilities() {

    }

    Utilities.prototype.constructor = Utilities;

    Object.defineProperties(Utilities.prototype, {

    });

    Utilities.contain = function(sprite, container) {
        //Create a `Set` called `collision` to keep track of the
        //boundaries with which the sprite is colliding
        var collision = {hasCollision: false, left: false, top: false, right: false, bottom: false };
        //Left
        //If the sprite's x position is less than the container's x position,
        //move it back inside the container and add "left" to the collision Set
        if (sprite.x < container.x) {
            sprite.x = container.x;
            collision.left = true;
        }
        //Top
        if (sprite.y < container.y) {
            sprite.y = container.y;
            collision.top = true;
        }
        //Right
        if (sprite.x + sprite.width > container.width) {
            sprite.x = container.width - sprite.width;
            collision.right = true;
        }
        //Bottom
        if (sprite.y + sprite.height > container.height) {
            sprite.y = container.height - sprite.height;
            collision.bottom = true;
        }
        //If there were no collisions, set `collision` to `undefined`
        //if (collision.size === 0) collision = undefined;
        collision.hasCollision = collision.left || collision.top || collision.right || collision.bottom;

        //Return the `collision` value
        return collision;
    };

    Utilities.detectIE = function() {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    return Utilities;
});


