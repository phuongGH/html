/**
 * Created by hungtd on 1/22/2016.
 */
define(function (require) {

    VariableKeys.prototype = Object.create(Object.prototype);
    VariableKeys.prototype.constructor = VariableKeys;

    VariableKeys.USER_INFO      ="mguv";
    VariableKeys.ROOM_INFO      = "mgrv";
    VariableKeys.ROOM_NAME      = "rn";
    VariableKeys.ARR_NICK       = "arn";
    VariableKeys.BOARD_TYPE     = "bty";
    VariableKeys.BOARD_STATE    = "bos";
    VariableKeys.BET_COIN = "bc";
    VariableKeys.TIME_OUT = "to";
    VariableKeys.BOARD_STATUS = "bst";
    VariableKeys.USER_ID = "uid";
    VariableKeys.TIME_PLAY = "tp";
    VariableKeys.NICK_NAME = "nn";
    VariableKeys.EMOTION_PATH = "ep";
    VariableKeys.BET_CONDITION = "bt";
    VariableKeys.USER_TYPE = "utid";
    VariableKeys.CATEGORY_USER = "cu";
    VariableKeys.AWARDED_THRESHOLD_TIME = "att";
    VariableKeys.PUB_ID = "puid";
    VariableKeys.FULL_NAME = "fn";
    VariableKeys.GENDER = "gd";
    VariableKeys.LEVEL = "lvn";
    VariableKeys.EXP_SCORE = "es";
    VariableKeys.COIN = "c";
    VariableKeys.AWARDED_COIN_TIME = "act";
    VariableKeys.ASSOCIATION_NAME = "an";
    VariableKeys.ASSOCIATION_ID = "sid";
    VariableKeys.FREE_BET = "fb";
    VariableKeys.IS_ASS_OWNER = "iao";
    VariableKeys.IS_SUB_ASS_OWNER = "iso";
    VariableKeys.ASSOCIATION_LEVEL = "la";
    VariableKeys.ASSOCIATION_LEVEL_NAME = "ln";
    VariableKeys.OWNER_NICK_NAME = "onn";
    VariableKeys.TRANSFER_NO = "tn";
    VariableKeys.IS_PLAYER = "isp";
    VariableKeys.POSITION = "pos";
    VariableKeys.IS_ROOM_OWNER = "iro";
    VariableKeys.PLAYER_NO = "pn";
    VariableKeys.IS_LOCKED = "lb";
    VariableKeys.NUM_VIEW = "numView";
    VariableKeys.ITEM_BAR_INFO = "ibs";
    VariableKeys.OWNER_COIN = "owc";
    VariableKeys.USER_TOOL_KIND = "ulk";
    VariableKeys.ROOM_TYPE = "rti";
    VariableKeys.ROOM_ID = "rid";
    VariableKeys.MATCH_ID = "MID";
    VariableKeys.SERVER_TIME = "st";
    VariableKeys.RULES = "rules";
    VariableKeys.NEXT_LEVEL_EXP_SCORE = "nEXP";
    VariableKeys.HAS_PASSWORD = "pass";
    VariableKeys.MAX_BET = "mb";
    VariableKeys.CUSTOM_MAX_PLAYER = "cmp";
    VariableKeys.TOTAL_PLAYER = "ttp";
    VariableKeys.OWNER_ID = "oid";
    VariableKeys.REAL_COIN = "rcou";
    VariableKeys.IS_ACTIVE_JACKPOT = "hjb";
    VariableKeys.IS_SOLO = "isolo";
    VariableKeys.IS_GOPGA = "isGopGa";
    VariableKeys.IS_SETUP_FIRSTTIME = "isSetupFT";
    Object.defineProperties(VariableKeys.prototype, {

    });

    function VariableKeys() {
        Object.call(this);
    }

    Global.VariableKeys = VariableKeys;

    return VariableKeys;
});