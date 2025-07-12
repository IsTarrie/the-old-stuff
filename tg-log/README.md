# TG-log
- 可以通过编辑/logData下的*.md文件创建日志
- /logData目录下有很多以数字命名的文件夹,表示日志创建的先后\(编号,没有意义\)
```Markdown
/logData
    /1
        data.json
            {
                "title": "日志标题",
                "description": "日志简介",
                "date": "日志发布日期",
                "name":"此目录下的日志文件名,一般为log.md",
                "keywords": ["日志关键字","日志关键字2"]
            }
        log.md
            日志内容
        /img
            日志中用到的图片
    /2
        ……
    /3
        ……
    ……
```