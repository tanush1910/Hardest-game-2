var iron,ironImage;
var robot;
var PLAY=1;
var END=0;
var gameState=PLAY;
var iron1,iron2,iron3,iron4,iron5;
var score = 0;
var vilin,vImage;
var groundImage,ground,machineGroup,enemyGroup;
var invisibleGround,stoneGroup;
var r;
var life=3
var life1,life2,life3,lifeImage;
var stones;
var stone1,stone2,stone3,stone4,stone5;
var restart,restartImage,gameover,gameImage;
var avengersSound;
var jump,checkpoint;
var avengersAssemble;
var arrow,arrowImage,arrowGroup;
var diamondscore=0;
var bSound;

function preload(){
ironImage=loadImage("images (16) copy.png") ;
 iron1=loadImage("images (20) copy.png") ;
  iron2=loadImage("download (5) copy.png");
  iron3=loadImage("aryan-1.png");
  iron4=loadImage("g.png");
  iron5=loadImage("download (6) copy-1.png")
groundImage=loadImage("61l+rZ1R-+L._AC_SL1000_.jpg");
  vImage1=loadImage("download (9) copylle.png")
  vImage2=loadImage("download (8) copy.png")
  vImage3=loadImage("dd.png")
  vImage4=loadImage("www copy.png")
  vImage5=loadImage("download (10) copy.png")
  sImage=loadImage("sw.png");
  stone1=loadImage("a-1.png")
  stone2=loadImage("f.png")
  stone3=loadImage("hd.png")
  stone4=loadImage("h.png")
  stone5=loadImage("o.png");
  lifeImage=loadImage("unnamed.png")
  restartImage=loadImage("l.png")
  gameImage=loadImage("e.png")
 avengersSound=loadSound("The-Avengers-Theme-Song.mp3");
  jump=loadSound("salamisound-2422598-sfx-jump-4-game-computer.mp3");
  checkpoint=loadSound("mixkit-orchestra-game-over-1950.wav");
  avengersAssemble=loadSound("avengers_assemble.mp3")
  arrowImage=loadImage("z.png");
  
  bSound=loadSound("12-Gauge-Pump-Action-Shotgun-Close-Gunshot-A-www.fesliyanstudios.com.mp3");
  startImage=loadImage("tyr.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  ground=createSprite(width/2, windowHeight-25,windowWidth*2, 35);
  ground.addImage(groundImage);
  ground.scale=2;
  ground.x = ground.width /2;
  
  iron=createSprite(70,360,10,10);
  iron.addImage(ironImage);
  iron.scale=0.6;
  iron.setCollider("rectangle",0,0,60,240);
  iron.debug=false;
  
  
  restart=createSprite(width/2,windowHeight/2+50);
  restart.addImage(restartImage);
  restart.scale=0.3;
  
  
  start=createSprite(300,250,10,10);
  start.addImage(startImage);
  start.scale=0.1;
  
  
  
  gameover=createSprite(width/2,windowHeight/2);
  gameover.addImage(gameImage);
 gameover.scale=0.7;
  300,440,600,10
  
  invisibleGround=createSprite(width/2, windowHeight-10,windowWidth*2, 35);
  invisibleGround.visible=false;
  
  enemyGroup=  new Group();
  machineGroup=new Group();
  stoneGroup= new Group();
  arrowGroup= new Group();
  
  score=0;
  life = 3;
  avengersSound.loop();
  
  
  life1=createSprite(550,30,10,10)
  life1.addImage(lifeImage);
  life1.scale=0.2;
  
  
  
  life2=createSprite(450,30,10,10)
  life2.addImage(lifeImage);
  life2.scale=0.2;
  
 
  life3=createSprite(500,30,10,10)
  life3.addImage(lifeImage);
  life3.scale=0.2;
  
  
  
  
}

function draw(){
  camera.position.x = iron.x
  camera.position.y = windowHeight/2
  
  if (gameState===PLAY){
    
    gameover.visible=false;
    restart.visible=false;
    start.visible=false;
    ground.velocityX = -4
    mark();
    enemy();
    infinityStone(); 
    
  if(keyDown("right")){
      createArrow();
      bSound.play();
    }
    
    if(keyDown("up")&& iron.y >=100){
      iron.velocityY=-9;
      jump.play();
    }
    
    iron.velocityY = iron.velocityY + 0.8;
    
    if(ground.x < 0){
      ground.x = ground.width /2;
    }
    
   if(life<3){
      life1.destroy();
    } if (life<1){
      life2.destroy();
    } if(life<2){
      life3.destroy();
    }
    
    
    if(enemyGroup.isTouching(iron)) {
     life  = life - 1;
     gameState=END;
      avengersAssemble.play();
     }
    
   if(enemyGroup.isTouching(arrowGroup)){
     score=score+1;
     enemyGroup[0].destroy();
     
   }
    
    if(stoneGroup.isTouching(iron)) {
      diamondscore=diamondscore+1;
     stoneGroup[0].destroy();
    }
    
     if (machineGroup.isTouching(iron)){
        //console.log("aryan")
        machineGroup[0].destroy();
        var r = Math.round(random(1,5));
    if (r===1){
    iron.addImage(iron1)  
  } else if (r===2){
    iron.addImage(iron2)
  } else if (r===3){
    iron.addImage(iron3)
  } else if (r===4){
    iron.addImage(iron4)
  }else if (r===5){
    iron.addImage(iron5)
  }   
 }  
}
  if (gameState===END){
    
    iron.velocityY=0;
    restart.visible = true;
    if(life===0){
    gameover.visible = true;
      restart.visible = false;
      life2.visible=false;
      avengersSound.stop();
      checkpoint.play();
      enemyGroup.destroyEach();
    stoneGroup.destroyEach();
    machineGroup.destroyEach();
    arrowGroup.destroyEach();
    }
    
    
   if(mousePressedOver(restart)){
         if(life > 0){
           reset();
         }
       }
    ground.velocityX=0;
    iron.velocityX=0;
    
    enemyGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    machineGroup.setLifetimeEach(-1);
    
     stoneGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     machineGroup.setVelocityXEach(0);
  }
  iron.collide(invisibleGround);
  drawSprites();
  stroke("black");
  textSize(20);
  fill("white")
  text("SCORE:"+ score,20,30);
  stroke("black");
  textSize(20);
  fill("white")
   text("DIAMONDS :"+diamondscore,200,30);
  
}


function mark(){
   if (World.frameCount % 210===0){
  robot=createSprite(600,120,40,10);
  robot.y=Math.round(random(100,200))
  robot.scale=0.4;
 robot.addImage("q",sImage)
 
  
  robot.velocityX=-7;
  machineGroup.add(robot);
 } 
  
}
function enemy(){
  if (World.frameCount % 30 === 0){
  vilin=createSprite(windowWidth, windowHeight-45,windowWidth*2, 35);
   r = Math.round(random(1,5))
    if(r===1){
      vilin.addImage(vImage1)
    }else if(r===2){
      vilin.addImage(vImage2)
    }else if(r===3){
      vilin.addImage(vImage3)
    }else if(r===4){
      vilin.addImage(vImage4)
    }else if(r===5){
      vilin.addImage(vImage5)
    }
    vilin.scale=0.5;
    vilin.velocityX=-(9+1*score/80);
    vilin.y=Math.round(random(200,400))
    vilin.lifetime=150;
    enemyGroup.add(vilin);
    vilin.setCollider("rectangle",0,0,60,170);
    vilin.debug=false;
  
  }
}

function infinityStone(){
  if(World.frameCount%70===0){
    stones=createSprite(600,410,10,10);
    r = Math.round(random(1,4))
    if(r===1){
      stones.addImage(stone1)
     }else if(r===2){
       stones.addImage(stone2)
     }else if(r===3){
       stones.addImage(stone3)
     } else if(r===4){
       stones.addImage(stone4)
     }else if(r===5){
       stones.addImage(stone5)
     }
       stones.scale=0.3
       stones.velocityX = -6 
       stones.y=Math.round(random(200,500))
       stones.lifetime=150;
    stoneGroup.add(stones);
  } 
     }
function createArrow() {
 
  var arrow= createSprite(100,100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = iron.x;
  arrow.y=iron.y;
  arrow.velocityX = 4;
  arrow.lifetime = 110;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  return arrow;
 
}
    
  function reset(){
    gameState=PLAY;
    restart.visble=false;
    gameover.visible=false;
    enemyGroup.destroyEach();
    stoneGroup.destroyEach();
    machineGroup.destroyEach();
    arrowGroup.destroyEach();
    
  }
