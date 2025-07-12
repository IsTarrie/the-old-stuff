// 定义一个函数来处理 DOMContentLoaded 事件
site_initFunc.handleDOMContentLoaded = function () {
    try {
        Site.handleClick();
        Site.handleHistoryMove();
        window.contentEl = document.getElementById('content');
        // 可以在这里添加更多操作
    } catch (e) {
        console.error('Error during DOMContentLoaded:', e);
    }
}
// 检查 DOMContentLoaded 事件是否已经触发
if (document.readyState === 'loading') {
    // 如果 DOM 还未加载完成，注册事件处理程序
    window.addEventListener('DOMContentLoaded', site_initFunc.handleDOMContentLoaded);
} else {
    // 如果 DOM 已经加载完成，直接执行处理程序
    site_initFunc.handleDOMContentLoaded();
}