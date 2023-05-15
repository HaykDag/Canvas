const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const balls = []

const backgraoundImage = document.createElement("img");
backgraoundImage.src = "img/field.jpg";

let radius = 0;
let red = 0;
let green = 0;
let blue = 0;


class Ball{
  constructor(radius,delta,x,y,color){
    this.width = radius;
    this.height = radius;
    this.delta = delta;
    this.x = x;
    this.y = y;
    this.color = color;
    this.gravity = radius*0.09;
  }
  
  move (){
    if((this.y+this.height+this.delta)>canvas.height) {
      this.delta *= -0.85;
    }else{
        this.delta += this.gravity;
    }
   
    this.y += this.delta;
    
  }
  begin(){
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height,[this.width/2]);
    ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
    ctx.fill();
  }
    
}

function draw () {
  ctx.drawImage(backgraoundImage,0,0);
  balls.forEach(ball => {
    ball.begin();
  })
}    

function update(){

  //clear the canvas before drawing
  ctx.clearRect(0,0,canvas.width, canvas.height);
  // if balls hit each other they should bounce back
  for(let i = 0; i< balls.length;i++){
    for(let j = 1;j<balls.length;j++){
      if(hit(balls[i],balls[j])){
        balls[i].delta *= -1;
        balls[j].delta *= -1;
      }
    }
  
    balls[i].move();
  }
  
}
// mouse click position
canvas.addEventListener("click", function(e) {
  getMousePosition(canvas, e);
  red = Math.random()*255+1;
  green = Math.random()*255+1;
  blue = Math.random()*255+1;
  radius = Math.random()*150+10;
  
})
function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let delta = Math.random()*10+1;
  topY = y;
  balls.push(new Ball(radius,delta,x,y,[red,green,blue]))
}

function hit (ball1,ball2){
  const x = Math.max(ball1.x,ball2.x);
  num1 = Math.min(ball1.x+ball1.width,ball2.x+ball2.width);
  const y = Math.max(ball1.y,ball2.y);
  num2 = Math.min(ball1.y+ball1.height,ball2.y+ball2.height);
  return (num1>=x && num2>= y)
}

function loop (){
  requestAnimationFrame(loop)
  update();
  draw();
}

loop()