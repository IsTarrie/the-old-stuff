async function loadData(url){
    let getLink = new XMLHttpRequest();
    getLink.open('GET','/link.json',true);
    getLink.onload = function(){
        let data = JSON.parse(this.responseText);
        url = data[location.pathname];
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onload = function(){
            let data = JSON.parse(this.responseText);




if(data.style){

    var styleContent = '';
    let style = document.createElement('style');

    for(let i=0;i<data.style.length;i++){
        let xhr = new XMLHttpRequest();
        xhr.open('GET',data.style[i],false);
        xhr.onload = function(){
            styleContent += this.responseText;
        };
        xhr.send(null);
    }
    style.innerHTML = styleContent;
    document.head.appendChild(style);
}if(data.title){
    document.title = data.title;
}if(data.icon){
    let icon = document.createElement('link');
    icon.rel = 'icon';
    icon.href = data.icon;
    document.head.appendChild(icon);
}document.body.hidden = false;
if(data.script){
    for(let i=0;i<data.script.length;i++){
        let script = document.createElement('script');
        script.src = data.script[i];
        document.body.appendChild(script);
    }
}





        };xhr.onerror = function(){
            console.log('二次请求失败');
        };xhr.send(null);
    };getLink.send(null);
}