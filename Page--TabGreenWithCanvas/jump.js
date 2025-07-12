document.addEventListener('click',(e)=>{
    if(e.button == 0){
        //如果单击左键
        //事件流:是否单击到链接
        if(e.target.matches('a') || e.target.closest('a')){
            //如果单击到链接
            //阻止默认行为
            e.preventDefault();
            //获取链接的href
            let href = e.target.href || e.target.closest('a').href;
            //在新标签页打开
            window.open(href,'_blank');
        }
    }
})