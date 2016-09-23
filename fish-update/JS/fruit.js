/**
 * Created by fang on 16/9/21.
 */
  //果实的绘制
var fruitObj=function(){
    this.alive = [];   //boolean
    this.x = [];
    this.y = [];
    this.l = [];
    this.aneNO = [];
    this.spd  = [];  //生长速度，以及上漂速度
    this.fruitType=[]; //果实的类型
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num=30;

//  初始化信息
fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.spd[i] = Math.random()*0.017+0.003;  //[0.003,0.02)
        this.fruitType[i] = "";
        this.aneNO[i] = 0;

        //this.born(i);
    }
    this.orange.src = "img/src1/fruit.png";
    this.blue.src = "img/src1/blue.png";
}
//果实涂层绘画
fruitObj.prototype.draw=function(){
    for(var i = 0;i<this.num;i++){
        //draw
        //找到一个位置，之后生长、漂浮
        if(this.alive[i]){

            if(this.fruitType[i] == "blue")
            {
               var  pic = this.blue;
            }else{
                var  pic = this.orange;
            }
            //grow  果实随着海葵摆动
            if(this.l[i]<14){
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.spd[i]*deltaTime;  //果实生长的速度
            }else{
                this.y[i] -= this.spd[i]*7*deltaTime;  //果实上漂
            }
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

            if(this.y[i]<10){
                this.alive[i] = false;
            }
        }

    }
}
//果实的出生  出生的位置  出生的颜色
fruitObj.prototype.born=function(i){
    //果实生长的位置，在海葵的上方，x坐标为海葵的坐标，y的位置在海葵的顶端（高度）
    //var aneID = Math.floor(Math.random()*ane.num);  //随之取出一个海葵  这个临时变量也就不需要了
    //this.x[i] = ane.headx[aneID];
    //this.y[i] = ane.heady[aneID];   //坐标值一直在变化
    this.aneNO[i] = Math.floor(Math.random()*ane.num);  //随之取出一个海葵
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2)
    {
        this.fruitType[i] = "blue"; //orange,blue
    }else{
        this.fruitType[i] = "orange"; //orange,blue
    }
}
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
}
//果实数量的检测
function fruitMonitor(){
    var num=0;
    for(var i = 0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if( num < 15){
        //send fruit
        sendFruit();
        return ;
    }
}
//如果屏幕中的果实少于15个，产生新的果实
function sendFruit(){
    for(var i=0;i<fruit.num; i++){
        if(!fruit.alive[i])
        {
            fruit.born(i);
            return ;
        }
    }
}













