/**
 * Created by hungtd on 1/15/2016.
 */
define(function (require) {

    var CompoItemListBoard =  require("ui/components/compolistboarddefault/CompoItemListBoard");

   // ItemListBoardPoolControler.prototype = Object.create(PIXI.Container.prototype);
    ItemListBoardPoolControler.prototype.constructor = ItemListBoardPoolControler;

    Object.defineProperties(ItemListBoardPoolControler.prototype, {

        poolContainer:{
            value:[],
            writable:false,
        }
    });

    function ItemListBoardPoolControler()
    {
        this._init();
    }

    ItemListBoardPoolControler.prototype._init= function()
    {
        poolContainer=[];
    };

    ItemListBoardPoolControler.prototype.getPool= function(maxPlayer)
    {
        var obj = null;
        if (poolContainer.length == 0)
            obj = new CompoItemListBoard(maxPlayer);
        else
        {
            obj = poolContainer.pop() instanceof CompoItemListBoard;
            //obj.reuseConstructor(maxPlayer);
            //KF.showLog("-->Get From Pool: "+poolContainer.length);
        }
        return obj;
    };

    ItemListBoardPoolControler.prototype.addPool= function(board)
    {
        poolContainer.push(obj);
    };

    return ItemListBoardPoolControler;
});