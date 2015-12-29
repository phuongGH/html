function init() {

	var width = document.getElementById("game-canvas").width;
  	
  	stage = new PIXI.Stage(0x66FF99);

  	renderer = PIXI.autoDetectRenderer(512,384,
    	{view:document.getElementById("game-canvas")}
  	);

  	var farTexture = PIXI.Texture.fromImage("images/bg-far.png");
  	//far = new PIXI.Sprite(farTexture);
  	far = new PIXI.TilingSprite(farTexture, 512, 256);
	far.position.x = 0;
	far.position.y = 0;
	far.tilePosition.x = 0;
  	far.tilePosition.y = 0;
	stage.addChild(far);

	var midTexture = PIXI.Texture.fromImage("images/bg-mid.png");
	//mid = new PIXI.Sprite(midTexture);
	mid = new PIXI.TilingSprite(midTexture, 512,256);
	mid.position.x = 0;
	mid.position.y = 128;
	mid.tilePosition.x = 0;
  	mid.tilePosition.y = 0;
	stage.addChild(mid);


  	//renderer.render(stage);

  	requestAnimationFrame(update);
}

function update() {

	//far.position.x -= 0.128;
	far.tilePosition.x -= 0.128;
	//mid.position.x -= 0.64;
	mid.tilePosition.x -= 0.64;

	renderer.render(stage);

	requestAnimationFrame(update);
}