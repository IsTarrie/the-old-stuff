# JS文件加载顺序
1. variables.js 全局变量
2. default.js 默认脚本文件,包含一些变量和函数
3. init.js 初始化设置,加载页面外观
4. load.js 加载文件

5. mainUpdate.js 启动系统
6. loadWorkers.js 加载线程
# 
以SCRIPTS中的文件为引导,为了启动SystemScripts中真正的系统文件

# 全局变量以及函数(函数后以()做标记)
- variables.js
    - defaultGradientColor
    - defaultGradientColor_Middle_Array
    - defaultGradientColor_Middle
    - defaultCloseColor_Array
    - defaultCloseColor
    - defaultLightColor_Array
    - defaultLightColor
    - defaultGrayColor_Array
    - defaultGrayColor
    - updateTime
    - workerNumber
    - corePath
    - codeRunnerPath
- default.js
    - bufferList*程序运行过程中,会用到大量buffer,为防止混淆,这里可以由不同函数自行添加CVS或CTX*
    - bufferList.drawICOBufferEl
    - bufferList.drawICOBuffer
    - bufferList.drawProgBarBufferEl
    - bufferList.drawProgBarBuffer

    - drawICO(width, height)
    - drawProgressBar(width, height, progress)
        inset
        defaultBorderColor
        defaultBackgroundColor
        lightColor
- init.js
    - cvsEL
    - ctx
    - bufferEl
    - buffer
    - loadPage = {
        - isStartLoad
        - beginningTime
        - isLoaded
        - progress
        - animation = {
            - isFinished
            - step
            - progress
            - GO()
            - END()
        }
    }
    - loadPage_style = {
        - iconWidth:0.115,//一个图标对于CVS的高度或宽度的占比.(图像长宽相等)
        - progressBarWidth:0.13,//进度条对于CVS的高度或宽度的占比.
        - progressBarHeight:0.006,//进度条对于CVS的高度或宽度的占比.
        - ScaleFactor_progBarDis:0.4,//进度条在Y坐标上与图标的距离(this*iconWidth)的比值.
    }
    - tlOS = {//three line OS的缩写
        - isLoaded
    }
    - setCVSsize(e)
    - update_loadFile()
    - renderFrame_loadFile(progress)
    - renderFrame()
- loadFile.js
    - fileListPath //临时变量
    - fileList
    - downloadFilesWithProgress()
    - ReadBlob()
    - loadScriptsInOrder()
    - getFileList()
    - handleFileLoadProgress()
    - getAverageResponseTime()
    - getJSFilesByScEl()
    - getFileListByAJAX()
- mainUpdate.js
    - update_system_init_interval
    - workerList
    - loadWorkersPage = {
        - isLoaded
        - beginningTime
        - progress
        - animation = {
            - progress
            - loopTime
            - GO()
        }
    }
    - initOS()
    - loadPageToLoginPage() //先预备着,不知道用不用
- loadWorkers.js
    - loadWorkers() //预备
    - readyForWorker()
    - handleWorkerMessage()
# Worker指令登记
在worker的高速运行中,传输文本指令会占用大量资源,因此在这里对照文本给出数字编号,以提高效率

示例:
```JavaScript
//主线程
workerList[i].postMessage({
    cmd:[1,1,3],
    data:{
        //data goes here
    }
});
//Worker
addEventListener('message',(e)=>{handleMessage(e.data);});function handleMessage(data){/*code goes here*/}
/*code goes here*/
postMessage({
    cmd:[1,1,3],
    result:{
        //result goes here
    },
})
```
- ready`0`
    - readyToWork`0` //表示Worker已经就绪,可以准备启动
- get`1`
    - loadStatus`1`
        - all`1`
        - file`2`
        - readyToMessage`3`
- start`2` //启动worker内部的程序
# 开关记录
- 控制加载文件方法的开关
    - loadFile.js 185
# 进度
1. 实现canvas自动适应浏览器窗口大小,并在窗口变化时渲染一帧 (完成✅)
2. 实现加载文件并显示进度条
    1. 显示进度条位置(完成✅)
    2. 绘制空进度条,实现绘制函数(完成✅)
    3. 加载文件
        1. “加载”函数(完成✅)
        2. 获取文件列表(完成✅)
        3. 加载文件(完成✅)
    4. 系统

        *由于这部分内容关系复杂,已经不是简单的单线程和包含关系了,因此这部分内容会同时开发*

        **下一阶段:提取init.js文件中的渲染程序,为后续的加载Worker页面做准备**

        - API构建
        - 代码执行器
            - 应用执行
            - 进程执行
                - 应用进程
                - 系统进程
        - 渲染程序构建
            - 加载界面
                - 脚本文件(完成✅)
                - Worker
                - 配置
        - 登录界面
# 计划
1. 第一个开关-加载文件**是否**使用AJAX(完成✅)
2. ~~分离~~**改造**加载页面渲染函数(完成✅)
3. 绘制图标……?(完成✅)
    *又要做数学题了*

    ***第一阶段统计:***
    - **JS:655行**
    - HTML:29行
    - CSS:12行
    - JSON:6行

    共计代码行数:*707*行,
    共计字符数量:*23920*字

    统计时间:*2025-01-04 04:28*
4. 添加动画(完成✅)
    优化动画(完成✅)
5. 载入Workers(完成✅)
6. 准备启动Worker