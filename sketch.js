var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

var FoodGroup;
var ObGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  goImage = loadImage("gameOver.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  ObGroup = new Group();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
    
    obstacles();
    spawnFood();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 10
      player.scale += +0.01;
    }

    if(ObGroup.isTouching(player)){
      gameState = END;
    }

    player.collide(ground);

  }

  if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;
    FoodGroup.destroyEach();
    ObGroup.destroyEach();
    gmo = createSprite(400,200,20,20);
    gmo.addImage(goImage); 
  }

  drawSprites();
  fill("white");
  textSize(15);
  text("SCORE : "+score,650,25);
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 350;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 70 === 0){
    var stone = createSprite(550,250,40,10);
    stone.y = random(250,370);
    stone.addImage(stoneImage);
    stone.scale = 0.05;
    stone.velocityX = -4;
    stone.lifetime = 240;
    player.depth = stone.depth + 2;
    ObGroup.add(stone);
  }
}
