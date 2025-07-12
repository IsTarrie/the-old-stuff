window.addEventListener('load',function(){
    var canvas =  document.getElementById('CV');
    var drag = document.getElementById('draggable');
    var fileInput = document.getElementById('fileInput');
    var downloadButton = document.getElementById('downloadButton');
    var message = document.getElementById('message');

    var fileList = new Array();
    var fileNames = '';
    var fileType = '';
    var file;
    //fileInput
    imageInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        
        if (file) {
            // 将文件读取为DataURL
            var reader = new FileReader();
            reader.onloadend = function() {
                var dataURL = reader.result;
                // 创建一个Image对象
                var image = new Image();
                image.src = dataURL;
                
            }
        }alert(dataURL)
    });

    //drags
    drag.ondragenter = function(e){
        e.preventDefault();
    };drag.ondragover = function(e){
        e.preventDefault();
    };drag.ondrop = function(e){
        fileList = [];
        for(var i = 0;i < e.dataTransfer.files.length;i++){
            file = e.dataTransfer.files[i];
            if(file.type === 'image/png'){
                fileList.push(file);
            }else{
                alert('file ' + e.dataTransfer.files[i].name + ' is not a PNG image.')
            }
        }
        e.preventDefault();
    }
})