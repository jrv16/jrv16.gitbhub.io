let scoreboard = {  }
let rains = document.getElementById("rain")
let x
let y
let score
let direction
let direction2
let level
let rad
let fast
let time 
var firebaseConfig = {
    apiKey: "AIzaSyD74mgBtO14sU-aCKNBkFgqKq5flWxrxYw",
    authDomain: "tall-tank.firebaseapp.com",
    databaseURL: "https://tall-tank.firebaseio.com",
    projectId: "tall-tank",
    storageBucket: "",
    messagingSenderId: "518058201255",
    appId: "1:518058201255:web:7087ac4d6d7df358"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()
  

function setup() {
  createCanvas(windowWidth, windowHeight);
  x=100
  y=120
  a= [30,400,300]
  b= [200,100,320]
  j=60
  v=400
 points=0
  direction=[1,1,1]
  direction3 = [0,0,0]
  score=0
  direction2=-1
  level = 1
  rad = 60
  fast=5
 
  time = 100
}

function draw() {
  if (time > 0) {
  
  background(115);
  textSize(30)
  text("score: " + score,10,60)
  text("level:" + level,40,120)
  text("time:" + time.toFixed(0),400,60)
  circle(x,y,90);
  time = time - .100
  if(keyIsDown(LEFT_ARROW)) {
    x = x - 10
  }
  if(keyIsDown(RIGHT_ARROW)) {
    x = x + 10
  }
   if(keyIsDown(DOWN_ARROW)) {
    y = y +  10
  }
   if(keyIsDown(UP_ARROW)) {
    y = y -  10
  }
  circle(j,v,60);
 
  v = v + 5*direction2 

  if(dist(x,y,j,v)<90+60) {
    score=score+1
  }
    if (v> height || v<0) {
	direction2=direction2*-1
}
  for (i=0; i<3; i=i+1) {
     circle(a[i],b[i],rad);
      if (a[i]> width || a[i]<0) {
        direction[i]=direction[i]*-1
    }
      if (b[i]> height || b[i]<0) {
        direction3[i]=direction3[i]*-1
    }
      a[i] = a[i] + fast*direction[i] 
      b[i] = b[i] + 5*direction3[i]
        if(dist(x,y,a[i],b[i])<90+rad) {
        score=score-1
      }
  }
  
if (score>150 && level == 1) {
a = [120,260,400] 
level = 2
}
    if (score > 260 && level == 2) {
rad = rad + 10
level = 3
}
    if(score > 340 && level== 3){
      fast = fast + 30
      level =4
    }
  if(score > 460 && level== 4){
      fast = fast + 30
      level = 5
    }
  if (score > 580 && level== 5){
    fast = fast + 30
    direction3 = [1,1,1]
    level=6
  }
  if (score >700 && level== 6){
    fast = fast + 80
    direction3 = [1,1,1]
    level=7
  }
  }
  else{
    rains.innerHTML = "Name? <input id='names'></input><button onclick=restart()>restart</button>" 
    noLoop()

    
  }
}
function restart() { 
let names  = document.getElementById("names")
	database.ref(name).set(score)
		name = names.value 
		if (name != "") { 
			scoreboard[name] = score
		}
alert("Scoreboard: " + JSON.stringify(scoreboard,null,1)) 
		time = 20 
		score = 0
	    level = 1
	    rad = 60
	    fast=5
		loop()
		rains.innerHTML = ""
        generate_leaderboard()
		onclick=generate_alltime_leaderboard()
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()

