const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const A = {}
const B = {}
const C = {}
const D = {}

const E = {}
const F = {}
const G = {}
const H = {}

let angle = 0;

const mouse = {x:0,y:0}

let rayNum = 10;
const btn = document.getElementById("btn")
const num = document.getElementById("rayCount")
btn.addEventListener("click",()=>{
    rayNum = document.getElementById("rayCount").value
})

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    document.onmousemove=(e)=>{
        mouse.x = e.offsetX;
        mouse.y = e.offsetY
    }
   
   angle += 0.02;;
   
    A.x = 200 + Math.cos(angle)*150;
    A.y = 250 - Math.sin(angle)*150;
    B.x = 200 - Math.cos(angle)*150;
    B.y = 250 + Math.sin(angle)*150

    E.x = 350 - Math.sin(angle)*70;
    E.y = 120 + Math.cos(angle)*70;
    F.x = 350 + Math.sin(angle)*70;
    F.y = 120 - Math.cos(angle)*70;

    C.x = 100 - Math.sin(angle)*50;
    C.y = 350 + Math.cos(angle)*50;
    D.x = 100 + Math.sin(angle)*50;
    D.y = 350 - Math.cos(angle)*50;

    H.x = 390 - Math.sin(angle)*120;
    H.y = 230 + Math.cos(angle)*120;
    G.x = 390 + Math.sin(angle)*120;
    G.y = 230 - Math.cos(angle)*120;
    

    ctx.beginPath();
    ctx.moveTo(A.x,A.y);
    ctx.lineTo(B.x,B.y)
    ctx.fillStyle = "black"
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(C.x,C.y);
    ctx.lineTo(D.x,D.y)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(H.x,H.y);
    ctx.lineTo(G.x,G.y)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(E.x,E.y);
    ctx.lineTo(F.x,F.y)
    ctx.stroke();

    drawDot(A,"A");
    drawDot(B,"B");
    drawDot(C,"C");
    drawDot(D,"D");
  
    drawDot(E,"E");
    drawDot(F,"F");
    drawDot(G,"G");
    drawDot(H,"H");
    
    
   
    function drawDot (point,label){
        ctx.beginPath();
        ctx.arc(point.x,point.y,10,0,Math.PI*2);
        ctx.fillStyle = "white"
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px Arial";
        ctx.fillText(label,point.x,point.y)
    }
    const rad = 15;
    const center = {
        x:250,
        y:200
    }
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,rad,0,Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    
    for(let i = 0;i<rayNum;i++){

        const length = 1000;
        const angle = lerp(Math.PI,-Math.PI,i/rayNum);
        const end = {
            x:center.x-length*Math.sin(angle),
            y:center.y-length*Math.cos(angle)
        }
        const I = getIntersection(A,B,center,end)
        const L = getIntersection(D,C,center,end)
        const M = getIntersection(E,F,center,end)
        const N = getIntersection(H,G,center,end)
        if(I) {
            end.x = I.x,
            end.y = I.y
        }
        if(L) {
            end.x = L.x,
            end.y = L.y
        }
        if(M) {
            end.x = M.x,
            end.y = M.y
        }
        if(N) {
            end.x = N.x,
            end.y = N.y
        }
        ctx.beginPath();
        ctx.moveTo(mouse.x,mouse.y);
        ctx.lineTo(end.x,end.y);
        ctx.strokeStyle = "orange"
        ctx.stroke();
    }
    requestAnimationFrame(animate)
}
animate()

function lerp(A,B,t){
    return A+(B-A)*t
}

function getIntersection(A,B,C,D){
    const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    if(bottom!== 0){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t>=0&&t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }
    return null;
}
