/**
 * Created by phuongtv on 12/30/2015.
 */
(function($,window) {
    window.AppInfo = {};

    function AppInfo() {

    };

    window.AppInfo.WIDTH = $(window).width();
    window.AppInfo.HEIGHT = $(window).height();
    window.AppInfo.ratio = 0.01;
    window.AppInfo.MyFishDefaultSize = 30;
    window.AppInfo.FoodDefaultSize = 20;
    window.AppInfo.GrowUp = 0.7;
    window.AppInfo.appScale = 1;
}(jQuery, this));