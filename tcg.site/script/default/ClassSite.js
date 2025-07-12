class Site{
    static getUserDeviceInfo() {
        // 获取 User-Agent 字符串
        const userAgent = navigator.userAgent;
    
        // 设备类型
        let deviceType = [];
    
        // 检查移动设备
        if (/Android/i.test(userAgent)) {
            deviceType.push('Android');
        }
        if (/webOS/i.test(userAgent)) {
            deviceType.push('webOS');
        }
        if (/iPhone/i.test(userAgent)) {
            deviceType.push('iPhone');
        }
        if (/iPad/i.test(userAgent)) {
            deviceType.push('iPad');
        }
        if (/iPod/i.test(userAgent)) {
            deviceType.push('iPod');
        }
        if (/BlackBerry/i.test(userAgent)) {
            deviceType.push('BlackBerry');
        }
        if (/Windows Phone/i.test(userAgent)) {
            deviceType.push('Windows Phone');
        }
    
        // 如果没有检测到移动设备，则默认为桌面设备
        if (!deviceType.length) {
            deviceType.push('desktop');
        }
    
        // 浏览器类型
        let browserName = undefined;
        if (/Edge/i.test(userAgent)) {
            browserName = 'Edge';
        } else if (/Chrome/i.test(userAgent)) {
            browserName = 'Chrome';
        } else if (/Firefox/i.test(userAgent)) {
            browserName = 'Firefox';
        } else if (/MSIE|Trident/i.test(userAgent)) {
            browserName = 'Internet Explorer';
        } else if (/Safari/i.test(userAgent)) {
            browserName = 'Safari';
        } else if (/Opera/i.test(userAgent)) {
            browserName = 'Opera';
        }
    
        // 获取操作系统
        let osName = undefined;
        if (/Windows/i.test(userAgent)) {
            osName = 'Windows';
        } else if (/Mac/i.test(userAgent)) {
            osName = 'Mac';
        } else if (/Linux/i.test(userAgent)) {
            osName = 'Linux';
        } else if (/Android/i.test(userAgent)) {
            osName = 'Android';
        } else if (/iPhone|iPad|iPod/.test(userAgent)) {
            osName = 'iOS';
        }
    
        // 获取语言偏好
        const language = navigator.language || navigator.userLanguage;
    
        // 获取屏幕尺寸
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
    
        // 返回包含设备信息的对象
        return {
            deviceType,
            browserName,
            osName,
            language,
            screenWidth,
            screenHeight
        };
    }
    static loadFiles(){
        // 加载文件(示范)
        let fileListData = site.fileListData;
        if(fileListData){
            if(fileListData.difault){
                if(fileListData.difault.script){
                    for(let i=0;i<fileListData.difault.script.length;i++){
                        let script = document.createElement('script');
                        script.src = fileListData.difault.script[i];
                        document.head.appendChild(script);
                    }
                }if(fileListData.difault.style){
                    for(let i=0;i<fileListData.difault.style.length;i++){
                        let style = document.createElement('link');
                        style.href = fileListData.difault.style[i];
                        style.rel = 'stylesheet';
                        document.head.appendChild(style);
                    }
                }
            }
        }
    }
    static loadNav(){
        let navData = site.navData;
        if(navData){
            //console.log(navData);
            (()=>{
                let key = 'home';
                let liEl = document.createElement('li');
                liEl.classList.add('home');
                let aEl = document.createElement('a');
                let divEl = document.createElement('div');
                divEl.classList.add('avatar');
                aEl.href = navData[key].url;
                aEl.innerText = navData[key].text;
                liEl.appendChild(divEl);
                liEl.appendChild(aEl);
                navListEl.appendChild(liEl);
            })();
            for(let key in navData){
                if(key=='home'){
                    continue;
                }
                let liEl = document.createElement('li');
                liEl.classList.add(key);
                let aEl = document.createElement('a');
                aEl.href = navData[key].url;
                aEl.innerText = navData[key].text;
                liEl.appendChild(aEl);
                navListEl.appendChild(liEl);
            }navEl.classList.add('loaded');
        }
    }


    static handleXHRError(e){//示范
        return;
    }
    static handleClick(){
        document.body.addEventListener('click', function (e) {
            // 检查实际被点击的元素是否为 a 或其后代
                if (e.target.matches('a') || e.target.closest('a')) {
                    e.preventDefault(); // 阻止默认行为(即跳转)

                    //如果其target属性为_blank，则打开新标签页
                    if (e.target.target === '_blank') {
                        window.open(e.target.href);
                        return;
                    }
                    // 获取 URL 属性值
                    let URL = e.target.href;
                    // 如果点击的是 a 的子元素，则从最近的 a 祖先元素获取 URL
                    if (!URL && e.target.closest('a')) {
                        URL = e.target.closest('a').href;
                    }if (URL) {
                        //判断链接是否为站内链接
                        if(URL.indexOf(location.origin)==0){
                            //判断是否是当前页面
                            if(URL==location.href){
                                return;
                            }else{
                                console.log('站内',URL);
                                Site.loadPage_begin_aEl(URL);
                            }
                        }else{
                            console.log('站外',URL);
                            window.open(URL);
                        }
                    } else {
                        console.error('No URL found for the clicked element.');
                    }
                }
            });
    }
    static loadPage_begin_aEl(aEl_href){
        this.loadPage(aEl_href,'link');//链接加载,启动
        console.log('链接或代码加载,启动');
    }static loadPage_end_aElorCode(URL){
        history.pushState({}, '', URL);//链接或代码加载,结束
        console.log('链接或代码加载,结束');
    }static loadPage_begin_history(e){}
    static loadPage_end_history(URL){
        //加载完成
        console.log('历史(默认行为)加载,结束');
    }

    static handleHistoryMove(){
        window.addEventListener('popstate', function(e) {
            console.log('历史被更改');
            let targetUrl = location.href;
            Site.loadPage(targetUrl, 'history');

        });
    }
    static loadPage(URL,from='code'){
        contentEl.hidden = true;

        if(from=='history'){
            //终止页面脚本
            let scriptList = contentEl.getElementsByTagName('script');
            for(let i=0;i<scriptList.length;i++){
                scriptList[i].remove();
            }
            console.log('终止页面脚本');
        }
        let xhr_loadPage = new XMLHttpRequest();
        xhr_loadPage.addEventListener('error', (e)=>{e.preventDefault();Site.handleXHRError_loadPage(e);});
        xhr_loadPage.addEventListener('load', function(e){

            progress_loadPageEl.hidden=true;
            progress_loadPageEl.style.width = '0%';

            let HTTPCode = xhr_loadPage.status;
            if(xhr_loadPage.status==200){
                console.log('加载完成');
                if(!xhr_loadPage.responseText){
                    HTTPCode = 404;
                }
            }
            else{console.log('加载失败',HTTPCode);}
            switch(HTTPCode){
                case 200:
                    loadEnd();
                    Site.insertHTMLAndData(xhr_loadPage.responseText);
                    break;
                case 404:
                    loadEnd();
                    Site.insertHTMLAndData(xhr_loadPage.responseText);//这行代码阻止了前端代码生成404页面,而是接受服务器返回的404页面,在本地没有配置404的环境运行会报错
                    break;
                default:
                    let HTMLEl = Site.createHTMLLoadErrorPage(HTTPCode);
                    console.log(HTMLEl);
                    contentEl.innerHTML = '';
                    contentEl.appendChild(HTMLEl);
                    break;
            }

            //根据调用此函数的方式,决定收尾的方式
            function loadEnd(){
                contentEl.innerHTML = '';
                console.log('清空内容');
                switch(from){
                    case 'link':
                        Site.loadPage_end_aElorCode(URL);
                        break;
                    case 'code':
                        Site.loadPage_end_aElorCode(URL);
                        break;
                    case 'history':
                        Site.loadPage_end_history(URL);
                        break;
                }
            }

            contentEl.hidden = false;
            console.log('显示内容');
        });
        xhr_loadPage.addEventListener('progress',function(e){
            progress_loadPageEl.hidden = false;
            let prog = e.loaded / e.total;
            progress_loadPageEl.style.width = prog*100+'%';
        })
        xhr_loadPage.open('GET', URL);
        xhr_loadPage.send();
    }
    static handleXHRError_loadPage(e){
    }static insertHTMLAndData(HTMLText){//处理通过AJAX链接跳转获取的HTML文本
        let parser = new DOMParser();
        let doc = parser.parseFromString(HTMLText, 'text/html');
        let contentEl = doc.getElementById('content');

        //如果没有content元素,代表是站外链接,清除历史,改用新标签打开
        if(!contentEl){
            if(window.confirm('站外链接,是否打开?')){
                window.open(location.href);
            }
            history.back();
            return;
        }

        let title = doc.title;
        let iconEl = doc.querySelector('link[rel="icon"]');

        let icon;
        let isPageEmpty = false;//页面是否是空的
        if(iconEl){
            icon = iconEl.href;
        }
        let page = contentEl.dataset.page;

        if(['default','SEO','empty','none','blank'].includes(page)){
            isPageEmpty = true;
        }

        //获取其他原数据,比如 meta的 description,keywords;og:title,og:image,og:description等内容
        let metaData = {};
        let metaList = doc.head.getElementsByTagName('meta');
        for(let i=0;i<metaList.length;i++){
            let meta = metaList[i];
            let name = meta.name;
            if(!site.var.usefulMetaNames.includes(name)){
                continue;
            }
            let content = meta.content;
            metaData[name] = content;
        }

        site.data = {
            title:title,
            icon:icon,
            isPageEmpty:isPageEmpty,
            meta:metaData,
            content:contentEl.innerHTML
        };
        this.resetPage();

        console.group('about page');
        console.info('title',title);
        console.info('icon',icon);
        console.info('isPageEmpty',isPageEmpty);
        console.info('meta',metaData);
        console.log(contentEl);
        console.groupEnd();
    }static resetPage(){//根据site对象的内容重置页面
        let title = site.data.title;
        document.title = title;
        let icon = site.data.icon;
        if(icon){
            document.querySelector('link[rel="icon"]').href = icon;
        }
        let isPageEmpty = site.data.isPageEmpty;
        /*
        if(isPageEmpty){//应对cloud flare服务器的“特性”
            let HTMLEl = Site.createHTMLLoadErrorPage(404);//对于cf返回的index.html默认行为,自动做404处理,在后期转移到github page时会清除
            contentEl.innerHTML = '';
            contentEl.appendChild(HTMLEl);
        }
        */
        let metaData = site.data.meta;
        for(let i in metaData){
            let content = metaData[i];
            let meta = document.querySelector('meta[name="'+i+'"]');
            if(meta){
                meta.content = content;
            }
        }
        let content = site.data.content;
        contentEl.innerHTML = content;







        //由于浏览器安全策略,需要重新加载脚本
        function executeScriptsInOrder(container) {
            console.group('重新启动脚本');

            const scripts = container.querySelectorAll('script');

            console.log('找到脚本数量',scripts.length);
            console.log(scripts);

            const scriptPromises = [];
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                //newScript.type = script.type;
                if (script.src) {
                    newScript.src = script.src;
                    scriptPromises.push(new Promise((resolve, reject) => {
                        newScript.onload = resolve;
                        newScript.onerror = reject;
                    }));
                } else {
                    newScript.textContent = script.textContent;
                    scriptPromises.push(new Promise((resolve) => {
                        resolve();
                    }));
                }
                script.parentNode.replaceChild(newScript, script);

                console.log('新脚本');
                console.log(newScript);
                console.groupEnd();
            });
            // 确保所有脚本按顺序执行
            scriptPromises.reduce((chain, promise) => chain.then(promise), Promise.resolve())
                .catch(error => console.error('Error executing script:', error));
        }
        executeScriptsInOrder(contentEl);
    }
    static createHTMLLoadErrorPage(HTTPCode){
        function create404Page(){//这个函数的创建主要是为了应对cf遇到404错误返回index.html的“特性”
            let rootDiv = document.createElement('div');
            rootDiv.id = 'errorPage';
            rootDiv.classList.add('e-404');
            let HTTPCodeEl = document.createElement('h1');
            HTTPCodeEl.innerText = HTTPCode;
            HTTPCodeEl.classList.add('HTTPCode');
            rootDiv.appendChild(HTTPCodeEl);

            let textEl = document.createElement('h2');
            textEl.classList.add('text');
            textEl.innerHTML = `页面 <br/> <a href = '${location.href}'>${location.href}</a> <br/> 未找到`;
            rootDiv.appendChild(textEl);

            let backButton = document.createElement('button');
            backButton.classList.add('back');
            backButton.innerText = '返回上一页';
            backButton.onclick = function(){
                history.back();
            };
            rootDiv.appendChild(backButton);

            return rootDiv;
        }
        switch(HTTPCode){
            case 404:
                return create404Page();
            default:
        }
    }
}
//var site = new Object();演示