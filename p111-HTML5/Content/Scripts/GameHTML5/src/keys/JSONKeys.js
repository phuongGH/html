/**
 * Created by hungtd on 2/3/2016.
 */
"use strict";
define(function (require) {

    JSONKeys.prototype = Object.create(Object.prototype);
    JSONKeys.prototype.constructor = JSONKeys;

    Object.defineProperties(JSONKeys.prototype, {});

    /**
     *
     *
     * @param room {@param}
     * @return {JSONKeys}
     */
    function JSONKeys() {
        Object.call(this);
        this._init();
    }

    JSONKeys.prototype._init = function () {

    }

    JSONKeys.prototype.onEnterFrame = function () {

    }

    //region JSONKey Core

    //endregion

    JSONKeys.TIME_OUT = "to";
     JSONKeys.BET_COIN = "bc";
     JSONKeys.LEVEL_NO = "ln";
     JSONKeys.ROOM_ID = "rid";
     JSONKeys.POSITION = "pos";
     JSONKeys.PLAYER_NO = "pn";

     JSONKeys.USER_ID = "uid";
     JSONKeys.PASSWORD = "pass";
     JSONKeys.EMAIL = "em";
     JSONKeys.GAME_ID = "gid";
     JSONKeys.NICK_NAME = "nn";
     JSONKeys.CONFIRM_STATUS = "cft";
     JSONKeys.ARR_NICK = "arn";
     JSONKeys.RATE_ID ="jprid";
     JSONKeys.RULES = "rules";
     JSONKeys.MESSAGE = "mess";
     JSONKeys.MESSAGE_SHOW = "ms";
     JSONKeys.CONTENT_CHAT = "cc";
     JSONKeys.SUCCESS = "suc";
     JSONKeys.SERVER_TIME =  "st";
     JSONKeys.NICK_CHAT = "nc";
     JSONKeys.NICK_SEND = "ns";
     JSONKeys.USER_ID_SEND = "uisr";
     JSONKeys.Chat_Type_Room = "uid";
     JSONKeys.ITEM_ID = "iid";
     JSONKeys.GIVE_ONE = "go";
     JSONKeys.ITEM_NAME = "itn";;
     JSONKeys.IMAGE_PATH = "imp";
     JSONKeys.PRICE = "pr";
     JSONKeys.PHASE = "ph";
     JSONKeys.TIME_EACH_PHASE = "tep";
     JSONKeys.IS_SUB_MOVIE = "ism";
     JSONKeys.DIRECTION = "dit";
     JSONKeys.ITEM_BAR_MENU = "da";
     JSONKeys.Giver_NICK_NAME = "gnn";
     JSONKeys.ITEM_BAR_INFO = "ibi";
     JSONKeys.IS_FIRST_LOAD = "ifl";
     JSONKeys.ASSET_TYPE = "at";
     JSONKeys.ASSETS_NAME = "an";
     JSONKeys.COIN = "c";
     JSONKeys.GENDER = "gd";
     JSONKeys.LEVEL = "l";
     JSONKeys.ID = "id";
     JSONKeys.STATUS = "s";
     JSONKeys.PATH_FILE = "pl";
     JSONKeys.MIN_BET = "mb";
     JSONKeys.MAX_BET = "mab";
     JSONKeys.KIND = "ki";
     JSONKeys.ROOM_TYPE = "rti";
     JSONKeys.TOTAL_PLAYER = "ttp";

     JSONKeys.GET_ITEM_BAR_CATEGOGY = "ibc";
     JSONKeys.GET_ITEM_BAR = "gtb";
     JSONKeys.BUY_ITEM_BAR = "bi";
     JSONKeys.GIVE_ITEM_BAR = "gib"
     JSONKeys.ITEM_BAR_CATEGORY_ID = "ibci";

     JSONKeys.RESULT_DATA = "rd";
     JSONKeys.MORE_INFO = "rmi";
     JSONKeys.LIST_PLAYER_NO = "pl";
     JSONKeys.DEALER_USER = "du";
     JSONKeys.NEW_OWNER_ID = "no";
     JSONKeys.OLD_OWNER_ID = "oo";
     JSONKeys.NAME = "Name";
     JSONKeys.IMAGE = "img";
     JSONKeys.IMAGECAP = "imgcap";
     JSONKeys.DATE = "dt";
     JSONKeys.USER_INFO = "uif";
     JSONKeys.IS_LOCKED = "il";
     JSONKeys.USERID_RECIEVER = "rec";
     JSONKeys.NICK_SENDER = "ns";
     JSONKeys.AGRREE = "agr";
     JSONKeys.USERID_FRIEND = "uifr";
     JSONKeys.OWNER_COIN = "owc";
     JSONKeys.BOARD_STATUS = "bst";
     JSONKeys.BOARD_TYPE = "bty";
     JSONKeys.MAX_ITEM = "mxi";
     JSONKeys.MAX_MILLION_ITEM = "mmi";

     JSONKeys.PERSONAL_ASSET_MENU = "am";
     JSONKeys.USER_ITEM_INFO = "uii";

     JSONKeys.VARIABLE_VALUE = "v";
     JSONKeys.EMOTION_NAME = "emn";

     JSONKeys.CONFIRM_ACCEPT_START_MATCH = "casm";

     JSONKeys.LIST_USER = "lu";
     JSONKeys.LIST_USER_ID = "lui";
     JSONKeys.LOCK_BOARD = "lb";
     JSONKeys.LIST_DEFAULT_ROOM = "ldr";

     JSONKeys.LIST_GROUP_DATA = "lgd";
     JSONKeys.LIST_GROUP_TYPE = "lgt";
     JSONKeys.LIST_CARD = "lc";
     JSONKeys.MATCH_ID = "MID";
    // Association Contribute
     JSONKeys.EXP_FOR_ASSOCIATION = "efa";
    JSONKeys.COIN_FOR_ASSOCIATION = "cfa";

    JSONKeys.ANNOUNCEMENT = "anc";
    JSONKeys.IS_ANNOUNCEMENT_REPEAT = "rpa";

    JSONKeys.Relative = "re";
    JSONKeys.FriendIds = "fid";

    JSONKeys.FriendRelative = "Friend";
    JSONKeys.AssociationRelative = "Association";
    JSONKeys.ADMIN_ACTION_TYPE = "aat";
    JSONKeys.ITEM_BET_PATH = "itbp";
    JSONKeys.ERROR_MESSAGE = "msg";
    JSONKeys.RECEIVE_LIST_FRIEND_ID = "lug";
    JSONKeys.NOTICE_TYPE = "nt";
    JSONKeys.ASSSOCIATION_NAME = "an";
    JSONKeys.TYPE_OF_REQUEST = "tor";
    JSONKeys.OWNER_ASSOCIATION_NAME = "onn";
    JSONKeys.STATUS_OF_REQUEST = "sor";
    JSONKeys.ASSOCIATION_ID = "sid";
    JSONKeys.MAINTAIN_TIME_REMAING = "mtt";
    JSONKeys.TIME_TO_MAINTAIN = "ttm";

    JSONKeys.MINUTE_TO_UPDATE = "mutc";
    JSONKeys.MAX_PLAYER = "map";
    JSONKeys.MIN_PLAYER = "mip";
    JSONKeys.USER_LEVEL_TABLE = "ult";
    JSONKeys.SUB_COMMAND = "scm";

    JSONKeys.AVATAR_PATH = "avp";
    JSONKeys.AVATAR_ID = "avid";
    JSONKeys.AVATAR_TYPE = "avt";
    JSONKeys.AVATAR_MUST_DELETE = "avd";
    JSONKeys.ROOT_PRICE = "rp";
    JSONKeys.DESCRIPTION = "dst";
    JSONKeys.QUANTITY = "qti";
    JSONKeys.AVATAR_LIST = "avl";
    JSONKeys.USER_INFO_LIST = "uifl";
    JSONKeys.USER_NAME = "un";
    JSONKeys.IS_FROM_SETTING = "ifs";
    JSONKeys.NUM_USER = "num";
    JSONKeys.UPDATE_TOTAL_USER_IN_A_GROUP = "utu";
    JSONKeys.ERROR_CODE = "ec";
    JSONKeys.GAME_RESOURCE_INFO = "gif";
    JSONKeys.SERVER_PORT = "sp";
    JSONKeys.GAME_PATH = "gp";
    JSONKeys.FLASH_PATH = "fp";
    JSONKeys.LANGUAGE_PATH = "lp";
    JSONKeys.GROUP_NAME = "gn";
    JSONKeys.ROOM_INFO = "ri";
    JSONKeys.ROOM_NAME = "rn";
    JSONKeys.SERVER_ID = "sid";
    JSONKeys.KICK_BY_OWNER = 1;
    JSONKeys.KICK_BLACKLIST = 2;
    JSONKeys.BOARD_STATE = "bs";
    JSONKeys.IS_UPLOAD = "iu";
    JSONKeys.IS_SAME_SERVER = "iss";
    JSONKeys.LIST_TOP_CAO_THU = "ltct";
    JSONKeys.EMOTION_PATH = "ep";
    JSONKeys.USER_TYPE = "utid";
    JSONKeys.IS_ASSOCIATION_OWNER = "iao";
    JSONKeys.CATEGORY_USER = "cu";
    JSONKeys.EXP_SCORE = "es";
    JSONKeys.LOGIN_TYPE = "lgtp";
    JSONKeys.FLASH_VAR = "fvar";
    JSONKeys.USER_VALIDATION_DATA = "uvdt";

    //TAIXIU
    JSONKeys.SET_MAX_BET = 7;
    JSONKeys.GAME = "g";
    JSONKeys.COMMAND = "cmd";
    JSONKeys.TAIXIU_MAX_BET = "mb";
    JSONKeys.CUSTOM_MAX_PLAYER = "cmp";
    JSONKeys.REMAIN_TIME = "rm";
    JSONKeys.TOUR_ID = "tid";
    JSONKeys.IS_CAN_CHAT = "icc";

    JSONKeys.USER_LEAVING_ON_PLAYING = "ULOP";

    //Dãy Số May Mắn
    JSONKeys.DSMM_LUCKY_NUMBER = "dsmmln";
    JSONKeys.DSMM_GOLDWIN = "dsmmgw";
    JSONKeys.DSMM_TOTAL_GOLD = "dsmmtg";
    JSONKeys.IS_SOLO = "isolo";
    JSONKeys.MACHINE_VALUE = "mv";
    JSONKeys.IS_GOPGA = "isGopGa";
    JSONKeys.CUOC_ID = "ci";

    JSONKeys.LIST_GROUP = "lg";
    JSONKeys.GROUP_COMMAND = 1000;

    JSONKeys.BOARD_ID = "bid";

    JSONKeys.LIST_USER_HAS_BAI_DEP = "luhbd";
    JSONKeys.CARD_TYPE = "ct";
    JSONKeys.CARD_TYPE_NAME = "ctn";
    JSONKeys.RATE_COIN = "rc";

    global.JSONKeys = JSONKeys;

    return JSONKeys;
});