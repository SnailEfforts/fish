/**
 * Created by fang on 16/9/22.
 */
    //大鱼吃到食物的圈圈样式
var waveObj = function(){
    this.x = [];
    this.y = [];
    this.alive = []; //碰撞样式的存活
    this.r = [];
    //this.r = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function () {
    for(var i=0;i<this.num; i++){
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function(){
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            this.r[i] +=deltaTime*0.04; //圈圈的半径增加速度
            if(this.r[i] > 50){
                this.alive[i] = false;
                break ;
            }
            this.alpha =1 -this.r[i]/50;  //看人家多聪明，利用反向来计算半径。可以声明一个变量
            //draw  只有小鱼活着才会绘制样式
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255,"+ this.alpha +")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
waveObj.prototype.born = function(x,y){
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            //console.log("born"); 在这块可以先实验一下，是否会产生
            //如果小鱼活着才会产生，吃过之后圈圈的效果 born
            return ;  //记得要跳出循环，否则会出现大BUG

        }
    }
}