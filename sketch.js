var balloon,balloonImg1,balloonImg2,bg
var database
var height

function preload(){
bg = loadImage("Images/cityImage.png")
balloonImg1 = loadAnimation("Images/HotAirBallon-01.png")
balloonImg2 = loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png","Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png")


}
 
function setup(){
database = firebase.database()
createCanvas(1500,700)
balloon = createSprite(250,650)
balloon.scale = 0.5
balloon.addAnimation("hotAirBalloon", balloonImg1,)

var balloonHeight = database.ref("balloon/height")
balloonHeight.on('value',readHeight)
}

function draw(){
background(bg)
drawSprites()

if(keyDown(LEFT_ARROW)){
updateHeight(-10,0)
balloon.addAnimation("hotAirBalloon",balloonImg2)
}

else if(keyDown(RIGHT_ARROW)){
updateHeight(10,0)
balloon.addAnimation("hotAirBalloon", balloonImg2)
}

else if(keyDown(UP_ARROW)){
updateHeight(0,-10)
balloon.addAnimation("hotAirBalloon", balloonImg2)
balloon.scale-=0.005
}

else if(keyDown(DOWN_ARROW)){
updateHeight(0,10)
balloon.addAnimation("hotAirBalloon", balloonImg2)
balloon.scale+=0.005
}

fill(0)
stroke("white")
textSize(25)
text("Use Arrow Key to move Hot Air Balloon!!",40,40)
}

function updateHeight(x,y){
database.ref("balloon/height").set({
'x': height.x+x,
'y': height.y+y
})
}

function readHeight(data){
height = data.val()
balloon.x = height.x
balloon.y = height.y
}