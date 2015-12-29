/**
 * Created by phuongtv on 12/11/2015.
 */
function Main() {
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = new PIXI.autoDetectRenderer(
        512,
        384,
        {view:document.getElementById("game-canvas")}
    );

    this.scroller = new Scroller(this.stage);

    requestAnimationFrame(this.update.bind(this));
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};