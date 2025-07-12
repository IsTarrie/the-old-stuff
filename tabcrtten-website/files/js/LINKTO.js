window.addEventListener('load',function(){
var LINKs = document.getElementsByClassName('LINK');
for(var i = 0;i >= LINKs.length;i++);
    LINKs[i].onclick = function(){
        window.open(this.getAttribute('data-URL'));
    }
})