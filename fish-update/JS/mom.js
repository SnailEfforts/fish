/**
 * Created by fang on 16/9/21.
 */
var momObj = function(){
    this.x;
    this.y;
    this.angle;
    //this.bigEye = new Image();
    //this.bigBody = new Image();
    //this.bigTail = new Image();

    this.momTailTime = 0;
    this.momTailCount = 0;

    this.momEyeTime = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;  //图片持续时间

    this.momBodyCount = 0;
}
momObj.prototype.init=function(){
    this.x = canWidth*0.5;
    this.y = canHeight*0.5;
    this.angle=0;
    //this.bigEye.src = "img/src1/bigEye0.png";
    //this.bigBody.src = "img/src1/bigSwim0.png";
    //this.bigTail.src = "img/src1/bigTail0.png";

}
momObj.prototype.draw = function(){

    //lerpDistance     鱼妈妈跟随鼠标移动 运动的速度控制
    this.x = lerpDistance(mx,this.x,0.98);
    this.y = lerpDistance(my,this.y,0.98);

    //delta angle
    //Manth.antan(y,x)
    //旋转角度
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;  //-PI --PI

    // lerp angle
    this.angle = lerpAngle(beta, this.angle,0.6);  //旋转角度速度

    //mom tail count 大鱼摆尾巴
    this.momTailTime += deltaTime;
    if(this.momTailTime > 50){
        this.momTailCount = (this.momTailCount + 1)%8;
        this.momTailTime %= 50;
    }
    //大鱼眨眼睛
    this.momEyeTime += deltaTime;
    if(this.momEyeTime>this.momEyeInterval)
    {
        this.momEyeCount = (this.momEyeCount + 1)%2;
        this.momEyeTime %= this.momEyeInterval;

        if(this.momEyeCount == 1){
            this.momEyeInterval= 200;  //眨着眼睛的时间
        }else{
            this.momEyeInterval=Math.random()*1500 + 2000;  //[2000,3500)  睁着眼睛的时间
        }
    }

    //大鱼的位置，大鱼包含的三张图片设置中心全部都为同一点 save()/restore()中间包含描绘大鱼时ctx1 的样式
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);  //小鱼摆头

    //摆尾巴
    //ctx1.drawImage(this.bigTail,-this.bigTail.width * 0.5 + 30, -this.bigTail.height*0.5);
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5 + 23,-momTail[momTailCount].height*0.5);

    var momBodyCount = this.momBodyCount;
    if(data.double == 1)  //ora
    {
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height*0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height*0.5);
    }


    //眨眼睛
    //ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height*0.5);
    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height*0.5);

    ctx1.restore();
}