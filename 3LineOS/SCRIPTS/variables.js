const defaultGradientColor = [
    [0, 100, 255],
    [255, 0, 180]
];
//默认渐变色的平均值
const defaultGradientColor_Middle_Array = [
    Math.floor((defaultGradientColor[0][0]+defaultGradientColor[1][0])/2),
    Math.floor((defaultGradientColor[0][1]+defaultGradientColor[1][1])/2),
    Math.floor((defaultGradientColor[0][2]+defaultGradientColor[1][2])/2)
]
const defaultGradientColor_Middle = `rgb(${defaultGradientColor_Middle_Array[0]},${defaultGradientColor_Middle_Array[1]},${defaultGradientColor_Middle_Array[2]})`;
//定义默认关闭颜色为黑色
const defaultCloseColor_Array = [0, 0, 0];
const defaultCloseColor = `rgb(${defaultCloseColor_Array[0]},${defaultCloseColor_Array[1]},${defaultCloseColor_Array[2]})`;
const defaultLightColor_Array = [238,238,238];
const defaultLightColor = `rgb(${defaultLightColor_Array[0]},${defaultLightColor_Array[1]},${defaultLightColor_Array[2]})`;
const defaultGrayColor_Array = [51,51,51];
const defaultGrayColor = `rgb(${defaultGrayColor_Array[0]},${defaultGrayColor_Array[1]},${defaultGrayColor_Array[2]})`;
const updateTime = 40;

const workerNumber = 8;
const corePath = 'SystemScripts/core/';
const codeRunnerPath = corePath + 'codeRunner/workerMain.js';