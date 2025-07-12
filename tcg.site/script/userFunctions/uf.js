//在Class Site加载之后运行,由开发者自定义
//User Functions
site_initFunc.handleDOMContentLoaded_uf = function () {
    if(!window['site_UF']){
        return;
    }
    console.group('User Functions');
    for (let i in site_UF) {
        site_UF[i]();
        console.log('UF:'+i);
    };
    console.groupEnd();
};
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', site_initFunc.handleDOMContentLoaded_uf);
}else{
    site_initFunc.handleDOMContentLoaded_uf();
}