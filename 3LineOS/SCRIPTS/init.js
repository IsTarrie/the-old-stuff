//获取HTML元素以及ctx
var cvsEL = document.getElementById("canvas");
var ctx = cvsEL.getContext("2d");
var bufferEl = document.createElement('canvas');
var buffer = bufferEl.getContext("2d");

//
var loadPage = {//"加载"页面的数据
    isStartLoad:false,
    beginningTime:null,
    progHis:[],
    isLoaded:false,
    //isFinished:false,
    progress:0,
    progress_animation:{
        isFinished:false,
        step:0.35,//每秒
        maxTime:400,//每次进度(表现)一个阶段更新所用的时间(毫秒)
        progress:0,
        GO:function(){
            if(!loadPage.progHis || loadPage.progHis.length<2){
                return;
            }
            const now = new Date().getTime();
            const theLastLoaded_index = loadPage.progHis.length-2;
            const theLast_index = loadPage.progHis.length-1;
            const theMinProgress = loadPage.progHis[theLastLoaded_index][0];
            //const elapsedTime_items = loadPage.progHis[theLast_index][1]-loadPage.progHis[theLastLoaded_index][1];
            const elapsedTime_now = now-loadPage.progHis[theLast_index][1];
            const elapsedProgress = loadPage.progHis[theLast_index][0]-theMinProgress;

            let ScaleFactor = (elapsedTime_now/this.maxTime);
            if(ScaleFactor > 1)ScaleFactor = 1;
            const more = elapsedProgress*ScaleFactor;
            const newProgress = theMinProgress+more;

            this.progress = newProgress;
        },
        END:function(){
            if(this.progress < 1 && loadPage.isLoaded){
                if(!this.ending)this.ending = {
                    time:new Date().getTime(),
                    progress:this.progress,
                    elapsedProgress:loadPage.progress - this.progress,
                    maxTime:700
                };
                const now = new Date().getTime();
                const elapsedTime_now = now-this.ending.time;
                let ScaleFactor = (elapsedTime_now/this.ending.maxTime);
                if(ScaleFactor > 1)ScaleFactor = 1;
                const more = this.ending.elapsedProgress*ScaleFactor;
                this.progress = this.ending.progress+more;
            }
        }
    },
};
var loadPage_style = {
    iconWidth:0.115,//一个图标对于CVS的高度或宽度的占比.(图像长宽相等)
    progressBarWidth:0.13,//进度条对于CVS的高度或宽度的占比.
    progressBarHeight:0.006,//进度条对于CVS的高度或宽度的占比.
    ScaleFactor_progBarDis:0.4,//进度条在Y坐标上与图标的距离(this*iconWidth)的比值.
};
/*
var loadPage_data = {
    //加载文件时使用,用于更新数据
    isLoading:false,
    progress:0,
}
*/
var tlOS = {//"操作系统"的数据
    isloaded:false,//表示文件列表是否加载完成
    state:'loading',//操作系统状态
    animation:true,
};

//
window.addEventListener('resize',setCVSsize);

function setCVSsize(e){
    //针对浏览器窗口大小变化时使用更新的函数
    cvsEL.width = window.innerWidth;
    cvsEL.height = window.innerHeight;
    switch(tlOS.state){
        case 'loading':
            renderFrame_loadFile();
            break;
        case 'init':
            renderFrame_init();
            break;
        default:
            break;
    }
}
function renderFrame_loadFile(file = loadPage.progress,
worker = 0,init = 0,isProg = true,usedAsFunc = 0){
/*这个函数既可以作为加载文件时的渲染函数,也会在加载worker和初始化时作为普通函数被调用
这几个参数是可选的,默认情况为了适应加载文件的页面*/
    //加载文件时使用渲染的函数
    //黑色背景
    if(!usedAsFunc){
        bufferEl.width = cvsEL.width;
        bufferEl.height = cvsEL.height;

        buffer.fillStyle = defaultCloseColor;
        buffer.fillRect(0,0,bufferEl.width,bufferEl.height);
    }

    let usedNumber;
    if(bufferEl.height>bufferEl.width){
        usedNumber = bufferEl.height;
    }else{
        usedNumber = bufferEl.width;
    }
    //计算图标位置
    let iconWidth;
    iconWidth = usedNumber * loadPage_style.iconWidth;
    let iconX = (bufferEl.width - iconWidth)/2;
    let iconY = bufferEl.height*(0.45)-iconWidth/2;
    //计算进度条位置
    let progressBarWidth = usedNumber * loadPage_style.progressBarWidth;
    let progressBarHeight = usedNumber * loadPage_style.progressBarHeight;
    let progressBarX = (bufferEl.width - progressBarWidth)/2;
    let progressBarY = iconY + iconWidth + iconWidth*loadPage_style.ScaleFactor_progBarDis;

    //把有用的参数向下取整
    iconX = Math.floor(iconX);
    iconY = Math.floor(iconY);
    progressBarX = Math.floor(progressBarX);
    progressBarY = Math.floor(progressBarY);

    iconWidth = Math.floor(iconWidth);
    progressBarWidth = Math.floor(progressBarWidth);
    progressBarHeight = Math.ceil(progressBarHeight);

    //绘制图标
    if(tlOS.animation && !loadPage.isLoaded && loadPage.isStartLoad){
        file = loadPage.progress_animation.progress;
        if(!loadPage.isLoaded){
            loadPage.progress_animation.GO();
            //console.log(loadPage.progress_animation.progress);
        }
    }else if(tlOS.animation && loadPage.isLoaded && !loadPage.progress_animation.isFinished){
        file = loadPage.progress_animation.progress;
        loadPage.progress_animation.END();
    }

    drawICO(iconWidth,iconWidth,[file,worker,init]);
    buffer.drawImage(bufferList.drawICOBufferEl,iconX,iconY);
    //绘制进度条
    //buffer.fillStyle = "#fff";
    if(isProg && !loadPage.isLoaded && loadPage.isStartLoad){
        drawProgressBar(progressBarWidth,progressBarHeight,file);
        buffer.drawImage(bufferList.drawProgBarBufferEl,progressBarX,progressBarY);
    }
    /*
    //以iconAreaHeight绘制分界线
    buffer.fillStyle = "#0f0";
    buffer.fillRect(0,iconAreaHeight,bufferEl.width,1);
    */
    if(!usedAsFunc){
        ctx.drawImage(bufferEl,0,0);
    }
}

setCVSsize();