/*
var logArea = document.getElementById('main');
logArea.addEventListener('click',function(e){
    if(
    e.target.matches('article') || e.target.closest('article')
    ){
        window.open(`/log/reader?id=${e.target.dataset.code}`);
    }
});
*/

var logArea = document.getElementById('main');
logArea.addEventListener('click', function(e) {
    // 检查实际被点击的元素是否为 article 或其后代
    if (e.target.matches('article') || e.target.closest('article')) {
        // 获取 data-code 属性值
        var dataCode = e.target.dataset.code;

        // 如果点击的是 article 的子元素，则从最近的 article 祖先元素获取 data-code
        if (!dataCode && e.target.closest('article')) {
            dataCode = e.target.closest('article').dataset.code;
        }
        if(e.target.closest('article').classList.contains('error')){
            return;
        }
        if (dataCode) {
            // 构建新的 URL
            var newUrl = `/log/reader?${encodeURIComponent(dataCode)}`;

            // 打开新窗口
            window.open(newUrl);
        } else {
            console.error('No data-code found for the clicked element.');
        }
    }
});