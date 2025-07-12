const logCode = location.search.slice(1);
var title = document.getElementById("title");
var description = document.getElementById("description");
var date = document.getElementById("date");
var content = document.getElementById("content");
var imagePath;
var imageHeader;

function changeBase(){

    let base = document.createElement('base');
    base.href = imageHeader;
    document.head.appendChild(base);

}function changeImageLocation(element,imageHeader){
    let imgElementList  = element.getElementsByTagName('img');
    for(let i = 0; i < imgElementList.length; i++){
        imgElementList[i].src = imageHeader+imgElementList[i].getAttribute('src');
    }
}
function changeLinkTarget(element,target){
    let linkElementList  = element.getElementsByTagName('a');
    for(let i = 0; i < linkElementList.length; i++){
        linkElementList[i].target = target;
    }
}

let xhr = new XMLHttpRequest();
xhr.open("GET","/logData/data.json",true);
xhr.onload = function(){

    imagePath = JSON.parse(this.responseText).imgPath;
    imageHeader = imagePath+'/'+logCode+'/';

    let xhr = new XMLHttpRequest();
    xhr.open("GET",`/logData/${logCode}/data.json`,true);
    xhr.onload = function(){
        let data = JSON.parse(this.responseText);
        title.innerHTML = data.title;
        document.title = data.title;
        description.innerHTML = data.description;
        date.innerHTML = data.date;
        date.dateTime = data.date;

        let xhr = new XMLHttpRequest();
        xhr.open("GET",`/logData/${logCode}/log.md`,true);
        xhr.onload = function(){
            //changeBase();
            try{
                var logContent = marked.parse(this.responseText);
            }catch(e){
                console.log(e);
                content.innerHTML = '<span style = \'color:red;\'>无法加载模块,请尝试刷新</span>';
                return;
            }
            /*使用正则表达式替换图片链接
            logContent = logContent.replace(/\[(.*?)\]\((.*?)\)/g, (_, p1, p2) => {
                return `[${p1}](${imageHeader}${p2})`;
            });
            */
            let contentElement = document.createElement("article");
            contentElement.innerHTML = logContent;
            changeImageLocation(contentElement,imageHeader);
            changeLinkTarget(contentElement,'_blank');
            content.innerHTML = contentElement.innerHTML;

            let imgList = content.getElementsByTagName('img');
            for(let i = 0;i<imgList.length;i++){
                imgList[i].onclick = function(){
                    imgList[i].classList.add('full');
                };imgList[i].onmouseleave = function(){
                    imgList[i].classList.remove('full');
                };
            }

            console.log(content.innerHTML);
        };xhr.send(null);
    };xhr.send(null);

};xhr.send(null);