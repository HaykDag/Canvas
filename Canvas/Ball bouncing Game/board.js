class Board {
  constructor(x,y,width,height,color,delta){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.delta = delta;
  }
  move(){
    window.addEventListener("keydown", (event)=>{
  
      switch(event.key) {
        case "ArrowLeft":
        this.delta = -0.1;  
        this.x += this.delta;
        break;
        case "ArrowRight":
        this.delta = 0.1;
        this.x += this.delta;
        break;
      }
      
    })
  
    window.addEventListener("keyup", ()=>{
          this.delta = 0;
      })
      
      if(this.x < 0){
        this.x = 0.01;
      }else if(this.x+this.width >canvas.width ){
        this.x = canvas.width-this.width - 0.01;
      } 
  }
  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}