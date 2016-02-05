/**
 * Created by hungtd on 1/15/2016.
 */

define(function (require) {


   /* CustomScrollPane.prototype = Object.create(GOWN.prototype);*/
    CustomScrollPane.prototype.constructor = CustomScrollPane;

    Object.defineProperties(CustomScrollPane.prototype, {
        layoutGroup:{
            value:null,
            writable:true
        },

        layoutGroup:{
            value:null,
            writable:true
        },

        scrollArea:{
            value:null,
            writable:true
        },

        width:{
            value:0,
            writable:true
        },

        height:{
            value:0,
            writable:true
        }


    });

    function CustomScrollPane(w,h)
    {
        this.width = w;
        this.height =h;
        this._init();
    }

    CustomScrollPane.prototype._init= function()
    {
        this.layoutGroup = new GOWN.LayoutGroup();
        this.layoutGroup.layout = new GOWN.VerticalLayout();
        this.scrollArea = new GOWN.ScrollArea(this.layoutGroup,true,1);
        this.scrollArea._useMask = true;
        this.scrollArea.width = this.width;
        this.scrollArea.height = this.height;

    };

    CustomScrollPane.prototype.addItem= function(object)
    {
        this.layoutGroup.addChild(object);
    };

    CustomScrollPane.prototype.getScrollArea= function()
    {
       return this.scrollArea;
    };



    return CustomScrollPane;
});
