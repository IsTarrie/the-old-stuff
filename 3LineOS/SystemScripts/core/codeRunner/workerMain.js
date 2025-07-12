//codeRunner.js Worker内部
/*importScripts中的路径是相对于worker文件的位置，
而不是创建worker的脚本文件的位置*/
//初始化信息
var initInfo = {
    isFileLoaded:false,
    isReadyToMsg:false,
}
//导入文件
importScripts('../../../SCRIPTS/variables.js');
importScripts('../API/loadAPI.js');
//
initInfo.isFileLoaded = true;
//准备接收信息
addEventListener('message',(e)=>{
    handleMessage(e.data);
});
function handleMessage(data){
    //console.log(data);
}
initInfo.isReadyToMsg = true;
//告知主线程Worker加载完成
postMessage({
    cmd:[0,0],
});