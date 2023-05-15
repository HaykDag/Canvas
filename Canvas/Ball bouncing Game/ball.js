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