

define(function (require) {


    var ICompoListBoard             =   require("ui/components/compolistboarddefault/ICompoListBoard");
    var CustomScrollPane            =   require("ui/components/compolistboarddefault/CustomScrollPane");
    var BoardData                   =   require("ui/components/compolistboarddefault/BoardData");
    var ItemListBoardPoolControler  =   require("ui/components/compolistboarddefault/ItemListBoardPoolControler");

    //contruc
    CompoListBoardDefault.prototype = Object.create(ICompoListBoard.prototype);          //This is code for inheritance
    CompoListBoardDefault.prototype.constructor = CompoListBoardDefault;

    //static var
    CompoListBoardDefault.filter1 ;
    CompoListBoardDefault.filter2 ;

    Object.defineProperties(CompoListBoardDefault.prototype, {
        xBoard1: {
            value: 0,
            writable: true
        },

        xBoard2: {
            value: 0,
            writable: true
        },

        listBoardData: {
            value: [],
            writable: true
        },

        userIDWinTour:{
            value: 0,
            writable: true
        },
        AssIDWinTour:{
            value: 0,
            writable: true
        },

        gameName:{
            value: "",
            writable: true
        },

        UserIDWinTour:
        {
            value:0,
            writable: true
        },

        view:{
            value: null,
            writable: true
        },

        _gameloader:{
            value: null,
            writable: true
        },

        itemListBoardPoolControler:{
            value:null,
            writable:true
        },

        scrollItemArea:{
            value:null,
            writable:true
        }
    });


    /**
     *
     * @param  Gameloader {Gameloader}
     * @constructor
     */
    function CompoListBoardDefault(Gameloader) {
        ICompoListBoard.call(this);
        this._gameloader = Gameloader;
        this._init();
    }

    CompoListBoardDefault.prototype._init= function()
    {
        this.itemListBoardPoolControler = new ItemListBoardPoolControler();
        this.scrollItemArea = new PIXI.Container();

        this._listBoard = new CustomScrollPane(700, 600);
        this.addChild(this._listBoard.getScrollArea());
    };



    CompoListBoardDefault.prototype.isRoomMaxTayDefault= function(roomId)
    {
        /*var room = gameLoader.global.getRoom(roomId);
         if (room == null)
         return false;
         var roomInfo = RoomInfo.fromRoom(room);
         if (roomInfo.rules.indexOf("3") > -1 && roomInfo.isDefault) // PHong Max Tay
         {
         for (var i:int = 0; i < gameLoader.listDefaultBoardMaxTay.length; i++)
         {
         if (roomInfo.roomId == gameLoader.listDefaultBoardMaxTay[i])
         {
         return true;
         }
         }
         //return true;
         }
         return false;*/
    };

    CompoListBoardDefault.prototype.compareBetCoinOrRoomId= function(betCoin1, betCoin2,boardId1,boardId2)
    {
        if (betCoin1 > betCoin2)
            return 1;
        else
        {
            if (betCoin1 < betCoin2)
                return -1;
            else
            {
                if (boardId1 > boardId2)
                    return 1;
                else
                {
                    if (boardId1 < boardId2)
                        return -1;
                }
            }
        }
        return 0;
    };

    CompoListBoardDefault.prototype.compareRoomId= function(boardId1,boardId2)
    {
        if (boardId1 > boardId2)
            return -1;
        else
        {
            if (boardId1 < boardId2)
                return 1;
        }
        return 0;
    };

    CompoListBoardDefault.prototype.compareMaxBet= function(roomInfo1, roomInfo2)
    {
        var maxBet1 = roomInfo1.getTaiXiuMaxBet();
        var maxBet2 = roomInfo2.getTaiXiuMaxBet();

        if (maxBet1 > maxBet2)
            return 1;
        else if (maxBet1 < maxBet2)
            return -1;
        else
        {
            var ownerCoin1 = roomInfo1.ownerCoin;
            var ownerCoin2 = roomInfo2.ownerCoin;
            if (ownerCoin1 > ownerCoin2)
                return 1;
            else if (ownerCoin1 < ownerCoin2)
                return -1;
        }
        return 0;
    };

    /**
     * @param {Room} room
     * @param scaleMode {number} See {@link PIXI.SCALE_MODES} for possible values
     */
    CompoListBoardDefault.prototype.addBoard = function(room)
    {
        if (this.alreadyAddBoard(room))
        {
            return;
        }

        var numBoard = this.listBoardData.length;
        var boardData = new BoardData(room);

        if (numBoard == 0)
        {
            this.listBoardData[numBoard] = boardData;
            this.scrollItemArea.addItem(this.createItemListBoard(numBoard,0,0));
            return;
        }

        var currentIndexAddBoard = 0;
        var boardDataHasExit;
        for (currentIndexAddBoard = 0; currentIndexAddBoard < numBoard; currentIndexAddBoard++)
        {
            boardDataHasExit = this.listBoardData[currentIndexAddBoard];

            if (boardDataHasExit.betCoin < boardData.betCoin)
                break;
            else if(boardDataHasExit.betCoin == boardData.betCoin)
            {
                if (boardDataHasExit.roomId < boardData.roomId)
                    break;
            }
        }

        this.listBoardData.splice(currentIndexAddBoard,0,boardData) ;

        var tempy =0;
        var tempx =0;
        tempx =400;
        if(currentIndexAddBoard==0)
        {
            tempx =0;
            tempy =0;
        }
        else
        if(currentIndexAddBoard%2==0 && currentIndexAddBoard!=0)
        {
            tempx =0;
            tempy = Math.floor(currentIndexAddBoard )* 100;
        }
        else
        tempy = Math.floor((currentIndexAddBoard / 2) + 1)* 100;

        this.scrollItemArea.addChild(this.createItemListBoard(currentIndexAddBoard,tempx,tempy));
        this.arrangeListBoards(currentIndexAddBoard +1);
    };

    CompoListBoardDefault.prototype.alreadyAddBoard = function(boardId)
    {
        var boardData = this.getBoard(boardId);
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId);
        return boardData != null || compoItemListBoard != null;

    };

    CompoListBoardDefault.prototype.createItemListBoard= function(i,iX,iY)
    {
        var boardData =  this.listBoardData[i];
        var board = this.itemListBoardPoolControler.getPool(4); //new CompoItemListBoard(gameLoader.global.maxPlayer);
        board.maxPlayer = 4;
        board.UserIDWinTour = this.userIDWinTour;
        board.AssIDWinTour = this.AssIDWinTour;
        board.name = boardData.roomId;
        board.MyInfoUserType = 1;
        board.avatarPath = "";
        board.boardData =  boardData;
        board.x = iX;
        board.y = iY;
        boardData.bX = iX;
        boardData.bY = iY;
        board.LoadData();
        return board;
    };

    CompoListBoardDefault.prototype.Defragment= function()
    {

    };

    CompoListBoardDefault.prototype.SortByBetCoin= function(value1,value2)
    {
        return value2 - value1;
    };

    CompoListBoardDefault.prototype.loadBoards= function(listRoom)
    {
        this.removeAll();

        if (listRoom.length > 0)
        {
           listRoom.sort(this.SortByBetCoin);

           var numBoard = listRoom.length;
           var boardData;
           var room;
            var tempy =0;
            var tempx =0;
            for (var i = 0; i < numBoard; i++)
            {
                room = listRoom[i];
               /* if (room.IsGame() == false)
                    continue;*/
                boardData = new BoardData(room);
               this.listBoardData[this.listBoardData.length] = boardData;


                tempx =400;
                if(i==0)
                {
                    tempx =0;
                }
                else
                if(i%2==0 && i!=0)
                {
                    tempx =0;
                    tempy = i * 100;

                }

                this.scrollItemArea.addChild(this.createItemListBoard(i,tempx,tempy));
            }
            this._listBoard.addItem(this.scrollItemArea);
          // _listBoard.updateStatusBoard();
        }
    };

    CompoListBoardDefault.prototype.removeAll= function()
    {
        var compoItemListBoard;
        while(this.scrollItemArea.numChildren > 1)
        {
            compoItemListBoard = this.scrollItemArea.getChildAt(1) ;
            if (compoItemListBoard)
            {
                this.scrollItemArea.removeChild(compoItemListBoard);
                compoItemListBoard.destroy();
                this.itemListBoardPoolControler.addPool(compoItemListBoard);
            }
        }
        //this.scrollItemArea.y = -1;
        this.disposeData();
        //this._listBoard.UpdateDisplay();
    };

    CompoListBoardDefault.prototype.disposeData= function()
    {
        if (this.listBoardData != null && this.listBoardData.length > 0)
        {
            listBoardData.length = 0;
        }
    };

    CompoListBoardDefault.prototype.removeBoard= function(boardName)
    {
        var boardData = getBoard(boardName);
        if (boardData == null)
        {
            return;
        }

        var delBoard = this.scrollItemArea.getChildByName(boardData.roomId) ;
        if (delBoard != null)
        {
            delBoard.destroy();
            this.scrollItemArea.removeChild(delBoard);
            this.itemListBoardPoolControler.addPool(delBoard);
        }

        var ind = this.listBoardData.indexOf(boardData);
        this.listBoardData.splice(ind, 1);

        this.arrangeListBoards(ind);

    };

    CompoListBoardDefault.prototype.compareMaxBetBoardData= function(boardId1, boardId2)
    {
        var room1 = gameLoader.global.getRoom(boardId1);
        var room2 = gameLoader.global.getRoom(boardId2);
        if (room1 == null || room2 == null)
            return 0;

        var roomInfo1 = RoomInfo.fromRoom(room1);
        var roomInfo2 = RoomInfo.fromRoom(room2);

        var maxBet1 = roomInfo1.getTaiXiuMaxBet();
        var maxBet2 = roomInfo2.getTaiXiuMaxBet();

        var ownerCoin1 = roomInfo1.ownerCoin;
        var ownerCoin2 = roomInfo2.ownerCoin;

        if (maxBet1 > maxBet2)
            return boardId2 - boardId1;
        else if (maxBet1 < maxBet2)
            return boardId1 - boardId2;
        else
        {
            if (ownerCoin1 > ownerCoin2)
                return boardId2 - boardId1;
            else if (ownerCoin1 < ownerCoin2)
                return boardId1 - boardId2;
        }
        return 0;

    };

    CompoListBoardDefault.prototype.compareMaxBetBoardData= function(boardId1, boardId2)
    {
        var room1 = gameLoader.global.getRoom(boardId1);
        var room2 = gameLoader.global.getRoom(boardId2);
        if (room1 == null || room2 == null)
            return 0;

        var roomInfo1 = RoomInfo.fromRoom(room1);
        var roomInfo2 = RoomInfo.fromRoom(room2);

        var maxBet1 = roomInfo1.getTaiXiuMaxBet();
        var maxBet2 = roomInfo2.getTaiXiuMaxBet();

        var ownerCoin1 = roomInfo1.ownerCoin;
        var ownerCoin2 = roomInfo2.ownerCoin;

        if (maxBet1 > maxBet2)
            return boardId2 - boardId1;
        else if (maxBet1 < maxBet2)
            return boardId1 - boardId2;
        else
        {
            if (ownerCoin1 > ownerCoin2)
                return boardId2 - boardId1;
            else if (ownerCoin1 < ownerCoin2)
                return boardId1 - boardId2;
        }
        return 0;

    };

    CompoListBoardDefault.prototype.compareBetCoinOrRoomIdForBoardData= function(betCoin1, betCoin2,boardId1,boardId2)
    {
        /*if (betCoin1 > betCoin2)
        {
            return betCoin2 - betCoin1 ;
        }
        else
        {
            if (betCoin1 < betCoin2)
            {
                return  betCoin1 - betCoin2;
            }
            else
            {
                if (boardId1 > boardId2)
                {
                    return Array.DESCENDING;
                }
                else
                {
                    if (boardId1 < boardId2)
                    {
                        return -Array.DESCENDING;
                    }
                }
            }
        }
        return 0;*/

    };

    CompoListBoardDefault.prototype.updateArrNick= function(room)
    {
        var boardId = room;
      //  var roomInfo:RoomInfo = RoomInfo.fromRoom(room);
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
           // boardData.arrNick = roomInfo.arrNick;
           // boardData = null;
        }
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateArrayNick(roomInfo.arrNick);
            compoItemListBoard = null;
        }
        //this.updateRule(boardId, RoomInfo.fromRoom(room).rules);

       /* if (gameLoader.global.isGameTaiXiu ||
            gameLoader.global.isGameLucky ||
            gameLoader.global.isGameXocDia)
        {
            if(!gameLoader.global.isGameXocDia)
                this.updateBetCoin(boardId, roomInfo.numView);
            else
                this.updateBetCoin(boardId, roomInfo.betCoin);
            this.updateBoardForMillionaire(boardId, roomInfo.getTaiXiuMaxBet());
        }
        else
            this.updateBoardForMillionaire(boardId, roomInfo.ownerCoin);*/
    };

    CompoListBoardDefault.prototype.updateBetCoin= function(boardId,betCoin)
    {
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
            boardData.betCoin = betCoin;
            boardData = null;
        }
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateBetCoin(betCoin);
            compoItemListBoard = null;
        }

        this.reArrangePositionAllItemListBoard();
    };

    CompoListBoardDefault.prototype.reArrangePositionAllItemListBoard= function(boardId,boardOwnerCoin)
    {
        this.listBoardData = listBoardData.sort(SortByBetCoinForBoardData);
        this.listBoardData = listBoardData.reverse();
        this.arrangeListBoards(0);
    };

    CompoListBoardDefault.prototype.SortByBetCoinForBoardData= function(value1,value2)
    {
        return value2 - value1;
    };

    CompoListBoardDefault.prototype.arrangeListBoards= function(index)
    {
        var tempy =0;
        var tempx =0;

        var compoItemListBoard;
        var boardData;
        for (var currentIndex = index; currentIndex < this.listBoardData.length; currentIndex++)
        {
            boardData = this.listBoardData[currentIndex];
            compoItemListBoard = this.scrollItemArea.getChildByName(boardData.roomId) ;
            if (compoItemListBoard == null)
                break;
            else
            {
                tempx =400;
                if(currentIndex==0)
                {
                    tempx =0;
                }
                else
                if(currentIndex%2==0 && currentIndex!=0)
                {
                    tempx =0;
                    tempy = currentIndex * 100;

                }
                compoItemListBoard.x = tempx;
                compoItemListBoard.y = tempy;
            }
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.updateBoardForMillionaire= function(boardId,boardOwnerCoin)
    {
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
            boardData.ownerCoin = boardOwnerCoin;
            boardData = null;
        }
        var compoItemListBoard = _scroll.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateBoardForMillionaire(boardOwnerCoin);
            compoItemListBoard = null;
        }

        if (gameLoader.global.isGameTaiXiu ||
            gameLoader.global.isGameLucky)
        {
            reArrangePositionAllItemListBoard();
        }
    };

    CompoListBoardDefault.prototype.updateBoardStatus= function(boardId, content)
    {
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
            boardData.status = content;
            boardData = null;
        }


        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateBoardStatus(content);
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.updateCustomMaxPlayer= function(boardId, customMaxPlayer)
    {
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateCustomMaxPlayer(customMaxPlayer);
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.updateGopGa= function(boardId, isGopGa)
    {
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateIsGopGa(isGopGa);
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.updateLockBoard= function(boardId, isLocked)
    {
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
            boardData.isLock = isLocked;
            boardData = null;
        }
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId);
        if (compoItemListBoard)
        {
            compoItemListBoard.updateLockBoard(isLocked);
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.updatePasswordBoardStatus= function(boardId, hasPassword)
    {
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
            boardData.hasPassword = hasPassword;
            boardData = null;
        }
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.hasPassword = hasPassword;
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.updateRule= function(boardId,rules)
    {
        var boardData = this.getBoard(boardId);
        if (boardData)
        {
            boardData.rules = rules;
           /* if (gameLoader.global.gameID == GlobalConstants.XocDiaId)
                boardData.updateMaxBetWithRule();*/
            boardData = null;
        }
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId) ;
        if (compoItemListBoard)
        {
            compoItemListBoard.updateRule(rules);
            compoItemListBoard = null;
        }

        if (gameLoader.global.gameID == GlobalConstants.XiToGameId || gameLoader.global.gameID == GlobalConstants.PokerGameId)
            this.reArrangePositionAllItemListBoard();
    };

    CompoListBoardDefault.prototype.updateSoloBoard= function(boardId, isSolo)
    {
        var compoItemListBoard = this.scrollItemArea.getChildByName(boardId);
        if (compoItemListBoard && !CompoListBoardDefault.isRoomDefault(int(boardId)))
        {
            compoItemListBoard.updateIsSoloBoard(isSolo);
            compoItemListBoard = null;
        }
    };

    CompoListBoardDefault.prototype.getBoard= function(boardId)
    {
        var numBoard = this.listBoardData.length;
        var boardData;
        for (var i = 0; i < numBoard; i++)
        {
            boardData = this.listBoardData[i];
            if (boardData.roomId == boardId)
            {
                return boardData;
            }
        }
        return null;
    };

    CompoListBoardDefault.isRoomDefault= function(roomId)
    {
        /*var gameLoader = GameLoader.getInstance();
         var room = gameLoader.global.getRoom(roomId);
         if (room == null)
         return false;
         var roomInfo = RoomInfo.fromRoom(room);
         return roomInfo.isDefault;*/
    };
    return CompoListBoardDefault;
});