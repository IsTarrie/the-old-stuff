# 网页的基本结构
```
<!doctype html>
<html lang='zh-CN'>
    <head>
        <meta charset='utf-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tab.C.Green的个人网站</title>
        <script src = '/script/default/loadData.js'></script>
    </head>
    <body>
        <section id = 'content' data-title = 'Tab.C.Green的个人网站'></section>
        <footer></footer>
    </body>
</html>
```
`header`元素被创建是在loadNav.js中
#

**主页地址不是`/` 而是`/home`**

# 内部变量结构

## Class Site(ClassSite.js)
```
Class Site/
    func loadFiles(示范函数,没有实际用途)
    func loadNav
    func handleXHRError(示范函数,没有实际用途)
    func handleURLChange

    func loadPage_begin_aEl
    func loadPage_end_aEl
    func loadPage

    func changeURL(即将弃用)
    insertHTMLAndData(处理通过AJAX链接跳转获取的HTML文本)(包含站内链接判定)
    resetPage(根据site对象的内容重置页面)
        executeScriptsInOrder(由于浏览器安全策略,需要重新加载脚本)
```
## Object site(loadData.js)
```
Object site/
    obj xhr_loadFiles
    obj xhr_loadNav
    obj var
        arr usefulMetaNames
    obj data
    obj uf(由开发者自行添加,userFunctions/uf.js)
```
## Object site_initFunc(loadData.js)
```
Object site_initFunc/
    func loadFiles
    func handleXHRError
```

## 其他
### DOM Element(loadNav.js)
```
headerEl
navEl
progress_loadPageEl
```
### CSS Class
```
    #content
    #errorPage
```

# ***后期设计页面注意把script放到#content内部的最后,否则就要考虑页面的加载状态,否则会与AJAX链接跳转冲突***

## CSS z-index
```
header:1
progress_loadPage:2
```