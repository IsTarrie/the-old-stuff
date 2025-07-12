async function downloadFilesWithProgress(fileUrls, handleProgress = ()=>{},handleResults = ()=>{}) {
    let totalSize = 0;
    let downloadedSize = 0;
    const results = Array(fileUrls.length).fill(null); // 初始化结果数组，所有项默认为 null
    // 获取所有文件的总大小
    async function getTotalFileSize() {
        for (const url of fileUrls) {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                //if (!response.ok) throw new Error(`Failed to get size for ${url}`);
                const contentLength = response.headers.get('Content-Length');
                totalSize += contentLength ? parseInt(contentLength, 10) : 0;
            } catch (error) {
                //console.error(`Error getting size for ${url}:`, error);
            }
        }
    }
    // 下载单个文件并更新进度
    async function downloadFile(index, url) {
        return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to download ${url}`);
            const contentLength = response.headers.get('Content-Length');
            const fileTotalSize = contentLength ? parseInt(contentLength, 10) : null;
            let fileDownloadedSize = 0;
            const chunks = []; // 用于累积数据块
            const reader = response.body.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                fileDownloadedSize += value.length;
                downloadedSize += value.length;
                //const progress = (downloadedSize / totalSize) * 100;
                const progress = (downloadedSize / totalSize)
                handleProgress(progress); // 调用进度回调
                // 累积数据块
                chunks.push(value);
                //console.log(`Received chunk of size ${value.length}`);
            }
            //console.log(`Finished downloading ${url}`);
            // 将累积的数据块转换为 Blob
            const blob = new Blob(chunks);
            results[index] = blob;
            resolve();
        } catch (error) {
            console.error(`Error downloading ${url}:`, error);
            results[index] = null; // 如果下载失败，设置为 null
            resolve(); // 确保 Promise 始终解析，即使发生错误
        }
        });
    }
    // 主函数逻辑
    try {
        await getTotalFileSize();
        //console.log(`Total file size: ${totalSize} bytes`);
      // 并发下载所有文件
        const downloadPromises = fileUrls.map((url, index) => downloadFile(index, url));
        await Promise.all(downloadPromises);
        //console.log('All files processed.');
    } catch (error) {
        //console.error('Error during download:', error);
    }
    //console.log(results);
    handleResults(results);
    //return results;
}
async function ReadBlob(files, handleResult = ()=>{}, readType = 'text') {
    const results = []; // 用于累积文件内容
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file === null) {
            // 如果文件下载失败，添加 null 到结果列表
            results.push(null);
            continue;
        }
        try {
        let fileContent;
        const reader = new FileReader();
        // 创建一个 Promise 来等待文件读取完成
        const filePromise = new Promise((resolve, reject) => {
            reader.onload = function(event) {
            switch (readType.toLowerCase()) {
                case 'arraybuffer':
                    fileContent = event.target.result;
                    break;
                case 'dataurl':
                    fileContent = event.target.result;
                    break;
                case 'text':
                    fileContent = event.target.result;
                    break;
                default:
                    //console.warn(`Unknown read type: ${readType}. Defaulting to 'text'.`);
                    fileContent = event.target.result;
                    break;
            }
            resolve();
            };
            reader.onerror = function(error) {
                console.error(`Error reading file ${i + 1}:`, error);
                fileContent = null;
                resolve(); // 确保 Promise 始终解析
            };
          // 根据指定的读取类型选择相应的读取方法
            switch (readType.toLowerCase()) {
                case 'arraybuffer':
                    reader.readAsArrayBuffer(file);
                    break;
                case 'dataurl':
                    reader.readAsDataURL(file);
                    break;
                case 'text':
                    reader.readAsText(file);
                    break;
                default:
                    //console.warn(`Unknown read type: ${readType}. Defaulting to 'text'.`);
                    reader.readAsText(file);
                    break;
            }
        });
        // 等待当前文件读取完成
        await filePromise;
        // 将文件内容添加到结果列表中
        results.push(fileContent);
        //console.log(`File ${i + 1} processed.`);
        } catch (error) {
            console.error(`Error processing file ${i + 1}:`, error);
            results.push(null); // 如果发生错误，添加 null 到结果列表
        }
    }
    // 所有文件读取完成后，调用 handleResult 处理结果列表
    handleResult(results);
}


function loadScriptsInOrder(fileList,handleProgress = ()=>{},handleEnd = ()=>{}) {
    let index = 0;
    function loadNextScript() {
    if (index >= fileList.length) {
        // 所有脚本加载完成，调用 handleEnd
        handleEnd();
        return;
    }
    const url = fileList[index];
    const script = document.createElement('script');
    script.src = url;
      script.async = false; // 确保脚本按顺序执行
      script.defer = true;  // 确保脚本在文档解析完成后执行
    script.onload = () => {
        handleProgress(index/fileList.length);
        index++;
        loadNextScript(); // 加载下一个脚本
    };
    script.onerror = (error) => {
        //console.error(`Error loading or executing script ${index + 1} (${url}):`, error);
        index++;
        loadNextScript(); // 继续加载下一个脚本，即使当前脚本失败
    };
    document.body.appendChild(script);
    }
    // 开始加载第一个脚本
    loadNextScript();
}
//主逻辑开始
const fileListDir = 'SystemScripts/';//以fileListDir作为请求目录
const fileListPath = fileListDir+'fileList.json';
let fileList;
//获取文件列表
function getFileList(){
    downloadFilesWithProgress([fileListPath],
        ()=>{},
        (results)=>{
            loadPage.isLoading = true;//更改以显示进度条
            ReadBlob(results,(result,index)=>{
                if(result[0] !== null){
                    //下载文件
                    fileList = JSON.parse(result[0]);
                    let JSfileList = fileList['JSfiles'];

                    if(fileListDir){//以fileListDir作为请求目录
                        JSfileList = JSfileList.map((file)=>{
                            return fileListDir+file;
                        });
                    }
                    let isDevMode = true;

                    loadPage.isStartLoad = true;
                    loadPage.beginningTime = new Date().getTime();
                    loadPage.progHis.push([0,new Date().getTime()]);

                    if(isDevMode){
                        getJSFilesByScEl(JSfileList);
                    }else{
                        getFileListByAJAX(JSfileList);
                    }

                }else{
                    setTimeout(()=>{
                        getFileList();
                    },1000);//重试下载
                }
            });
    });
}
function handleFileLoadProgress(progress){
    loadPage.progress = progress;
    loadPage.progHis.push([progress,new Date().getTime()]);
    if(tlOS.animation){
        loadPage.progress_animation.maxTime = getAverageResponseTime()/2;
    }
    //console.log(getAverageResponseTime());
    //console.log(...loadPage.progHis);
    //console.log(loadPage.progress);
}
//计算平均相应时间
function getAverageResponseTime(){
    //计算每两次加载的时间间隔
    let list = [];
    for(let i = 0;i < loadPage.progHis.length-1;i++){
        list.push(loadPage.progHis[i+1][1]-loadPage.progHis[i][1]);
    }
    //计算平均值
    return list.reduce((a, b) => a + b, 0) / list.length;
}
function getJSFilesByScEl(fileList){
        //插入script
        loadScriptsInOrder(fileList,handleFileLoadProgress,()=>{
            //加载完成
            loadPage.isLoaded = true;
            loadPage.progress = 1;
        });
        //loadPage.progress = 0.9;
        //console.log(loadPage.progress);
}
function getFileListByAJAX(fileList){
    downloadFilesWithProgress(fileList,handleFileLoadProgress,
        (results)=>{
            //if……null……
            ReadBlob(results,(result,index)=>{
                let scriptEl = document.createElement('script');
                for(let i = 0;i < result.length;i++){
                    if(result[i] !== null){
                        scriptEl.innerHTML += '\n'+result[i];
                        //console.log(scriptEl);
                    }else{
                        //处理错误
                    }
                }
                document.body.appendChild(scriptEl);
                loadPage.progress = 1;
                loadPage.isLoaded = true;
            });
        }
    );
}
getFileList();
function update_loadFile(){
    //加载文件时使用更新数据的函数
    renderFrame_loadFile();
    //如果加载完成,则启动系统
    if(loadPage.isLoaded){
        initOS();
    }
}
var update_loadFile_interval = setInterval(update_loadFile,updateTime);