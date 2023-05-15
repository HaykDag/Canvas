

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const balls = []
let score = 0;

const backgraoundImage = document.createElement("img");
backgraoundImage.src = "img/field.jpg";

const sprite = document.createElement("img");
sprite.src = "img/player.png";


const board = new Board(350,400,250,15,"yellow",0);


function draw () {
  ctx.drawImage(backgraoundImage,0,0);
  board.draw();
  balls.forEach(ball => {
     ball.begin();
  })
  drawScore();
  
}    

function update(){
  
  let red = Math.random()*255+1;
  let green = Math.random()*255+1;
  let blue = Math.random()*255+1;

  //clear the canvas before drawing
  ctx.clearRect(0,0,canvas.width, canvas.height);
  
  // if balls hit each other they should bounce back
  for(let i = 0; i< balls.length;i++){
    
    if(hit(balls[i],board)){
      if(balls[i].xDelta < 7){
        balls[i].xDelta += 1;
        balls[i].yDelta += 1;
      }
      balls[i].xDelta *= -1;
      balls[i].yDelta *= -1;
      board.color = `rgb(${red},${green},${blue})`
      score += 1;
      if(board.width > 150)
      board.width -= 10;
      
    }
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
  board.move();
  
  
}

// mouse click position
canvas.addEventListener("click", function(e) {
  getMousePosition(canvas, e);
  
})

function drawScore (){
  ctx.font = "16px Arial";
  ctx.fillStyle = "yellow";
  ctx.fillText(`score: ${score}`,8,20);
}

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
