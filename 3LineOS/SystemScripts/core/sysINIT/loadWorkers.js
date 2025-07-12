let loadedWorkersNumber = 0;
function loadWorkers(){
    //加载所有工作进程
    workerList = [];
    for(let i=0;i<workerNumber;i++){
        workerList.push(new Worker(codeRunnerPath));
        workerList[i].addEventListener('message',readyForWorker);
    }
}
function readyForWorker(e){
    let data = e.data;
    if(data.cmd[0]==0){
        if(data.cmd[1]==0){
            loadedWorkersNumber++;
            if(loadedWorkersNumber==workerNumber){
                //工作线程准备就绪
                (()=>{
                    for(let i=0;i<workerNumber;i++){
                        //console.log('worker '+i+' is ready');
                        workerList[i].removeEventListener('message',readyForWorker);
                        workerList[i].addEventListener('message',handleWorkerMessage);
                    }
                    loadWorkersPage.isLoaded = true;
                    loadWorkersPage.progress = 1;
                })();
            }
        }
    }
}
function handleWorkerMessage(e){
    let data = e.data;
    //console.log(data);
}