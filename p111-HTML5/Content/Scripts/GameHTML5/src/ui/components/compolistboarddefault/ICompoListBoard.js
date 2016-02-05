/**
 * Created by hungtd on 1/15/2016.
 */
/// <reference path="pixi.min.js" />
/// <reference path="pixi.min.js" />
/// <reference path="pixi.min.js" />

define(function (require) {

    //contruc
    ICompoListBoard.prototype = Object.create(PIXI.Container.prototype);          //This is code for inheritance
    ICompoListBoard.prototype.constructor = ICompoListBoard;


    Object.defineProperties(ICompoListBoard.prototype, {
        gameName_STR: {
            value: "",
            writable: true
        },


    });

    function ICompoListBoard() {
        PIXI.Container.call(this);
        //This is code for inheritance
    }
    ICompoListBoard.prototype.addBoard= function(room_ROOM){};


    ICompoListBoard.prototype.loadBoards= function(listRoom_ARR)
    {

    };

    ICompoListBoard.prototype.removeAll= function()
    {

    };

    ICompoListBoard.prototype.removeBoard= function(roomId_STR)
    {

    };

    ICompoListBoard.prototype.updateArrNick= function(room_ROOM)
    {

    };

    ICompoListBoard.prototype.updateBetCoin= function(boardId_Str,betCoin_Num)
    {

    };

    ICompoListBoard.prototype.updateBoardForMillionaire= function(boardId_Str,boardOwnerCoin_Num)
    {

    };

    ICompoListBoard.prototype.updateBoardStatus= function(boardId_Str, content_Str)
    {

    };


    ICompoListBoard.prototype.updateGopGa= function(boardId_STR, isGopGa_BOO)
    {

    };

    ICompoListBoard.prototype.updateLockBoard= function(boardId_STR, isLocked_BOO)
    {

    };


    ICompoListBoard.prototype.updatePasswordBoardStatus= function(boardId_STR, status_Boo)
    {

    };

    ICompoListBoard.prototype.updateRule= function(boardId_STR,rules_STR)
    {

    };

    ICompoListBoard.prototype.updateSoloBoard= function(boardId_STR, isSolo_BOO)
    {

    };

    return ICompoListBoard;
});