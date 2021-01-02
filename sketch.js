var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOver,gameOver_img;
var restart,restart_img;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOver_img =loadImage("gameOver.png");
  restart_img= loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  
  trex = createSprite(200,650,20,50);
  trex.setCollider("circle",0,0,30);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(-500,680,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /4;
 
  
  invisibleGround = createSprite(200,690,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver=createSprite(300,350,20,20);
  gameOver.scale=0.7;
  gameOver.addImage("over",gameOver_img);
  restart=createSprite(300,390,20,20);
  restart.scale=0.7;
  restart.addImage("reset",restart_img);
  trex.addAnimation("out",trex_collided);
  
  
  
}

function draw() {
  background(0,2,0);
  camera .x=trex.x;
  gameOver.x=restart.x=camera.x;
  
  
  if(gameState===PLAY){
    
    gameOver.visible=false;
    restart.visible=false;
     ground.velocityX = -7;
   score = score + Math.round(getFrameRate()/60);
   fill("yellow")
   textSize (15);
  text("SCORE: "+ score, 500,50);
  fill("yellow")
   textSize (20);
  text("Score 100 to Win this Game " ,100,100); 
  
  if(keyDown("space")&&trex.y>=661) {
    trex.velocityY = -25;
  }
  
  trex.velocityY = trex.velocityY + 2
  
  if (ground.x < 0.5){
    ground.x = ground.width/4;
  }
  if(score===100){
    // playSound("jump.mp3");
    gameOver.visible =false;
     gameState = END;
 

    
    
     //playSound("die.mp3");
   }  

   if(obstaclesGroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }  

    
 }else if(gameState===END){
   gameOver.visible = true;
  restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("out",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    fill(random(0,255),random(0,255),random(0,255));
    textSize(30);
    text("YOU WIN",130,200);
   

  if(mousePressedOver(restart)) {
    reset();
  }
   }
   console.log(trex.y)
   
  trex.collide(invisibleGround);
  
  spawnClouds();
  spawnobstacles();
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}








function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var cloud = createSprite(camera.x+width/2,620,40,10);
    cloud.y = Math.round(random(500,620));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnobstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.x+width/2,665,10,40);
    obstacle.velocityX = -7;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}