/**
 * Created by hungtd on 1/15/2016.
 */

define(function (require) {


    var BoardItem =  require("ui/components/compolistboarddefault/BoardItem");

    CompoItemListBoard.prototype = Object.create(PIXI.Container.prototype);
    CompoItemListBoard.prototype.constructor = CompoItemListBoard;

    Object.defineProperties(CompoItemListBoard.prototype, {
        _board:{
            value:null,
            writable:true
        },

        _myInfoUserType:{
            value:0,
            writable:true
        },

        _boardType:{
            value:0,
            writable:true
        },

        _boardID:{
            value:"",
            writable:true
        },

        _boardName:{
            value:"",
            writable:true
        },

        _betCoin:{
            value:null,
            writable:true
        },

        _isLock:{
            value:false,
            writable:true
        },

        _status:{
            value:"",
            writable:true
        },

        maxPlayer:{
            value:999,
            writable:true
        },

        avatarPath:{
            value:"",
            writable:true
        },

        boardData:{
            value:null,
            writable:true
        },

        _hasPassword:{
            value:false,
            writable:true
        },

        ruleString:{
            value:"",
            writable:true
        },

        gameLoader:{
            value:null,
            writable:true
        },

        iconJackPot_mc:{
            value:null,
            writable:true
        },

        _isMillionaireBoard:{
            value:false,
            writable:true
        },

        _isMaxTayBoard:{
            value:false,
            writable:true
        },

        _isMinMatchBoard:{
            value:false,
            writable:true
        }
    });

    function CompoItemListBoard(maxPlayer)
    {
        PIXI.Container.call(this);
        this.maxPlayer =  maxPlayer;
        this._init();
    }

    CompoItemListBoard.prototype._init= function()
    {
        this._board = new BoardItem(this, this.maxPlayer);
       // this._board.tooltip_mc.visible = false;
        this.addChild(this._board);
        this._board.board_mc.mouseChildren = false;
       // this._board.board_mc.lock_mc.visible = false;
       // this._board.board_mc.key_mc.visible = false;
        this._isLock = false;
    };

    CompoItemListBoard.prototype.LoadData= function()
    {
        this._board.loadData();
    };

    CompoItemListBoard.prototype.updateBoardStatus= function(value)
    {
        this.status = value;
    };

    CompoItemListBoard.prototype.updateBetCoin= function(value)
    {
        this.BetCoin = value;
    };

    CompoItemListBoard.prototype.updateRule= function(value)
    {
        /*if (gameLoader.global.gameID == GlobalConstants.PokerGameId)
            isMaxTayBoard = rules.indexOf(GlobalConstants.LUAT_MAX_TAY) > -1;*/

        /*if (gameLoader.global.gameID == GlobalConstants.XiToGameId)
            isMaxTayBoard = rules.indexOf(GlobalConstants.LUAT_TAY_MAX_XITO) > -1;*/

        if (gameLoader.global.gameID == GlobalConstants.TienlenMNGameId || gameLoader.global.gameID == GlobalConstants.TienlenMNGame41Id || gameLoader.global.gameID == GlobalConstants.SamId)
        {
            var ruleArray = value.split(",");

            if (ruleArray.length > 1 && ruleArray[1] == "1")
                this._isMinMatchBoard = true;
            else
                this._isMinMatchBoard = false;
        }

        this.ruleString = value;
    };

    CompoItemListBoard.prototype.reset= function()
    {
        this._myInfoUserType = 0;
        this._boardType = 0;
        this._boardID = "";
        this._boardName = "";
        this.betCoin = 0;
        this._isLock = false;
        this.status = "";
        this.maxPlayer = 999;

        this.boardData = null;
        this.hasPassword = false;

        this.ruleString = "";
        this.userIDWinTour = 0;
        this.AssIDWinTour = 0;
        if(this.iconJackPot_mc)
            this.iconJackPot_mc.visible = false;
        this.isMaxTayBoard = false;
        this.isMillionaireBoard = false;
        this.isMinMatchBoard = false;

        this._board.reset();

        this._board.tooltip_mc.visible = false;
        this._board.board_mc.mouseChildren = false;
        this._board.board_mc.lock_mc.visible = false;
        this._board.board_mc.key_mc.visible = false;
        this._isLock = false;
    };

    return CompoItemListBoard;
});