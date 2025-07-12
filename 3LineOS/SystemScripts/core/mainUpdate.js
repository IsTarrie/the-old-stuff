
var update_system_init_interval;
var workerList = [];
var loadWorkersPage = {
    isLoaded:false,
    beginningTime:null,//开始加载的时间
    progress:0,//其实只有0和1(至少目前是这样的)
    animation:{
        progress:0,//说是进度,其实是控制外观的一个变量(至少目前是这样的)
        loopTime:700,//动画循环周期,以毫秒为单位
        GO:function(){
            let now = new Date().getTime();
            let elapsedTime = now-loadWorkersPage.beginningTime;
            let looped = Math.floor(elapsedTime/loadWorkersPage.animation.loopTime);
            let more = elapsedTime % loadWorkersPage.animation.loopTime;
            let numerator;
            if(looped%2==0){
                numerator = more;
            }else{
                numerator = loadWorkersPage.animation.loopTime-more;
            }
            let progress = numerator/loadWorkersPage.animation.loopTime;
            loadWorkersPage.animation.progress = progress;
        }
    },
};
function initOS(){//操作系统初始化
    clearInterval(update_loadFile_interval);

    loadWorkers();
    loadWorkersPage.beginningTime = new Date().getTime();

    tlOS.state = 'init';
    update_system_init_interval = setInterval(update_init,updateTime);
}
function renderFrame_init(){
    bufferEl.width = cvsEL.width;
    bufferEl.height = cvsEL.height;
    //渲染一帧到canvas(加载完成之后的渲染函数主逻辑)
    buffer.clearRect(0,0,bufferEl.width,bufferEl.height);
    //先绘制一个黑屏
    buffer.fillStyle = defaultCloseColor;
    buffer.fillRect(0,0,bufferEl.width,bufferEl.height);

    let loadWorkerProgress = loadWorkersPage.progress;
    if(tlOS.animation){
        loadWorkerProgress = loadWorkersPage.animation.progress;
        loadWorkersPage.animation.GO();
    }

    renderFrame_loadFile(1,loadWorkerProgress,0,false,true);

    ctx.drawImage(bufferEl,0,0);
}
function update_init(){
    //主逻辑,自文件加载完成,会被不停调用
    renderFrame_init();
}
function loadPageToLoginPage(){
    //先预备着
}