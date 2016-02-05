/**
 * Created by MegaMan on 1/18/2016.
 */
'use strict';
define(function () {
    NumberUtils.prototype.constructor = NumberUtils;

    Object.defineProperties(NumberUtils.prototype, {});

    function NumberUtils() {
        throw new Error('Cannot instance this class');
    }

    NumberUtils.isInteger = function (int) {
        return (int % 1 == 0);
    };

    NumberUtils.FormatCoin = function(s)
    {
        var strResult = "";
        var count = -1;
        var stringLength = s.length;
        for (var i = 0; i < stringLength; i++)
        {
            count++;
            if (count == 3)
            {
                count = 0;
                if ((s.charAt(stringLength - (i + 1))).toString() != "NaN" && s.charAt(stringLength - (i + 1)) != "-")
                {
                    strResult += "." + s.charAt(stringLength - (i + 1));
                }
                else
                {
                    strResult += s.charAt(stringLength - (i + 1));
                }
            }
            else
            {
                strResult += s.charAt(stringLength - (i + 1));
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

    NumberUtils.c = ['', 'K', 'M', 'B', 'T'];

    NumberUtils.MobileCoinFormat = function(n)
    {
        if (isNaN(n))
            return "0";
        var donvi = n.toString();
        if (donvi.lastIndexOf('.') > -1)
        {
            donvi = donvi.substring(0, donvi.lastIndexOf('.'));
            n = Number(donvi);
        }

        donvi = "";
        var numSlit = 0;
        var dau = 1;
        if (n < 0)
        {
            dau = -1;
            n *= -1;
        }

        if(n > 999999999)
        {
            numSlit = 7;
            donvi = "Ty"
        }
        else if(n > 999999)
        {
            numSlit = 4;
            donvi = "T";
        }
        else
            return NumberUtils.FormatCoin((n * dau).toString());
        var s = n.toString().substr(0,n.toString().length - numSlit);
        s = s.substr(0, s.length - 2) + "." + s.substr(s.length - 2, 2) + donvi;
        if (dau < 0)
            s = "-" + s;
        return s;
    };

    NumberUtils.removeDotMobile = function(str)
    {
        var array = str.split(".");
        var result = "";
        for (var i = 0; i < array.length; i++)
        {
            result += array[i];
        }
        return result;
    };

    NumberUtils.separateNumber = function (number, separator, inDeSe, outDeSe) {
        number = String(number.trim());                                //Số cần phải định dạng (Require)
        separator = String(separator.trim());                          //Dấu phân cách 3 chữa số, mặc định là dấu '.' (Option)
        inDeSe = String(inDeSe.trim());                                //Input Decimal Separator - dấu phân cách phần thập phân của số truyền vào, mặc định là dấu '.' (Option)
        outDeSe = String(outDeSe.trim());                              //Output Decimal Separator - dấu phân cách phần thập phân của số sau khi format, mặc định là dấu ',' (Option)
        if (inDeSe.length < 1)
            inDeSe = '.';
        if (outDeSe.length < 1)
            outDeSe = ',';
        if (separator.length < 1)
            separator = '.';
        var decimalSeparatorPosition = number.indexOf(inDeSe);
        var nStrEnd = String('');
        if (decimalSeparatorPosition != -1) {
            nStrEnd = outDeSe + number.substring(decimalSeparatorPosition + 1, number.length);
            number = number.substring(0, decimalSeparatorPosition);
        }
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(number)) {
            number = number.replace(rgx, '$1' + separator + '$2');
        }
        return number + nStrEnd;
    };

    return NumberUtils;
});