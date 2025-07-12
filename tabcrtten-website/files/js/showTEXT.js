window.addEventListener('load',function(){
    document.addEventListener('click',function(e){
        var text = this.createElement('span');
        text.innerHTML = "welcome to my website!";
        text.style.position = "fixed";
        text.style.left = e.clientX;
        text.style.top = e.clientY;
        text.style.color = "rgba(0,0,255,0.9)";
        document.appendChild(text);
    })
})
