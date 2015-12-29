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

    this.scrollSpeed = Main.MIN_SCROLL_SPEED;
    this.loadSpriteSheet();
}

//Main.SCROLL_SPEED = 5;
Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 15;
Main.SCROLL_ACCELERATION = 0.005;

Main.prototype.update = function() {
    //this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.scroller.moveViewportXBy(this.scrollSpeed);
    this.scrollSpeed += Main.SCROLL_ACCELERATION;
    if (this.scrollSpeed > Main.MAX_SCROLL_SPEED)
    {
        this.scrollSpeed = Main.MAX_SCROLL_SPEED;
    }
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["images/wall.json"];
    PIXI.loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this));
};

Main.prototype.spriteSheetLoaded = function() {

    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));


};
