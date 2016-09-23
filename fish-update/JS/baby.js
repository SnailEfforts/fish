/**
 * Created by fang on 16/9/21.
 */
var babyObj = function(){
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();

    this.babyTailTime = 0;
    this.babyTailCount = 0;

    this.babyEyeTime = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;  //图片持续时间

    this.babyBodyTime = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function()
{
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    //this.babyEye.src = "img/src1/babyEye0.png";
    //this.babyBody.src = "img/src1/babyFade0.png";
    //this.babyTail.src = "img/src1/babyTail0.png";
}
babyObj.prototype.draw = function()
{
    //lerp x, y 小鱼母目标 大鱼的坐标
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);

    //小鱼 朝向鱼妈妈  lerp angle
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;  //-PI --PI
    // lerp angle
    this.angle = lerpAngle(beta, this.angle,0.6);  //旋转角度速度

    //baby tail count 小鱼摆尾巴
    this.babyTailTime += deltaTime;
    if(this.babyTailTime > 50){
        this.babyTailCount = (this.babyTailCount + 1)%8;
        this.babyTailTime %= 50;
    }

    //bady eye
    this.babyEyeTime += deltaTime;
    if(this.babyEyeTime>this.babyEyeInterval)
    {
        this.babyEyeCount = (this.babyEyeCount + 1)%2;
        this.babyEyeTime %= this.babyEyeInterval;

        if(this.babyEyeCount == 1){
            this.babyEyeInterval= 200;  //眨着眼睛的时间
        }else{
            this.babyEyeInterval=Math.random()*1500 + 2000;  //[2000,3500)  睁着眼睛的时间
        }
    }

    //baby body
    this.babyBodyTime += deltaTime;
    if(this.babyBodyTime > 300)
    {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTime %= 300;
       if( this.babyBodyCount > 19)
       {
           this.babyBodyCount = 19;
           //game over
            data.gameOver = true;
       }
    }

    //ctx1
    ctx1.save();
    //translate()
    ctx1.translate(this.x,this.y); //图片的中心就是当前小鱼的原点
    ctx1.rotate(this.angle); //小鱼摆头

    //摆尾巴
    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(badyTail[babyTailCount],-badyTail[babyTailCount].width*0.5 + 23,-badyTail[babyTailCount].height*0.5);

    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);

    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(badyEye[babyEyeCount],-badyEye[babyEyeCount].width*0.5,-badyEye[babyEyeCount].height*0.5);

    ctx1.restore();
}



