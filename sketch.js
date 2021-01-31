var shooter,shooterImage;
var weakEnemyGroup,weakEnemyImage,medEnemyGroup,medEnemyImage,hardEnemyGroup,hardEnemyImage;
var backgroundImage;
var score = 0;
var bullet,bulletGroup;
var weak=2,med=3,strong=4;
var tankImage;
var health = 5;
var gameState = "PLAY";
var restart,gameOver,restartImage,gameOverImage;
var bossImage;
var heartDropImage,heartDropGroup;
var boss,bossHealth = 100;

function preload(){
	shooterImage = loadImage("shooter.PNG");
	weakEnemyImage = loadImage("enemy.PNG");
	medEnemyImage = loadImage("enemy2.PNG");
	hardEnemyImage = loadImage("enemy3.PNG");
	backgroundImage = loadImage("bgImage.PNG");
	tankImage = loadImage("tank.PNG");
	restartImage = loadImage("Restart.png");
	gameOverImage = loadImage("GameOver.png");
	bossImage = loadImage("Boss.png");
	heartDropImage = loadImage("Heart.png");
}
function setup(){
	createCanvas(800,800);
	shooter =  createSprite(400,700);
	shooter.addImage("shooter",shooterImage);
	shooter.scale = 0.4;
	restart =  createSprite(400,484);
	restart.addImage("restart",restartImage);
	restart.scale = 0.8;
	gameOver =  createSprite(400,316);
	gameOver.addImage("gameOver",gameOverImage);
	gameOver.scale = 1.3;
	boss = createSprite(400,200);
	boss.addImage("BOSS FIGHT", bossImage);
	boss.visible = false
	boss.velocityX = 8;
	weakEnemyGroup = createGroup();
	medEnemyGroup = createGroup();
	hardEnemyGroup = createGroup();
	bulletGroup = createGroup();
	goodBulletGroup = createGroup();
	heartDropGroup= createGroup();
	tank(200);
	tank(400);
	tank(600);
}
function draw(){
	background(backgroundImage);
	rand1 = Math.round(random(30,770));
	rand2 = Math.round(random(30,770));
	rand2 = Math.round(random(30,770));
	if(gameState==="PLAY"){
	shooter.visible= true;
	restart.visible = false;
	gameOver.visible = false;
	if(keyDown("left")){
		shooter.x=shooter.x-8;
	}
	if(keyDown("right")){
		shooter.x=shooter.x+8;
	}

	if (keyDown("space")&&frameCount%2==0) {
		createGoodBullet(shooter.x,shooter.y,-8);
	}
	if(score<=9){

	if(shooter.isTouching(heartDropGroup)){
		heartDropGroup.destroyEach();
		health = health + 1
	}

	for(var i =0;i <goodBulletGroup.length;i++){
		if(weakEnemyGroup.isTouching(goodBulletGroup[i])){
		  score = score + 1;
		  goodBulletGroup[i].destroy();
		  weakEnemyGroup.destroyEach();
		  break;
		}
	}
	for(var i =0;i <goodBulletGroup.length;i++){
		if(medEnemyGroup.isTouching(goodBulletGroup[i])){
		  score = score + 1;
		  goodBulletGroup[i].destroy();
		  medEnemyGroup.destroyEach();
		  break;
		}
	}
	
	for(var i =0;i <goodBulletGroup.length;i++){
		if(hardEnemyGroup.isTouching(goodBulletGroup[i])){
		  score = score + 1;
		  goodBulletGroup[i].destroy();
		  hardEnemyGroup.destroyEach();
		  break;
		}
	}
	for(var i =0;i <bulletGroup.length;i++){
		if(shooter.isTouching(bulletGroup[i])){
		  bulletGroup[i].destroy();
		if(health==1){
			health = health - 1
			gameState="END";
		}
		else if(health>0){
			health = health - 1;	
		}
		
		  break;
		}
	}
	
	if(score==9){
		health = 10;
		boss.x =400;
	}
	weakEnemy();
	medEnemy();
	strongEnemy();
	HeartDrop();
	}
	if(score>=10){
		weakEnemyGroup.destroyEach();
		medEnemyGroup.destroyEach();
		hardEnemyGroup.destroyEach();
		boss.visible=true;
		tank(300);
		tank(500);

		if(boss.x>=700){
			boss.velocityX = -8
		}
		if(boss.x<=100){
			boss.velocityX = 8
		}
		if(boss.isTouching(goodBulletGroup)){
			if(bossHealth>0){
				bossHealth = bossHealth - 1
			}
			else if(bossHealth<1){
				boss.visible = false
				gameState ="END";
				bulletGroup.destroyEach()
			}
		}
		if(frameCount%15===0){
			createBullet(boss.x,200,8,Math.round(random(30,80)),10);

		}
	}
	if(frameCount%35==0){
		if(score<10){
			createBullet(600,0,8,Math.round(random(5,40)),10)
			createBullet(400,0,8,Math.round(random(5,40)),10)
			createBullet(200,0,8,Math.round(random(5,40)),10)
		}
		else if(score>=10){
			createBullet(600,0,8,Math.round(random(5,40)),10)
			createBullet(500,0,8,Math.round(random(5,40)),10)
			createBullet(400,0,8,Math.round(random(5,40)),10)
			createBullet(300,0,8,Math.round(random(5,40)),10)
			createBullet(200,0,8,Math.round(random(5,40)),10)
		}
	}
}
	if(gameState==="END"){
		if(health<1){
			restart.visible = true;
			gameOver.visible = true;
			shooter.visible=false;
			if(mousePressedOver(restart)){
				health=5;
				score=0;
				gameState="PLAY";
				boss.visible = false
			}
		}
		else if(bossHealth<1){
			textSize(100)
			text("YOU WIN",200,400);
			restart.visible = true;
			if(mousePressedOver(restart)){
				health=5;
				score=0;
				gameState="PLAY";
				boss.visible = false
				bossHealth = 100;
			}
			
		}
	}
	for(var i =0;i <bulletGroup.length;i++){
		if(shooter.isTouching(bulletGroup[i])){
		  bulletGroup[i].destroy();
		if(health==1){
			health = health - 1
			gameState="END";
		}
		else if(health>0){
			health = health - 1;	
		}
		
		  break;
		}
	}
	drawSprites();
	text("score: "+score,700,10);
	text("health: "+health,700,20);
}
function weakEnemy(){
		if(frameCount%180==0){
			var enemy = createSprite(0,0);
			enemy.addImage("enemy",weakEnemyImage);
			enemy.scale = 0.3;
			enemy.x = Math.round(random(30,770));
			enemy.velocityY = 4;
			enemy.lifetime = 200;
			weakEnemyGroup.add(enemy);
		}
}
function medEnemy(){
		if(frameCount%180==0){
			var enemy = createSprite(0,0);
			enemy.addImage("enemy",medEnemyImage);
			enemy.scale = 0.3;
			enemy.x = Math.round(random(30,770));
			enemy.velocityY = 4;
			enemy.lifetime = 200;
			medEnemyGroup.add(enemy);
		}
}
function strongEnemy(){
		if(frameCount%180==0){
			var enemy = createSprite(0,0);
			enemy.addImage("enemy",hardEnemyImage);
			enemy.scale = 0.3;
			enemy.x = Math.round(random(30,770));
			enemy.velocityY = 4;
			enemy.lifetime = 200;
			hardEnemyGroup.add(enemy);
		}
}
function createBullet(xPos,yPos,velocityY,width,height) {
	var bullet= createSprite(100, 100, width, height);
	bullet.x=xPos;
	bullet.y=yPos;
	bullet.velocityY = velocityY;
	bullet.lifetime = 100;
	bulletGroup.add(bullet);
	return bullet;
}
function createGoodBullet(xPos,yPos,velocityY) {
	var bullet= createSprite(100, 100, 5, 10);
	bullet.x=xPos;
	bullet.y=yPos;
	bullet.velocityY = velocityY;
	bullet.lifetime = 100;
	goodBulletGroup.add(bullet);
	return bullet;
}
function tank(xPos){
	var tank = createSprite(xPos,50);
	tank.addImage("tank",tankImage);
	tank.scale = 0.5
}
function HeartDrop(){
	if(frameCount%580==0){
		var heartDrop = createSprite(0,0);
		heartDrop.addImage("heart",heartDropImage);
		heartDrop.scale = 0.3;
		heartDrop.x = Math.round(random(30,770));
		heartDrop.velocityY = 4;
		heartDrop.lifetime = 200;
		heartDropGroup.add(heartDrop);
	}
}