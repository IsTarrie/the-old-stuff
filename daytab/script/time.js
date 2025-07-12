const timeAreaEl = document.getElementById("time");
const time_mainEl = document.querySelector("#time>.time_main");
const time_otherEl = document.querySelector("#time>.time_other");
const time_AMorPM_El = document.querySelector("#time .AMorPM");
const time_dateEl = document.querySelector("#time .date");
const time_dayEl = document.querySelector("#time .day");
const 数字与星期 = ['日','一','二','三','四','五','六'];
const 星期or周 = '星期';
if(!userSettings.time.show_other){
    time_otherEl.hidden = true;//算了,这段不要了
}
const tList = ['hour','min','sec','ms'];
const tElList = [];
for(let i=0;i<tList.length;i++){tElList.push
(document.querySelector('#time .' + tList[i]));}

const lightTime = 200;
var time_refreshRate = userSettings.time.refreshRate;
let time_updateTime = 1000/time_refreshRate;

function updateTimeAreaElContent(){
    let date = new Date();
    const tNumList = [];
    let hourTime = date.getHours();
    if(userSettings.time.mode == 12){
        //code here
        var AMorPM = null;//上午还是下午
        if(hourTime>12){
            hourTime -= 12;
            AMorPM = "PM";
        }else{
            AMorPM = "AM";
        }
        if(userSettings.time.show_other){
            time_AMorPM_El.innerText = AMorPM;
        }
    }
    tNumList.push(hourTime);
    tNumList.push(date.getMinutes());
    tNumList.push(date.getSeconds());
    tNumList.push(date.getMilliseconds());

    let dateArray = [date.getMonth(),date.getDate()];
    let 星期 = date.getDay();
    function getText(num,length){
        num = String(num);
        while(num.length < length){
            num = "0" + num;
        }
        return num;
    }
    let tTextLengthList = [2,2,2,3];
    //更新的时间元素数量(顺便控制元素是否显示)
    let tElNum = 2;//至少两个(时,分)
    if(userSettings.time.show_s){
        tElList[2].hidden = false;tElNum++;
        if(userSettings.time.show_other &&userSettings.time.show_ms){
            tElList[3].hidden = false;tElNum++;
        }else{tElList[3].hidden = true;}
    }else{tElList[2].hidden = true;tElList[3].hidden = true;}
    if(userSettings.time.show_other){}
    for(let i=0;i<tElNum;i++){
        let end = '';
        if(i<2){
            end = ':';
        }
        tElList[i].innerText = getText(tNumList[i],tTextLengthList[i]) + end;
    }

    //显示日期和星期
    if(userSettings.time.show_other && userSettings.time.show_date){
        time_dateEl.innerText = dateArray[0]+1 + '月' + dateArray[1] + '日';
        time_dayEl.innerText = 星期or周 + 数字与星期[星期];
    }

    function addLight(i,is){
        if(!tElList[i]){console.log(i);}
        if(is){tElList[i].classList.add("light");
        }else{tElList[i].classList.remove("light");}
    }
    function a(lightTime,i,isAdd){//以递归判断的方式依次决定每个数字是否亮起
        if(tNumList[i]<=lightTime && isAdd){
            addLight(i,true);
            if(i-1>=0){a(0,i-1,true);}else{return;}
        }else{//结束后递归清除亮起状态
            addLight(i,false);
            if(i-1>=0){a(0,i-1,false);}else{return;}
        }
    }
    if(userSettings.time.carryLight){
        a(lightTime,3,true);
    }
}
function updateTimeAreaElPos(){
    timeAreaEl.style.top = window.innerHeight/2 - timeAreaEl.offsetHeight/2 + "px";
    timeAreaEl.style.left = window.innerWidth/2 - timeAreaEl.offsetWidth/2 + "px";

    let 空白空间 = time_otherEl.offsetWidth;
    for(let i=0;i<time_otherEl.children.length;i++){
        if(time_otherEl.children[i].hidden){continue;}
        空白空间 -= time_otherEl.children[i].offsetWidth;
    }
    let 平均每个元素被分到的空白空间 = 空白空间/time_otherEl.children.length;
    let margin = 平均每个元素被分到的空白空间/2;
    document.documentElement.style.setProperty("--time_other_margin--",margin + "px");
}
const updateTimeAreaElContentInterval = setInterval(()=>{
    updateTimeAreaElContent();
},time_updateTime);

(()=>{
    updateTimeAreaElContent();
    updateTimeAreaElPos();
})();

window.addEventListener("resize",updateTimeAreaElPos);