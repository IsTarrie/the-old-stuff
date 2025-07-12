//这个简单的Markdown网站是随便做的,没有考虑很多东西
const markdownPath = 'README.md';
let HTMLText = null;
const LoadingMDText = 
`正在从\`${markdownPath}\`获取文件...`;
const LoadingHTML = marked.parse(LoadingMDText);
var isDOMLoaded = false;
const MDElID = 'markdown';
async function getMarkdown(markdownPath){
    document.title = LoadingMDText;
    let markdown = await fetch(markdownPath);
    if(markdown.status != 200)
    {return `${markdown.status}Error: ${markdown.statusText}`}
    lastModified = markdown.headers.get('last-modified');
    let text = await markdown.text();
    HTMLText =  marked.parse(text);
}
getMarkdown(markdownPath);
function setMD(){
    MDEl =  document.getElementById(MDElID);
    MDEl.innerHTML = HTMLText;
    setPageTitle();
    function setPageTitle(){
        document.title = MDEl.getElementsByTagName('h1')[0].innerText;
    }
    hljs.highlightAll();
}
var interval;
var MDEl;
var lastModified;

const aviPath = 'https://avatars.github.site/u/141554864?v=4';
function setAvatar(){
    let link =document.createElement('link');
    link.rel = 'icon';
    link.href = aviPath;
    document.head.appendChild(link);
}
function setLastModified(){
    let lastModifiedText = 
    `上次修改时间${lastModified}`;
    let lastMo = document.createElement('p');
    lastMo.classList.add('lastModified');
    lastMo.innerText = lastModifiedText;
    document.body.appendChild(lastMo);
}
function setAnchors(){
    let anchors = location.hash.slice(1);
    //转换成正常字符
    anchors = decodeURIComponent(anchors);
    if(anchors){
        let anchor = document.getElementById(anchors);
        if(anchor){
            anchor.scrollIntoView();
        }
    }
}//设置锚
addEventListener('DOMContentLoaded',()=>{
    interval = setInterval(()=>{
        if(HTMLText){
            isDOMLoaded = true;
            setMD();
            setAnchors();
            setAvatar();
            //setLastModified();
            clearInterval(interval);
        }else{
            document.getElementById(MDElID).innerHTML = LoadingHTML;
        }
    })
})