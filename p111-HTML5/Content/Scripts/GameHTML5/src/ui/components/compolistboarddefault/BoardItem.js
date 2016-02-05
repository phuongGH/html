/**
 * Created by hungtd on 1/15/2016.
 */

define(function (require) {

    var CompoListBoardDefault_tooltip_mc    =  require("ui/components/compolistboarddefault/MovieClipResources/BoardAssets/CompoListBoardDefault_tooltip_mc");
    var CompoListBoardDefault_status_mc     =  require("ui/components/compolistboarddefault/MovieClipResources/BoardAssets/CompoListBoardDefault_status_mc");
    var Board                               =  require("ui/components/compolistboarddefault/MovieClipResources/BoardAssets/Board");
    var Ghe_us                              =  require("ui/components/compolistboarddefault/MovieClipResources/BoardAssets/Ghe_us");


    BoardItem.prototype = Object.create(PIXI.Container.prototype);
    BoardItem.prototype.constructor = BoardItem;



    Object.defineProperties(BoardItem.prototype, {
        IsJoinView:{
            vaule:false,
            writable:true
        },

        ItemListBoard:{
            vaule:null,
            writable:true
        },

        chair1:{
            vaule:null,
            writable:true
        },

        chair2:{
            vaule:null,
            writable:true
        },

        chair3:{
            vaule:null,
            writable:true
        },

        chair4:{
            vaule:null,
            writable:true
        },

        chair5:{
            vaule:null,
            writable:true
        },

        chair6:{
            vaule:null,
            writable:true
        },

        chair7:{
            vaule:null,
            writable:true
        },

        chair8:{
            vaule:null,
            writable:true
        },

        chair9:{
            vaule:null,
            writable:true
        },

        board_mc:{
            vaule:null,
            writable:true
        },

        btnKick:{
            vaule:null,
            writable:true
        },

        btnHide:{
            vaule:null,
            writable:true
        },

        tooltip_mc:{
            vaule:null,
            writable:true
        },

        boardStatus_mc:{
            vaule:null,
            writable:true
        },

        iconGopGa:{
            vaule:null,
            writable:true
        },

        maxPlayer:{
            vaule:0,
            writable:true
        }
    });

    function BoardItem(MvParent, maxPlayer)
    {
        PIXI.Container.call(this);
        this.ItemListBoard = MvParent;
        this.maxPlayer = maxPlayer;
        this._init();
    }

    BoardItem.prototype._init= function()
    {
        this.tooltip_mc = new CompoListBoardDefault_tooltip_mc();
        this.tooltip_mc.x = 50.25;
        this.tooltip_mc.y = -20;

        this.tooltip_mc.hitArea = PIXI.Rectangle.NulLRectangle;
        this.tooltip_mc.interactive =false;



        this.addChild(this.tooltip_mc);

      /*  this.boardStatus_mc = new CompoListBoardDefault_status_mc();
        this.boardStatus_mc.x = 143.15;
        this.boardStatus_mc.y = -36.45;
        this.boardStatus_mc.width = 94.65;
        this.boardStatus_mc.height = 37.5;
        this.addChild(this.boardStatus_mc);*/
        var a = PIXI.Texture.fromImage('icon_ga.png');
        this.iconGopGa = new PIXI.Sprite(PIXI.Texture.fromImage('icon_ga.png'));
        this.iconGopGa.x = 20.15;
        this.iconGopGa.y = -36.45;
        this.iconGopGa.visible = true;
        this.iconGopGa.interactive = false;
        this.iconGopGa.mouseChildren = false;
        this.addChild(this.iconGopGa);

        this.board_mc = new Board();
        /*if (this.maxPlayer == 4 && (gameLoader.global.gameID == GlobalConstants.DanhChanGameId
            || gameLoader.global.gameID == GlobalConstants.DanhChanBetaId)){
            this.board_mc.setBoard(1);
            this.board_mc.x = 96.5;
            this.board_mc.y = 55.85;
        }
        else if (this.maxPlayer == 5)
        {
            this.board_mc.setBoard(1);
            this.board_mc.x = 100.1;
            this.board_mc.y = 65;
        }
        else if (this.maxPlayer == 9)
        {
            this.board_mc.setBoard(1);
            this.board_mc.x = 97;
            this.board_mc.y = 55.55;
            if (gameLoader.global.gameID == GlobalConstants.LiengId)
            {
                this.board_mc.x = 87;
                this.board_mc.y = 45.55;
            }
        }
        else if (this.maxPlayer == 4 || this.maxPlayer == 6 || this.maxPlayer == 2)
        {
            if (gameLoader.global.gameID == GlobalConstants.LiengId)
            {
                this.board_mc.setBoard(1);
                this.board_mc.x = 96.5;
                this.board_mc.y = 55.85;
            }
            else
            {
                this.board_mc.setBoard(1);
                this.board_mc.x = 96.5;
                this.board_mc.y = 55.85;
            }
        }
        else if (this.maxPlayer == 999)
        {
            this.board_mc.setBoard(1);
            this.board_mc.x = 100.1;
            this.board_mc.y = 55.55;
        }

        this.board_mc.name = "board_mc";*/
        this.addChildAt(this.board_mc, 0);

        this.btnKick = new PIXI.Sprite(PIXI.Texture.fromImage('Kick_btn.png'));
        this.btnKick.x = 150.95;
        this.btnKick.y = 36.35;
        this.btnKick.name = "btnKick";
        this.addChild(this.btnKick);

        this.btnHide = new PIXI.Sprite(PIXI.Texture.fromImage('Hide_btn.png'));
        this.btnHide.x = 50.25;
        this.btnHide.y = 36.35;
        this.btnHide.name = "btnHide";
        this.addChild(this.btnHide);
    };

    BoardItem.prototype.reset= function()
    {
        if (this.chair1)
            this.chair1.visible = false;
        if (this.chair2)
            this.chair2.visible = false;
        if (this.chair3)
            this.chair3.visible = false;
        if (this.chair4)
            this.chair4.visible = false;
        if (this.chair5)
            this.chair5.visible = false;
        if (this.chair6)
            this.chair6.visible = false;
        if (this.chair7)
            this.chair7.visible = false;
        if (this.chair8)
            this.chair8.visible = false;
        if (this.chair9)
            this.chair9.visible = false;
    };

    BoardItem.prototype.loadData= function()
    {
        var i;

       /* if (gameLoader.global.isGameTaiXiu ||
            gameLoader.global.isGameLucky ||
            gameLoader.global.isGameXocDia)
        {
            this.getAvatar(1);
        }
        else
        {*/
            var maxPLer = this.ItemListBoard.maxPlayer;
            for (i = 1; i <= maxPLer; i++)
            {
                this.getChair(i).visible = true;
               // this.getAvatar(i).visible= true;
            }
      /*  }*/

        this.arrangePositionChair();
    };

   /* BoardItem.prototype.getAvatar= function(i){
        switch (i)
        {
            case 1:
                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            case 5:

                break;
            case 6:

                break;
            case 7:

                break;
            case 8:

                break;
            case 9:

                break;
        }
        return null;
    }*/

    BoardItem.prototype.getChair= function(i){
        switch (i)
        {
            case 1:
                if (this.chair1 == null)
                {
                    this.chair1 = new Ghe_us();
                    this.chair1.name = "chair1";
                    this.addChildAt(this.chair1, 0);
                }
                return this.chair1;
                break;
            case 2:
                if (this.chair2 == null)
                {
                    this.chair2 = new Ghe_us();
                    this.chair2.name = "chair2";
                    this.addChildAt(this.chair2, 0);
                }
                return this.chair2;
                break;
            case 3:
                if (this.chair3 == null)
                {
                    this.chair3 = new Ghe_us();
                    this.chair3.name = "chair3";
                    this.addChildAt(this.chair3, 0);
                }
                return this.chair3;
                break;
            case 4:
                if (this.chair4 == null)
                {
                    this.chair4 = new Ghe_us();
                    this.chair4.name = "chair4";
                    this.addChildAt(this.chair4, 0);
                }
                return this.chair4;
                break;
            case 5:
                if (this.chair5 == null)
                {
                    this.chair5 = new Ghe_us();
                    this.chair5.name = "chair5";
                    this.addChildAt(this.chair5, 0);
                }
                return this.chair5;
                break;
            case 6:
                if (this.chair6 == null)
                {
                    this.chair6 = new Ghe_us();
                    this.chair6.name = "chair6";
                    this.addChildAt(this.chair6, 0);
                }
                return this.chair6;
                break;
            case 7:
                if (this.chair7 == null)
                {
                    this.chair7 = new Ghe_us();
                    this.chair7.name = "chair7";
                    this.addChildAt(this.chair7, 0);
                }
                return this.chair7;
                break;
            case 8:
                if (this.chair8 == null)
                {
                    this.chair8 = new Ghe_us();
                    this.chair8.name = "chair8";
                    this.addChildAt(this.chair8, 0);
                }
                return this.chair8;
                break;
            case 9:
                if (this.chair9 == null)
                {
                    this.chair9 = new Ghe_us();
                    this.chair9.name = "chair9";
                    this.addChildAt(this.chair9, 0);
                }
                return this.chair9;
                break;
        }
        return null;
    };

    BoardItem.prototype.arrangePositionChair= function(){
        switch(this.ItemListBoard.maxPlayer)
        {
            case 2:

                break;
            case 4:
               /* if (gameLoader.global.gameID == GlobalConstants.DanhChanGameId
                    || gameLoader.global.gameID == GlobalConstants.DanhChanBetaId)
                {

                }
                else*/
                {
                    this.chair1.rotation =  180 * (Math.PI/180);
                    this.chair1.x = 97;
                    this.chair1.y = 120;

                    this.chair2.rotation = 90 * (Math.PI/180);
                    this.chair2.x = 200;
                    this.chair2.y = 60;

                    this.chair3.rotation = 0 * (Math.PI/180);
                    this.chair3.x = 97;
                    this.chair3.y = -5;

                    this.chair4.rotation = -90 * (Math.PI/180);
                    this.chair4.x = -5;
                    this.chair4.y = 60;

                }
                break;
            case 5:

                break;
            case 6:

                break;

            case 9:
              /*  if (gameLoader.global.gameID == GlobalConstants.PokerGameId)
                {

                }
                else if	(gameLoader.global.gameID == GlobalConstants.LiengId)*/
                {

                }
                break;
            case 999:

                break;
        }
    };

   /* BoardItem.prototype.updateSoloBoard= function(){
        var i;
        var maxPLer = this.ItemListBoard.maxPlayer;
        if (CompoListBoardDefault.isRoomDefault((ItemListBoard.boardData.roomId)) )
        {
            return;
        }

        if (this.ItemListBoard.boardData.isSolo)
        {
            //Ẩn hết các ghế
            for (i = 1; i <= maxPLer; i++)
            {
                this.getChair(i).visible = false;

            }

            //xét vị trí cho các avatar
            var avatar;
            var count:int = 0;
            var nick:Object;
            for (i = 0; i < this.ItemListBoard.boardData.arrNick.length; i++)
            {
                nick = this.ItemListBoard.boardData.arrNick[i];
                avatar = this.getAvatar(nick.position);
                avatar.visible = true;
                if (!isNaN(avatar.UserId) && avatar.UserId!= 0 && avatar.Position > 0)
                {
                    count++;
                    setPositionForSoloBoard(avatar, avatar.IsOwner, false);
                }

            }
            var chairPos:int;
            var chair:ghe_us;
            if (count < 2)
            {
                if (avatar)
                {
                    switch (ItemListBoard.maxPlayer)
                    {
                        case 4:
                            chairPos = avatar.Position + 2 > this.ItemListBoard.maxPlayer?avatar.Position + 2  - this.ItemListBoard.maxPlayer:avatar.Position + 2 ;
                            chair = this.getChair(chairPos);
                            chair.visible = true;
                            break;
                        case 5:
                        case 6:
                            chairPos = avatar.Position + 3 > this.ItemListBoard.maxPlayer?avatar.Position + 3  - this.ItemListBoard.maxPlayer:avatar.Position + 3 ;
                            chair = this.getChair(chairPos);
                            chair.visible = true;
                            break;

                    }

                    setPositionForSoloBoard(chair, false, true);
                }
            }
        }
        else
        {
            arrangePositionChair();
        }
    }*/

   /* BoardItem.prototype.updateSoloBoard= function(object, isOwner, isChair){
       /!* switch (ItemListBoard.maxPlayer)
        {
            case 4:
                if (isOwner)
                {

                }
                else if (!isChair)
                {

                }
                else
                {
                    if (gameLoader.global.gameID == GlobalConstants.DanhChanGameId
                        || gameLoader.global.gameID == GlobalConstants.DanhChanBetaId)
                    {

                    }
                    else
                    {

                    }

                }
                break;
            case 5:
                if (isOwner)
                {

                }
                else if (!isChair)
                {

                }
                else
                {

                }

                break;
            case 6:
                if (isOwner)
                {

                }
                else if (!isChair)
                {

                }
                else
                {

                }


            default:
        }*!/
    }*/

    BoardItem.prototype.updateCustomMaxPlayer= function(customMaxPlayer, boardId){
     /*   if (gameLoader.global.gameID != GlobalConstants.PokerGameId && gameLoader.global.gameID != GlobalConstants.LiengId)
            return;
        var room:Room = gameLoader.global.getRoom(boardId);
        if (room == null)
            return;
        var roomInfo:RoomInfo = RoomInfo.fromRoom(room);
        if (roomInfo.isDefault)
            return;
        var count:int = 0;
        var j:int = 0;
        var numUserInRoom:int = roomInfo.getTotalPlayer();
        var ghe:Ghe_us;
        var avatarInBoard:AvatarInBoard;
        for (j = 1; j <= gameLoader.global.maxPlayer; j++)
        {
             getChair(j);

        }*/
    };

    return BoardItem;
});
