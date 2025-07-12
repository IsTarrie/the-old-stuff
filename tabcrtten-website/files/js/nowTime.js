window.addEventListener('load',function(){
    var TIMEs =  document.getElementsByClassName('NOW');
    var NOWTIME = new Date().getFullYear();
    for(var i = 0;i < TIMEs.length;i++){
        TIMEs[i].innerHTML = NOWTIME;
        TIMEs[i].setAttribute ('date',toString(NOWTIME));
    }
})
//ERROR;CAN USE
