/**
 * Created by phuongtv on 12/11/2015.
 */
function Scroller(stage){

    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.viewportX = 0;
}

/*Scroller.prototype.update = function() {
    this.far.update();
    this.mid.update();
};*/

Scroller.prototype.setViewportX = function(viewportX) {
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.viewportX = viewportX;
};

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};