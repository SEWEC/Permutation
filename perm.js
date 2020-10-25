var permList = [];
function setPerm(){
    permList = [];
    let str = document.getElementById("input").value;
    console.log(str.split(""));
    recursivePerm(str.split(""),"");
    /*
    for(let i = 0; i < permList.length; i++){
        console.log(permList[i]);
    }
    */
    let canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    let circleDiameter = Math.min(window.innerWidth - 50, window.innerHeight - 50);
    let px = circleDiameter/(permList.length);
    ctx.font = String(px) + "px Arial";
    let lineheight = ctx.measureText('C').width + 1;
    let lineWidth = ctx.measureText(str).width;
    for(let i = 0; i < permList.length; i++){
        let angle1 = Math.PI*2*i/(permList.length);
        let x1 = Math.cos(angle1)*circleDiameter/2 + window.innerWidth/2;
        let y1 = Math.sin(angle1)*circleDiameter/2 + window.innerHeight/2;
        ctx.strokeStyle = `hsl(
            ${Math.floor(255/permList.length*i)},
            100%,
            50%)`;
        for(let k = 0; k < permList.length; k++){
            if(checkSwapable(i,k)){
                let angle2 = Math.PI*2*k/(permList.length);
                let x2 = Math.cos(angle2)*circleDiameter/2 + window.innerWidth/2;
                let y2 = Math.sin(angle2)*circleDiameter/2 + window.innerHeight/2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }
    for(let i = 0; i < permList.length; i++){
        let angle = Math.PI*2*i/(permList.length);
        let x = Math.cos(angle)*circleDiameter/2 + window.innerWidth/2;
        let y = Math.sin(angle)*circleDiameter/2 + window.innerHeight/2;
        ctx.fillStyle = "white";
        ctx.fillRect(x-lineWidth/2 + 1,y-lineheight/2+1,lineWidth-2,lineheight);
        ctx.fillStyle = "black";
        ctx.fillText(permList[i], x-1-lineWidth/2, y+lineheight/2);
    }
}

function recursivePerm(strList, str){
    for(let i = 0; i < strList.length; i++){
        let x = [...strList];
        x.splice(i,1);
        recursivePerm(x, str + strList[i]);
    }
    if(strList.length == 0){
        permList.push(str);
    }
}

function checkSwapable(i,k){
    let count = 0;
    for(let j = 0; j < permList[i].length; j++){
        if(permList[i][j] == permList[k][j]){
            count++;
        }
    }
    if(count == permList[i].length-2){
        return true;
    }
    return false;
}