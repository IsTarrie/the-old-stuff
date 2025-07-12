# ModalWindowToGitHub
## 功能
您只需添加少量的代码到您的`index.html`中,我们会帮您完成这些工作:
- 在页面上添加一个按钮.
- 当点击按钮时,会弹出一个模态窗口.
- 模态窗口中会显示通过**您提供的GitHub用户名**在GitHub上获取的**您的GitHub信息**.用户可以通过单击您的`name`<span style="font-size:65%;color:#aff;">(如果您没有在GitHub个人资料上添加您的`name`<span style="font-size:70%">(即 昵称,可以在公开信息中编辑)</span>,我们将会使用您的`login`<span style="font-size:70%">(也就是您登录时用的名字)</span>)</span>来跳转到您的GitHub主页.

通过这种方式,您的用户将获得一个简单的方式来认识您.
## 其他~~功能~~
- 可以通过右键单击按钮来使按钮永久消失<span style="font-size:65%;color:#aff;">(可以通过刷新页面来还原)</span>.
- 进入全屏时,按钮会隐藏<span style="font-size:65%;color:#aff;">(窗口不会被隐藏)</span>.退出全屏即恢复.
## 如何使用
```HTML
<!DOCTYPE html>
<html>
    <head>
        <!--其它代码-->








        <meta name="author" content="GitHub@你的GitHub用户名">
        <!--或-->
        <meta name="GitHub Author" content="你的GitHub用户名">
        <!--name属性中的单词大小写随意.单词顺序随意.-->








        <!--其它代码-->
    </head>
    <body>
        <!--其它代码-->








        <link rel = 'stylesheet' href = 'https://fastlink-to-github.pages.dev/min/min.css'>
        <script src = 'https://fastlink-to-github.pages.dev/min/min.js'></script>








    </body>
</html>
```
懂?