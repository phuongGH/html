/**
 * Created by hungtd on 1/15/2016.
 */

define(function (require) {

    BoardData.prototype.constructor = BoardData;

    Object.defineProperties(BoardData.prototype, {
        bX: {
            value: 0,
            writable: true
        },

        bY: {
            value: 0,
            writable: true
        },

        roomId: {
            value: "",
            writable: true
        },

        boardName:{
            value: "",
            writable: true
        },

        isRemoved:{
            value: false,
            writable: true
        },

        arrNick:
        {
            value:[],
            writable: true
        },

        betCoin:{
            value: 0,
            writable: true
        },

        maxBetCoin:{
            value: 0,
            writable: true
        },

        status:{
            value: "",
            writable: true
        },

        boardType:{
            value: 0,
            writable: true
        },

        isLock:{
            value: false,
            writable: true
        },

        ownerCoin:{
            value: 0,
            writable: true
        },

        ownerId:{
            value: 0,
            writable: true
        },

        rules:{
            value: "",
            writable: true
        },

        isSolo:{
            value: false,
            writable: true
        },

        hasPassword:{
            value: false,
            writable: true
        },

        isGopGa:{
            value: false,
            writable: true
        },

        _gameLoader:{
            value: null,
            writable: true
        }
    });

    function BoardData(room)
    {
        this._init(room);
    }

    BoardData.prototype._init= function(room)
    {
        this.roomId = room;
       /* var roomInfo = RoomInfo.fromRoom(room);

        this.roomId_Str = room.getId().toString();
        this.isLock_Boo = roomInfo.oKhoa == 1;
        this.arrNick_Arr = roomInfo.arrNick;

        if (_gameLoader.global.isGameTaiXiu)
        {
            this.betCoin_Num = roomInfo.numView;
            this.ownerCoin_Num = roomInfo.getTaiXiuMaxBet();
        }
        else if (_gameLoader.global.isGameLucky)
        {
            this.betCoin_Num = roomInfo.numView;
            this.ownerCoin_Num = roomInfo.getLuckyMaxBet();
        }
        else if (_gameLoader.global.isGameXocDia)
        {
            this.betCoin_Num = roomInfo.betCoin;
            this.ownerCoin_Num = roomInfo.getLuckyMaxBet();
            this.rules_Str = roomInfo.rules;
            this.updateMaxBetWithRule();
        }
        else
        {
            this.betCoin_Num = roomInfo.betCoin;
            this.ownerCoin_Num = roomInfo.ownerCoin;
        }
        this.boardName_Str = room.getName();
        this.ownerId_Num = room.getVariable("oid");
        this.boardType_Num = roomInfo.boardType;
        this.status_Str = roomInfo.boardStatus;

        this.hasPassword_Boo = roomInfo.hasPassword == 1;
        this.rules_Str = roomInfo.rules;
        this.isSolo_Boo = roomInfo.isSolo;
        this.isGopGa_Boo = roomInfo.isGopGa;*/
    };

    BoardData.prototype.updateMaxBetWithRule= function()
    {
       /* if (this.rules.length == 0)
            return;

        var arrRule:Array = this.rules.split(",");
        if (arrRule != null && arrRule.length > 1)
            this.maxBetCoin_Num = parseFloat(arrRule[1].toString());*/
    };



    return BoardData;
});
