/**
 * Created by MegaMan on 1/18/2016.
 */
'use strict';
define(function (require) {
    var BrowserUtils = require('utils/utilities/BrowserUtils');
    var StringUtils = require('utils/utilities/StringUtils');
    var NumberUtils = require('utils/utilities/NumberUtils');
    var DateUtils = require('utils/utilities/DateUtils');
    var FileUtils = require('utils/utilities/FileUtils');
    var TimerMgame = require('utils/utilities/TimerMgame');

    Utilities.prototype.constructor = Utilities;

    Object.defineProperties(Utilities.prototype, {});

    function Utilities() {
        throw new Error('Cannot instance this class');
    }

    Utilities.Browser = BrowserUtils;
    Utilities.String = StringUtils;
    Utilities.Number = NumberUtils;
    Utilities.DateUtils = DateUtils;
    Utilities.File = FileUtils;
    Utilities.Timer = TimerMgame;

    Utilities.log = function(message){
        console.log(message);
    };

    Utilities.Coin = function(str)
    {
        if(typeof str === "number")
            str = str.toString();
        var strResult = "";
        var count = -1;
        var stringLength = str.length;
        for (var i = 0; i < stringLength; i++)
        {
            count++;
            if (count == 3)
            {
                count = 0;
                if (parseInt(str.charAt(stringLength - (i + 1)), 10).toString() != "NaN" && str.charAt(stringLength - (i + 1)) != "-")
                {
                    strResult += "." + str.charAt(stringLength - (i + 1));
                }
                else
                {
                    strResult += str.charAt(stringLength - (i + 1));
                }
            }
            else
            {
                strResult += str.charAt(stringLength - (i + 1));
            }
        }
        var s1 = "";
        var strResultLength = strResult.length;
        for (var j = 0; j < strResultLength; j++)
        {
            s1 += strResult.charAt(strResultLength - (j + 1));
        }

        return s1;
    };

    global.Utilities = Utilities;

    return Utilities;
});