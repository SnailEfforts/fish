/**
 * Created by fang on 16/8/3.
 */
var can1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;

var lastTime;//上次执行的时间
var deltaTime; //执行间隔时间

var ane;   //海葵
var fruit;  //果实
var mom;  //鱼妈妈
var baby;

var mx;
var my;

var badyTail=[];
var badyEye = [];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyOra = [];
var momBodyBlue = [];


var data;

var wave;
var halo;

var dust;
var dustPic = [];

var bgPic=new Image();

//需要家在的函数，人家全部都放在 game（）函数中
document.body.onload=game;
function game(){
    init();  //初始化
    lastTime=Date.now();
    deltaTime=0;
    gameloop();
}

//初始化
function init(){
    //获得canvas context
    can1=document.getElementById("canvas1");//fineshes  dust  UI  circle
    //老师的教程中没有‘2d’，总是出错，之后百度查处之后添加
    ctx1=can1.getContext('2d');  //ctxt1画笔

    can2=document.getElementById("canvas2");//background ane fruits
    ctx2=can2.getContext('2d');

    //鼠标监听事件
    can1.addEventListener('mousemove',onMouseMove,false);

    bgPic.src="img/background.jpg";

    canWidth=can1.width;
    canHeight=can1.height;

    ane = new aneObj();
    ane.init();

    fruit=new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth*0.5;
    my = canHeight*0.5;

    for(var i=0;i<8;i++)
    {
        badyTail[i] = new Image();
        badyTail[i].src = "img/src1/babyTail" + i +".png";
    }

    for(var i = 0;i <2 ;i++)
    {
        badyEye[i] = new Image();
        badyEye[i].src = "img/src1/babyEye" + i +".png";
    }

    for(var i =0 ;i<20;i++)
    {
        babyBody[i] = new Image();
        babyBody[i].src = "img/src1/babyFade" + i + ".png";
    }
    //大鱼尾巴
    for(var i=0;i<8;i++)
    {
        momTail[i] = new Image();
        momTail[i].src = "img/src1/bigTail" + i +".png";
    }
    //大鱼的眼睛
    for (var i=0; i<2;i++)
    {
        momEye[i] = new Image();
        momEye[i].src = "img/src1/bigEye" + i+ ".png";
    }

    data = new dataObj();
    //大鱼的身体
    for (var i=0; i<8;i++)
    {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "img/src1/bigSwim"+ i + ".png";
        momBodyBlue[i].src = "img/src1/bigSwimBlue"+ i + ".png";
    }

    //绘制分数的字体颜色大小
    ctx1.fillStyle="white";
    ctx1.font = "30px Verdana";
    ctx1.textAlign="center";  //left right center

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for(var i = 0; i<7;i++){
        dustPic[i] = new Image();
        dustPic[i].src = "img/src1/dust" + i +".png";
    }
    dust = new dustObj();
    dust.init();

}

//绘画
function gameloop(){
    //setInterval  setTimeout  当前绘制完成之后，根据机器性能确定间隔多长时间绘制下一帧
    window.requestAnimationFrame(gameloop);

    var now=Date.now();
    deltaTime=now-lastTime;
    if(deltaTime>40){deltaTime=40;} //防止chrome浏览器中切换标签之后，图标超级大
    lastTime=now;

    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();  //分数的显示
    wave.draw();  //大鱼吃到食物效果的显示
    halo.draw();  //小鱼获取到食物的样式
    dust.draw();  //漂浮物效果
}
//鼠标监听事件
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offSetX|| e.layerY){
            mx = e.offSetX == undefined ? e.layerX: e.offsetX;
            my = e.offSetY == undefined ? e.layerY: e.offsetY;
        }
    }
}
