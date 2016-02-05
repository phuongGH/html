/**
 * Created by MegaMan on 1/18/2016.
 */
'use strict';
define(function () {

    StringUtils.prototype.constructor = StringUtils;

    Object.defineProperties(StringUtils.prototype, {});

    function StringUtils() {
        throw new Error('Cannot instance this class');
    }

    StringUtils.getExtension = function (fullPath, moreInfo) {
        var queryStartIndex = fullPath.indexOf('?');
        var queryString = '';
        if (queryStartIndex !== -1) {
            queryString = fullPath.substring(queryStartIndex + 1);
            fullPath = fullPath.substring(0, queryStartIndex);
        }

        var extension = fullPath.substring(fullPath.lastIndexOf('.') + 1);

        if(arguments.length >= 2){
            moreInfo.extension = extension;
            moreInfo.fileName = fullPath.substring(fullPath.lastIndexOf('/') + 1, fullPath.lastIndexOf('.'));
            moreInfo.parentPath = fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
            moreInfo.queryString = queryString;
        }

        return extension;
    };

    StringUtils.isNullOrEmpty = function (str) {
        return (str == '' || str == null);
    };

    StringUtils.reduce = function (str, lng, endStr) {
        str = String(str.trim());
        endStr = String(endStr.trim());
        lng = lng - endStr.length;
        return str.substr(0, lng) + endStr;
    };

    /**
     * Xóa bỏ tất cả dấu "." trong chuỗi truyền vào
     */
    StringUtils.removeDot = function(str)
    {
        var array = str.split(".");
        var result = "";
        for (var i = 0; i < array.length; i++)
        {
            result += array[i];
        }
        return result;
    };

    /**
     * Xóa bỏ tất cả số 0 ở đầu trong chuỗi truyền vào
     */
    StringUtils.removeZeroFirst = function(str)
    {
        var len = str.length;
        if(len == 0)
            return "0";
        var pos = 0;
        for(var i = 0;i<len;i++)
        {
            if(str.charAt(i) != '0')
            {
                pos = i;
                break;
            }
        }
        return str.substr(pos);
    };

    /**
     *	Removes whitespace from the front and the end of the specified
     *	string.
     *
     *	@param input The String whose beginning and ending whitespace will
     *	will be removed.
     *
     *	@returns A String with whitespace removed from the beginning and end
     *
     */
    StringUtils.trim = function(input)
    {
        return StringUtils.ltrim(Utilities.rtrim(input));
    };

    /**
     *	Removes whitespace from the front of the specified string.
     *
     *	@param input The String whose beginning whitespace will will be removed.
     *
     *	@returns A String with whitespace removed from the beginning
     *
     */
    StringUtils.ltrim = function(input)
    {
        var size = input.length;
        for(var i = 0; i < size; i++)
        {
            if(input.charCodeAt(i) > 32)
            {
                return input.substring(i);
            }
        }
        return "";
    };

    /**
     *	Removes whitespace from the end of the specified string.
     *
     *	@param input The String whose ending whitespace will will be removed.
     *
     *	@returns A String with whitespace removed from the end
     *
     */
    StringUtils.rtrim = function(input)
    {
        var size = input.length;
        for(var i = size; i > 0; i--)
        {
            if(input.charCodeAt(i - 1) > 32)
            {
                return input.substring(0, i);
            }
        }

        return "";
    };

    StringUtils.ConvertTags1 = function(theString)
    {
        var tempString = "";
        for (var i = 0; i < theString.length; i++)
        {
            switch(theString.charAt(i))
            {
                case "<":
                case ">":
                case ";":
                case "\"":
                case "#":
                case "$":
                case ",":
                case ".":
                case "'":
                    tempString += "_";
                    break;
                default:
                    tempString += theString.charAt(i);
                    break;
            }
        }
        theString = null;
        return tempString;
    };

    return StringUtils;
});