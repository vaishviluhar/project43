var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup, orangeGroup;
var score;
var orange, orange_image;
var ground, ground_image;
var ground2;
var ground3;
var ground4;
var restart, restart_image;
var songq;
var chances = 5;
var survivalTime = 20;
var score = 0;
var gameState = "start";
var jungle, jungle1;
var q;
var w;
var e;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  orange_image = loadImage("orange.png");
  ground_image = loadImage("ground.PNG");
  restart_image = loadImage("Restart.PNG");
  songq = loadSound("zapsplat_nature_rainforest_tusked_frogs_close_by_birds_wind_trees_56744.mp3");
  jungle = loadImage("jungle.jpg");
  q = loadSound("Banana Peel Slip Zip-SoundBible.com-803276918.mp3");
  w = loadSound("109662__grunz__success.wav");
  e = loadSound("Sad_Trombone-Joe_Lamb-665429450.mp3");
}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(40, 345, 20, 20);
  monkey.addAnimation("r", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(115, 390, 20, 20);
  ground.addImage("q", ground_image);

  ground2 = createSprite(350, 390, 20, 20);
  ground2.addImage("e", ground_image);

  ground3 = createSprite(550, 390, 20, 20);
  ground3.addImage("w", ground_image);

  ground4 = createSprite(750, 390, 20, 20);
  ground4.addImage("y", ground_image);

  restart = createSprite(300, 200, 10, 10);
  restart.addImage("p", restart_image);
  restart.scale = 0.5;

  jungle1 = createSprite(200, 100, 20, 20);
  jungle1.addAnimation("k", jungle);
  jungle1.scale = 0.25;


  bananaGroup = new Group();
  orangeGroup = new Group();
  obstaclesGroup = new Group();

  songq.play();

}


function draw() {

  background(jungle);
  //background.velocity
  monkey.collide(ground);
  monkey.collide(ground2);
  monkey.collide(ground3);
  monkey.collide(ground4);


  if (gameState === "start") {
    background("orange");
    jungle1.visible = false;
    fill("black");
    textSize(15);
    textFont("algerian");
    text("PRESS ENTER TO START THE GAME..", 60, 25);
    text("PRESS UP ARROW KEY IF YOU WANT TO LONG JUMP.", 60, 60);
    text("PRESS SPACE FOR SHORT JUMP.", 60, 95);
    text("REMEMBER, LONG JUMPING REDUCES THE SURVIVAL TIME.", 60, 130);
    text("IF SURVIVAL TIME = 0, YOU LOSE THE GAME..", 60, 165);
    text("YOU HAVE FIVE CHANCES IN THE GAME.", 60, 200);
    text("IF YOU STEP ON AN OBSTACLE, YOU LOSE A CHANCE.", 60, 235);
    text("IF CHANCES = 0, YOU LOSE THE GAME.", 60, 270);
    text("EATING BANANAS INCREASES YOUR SURVIVAL TIME.", 60, 305);
    text("EAT ORANGES TO INCREASE BOTH YOUR CHANCES AND SURVIVAL TIME.", 60, 340);
    textFont("Arial Black");
    textSize(16);
    fill("red");
    text("ALL THE BEST!!!", 200, 375);

    if (keyDown("ENTER")) {

      gameState = "play"

    }


    restart.visible = false;
    monkey.visible = false;
    ground.visible = false;
    ground2.visible = false;
    ground3.visible = false;
  }


  if (gameState === "play") {



    jungle1.visible = true;
    monkey.visible = true;
    ground.visible = true;
    ground2.visible = true;
    ground3.visible = true;
    restart.visible = false;

    if (keyDown("space") && monkey.y > 320) {
      monkey.velocityY = -15;
      survivalTime = survivalTime - 1;

    }
    monkey.velocityY = monkey.velocityY + 0.6;
    if (keyDown("up") && monkey.y > 320) {

      monkey.velocityY = -22;
      survivalTime = survivalTime - 3;

    }

    monkey.velocityY = monkey.velocityY + 0.4;
    jungle1.velocityX = -4;
    ground.velocityX = -4;
    ground2.velocityX = -4;
    ground3.velocityX = -4;
    ground4.velocityX = -4;


    if (jungle1.x <= 30) {
      jungle1.x = 200;
      jungle1.x = jungle1.width / 2;
    }

    if (ground.x <= 0) {

      ground.x = 115;
      ground2.x = 350;
      ground3.x = 550;
      ground4.x = 750;
    }

    // if(monkey.collide(ground))
    // {
    //   monkey.scale = 0.1;
    // }

    if (chances <= 0 || survivalTime <= 0) {
      gameState = "end";
      e.play();
    }

    spawnbananas();
    spawnoranges();
    spawnobstacles();

  }

  if (gameState === "end") {

    restart.visible = true;
    //monkey.visible = false;
    jungle1.velocityX = 0;
    ground.velocityX = 0;
    ground4.velocityX = 0;
    ground2.velocityX = 0;
    ground3.velocityX = 0;
    bananaGroup.setVelocityEach(0);
    bananaGroup.destroyEach();
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    obstaclesGroup.setVelocityEach(0);
    obstaclesGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);


    if (mousePressedOver(restart)) {
      restart1();

    }
  }
  monkey.depth = jungle1.depth;
  monkey.depth = monkey.depth + 1;
  restart.depth = jungle1.depth;
  restart.depth = restart.depth + 1;
  ground.depth = jungle1.depth;
  ground.depth = ground.depth + 1;
  ground2.depth = jungle1.depth;
  ground2.depth = ground2.depth + 1;
  ground3.depth = jungle1.depth;
  ground3.depth = ground3.depth + 1;
  ground4.depth = jungle1.depth;
  ground4.depth = ground4.depth + 1;
  orangeGroup.depth = jungle1.depth;
  orangeGroup.depth = orangeGroup.depth + 1;
  jungle1.scale = 1.1;
  // jungle1.visible = false;


  drawSprites();
  textSize(16);
  fill("Orange");
  textFont("Times New Roman");
  text("Survival time =  " + survivalTime, 220, 20);

  textSize(16);
  fill("Orange");
  textFont("Times New Roman");
  text("Chances = " + chances, 470, 20);

  textSize(16);
  fill("Orange");
  textFont("Times New Roman");
  text("Score = " + score, 30, 20);

}

