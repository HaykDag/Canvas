const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 500
const segments = [{x1:10,y1:50,x2:100,y2:10},
                  {x1:250,y1:100,x2:170,y2:10}];

const sun = {x:canvas.width/2,y:canvas.height/2}
const suns = [sun];
const gravity = 1;
let velocity = 10;
const friction = 0.95;
const rayCount = 50;
const rad = 200;
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
 
    for(let i = 0;i<suns.length;i++){
        let p = suns[i];
        for(let j = 0;j<rayCount;j++){
            const angle = lerp(Math.PI,-Math.PI,j/rayCount);

            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
            ctx.lineTo(
                p.x+Math.sin(angle)*rad,
                p.y-Math.cos(angle)*rad
            )
            if(i===0){
                ctx.strokeStyle = "red"
            }else if(i===1){
                ctx.strokeStyle = "orange"
            }else{
                ctx.strokeStyle = "green"
            }
                
            ctx.stroke();
        if(i===0){
            ctx.beginPath();
            ctx.arc(p.x+Math.sin(angle)*rad,p.y-Math.cos(angle)*rad,5,0,Math.PI*2);
            ctx.fillStyle = "green";
            ctx.stroke()
            ctx.fill()
        }
        }
    }
    if(sun.y+rad+10>canvas.height){
        velocity = -velocity*friction;
    }else {
        velocity += gravity;
    }
    sun.y += velocity;
    if(Math.abs(velocity)<0.8) velocity = 0;
    requestAnimationFrame(animate)
}
animate();

function lerp(A,B,t){
    return A+(B-A)*t
}
