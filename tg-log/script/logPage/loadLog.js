const onceLogNumMax = 10;
var logNum = 0;
var maxNum;
var loadingEndAt;
var logArea = document.getElementById('main');
var isLoad = document.getElementById('isLoad');
isLoad.innerHTML = '加载中……';


let xhr = new XMLHttpRequest();
xhr.open("GET","/logData/data.json",false);
xhr.onload = function(){
    let logData = JSON.parse(xhr.responseText);
    maxNum = logData.maxNum;
    loadingEndAt = logData.maxNum;
    loadLog();
};xhr.send(null);
function loadLog(){
    if(logNum >= onceLogNumMax || loadingEndAt <= 0){
        logNum = 0;//清空本次加载缓存
        isLoad.hidden = true;
        return;
    }logNum += 1;

    let xhr = new XMLHttpRequest();
    xhr.open('GET',`/logData/${loadingEndAt}/data.json`,false);
    xhr.onload = function(e){

        let isError = (this.status != 200) || !this.responseText;
        if(this.status != 200){
            e.preventDefault();
            var logData = {
                title:`${this.status}错误`,
                description:`日志编号:${loadingEndAt}`,
                date:`错误信息:${this.statusText}`
            };console.group(`${loadingEndAt}加载失败`);
            console.error(`${loadingEndAt}加载失败`);
            console.info(
`来源:logData/data.json
    日志总数:${maxNum}
缓存数据:
    正在尝试加载:${loadingEndAt}
    错误码:${this.status}
    错误信息:${this.statusText}`
);
console.groupEnd();
        }
        if(!this.responseText){
            e.preventDefault();
            var logData = {
                title:'加载失败',
                description:`日志编号:${loadingEndAt}`,
                date:`错误信息:数据为空`
            };
            console.group(`${loadingEndAt}加载失败`);
            console.error(`${loadingEndAt}加载失败`);
            console.info(
`来源:logData/data.json
    日志总数:${maxNum}
缓存数据:
    正在尝试加载:${loadingEndAt}
    状态码:${this.status}
捕获错误:
    错误信息:数据为空`
);
console.groupEnd();
        }
        
        
        if(!isError){
            try{
                var logData = JSON.parse(this.responseText);
            }catch(e){
                isError = true;
                var logData = {
                    title:'加载失败',
                    description:`日志编号:${loadingEndAt}`,
                    date:`错误信息:此日志的logData.json格式不符合JSON规范`
                };console.group(`${loadingEndAt}加载失败`);
                console.error(`${loadingEndAt}加载失败`);
                console.info(
`来源:logData/data.json
    日志总数:${maxNum}
缓存数据:
    正在尝试加载:${loadingEndAt}
捕获错误:
    此日志的logData.json格式不符合JSON规范`
                );
                console.groupEnd();
            }
        }

        let log = document.createElement('article');
        log.setAttribute('data-code',`${loadingEndAt}`);
        log.className = 'log';

        if(isError){
            log.classList.add('error');
        }else console.log(`${loadingEndAt}加载成功`);

        log.innerHTML = `
            <h1>${logData.title}</h1>
            <h2>${logData.description}</h2>
            <footer>
                <time datetime = ${logData.date}>${logData.date}</time>
            </footer>
        `;logArea.appendChild(log);
        loadingEndAt -= 1;
        loadLog();
    };xhr.send(null);
}