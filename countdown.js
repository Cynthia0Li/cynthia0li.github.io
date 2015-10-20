var WIDTH = 1024;
var HEIGHT = 768;
var RADIUS = 7;
var MARGIN_LEFT = 10;
var MARGIN_TOP = 50;

const endTime = new Date(2015,9,9,23,00,00);
var curShowTimeSeconds = 0;

var balls = [];
var colors =["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  //alert("123");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  
  curShowTimeSeconds = getCurrentTimeSeconds();
    
  setInterval(function(){
    render(context);
    update();
  }, 50);
  
}

function update(){
  var nextShowTimeSeconds = getCurrentTimeSeconds();
  var nextHours = parseInt(nextShowTimeSeconds/3600);
  var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
  var nextSeconds = parseInt(nextShowTimeSeconds%60);
  
  var hours = parseInt(curShowTimeSeconds/3600);
  var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
  var seconds = parseInt(curShowTimeSeconds%60);
  
  if(seconds != nextSeconds){
    if(parseInt(nextHours/10)!=parseInt(hours/10)){
      addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10));
    }
    if(parseInt(nextHours%10)!=parseInt(hours%10)){
      addBalls(MARGIN_LEFT+15*(RADIUS+2), MARGIN_TOP, parseInt(hours%10));
    }
    if(parseInt(nextMinutes/10)!=parseInt(minutes/10)){
      addBalls(MARGIN_LEFT+39*(RADIUS+2), MARGIN_TOP, parseInt(minutes/10));
    }
    if(parseInt(nextMinutes%10)!=parseInt(minutes%10)){
      addBalls(MARGIN_LEFT+54*(RADIUS+2), MARGIN_TOP, parseInt(hours%10));
    }
    if(parseInt(nextSeconds/10)!=parseInt(seconds/10)){
      addBalls(MARGIN_LEFT+78*(RADIUS+2), MARGIN_TOP, parseInt(seconds/10));
    }
    if(parseInt(nextSeconds%10)!=parseInt(seconds%10)){
      addBalls(MARGIN_LEFT+93*(RADIUS+2), MARGIN_TOP, parseInt(seconds%10));
    }
    curShowTimeSeconds = nextShowTimeSeconds;
    
  }
  updateBalls();
}

function addBalls(x, y, num){
  for(var i=0; i<digit[num].length; i++){
    for(var j=0; j<digit[num][i].length; j++){
      if(digit[num][i][j] == 1){
        var curBall = {
          x:x+j*(RADIUS+2)*2+(RADIUS+2),
          y:y+i*(RADIUS+2)*2+(RADIUS+2),
          g:1.5+Math.random(),
          vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
          vy:-5,
          color:colors[Math.floor(Math.random()*colors.length)]
        };
        balls.push(curBall);
      }
    }
  }
}

function updateBalls(){
  for(var i=0; i<balls.length; i++){
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;
    
    if(balls[i].y>=HEIGHT-RADIUS){
      balls[i].vy = -balls[i].vy*0.75;
      balls[i].y = HEIGHT-RADIUS;
    }
  }
  var curNum = 0;
    for(var i=0; i<balls.length; i++){
      if(balls[i].x<WIDTH+RADIUS && balls[i].x>-RADIUS){
        balls[curNum++] = balls[i];
      }      
    }
    while(balls.length > Math.min(curNum, 300)){
        balls.pop();
  }
}

function getCurrentTimeSeconds(){
  /*var curTime = new Date();
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret/1000);
  return ret>=0 ? ret : 0;*/
  var curTime = new Date();
  return curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
}

function render(cxt){  
  
  cxt.clearRect(0, 0, WIDTH, HEIGHT);
  
  var hours = parseInt(curShowTimeSeconds/3600);
  var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
  var seconds = parseInt(curShowTimeSeconds%60);
  
  renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
  renderDigit(MARGIN_LEFT+15*(RADIUS+2),MARGIN_TOP,parseInt(hours%10),cxt);
  renderDigit(MARGIN_LEFT+30*(RADIUS+2),MARGIN_TOP,10,cxt);
  
  renderDigit(MARGIN_LEFT+39*(RADIUS+2),MARGIN_TOP,parseInt(minutes/10),cxt);
  renderDigit(MARGIN_LEFT+54*(RADIUS+2),MARGIN_TOP,parseInt(minutes%10),cxt);
  renderDigit(MARGIN_LEFT+69*(RADIUS+2),MARGIN_TOP,10,cxt);
  
  renderDigit(MARGIN_LEFT+78*(RADIUS+2),MARGIN_TOP,parseInt(seconds/10),cxt);
  renderDigit(MARGIN_LEFT+93*(RADIUS+2),MARGIN_TOP,parseInt(seconds%10),cxt);
  
  for(var i=0; i<balls.length; i++){
    cxt.fillStyle = balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
    cxt.closePath();
    cxt.fill();
  }
  
}

function renderDigit(x, y, num, cxt){
  cxt.fillStyle = "purple";
/*  cxt.strokeStyle = "red";
  cxt.lineWidth = 5;
  cxt.beginPath();
  cxt.moveTo(0,0);
  cxt.lineTo(100,100);
  cxt.stroke();*/
  
  for(var i=0; i<digit[num].length; i++){
    for(var j=0; j<digit[num][i].length; j++){
      if(digit[num][i][j] == 1){
        //cxt.beginPath();
        //cxt.arc(x+j*2*(RADIUS+2)+(RADIUS+2), y+i*2*(RADIUS+2)+(RADIUS+2), RADIUS, 0, 2*Math.PI);
        //cxt.closePath();
        var radial = cxt.createRadialGradient(x+j*2*(RADIUS+2)+(RADIUS+2),y+i*2*(RADIUS+2)+(RADIUS+2),0,x+j*2*(RADIUS+2)+(RADIUS+2),y+i*2*(RADIUS+2)+(RADIUS+2),RADIUS); //重合的圆心坐标 
        radial.addColorStop(0,'#fff'); 
        radial.addColorStop(0.5,'#ff0'); 
        radial.addColorStop(0.9,'#555'); 
        radial.addColorStop(1,'#f00'); 
        cxt.fill();
      }
    }
  }
}
