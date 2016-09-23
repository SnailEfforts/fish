/**
 * Created by fang on 16/9/22.
 */
//分数计算
var dataObj = function()
{
    this.fruitNum = 0;
    this.double =1;
    this.score=0;
    this.gameOver =  false;
    this.alpha = 0;

}
dataObj.prototype.reset = function(){
    this.fruitNum = 0;
    this.double = 1;
}
//分数绘画
dataObj.prototype.draw = function()
{
    var w = can1.width;
    var h = can1.height;

    ctx1.save();
    //ctx1.fillText("num "+ this.fruitNum, w*0.5 , h-50 );  //大鱼吃到的果实检测，碰撞后变化为0
    //ctx1.fillText("double  " + this.double,w*0.5 , h-80);  //大鱼吃到果实颜色，用double表示
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    ctx1.fillText("SCORE：  " + this.score,w*0.5 , h-20);
    if (this.gameOver){
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255,"+ this.alpha +")";
        ctx1.fillText("GAMEOVER",w*0.5 , h*0.5);
    }
    ctx1.restore();

}
dataObj.prototype.addScore = function()
{
    this.score += this.fruitNum*100*this.double;
    this.fruitNum = 0;
    this.double = 1;
}
