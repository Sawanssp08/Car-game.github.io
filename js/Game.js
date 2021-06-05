class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("c1",c1Img);
    car2 = createSprite(300,200);
    car2.addImage("c2",c2Img);
    car3 = createSprite(500,200);
    car3.addImage("c3",c3Img);
    car4 = createSprite(700,200);
    car4.addImage("c4",c4Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsReached();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(102,102,102));
  image (trackImg,0,-displayHeight*7,displayWidth,displayHeight*8);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          noStroke();
          fill(220);
          ellipse(cars[index-1].x,cars[index-1].y,80,140);
          fill ("white");
          textSize(20);
          text(player.name,cars[index-1].x-30,cars[index-1].y-70);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          if (gameState===2){
            fill("red");
            textSize(30);
            text("You have Reached the end of the game with the rank "+player.rank,displayWidth/4,25);
          }
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if (player.distance>5900){
  gameState=2;
  player.rank+=1;
  console.log(player.rank);
  player.updateCarsReached(player.rank);
  fill("red");
  textSize(30);
  text("You have Reached the end of the game with the rank "+player.rank,displayWidth/4,25);
 // console.log("Your Rank is "+player.rank );

}
    drawSprites();
  }

  end(){
    fill("red");
    textSize(30);
    text("You have Reached the end of the game with the rank "+player.rank,displayWidth/4,25);
    //console.log("You have reached the end of the game");

  }
}
