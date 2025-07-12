//定义常量
var bufferList = {};/*程序运行过程中,会用到大量buffer,为防止混淆,
这里可以由不同函数自行添加CVS或CTX*/

bufferList.drawICOBufferEl = document.createElement("canvas");
bufferList.drawICOBuffer = bufferList.drawICOBufferEl.getContext("2d");
function drawICO(width,height,style){//style=[num,num,num]0-1的范围
    //常量
    const inset = 1.5;

    bufferList.drawICOBufferEl.width = width+inset*2;
    bufferList.drawICOBufferEl.height = height+inset*2;

    // bufferList.drawICOBuffer.fillStyle = defaultLightColor;
    // bufferList.drawICOBuffer.fillRect(0,0,bufferList.drawICOBufferEl.width,bufferList.drawICOBufferEl.height);
    //绘制边框,方便后期作对照
    if(false){
        bufferList.drawICOBuffer.strokeStyle = "#fff";
        bufferList.drawICOBuffer.strokeRect(0,0,width,height);
    }
    //常量
    const ScaleFactor_angleDis = [0.06,0.115,0.15];//同一个圆上不同点的角度间隔.angleDis*3不能大于1
    const ScaleFactor_circleDis = [0.45,0.35,0.1];//不同同心圆之间的距离,从圆心开始计算.三个数字的和不能大于1
    //const ScaleFactor_circleDis = [0.2,0.8];//为了获取小图标

    //数值
    const radius = width/2;
    function getPointOnCircle(r, thetaDegrees, canvasWidth = width, canvasHeight = height) {
        // 将角度从度转换为弧度，并调整角度，使0度指向正上方
        const adjustedThetaDegrees = (thetaDegrees - 90) % 360; // 调整角度
        const thetaRadians = (adjustedThetaDegrees * Math.PI) / 180;
        // 计算 x 和 y 坐标
        let x = r * Math.cos(thetaRadians);
        let y = r * Math.sin(thetaRadians);
        // 调整坐标以适应 canvas 的坐标系统
        x += canvasWidth / 2; // 圆心移至画布中心
        y += canvasHeight / 2; // 反转 y 坐标并移至画布中心
        return { x, y };
    }

    const angleDis = [
        360*ScaleFactor_angleDis[0],
        360*ScaleFactor_angleDis[1],
        360*ScaleFactor_angleDis[2]
    ];
    const angle_block = [
        120-angleDis[0],
        120-angleDis[1],
        120-angleDis[2]
    ];//每一“块”所占用的角度,即(360-3angDis)/3

    function getAngleList(angleDis,angle_block){
    return [
        
        angleDis/2,
        angleDis/2+angle_block/2,
        angleDis/2+angle_block,

        angleDis*1.5+angle_block,
        angleDis*1.5+angle_block*1.5,
        angleDis*1.5+angle_block*2,

        angleDis*2.5+angle_block*2,
        angleDis*2.5+angle_block*2.5,
        angleDis*2.5+angle_block*3
    ]; // 角度 (度)
    //console.log(...angles);
    }
    const angles = [
        getAngleList(angleDis[0],angle_block[0]),
        getAngleList(angleDis[1],angle_block[1]),
        getAngleList(angleDis[2],angle_block[2])
    ];
    const radiusList = [
        radius*ScaleFactor_circleDis[0],
        radius*(ScaleFactor_circleDis[0]+ScaleFactor_circleDis[1]),
        radius
    ]
    //获取内部两个圆上点实际位置
    var pointPos = [
        [],[],[]
    ];
    for(let i=0;i<angles.length;i++){
        for(let a = 0;a<angles[i].length;a++){
            let point = getPointOnCircle(radiusList[i],angles[i][a]);
            point.x += inset;
            point.y += inset;
            pointPos[i].push(point);
        }
    }

    
//点可视化(不是应用代码!!)
    if(false){
        bufferList.drawICOBuffer.beginPath();
        bufferList.drawICOBuffer.moveTo(pointPos[0][0].x,pointPos[0][0].y);
        for(let i=0;i<pointPos[0].length;i++){
            let x = pointPos[0][i].x;
            let y = pointPos[0][i].y;
            bufferList.drawICOBuffer.lineTo(x,y);
        }
        bufferList.drawICOBuffer.closePath();
        bufferList.drawICOBuffer.strokeStyle = "#fff";
        bufferList.drawICOBuffer.stroke();
        bufferList.drawICOBuffer.beginPath();
        bufferList.drawICOBuffer.moveTo(pointPos[1][0].x,pointPos[1][0].y);
        for(let i=0;i<pointPos[1].length;i++){
            let x = pointPos[1][i].x;
            let y = pointPos[1][i].y;
            bufferList.drawICOBuffer.lineTo(x,y);
        }
        bufferList.drawICOBuffer.closePath();
        bufferList.drawICOBuffer.strokeStyle = "#fff";
        bufferList.drawICOBuffer.stroke();
    }
    function drawBlock(indexList,color = defaultLightColor){//通过索引连接pointPos中相应的点
        bufferList.drawICOBuffer.beginPath();
        bufferList.drawICOBuffer.moveTo(pointPos[1][indexList[0]].x,pointPos[1][indexList[0]].y);
        for(let i=0;i<indexList.length;i++){
            let x = pointPos[1][indexList[i]].x;
            let y =pointPos[1][indexList[i]].y;
            bufferList.drawICOBuffer.lineTo(x,y);
        }for(let i = indexList.length-1;i>-1;i--){
            let x = pointPos[0][indexList[i]].x;
            let y =pointPos[0][indexList[i]].y;
            bufferList.drawICOBuffer.lineTo(x,y);
        }
        bufferList.drawICOBuffer.closePath();
        bufferList.drawICOBuffer.fillStyle = color;
        bufferList.drawICOBuffer.fill();
    }
    function getColorRGB(c1,c2,ratio){//两个颜色[r,g,b] 根据 比例系数0-1 之间调和的颜色
        let r = c1[0]*(1-ratio)+c2[0]*ratio;
        let g = c1[1]*(1-ratio)+c2[1]*ratio;
        let b = c1[2]*(1-ratio)+c2[2]*ratio;
        return [r,g,b];
    }
    function getColorText(c){
        return `rgb(${c[0]},${c[1]},${c[2]})`;
    }
    function drawLine(indexList,color = defaultLightColor){
        bufferList.drawICOBuffer.beginPath();
        bufferList.drawICOBuffer.moveTo(pointPos[2][indexList[0]].x,pointPos[2][indexList[0]].y);
        for(let i=0;i<indexList.length;i++){
            let x = pointPos[2][indexList[i]].x;
            let y =pointPos[2][indexList[i]].y;
            bufferList.drawICOBuffer.lineTo(x,y);
        }for(let i = indexList.length-1;i>-1;i--){
            let x = pointPos[2][indexList[i]].x;
            let y=pointPos[2][indexList[i]].y;
            bufferList.drawICOBuffer.lineTo(x,y);
        }
        bufferList.drawICOBuffer.closePath();
        bufferList.drawICOBuffer.strokeStyle = color;
        bufferList.drawICOBuffer.stroke();
    }
    drawBlock([6,7,8],getColorText(getColorRGB(defaultGrayColor_Array,defaultGradientColor[0],style[0])));
    drawBlock([0,1,2],getColorText(getColorRGB(defaultGrayColor_Array,defaultGradientColor[1],style[1])));
    drawBlock([3,4,5],getColorText(getColorRGB(defaultGrayColor_Array,defaultGradientColor_Middle_Array,style[2])));

    const ScaleFactor_Line = 0.45;
    drawLine([6,7,8],getColorText(getColorRGB(defaultGrayColor_Array,getColorRGB(defaultGradientColor[0],defaultGrayColor_Array,ScaleFactor_Line),style[0])));
    drawLine([0,1,2],getColorText(getColorRGB(defaultGrayColor_Array,getColorRGB(defaultGradientColor[1],defaultGrayColor_Array,ScaleFactor_Line),style[1])));
    drawLine([3,4,5],getColorText(getColorRGB(defaultGrayColor_Array,getColorRGB(defaultGradientColor_Middle_Array,defaultGrayColor_Array,ScaleFactor_Line),style[2])));
    // debugger
    //i = (bufferList.drawICOBufferEl.toDataURL('image/png'));//为了从中截取图标
    //console.log(...pointPos[0],pointPos.length);
}
bufferList.drawProgBarBufferEl = document.createElement("canvas");
bufferList.drawProgBarBuffer = bufferList.drawProgBarBufferEl.getContext("2d");
function drawProgressBar(width,height,progress){
    //绘制进度条,并返回dataURL
    const inset = 1.5; // 可以根据需要调整这个值
    //(防止图形边框与画布边框重合)
    let defaultBorderColor = '#fff'
    let defaultBackgroundColor = defaultGrayColor;
    let lightColor = '#eee';

    bufferList.drawProgBarBufferEl.width = width;
    bufferList.drawProgBarBufferEl.height = height+inset;
    bufferList.drawProgBarBuffer.clearRect(0,0,width,height);
// 0. 绘制背景
    bufferList.drawProgBarBuffer.fillStyle = defaultBackgroundColor;
    bufferList.drawProgBarBuffer.fillRect(inset,inset,width-inset*2,height-inset*2);
// 1. 绘制进度-方块
    bufferList.drawProgBarBuffer.fillStyle = lightColor;
    bufferList.drawProgBarBuffer.fillRect(inset,inset,Math.floor((width-inset*2)*progress),height-inset*2);

// 2. 绘制进度-把没用的地方填充为黑色
    //清除左边圆角
    bufferList.drawProgBarBuffer.beginPath();
    bufferList.drawProgBarBuffer.arc(
        height / 2,
        height / 2,
        (height / 2) - inset,
        Math.PI / 2,
        3 * Math.PI / 2,
        false
    );
    bufferList.drawProgBarBuffer.lineTo(0,inset);
    bufferList.drawProgBarBuffer.lineTo(0,height-inset);
    bufferList.drawProgBarBuffer.closePath();
    let c = defaultCloseColor;
    bufferList.drawProgBarBuffer.fillStyle = c;
    bufferList.drawProgBarBuffer.stroke();
    bufferList.drawProgBarBuffer.fill();
    //清除右边圆角
    bufferList.drawProgBarBuffer.beginPath();
    bufferList.drawProgBarBuffer.arc(
        width - height / 2,
        height / 2,
        (height / 2) - inset, // 减少半径以实现内缩
        -Math.PI / 2,
        Math.PI / 2,
        false
    );
    bufferList.drawProgBarBuffer.lineTo(width,height-inset);
    bufferList.drawProgBarBuffer.lineTo(width,inset);
    bufferList.drawProgBarBuffer.closePath();
    c = defaultCloseColor;
    bufferList.drawProgBarBuffer.fillStyle = c;
    bufferList.drawProgBarBuffer.stroke();
    bufferList.drawProgBarBuffer.fill();
    //delete c;
// 3. 绘制进度条边框
    // 设置路径
    bufferList.drawProgBarBuffer.beginPath();

    // 绘制左边的半圆
    bufferList.drawProgBarBuffer.arc(
        height / 2,
        height / 2,
        (height / 2) - inset, // 减少半径以实现内缩
        Math.PI / 2,
        3 * Math.PI / 2,
        false
    );
    // 绘制直线至右边
    bufferList.drawProgBarBuffer.lineTo(width-height/2-inset,inset);
    bufferList.drawProgBarBuffer.arc(
        width - height / 2,
        height / 2,
        (height / 2) - inset, // 减少半径以实现内缩
        -Math.PI / 2,
        Math.PI / 2,
        false
    );
    bufferList.drawProgBarBuffer.lineTo(height / 2, height - inset);

    // 关闭路径
    bufferList.drawProgBarBuffer.closePath();

    // 绘制填充
    //bufferList.drawProgBarBuffer.fillStyle = "#fff";
    //bufferList.drawProgBarBuffer.fill();

    // 绘制边框
    //为边框加入渐变(测试)
    if(false){
        const gradient = bufferList.drawProgBarBuffer.createLinearGradient(0, 0, width, 0);
        let g = defaultGradientColor;
        gradient.addColorStop(0,`rgb(${g[0][0]},${g[0][1]},${g[0][2]})`);
        gradient.addColorStop(1,`rgb(${g[1][0]},${g[1][1]},${g[1][2]})`);
        bufferList.drawProgBarBuffer.strokeStyle = gradient;
    }else{
        bufferList.drawProgBarBuffer.strokeStyle = defaultBorderColor;
    }
    bufferList.drawProgBarBuffer.lineWidth = Math.floor(height/8);
    if(height-inset*2>2){
    bufferList.drawProgBarBuffer.stroke();
    }


    /*当然,可能有人把窗口缩放到很小,导致进度条高度为1
    这里不更改主主逻辑,只是重新绘制一下,
    谁让TA们闲的没事干*/
    let minHeight = 2;//高度临界值
    if(height<=minHeight+inset*2 && false){
        bufferList.drawProgBarBuffer.clearRect(0,0,width,height);
        bufferList.drawProgBarBuffer.fillStyle = "#888";
        bufferList.drawProgBarBuffer.fillRect(inset,inset,width-inset,height-inset);
        bufferList.drawProgBarBuffer.fillStyle = "#fff";
        bufferList.drawProgBarBuffer.fillRect(inset,inset,Math.floor(width*progress)-inset,height-inset);

        bufferList.drawProgBarBuffer.beginPath();
        bufferList.drawProgBarBuffer.moveTo(0,0);
        bufferList.drawProgBarBuffer.lineTo(width,0);
        bufferList.drawProgBarBuffer.lineTo(width,height);
        bufferList.drawProgBarBuffer.lineTo(0,height);
        bufferList.drawProgBarBuffer.closePath();
        bufferList.drawProgBarBuffer.strokeStyle = gradient;
        bufferList.drawProgBarBuffer.lineWidth = 1.5;
        bufferList.drawProgBarBuffer.stroke();
    }

    // 返回数据URL
    //return bufferList.drawProgBarBufferEl.toDataURL('image/png');

}