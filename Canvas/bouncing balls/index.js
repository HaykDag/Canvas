
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const balls = []

const backgraoundImage = document.createElement("img");
backgraoundImage.src = "img/field.jpg";

class Ball{
  constructor(radius,delta,x,y){
    this.width = radius;
    this.height = radius;
    this.xDelta = delta;
    this.yDelta = delta;
    this.x = x;
    this.y = y;
  }
  move (){
    if((this.x+this.width)>canvas.width || this.x < 0){
      this.xDelta *= -1;
    }
    if((this.y+this.height)>canvas.height || this.y < 0){
      this.yDelta *= -1;
    }

    this.x += this.xDelta;
    this.y += this.yDelta; 
  }
  begin(){
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height,[40]);
    ctx.fillStyle = "orange";
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
        balls[i].xDelta *=-1;
        balls[i].yDelta *=-1;
        balls[j].xDelta *=-1;
        balls[j].yDelta *=-1;
      }
    }
    balls[i].move();
  }
  
}

// mouse click position
canvas.addEventListener("click", function(e) {
  getMousePosition(canvas, e);
  
})
function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  balls.push(new Ball(30,Math.random()*10+1,x,y))
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