function spawnbananas() {


  if (frameCount % 100 === 0) {
    banana = createSprite(550, 200, 20, 20);
    banana.addImage("l", bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(180, 250));
    banana.velocityX = -12;
    banana.lifetime = 50;
    bananaGroup.add(banana);


  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.08) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.12;
    w.play();
  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.15) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.16;
    w.play();
  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.17) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.17;
    w.play();
  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.16) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.17;
    w.play();
  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.1) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.12;
    w.play();
  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.1) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.12;

  }
  if (monkey.isTouching(bananaGroup) && monkey.scale === 0.17) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
    monkey.scale = 0.17;
    w.play();
  }
}

function spawnoranges() {
  if (frameCount % 200 === 0) {
    orange = createSprite(550, 200, 20, 20);
    orange.addImage("z", orange_image);
    orange.scale = 0.015;
    orange.y = Math.round(random(120, 150));
    orange.velocityX = -25;
    orange.lifetime = 50;
    orangeGroup.add(orange);

  }
  if (monkey.isTouching(orangeGroup) && monkey.scale === 0.08 || monkey.scale === 0.12) {

    orangeGroup.destroyEach();
    survivalTime = survivalTime + 5;
    chances = chances + 1;
    score = score + 2;
    monkey.scale = 0.15;
    w.play();
  }


  if (monkey.isTouching(orangeGroup) && monkey.scale === 0.1) {

    orangeGroup.destroyEach();
    survivalTime = survivalTime + 5;
    chances = chances + 1;
    score = score + 2;
    monkey.scale = 0.12;
    w.play();
  }
  if (monkey.isTouching(orangeGroup) && monkey.scale === 0.15) {

    orangeGroup.destroyEach();
    survivalTime = survivalTime + 5;
    chances = chances + 1;
    score = score + 2;
    monkey.scale = 0.15;
    w.play();
  }
  if (monkey.isTouching(orangeGroup) && monkey.scale === 0.17) {

    orangeGroup.destroyEach();
    survivalTime = survivalTime + 5;
    chances = chances + 1;
    score = score + 2;
    monkey.scale = 0.17;
    w.play();
  }
}

function spawnobstacles() {

  if (frameCount % 70 === 0) {
    obstacle = createSprite(590, 360, 20, 20);
    obstacle.addImage("h", obstacleImage);
    obstacle.scale = 0.1;
    //obstacle.y = Math.(random(375, 350));
    obstacle.velocityX = -10;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 200);
    //obstacle.debug = true;
  }
  if (monkey.isTouching(obstaclesGroup)) {
    obstaclesGroup.destroyEach();
    chances = chances - 1;
    score = score - 1;
    monkey.scale = 0.08;
    q.play();
  }

}

function restart1() {
  gameState = "play";
  score = 0;
  chances = 3;
  survivalTime = 20;
  monkey.visible = true;
  //monkey.collide(ground);
  //gameOver.visible=false;
  restart.visible = false;
  monkey.scale = 0.1;

}