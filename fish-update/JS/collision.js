/**
 * Created by fang on 16/9/21.
 */
//碰撞检测的功能
//判断大约和果实的距离
function momFruitsCollision(){

    if(!data.gameOver){
        for (var i = 0;i<fruit.num;i++)
        {
            if(fruit.alive[i])
            {
                //calculate  length  calLength2 (平方) 两者之间的距离
                var l = calLength2( fruit.x[i],fruit.y[i],mom.x , mom.y);
                if(l < 900)
                {
                    //果实被吃掉了
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if(mom.momBodyCount>7){
                        mom.momBodyCount=7;
                    }
                    if(fruit.fruitType[i] == "blue")
                    {
                        data.double = 2;
                    }
                    //大鱼吃到果实的效果
                    wave.born(fruit.x[i],fruit.y[i]);
                }

            }
        }
    }

}

//大鱼喂小鱼
function momBabyCollision(){

    if(data.fruitNum > 0 && !data.gameOver)
    {
        var l = calLength2(mom.x,mom.y, baby.x, baby.y);
        if(l<900){
            //小鱼颜色恢复为橘色
            baby.babyBodyCount = 0;
            //data 归零
            //data.reset();
            mom.momBodyCount = 0;
            //score  update
            data.addScore();
            //小鱼吃到果实的效果
            halo.born(baby.x,baby.y);
        }
    }

}