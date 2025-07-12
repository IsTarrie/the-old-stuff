//初始化必要的对象
var site = new Object();//此对象没办法从SiteJS文件中引入,因为此SiteJS的加载依赖此对象
site.data = new Object();
//无法分离(必须在同一文件的)的函数
site.var = new Object();
site.var.usefulMetaNames = ['description','keywords','og:title','og:image','og:description'];
var site_initFunc = new Object();
    //加载文件函数
site_initFunc.loadFiles = function(){
    let fileListData = site.fileListData;
    /*if(fileListData.default.style){
        for(let i=0;i<fileListData.default.style.length;i++){
            let style = document.createElement('link');
            style.href = fileListData.default.style[i];
            style.rel = 'stylesheet';
            document.head.appendChild(style);
        }
    }
    if(fileListData){
        if(fileListData.default){
            if(fileListData.default.script){
                for(let i=0;i<fileListData.default.script.length;i++){
                    let script = document.createElement('script');
                    script.src = fileListData.default.script[i];
                    document.head.appendChild(script);
                }
            }
        }
    }*/
// 加载样式文件
    if (fileListData.default.style) {
        let styleIndex = 0;

        function loadNextStyle() {
            if (styleIndex < fileListData.default.style.length) {
                let style = document.createElement('link');
                style.href = fileListData.default.style[styleIndex];
                style.rel = 'stylesheet';
                styleIndex++;

                // 监听 onload 事件以加载下一个样式文件
                style.onload = function () {
                    loadNextStyle();
                };

                // 插入到文档头部
                document.head.appendChild(style);
            } else {
                // 所有样式文件加载完成后，开始加载脚本文件
                console.log('回调机制 加载样式-完成');
                loadScripts();
            }
        }

        // 开始加载第一个样式文件
        loadNextStyle();
    }
// 加载脚本文件
    function loadScripts() {
        if (fileListData) {
            if (fileListData.default) {
                if (fileListData.default.script) {
                    let scriptIndex = 0;

                    function loadNextScript() {
                        if (scriptIndex < fileListData.default.script.length) {
                            let script = document.createElement('script');
                            script.src = fileListData.default.script[scriptIndex];
                            scriptIndex++;

                            // 监听 onload 事件以加载下一个脚本文件
                            script.onload = function () {
                                loadNextScript();
                            };

                            // 插入到文档头部
                            document.head.appendChild(script);
                        } else {
                            console.log('回调机制 加载脚本-完成');
                        }
                    }

                    // 开始加载第一个脚本文件
                    loadNextScript();
                }
            }
        }
    }
};
    //基本XHR错误处理函数
site_initFunc.handleXHRError = function (e){
    console.log(e);
    alert('网络错误,请检查网络连接');
};
//获取系统主题
site_initFunc.getSysTheme = function(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(prefersDark.matches){
        return 'dark';
    }else{
        return 'light';
    }
};
//处理localStorage数据
site_initFunc.localStorageIndex = 'TCG_Personal_Site_UserSettings';
site_initFunc.handleUserSettings = function(){
    /*let userSettings = localStorage.getItem(site_initFunc.localStorageIndex);
    if(userSettings){
        userSettings = JSON.parse(userSettings);
        if(userSettings.theme){
            if(userSettings.theme == 'dark'){
                site.fileListData.default.style.unshift('/style/default/variables_dark.css');
            }if(userSettings.theme == 'light'){
                site.fileListData.default.style.unshift('/style/default/variables.css');
            }
        }
    }else{
            if(site_initFunc.getSysTheme() == 'dark'){
                site.fileListData.default.style.unshift('/style/default/variables_dark.css');
            }else{
                site.fileListData.default.style.unshift('/style/default/variables.css');
            }
    }*/
    let userSettings = localStorage.getItem(site_initFunc.localStorageIndex);
    // 解析用户设置
    userSettings = userSettings ? JSON.parse(userSettings) : {};
    // 获取主题设置
    const theme = userSettings.theme || site_initFunc.getSysTheme();
    // 根据主题设置样式
    const stylePath = theme === 'dark' 
        ? '/style/default/variables_dark.css' 
        : '/style/default/variables.css';
        site.fileListData.default.style.splice(1, 0, stylePath);
};
//发送请求,解析JSON数据
site.xhr_loadFiles = new XMLHttpRequest();
site.xhr_loadFiles.open('GET','/json/fileList.json',false);
site.xhr_loadFiles.addEventListener('load',function(){
    site.fileListData = JSON.parse(site.xhr_loadFiles.responseText);
    site_initFunc.handleUserSettings();//先一步处理用户设置
    site_initFunc.loadFiles();//这个函数没办法从Site类中调用,因为Site类就是由此函数引入的
});
site.xhr_loadFiles.addEventListener('error',function(e){
    site_initFunc.handleXHRError(e);
});
site.xhr_loadFiles.send();