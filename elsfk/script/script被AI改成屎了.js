const blockSize = 25;//单个方块的大小25像素
const height = 20;//y轴方向方块个数最多20个
const width = 10;//x轴方向方块个数最多10个
const colors = [
    "#00FFFF",
    "#FFFF00",
    "#FF8C00",
    "#00FF00",
    "#FF0000",
    "#0000FF",
    "#800080"
];const shapes = [
    [
        [1, 1, 1, 1]
    ],[
        [0, 0, 1],
        [1, 1, 1]
    ],[
        [1, 0, 0],
        [1, 1, 1]
    ],[
        [1, 1],
        [1, 1]
    ],[
        [0, 1, 1],
        [1, 1, 0]
    ],[
        [0, 1, 0],
        [1, 1, 1]
    ],[
        [1, 1, 0],
        [0, 1, 1]
    ]];
var fallenBlocks = [];//这个二维列表存储这已经落下的方块的颜色值
for(let i=0;i<height;i++){
    fallenBlocks[i] = [];
    for(let j=0;j<width;j++){
        fallenBlocks[i][j] = null;
    }
}
var fallingShape = {
    shapeID: 0,       // 形状的索引，对应于 shapes 数组中的索引
    color:0,         // 形状的颜色索引
    x: 0,             // 形状的水平位置
    y: 0,             // 形状的垂直位置
    rotation: 0      // 形状的旋转状态
};
const borderOfBlock = 0.2;//边框方块的百分比
const colorChange = [0.6,0.7,-0.5,-0.6];//方块周围的梯形颜色增减值的数组

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var gameCVS = document.getElementsByTagName('canvas')[0];

var gameCTX = gameCVS.getContext("2d");

var bufferCVS = document.createElement("canvas");
var bufferCTX = bufferCVS.getContext("2d");

function setGameCVSSize(){
    gameCVS.width = blockSize * width;
    gameCVS.height = blockSize * height;
    bufferCVS.width = gameCVS.width;
    bufferCVS.height = gameCVS.height;
}setGameCVSSize();

function drawBlock(ctx,x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.strokeStyle = color;
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}
function drawBlock(ctx,x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize, blockSize *(1-borderOfBlock*2), blockSize * (1-borderOfBlock*2));
    ctx.strokeStyle = color;
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    //绘制第一个梯形
    ctx.beginPath();
    ctx.moveTo(x * blockSize, y * blockSize);
    ctx.lineTo((x+1)* blockSize, y * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[0]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[0]);
    ctx.fill();
    ctx.stroke();
    //绘制第二个梯形
    ctx.beginPath();
    ctx.moveTo((x+1)* blockSize, y * blockSize);
    ctx.lineTo((x+1)* blockSize, (y+1) * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[1]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[1]);
    ctx.fill();
    ctx.stroke();
    //绘制第三个梯形
    ctx.beginPath();
    ctx.moveTo(x* blockSize, (y+1) * blockSize);
    ctx.lineTo((x+1)* blockSize, (y+1) * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[2]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[2]);
    ctx.fill();
    ctx.stroke();
    //绘制第四个梯形
    ctx.beginPath();
    ctx.moveTo(x* blockSize, y * blockSize);
    ctx.lineTo(x * blockSize, (y+1) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[3]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[3]);
    ctx.fill();
    ctx.stroke();
}

