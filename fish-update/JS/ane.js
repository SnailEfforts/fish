/**
 * Created by fang on 16/9/21.
 */
    //绘制海葵
var aneObj =function(){
    //start piont , control point, 结束点（正弦）
    this.rootx = [];  //start
    this.headx = [];  //end
    this.heady = [];
    this.amp = [];  //振幅

    this.alpha = 0;  //正弦的值，不断的变化

}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
    //海葵的位置
    for(var i=0;i<this.num;i++){
        this.rootx[i]=i*16+Math.random()*20;//[0,1) 位置随即h
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 230 + Math.random() * 50;//海葵的高度
        this.amp[i] = Math.random() * 50 + 50;
    }
}
aneObj.prototype.draw=function(){

    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);   // [-1 , 1 ]

    //save()、restore()两个之间是一个区间，样式在区间中管用，
    // globalAlpha表示透明度,放在循环外面是每个海葵都一样的样式(提高性能)
    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    //绘制海葵
    for(var i=0;i<this.num;i++){
        //beginPath，moveTo，lineTo，stroke,strokeStyle,lineWidth,lineCap
        //glabalAlpha(绘制物体的透明度 )
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight); //start
        this.headx[i] = this.rootx[i] + l * this.amp[i];  //为了保证海葵头部运动，一直摆动，让果实也能一直运动
        //海葵的随着海水摆动
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]); //曲线   控制点和结束点
        ctx2.stroke();
    }
    ctx2.restore();
}