window.onload = function(){
    alert('Page onload!');
    alert('Setting...');
    var code = 0;
    var CodeSection = document.getElementById('codes');
    if(String['fromCharCode']){
        alert('Setting end!');
    }else{
        alert('String.fromCharCode() can not use!');
        window.close();
    }
    alert('Starting...');
    setInterval(function(){
        var CodeSpan = document.createElement('span');
        CodeSpan.className = 'code';
        CodeSpan.innerHTML = String.fromCharCode(code);
        CodeSpan.title = 'CharCode:' + code;
        CodeSection.appendChild(CodeSpan);
        delete CodeSpan;
        code += 1;
    },0);
    window.onunload = function(){
        var boolvalue = window.confirm('Quit?');
        if(boolvalue){
            window.close();
        }else{
            delete boolvalue;
        }
    }
    location.reload = function(){
        false;
    }
}