var happyDog,sadDog;

var database;
var food;
var dog;

function preload(){
   happyDog= loadImage("images/dogImg1.png");
   sadDog= loadImage("images/dogImg.png");

}

function setup(){
  createCanvas(500,500);

  database= firebase.database();
  console.log(database);
  
  // refer to the node food on database
  var foodRef= database.ref('food');

  //creating listener at that referred node
  foodRef.on("value",function(data){
    food= data.val();
  });

  dog =  createSprite(250,250);
  dog.addImage(sadDog);
  dog.scale = 0.5;





}

function draw(){
  background(46,139,87);

 if(keyDown("up")){
   update();
   dog.addImage(happyDog);
 }
 

 fill(255,255,254);
  stroke("black");
  text("Food remaining :"+food,150,50);
   

  drawSprites();
}

function update(){
  var x = food;

  if(x<=0){
    x=0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
    food :x
  })
}