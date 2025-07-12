# 通义千问告诉你howToUseHighlight
要在你的项目中使用 Highlight.js 并应用 Atom One Dark 样式，你需要按照以下步骤进行设置。这个样式非常流行，适合创建一个现代化且美观的代码高亮效果。

### 步骤 1: 引入 Highlight.js 和 Atom One Dark 样式

首先，你需要通过 CDN 引入 Highlight.js 的核心文件和 Atom One Dark 主题样式。以下是具体的 HTML 代码示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Highlight Example</title>

    <!-- 引入 Highlight.js 的 Atom One Dark 主题样式 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">

    <!-- 引入 Highlight.js 的核心 JS 文件 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
</head>
<body>
    <!-- 示例代码块 -->
    <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

    <pre><code class="language-css">body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
}</code></pre>

    <pre><code class="language-javascript">function helloWorld() {
    console.log("Hello, world!");
}</code></pre>

    <!-- 初始化 Highlight.js -->
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            hljs.highlightAll();
        });
    </script>
</body>
</html>
```

### 步骤 2: 确保代码块有正确的语言标识

在每个 `<code>` 标签中，确保添加 `class="language-XXX"`，其中 `XXX` 是你所使用的编程语言。例如：

- **HTML**: `class="language-html"`
- **CSS**: `class="language-css"`
- **JavaScript**: `class="language-javascript"`

这将帮助 Highlight.js 正确识别并高亮显示代码。

### 步骤 3: 初始化 Highlight.js

在页面加载完成后，调用 `hljs.highlightAll()` 方法来初始化 Highlight.js 并对页面中的所有 `<code>` 元素进行高亮处理。这已经在上面的 HTML 示例中包含。

### 完整示例

以下是一个完整的 HTML 示例，展示了如何使用 Highlight.js 和 Atom One Dark 样式：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Highlight Example</title>

    <!-- 引入 Highlight.js 的 Atom One Dark 主题样式 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">

    <!-- 引入 Highlight.js 的核心 JS 文件 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
</head>
<body>
    <h1>代码示例</h1>

    <!-- HTML 示例 -->
    <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

    <!-- CSS 示例 -->
    <pre><code class="language-css">body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
}</code></pre>

    <!-- JavaScript 示例 -->
    <pre><code class="language-javascript">function helloWorld() {
    console.log("Hello, world!");
}</code></pre>

    <!-- 初始化 Highlight.js -->
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            hljs.highlightAll();
        });
    </script>
</body>
</html>
```

### 自定义样式（可选）

如果你想要进一步自定义样式，可以在引入的 CSS 文件之后添加自己的样式规则。例如：

```html
<style>
    /* 自定义样式 */
    pre {
        border-radius: 5px;
        padding: 10px;
        background-color: #282c34;
    }

    code {
        font-size: 14px;
    }
</style>
```

通过这些步骤，你就可以在你的网页中使用 Highlight.js 并应用 Atom One Dark 样式，从而实现现代化且美观的代码高亮效果。如果你有任何其他问题或需要进一步的帮助，请随时告诉我！