function adjustColorBrightness(hexColor, percent) {//改变颜色亮度,使方块更灵动
    var r = parseInt(hexColor.substring(1, 3), 16);
    var g = parseInt(hexColor.substring(3, 5), 16);
    var b = parseInt(hexColor.substring(5, 7), 16);
    var color = [r,g,b];
    if(percent > 0){
        for(let i = 0;i<color.length;i++){
            if(color[i]>=255){
                continue;
            }if(color[i]<=0){
                color[i]=Math.floor(255*percent);
                continue;
            }color[i] += color[i] * percent;
            if(color[i]>255){
                color[i]=255;
            }
        }
    }if(percent<0){
        percent = Math.abs(percent);
        for(let i = 0;i<color.length;i++){
            if(color[i]<=0){
                continue;
            }if(color[i]>=255){
                color[i]=Math.floor(255* percent);
                continue;
            }
            color[i] -= color[i] * percent;
            if(color[i]<=0){
                color[i]=0;
            }
        }
    }
    var newColor =   `#${color[0].toString(16).padStart(2, '0')}${color[1].toString(16).padStart(2, '0')}${color[2].toString(16).padStart(2, '0')}`;

    return newColor;
}
function rotatedCoord(col, row, rotation, x, y) {
    let newX, newY;
    switch (rotation) {
        case 0: // 无旋转
            newX = x + col;
            newY = y + row;
            break;
        case 1: // 顺时针旋转90度
            newX = x + height - 1 - row;
            newY = y + col;
            break;
        case 2: // 旋转180度
            newX = x + width - 1 - col;
            newY = y + height - 1 - row;
            break;
        case 3: // 逆时针旋转90度
            newX = x + row;
            newY = y + width - 1 - col;
            break;
    }
    return [newX, newY];
}
function drawShape(ctx, shapeID, x, y, color, rotation = 0) {
    const shape = shapes[shapeID];
    const height = shape.length;
    const width = shape[0].length;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let newX, newY;

            // 根据旋转角度计算新的位置
            switch (rotation) {
                case 0: // 无旋转
                    newX = x + j;
                    newY = y + i;
                    break;
                case 1: // 顺时针旋转90度
                    newX = x + height - 1 - i;
                    newY = y + j;
                    break;
                case 2: // 旋转180度
                    newX = x + width - 1 - j;
                    newY = y + height - 1 - i;
                    break;
                case 3: // 逆时针旋转90度
                    newX = x + i;
                    newY = y + width - 1 - j;
                    break;
            }

            if (shape[i % height][j % width] === 1) {
                drawBlock(ctx, newX, newY, color);
            }
        }
    }
}
function storeFallenBlock() {
    const { shapeID, x, y, rotation } = fallingShape;
    const shape = shapes[shapeID];
    const shapeWidth = shape[0].length;
    const shapeHeight = shape.length;

    // 存储已固定的方块
    for (let i = 0; i < shapeHeight; i++) {
        for (let j = 0; j < shapeWidth; j++) {
            if (shape[i][j] === 1) { // 如果是方块
                let newX, newY;

                // 根据旋转角度计算新的位置
                [newX, newY] = rotatedCoord(j, i, rotation, x, y);

                // 如果坐标有效
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    fallenBlocks[newY][newX] = shapeID; // 存储方块的形状ID
                }
            }
        }
    }
}


function renderFallenBlocks(ctx) {//读取已经落下的方块并渲染
    for (let i = 0; i < fallenBlocks.length; i++) {
        for (let j = 0; j < fallenBlocks[i].length; j++) {
            if (fallenBlocks[i][j] !== null) {
                const color = colors[fallenBlocks[i][j]];
                drawBlock(ctx, j, i, color);
            }
        }
    }
}

function randomSetShape() {//随机设置一个形状
    let shapeID = Math.floor(Math.random() * shapes.length);
    let color = Math.floor(Math.random() * colors.length);
    fallingShape.shapeID = shapeID;
    fallingShape.color = color;
    fallingShape.x = Math.floor(Math.random() * (width - shapes[shapeID][0].length));
    fallingShape.y = -(shapes[shapeID].length);
    fallingShape.rotation = 0;
}
function checkForCollision() {
    const { shapeID, x, y, rotation } = fallingShape;
    const shape = shapes[shapeID];
    const shapeWidth = shape[0].length;
    const shapeHeight = shape.length;

    // 检查是否碰到其他方块
    for (let i = 0; i < shapeHeight; i++) {
        for (let j = 0; j < shapeWidth; j++) {
            if (shape[i][j] === 1) { // 如果是方块
                let newX, newY;

                // 根据旋转角度计算新的位置
                [newX, newY] = rotatedCoord(j, i, rotation, x, y);

                // 检查边界
                if (newX >= width || newY >= height) {
                    return true; // 如果超出边界，则视为碰撞
                }

                // 检查碰撞
                if (fallenBlocks[newY] && fallenBlocks[newY][newX]) {
                    return true;
                }
            }
        }
    }
    // 如果没有碰到任何方块，则返回false
    return false;
}
function update(){
    bufferCTX.clearRect(0, 0, bufferCVS.width, bufferCVS.height);
    drawShape(
        bufferCTX,
        fallingShape.shapeID,
        fallingShape.x,
        fallingShape.y,
        colors[fallingShape.color],
        fallingShape.rotation
    );renderFallenBlocks(bufferCTX);
    gameCTX.clearRect(0, 0, gameCVS.width, gameCVS.height);
    gameCTX.drawImage(bufferCVS, 0, 0);
    if(checkForCollision()||fallingShape.y+shapes[fallingShape.shapeID].length >= height){
        if(fallingShape.y<= 0){
            clearInterval(gameThread);
            return;//这里在碰撞之后直接返回,否则继续运行可能会导致存储被索引到不存在的数据,导致错误
        }
        try{
        storeFallenBlock();
        }catch(e){
            console.log(fallingShape);
            console.log(colors);
        }
        randomSetShape();
    }
}
update();

var gameThread = setInterval(function(){
    update();
    fallingShape.y++;
},100)