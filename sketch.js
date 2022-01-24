var trex, trex_running, trex_collided;
var ground, groundImage;
var cade_o_chao;
var ih_vai_chuve;
var ih_vai_chuve_image;
var trio_dos_cacto;
var cacto;
var cacto_com_terrinha;
var o_bonde_dos_cacto;
var duprinha_de_cacto_com_terrinha;
var duprinha_de_cacto;
var PLAY=1;
var END=0;
var game_stats=PLAY;
var obstacle_group;
var clouds_group;
var us_pontin=0;
var perdeu_mlquin;
var perdeu_mlquin_img;
var restart;
var restart_img;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ih_vai_chuve_image=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  trio_dos_cacto=loadImage("obstacle6.png");
  cacto=loadImage("obstacle5.png");
  cacto_com_terrinha=loadImage("obstacle4.png");
  o_bonde_dos_cacto=loadImage("obstacle3.png");
  duprinha_de_cacto_com_terrinha=loadImage("obstacle2.png");
  duprinha_de_cacto=loadImage("obstacle1.png");
  perdeu_mlquin_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  //criar sprite trex
  obstacle_group=createGroup();
  clouds_group=createGroup();
  trex = createSprite(50,160,20,50);
  trex.setCollider("circle",0,0,40);
  cade_o_chao=createSprite(200,190,400,10);
  cade_o_chao.visible=false;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("murio",trex_collided);
  perdeu_mlquin=createSprite(300,50,20,20);
  perdeu_mlquin.addImage(perdeu_mlquin_img);
  restart=createSprite(300,90,20,20);
  restart.addImage(restart_img);
  trex.scale = 0.5;
  restart.scale=0.7;
  
  //criar sprite ground (chão)
  ground = createSprite(200,180,400,20);
  
  ground.addAnimation("chãzin geuado",groundImage);
  

  
  
}

function draw() {
  background(255);
  text("Pontin: "+us_pontin,500,50);
  if(game_stats==PLAY){
    perdeu_mlquin.visible=false;
    restart.visible=false;
    us_pontin=us_pontin+Math.round(getFrameRate()/60);
    ground.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space")&& trex.y>=156.4){
    trex.velocityY = -15;
   }
   trex.velocityY = trex.velocityY + 0.8;
   deus_criou_as_nuvi()
   //pular quando barra de espaço é pressionada
   deus_criou_as_difirculdade()
   if(obstacle_group.isTouching(trex)){
   game_stats=END;
   }
   }
   if(game_stats==END){
    perdeu_mlquin.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
    trex.velocityY=0
    obstacle_group.setVelocityXEach(0);
    clouds_group.setVelocityXEach(0);
    trex.changeAnimation("murio", trex_collided);
    obstacle_group.setLifetimeEach(-1);
    clouds_group.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      vamo_recomeça()
    }
  }
  //impedir trex de cair
  trex.collide(cade_o_chao);

  drawSprites();
}
function deus_criou_as_nuvi(){
  if(frameCount%60==0){     //A nuvem só aparecera quando o valor do frameCount for um número que ao ser dividido por 60 o resto de 0.
    ih_vai_chuve=createSprite(600,100,40,10);
    ih_vai_chuve.addImage("a nuvi passando",ih_vai_chuve_image);
    ih_vai_chuve.scale=0.1;
  ih_vai_chuve.velocityX=-5.5;
  ih_vai_chuve.y=Math.round(random(10,60));
  ih_vai_chuve.depth=trex.depth;
  trex.depth=trex.depth+1;
  ih_vai_chuve.lifetime=170;
  clouds_group.add(ih_vai_chuve);
  }
}
function deus_criou_as_difirculdade(){
  if(frameCount%60==0){     //O cacto só aparecera quando o valor do frameCount for um número que ao ser dividido por 60 o resto de 0.
    var obistaculuzin=createSprite(400,165,10,40);
    obistaculuzin.velocityX=-4;
    var a_image_n_sou_eu_q_escolho=Math.round(random(1,6));
switch (a_image_n_sou_eu_q_escolho){
  case 1:obistaculuzin.addImage(duprinha_de_cacto);
  break;
  case 2:obistaculuzin.addImage(duprinha_de_cacto_com_terrinha);
  break;
  case 3:obistaculuzin.addImage(o_bonde_dos_cacto);
  break;
  case 4:obistaculuzin.addImage(cacto_com_terrinha);
  break;
  case 5:obistaculuzin.addImage(cacto);
  break;
  case 6:obistaculuzin.addImage(trio_dos_cacto);
  break;
  default:break;
}
obistaculuzin.scale=0.5;
    obistaculuzin.lifetime=300;
    obstacle_group.add(obistaculuzin);
  }
}
function vamo_recomeça(){
  game_stats=PLAY;
  us_pontin=0;
  perdeu_mlquin.visible=false;
  restart.visible=false;
  obstacle_group.destroyEach();
  clouds_group.destroyEach();
  trex.changeAnimation("running", trex_running);
}