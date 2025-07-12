const defaultSettings = {
    "apperance":{
        "theme":2,//主题,0为黑,1为白,2为跟随系统
    },
    "time":{
        "mode":12,//12小时制或24小时制?
        "carryLight":true,//进位时是否亮起
        "show_other": true,
        "show_s": true,
        "show_ms": true,
        "show_date":true,//xx月xx日
        "show_day":true,//星期
        "carryLightColor":"yellow",
        "refreshRate":15,//每秒刷新次数
    }
}
let settingIndex = 'tabgreenAPP_newtab_settings';
let userSettingsText = localStorage.getItem(settingIndex);
if(!userSettingsText){
    localStorage.setItem(settingIndex,JSON.stringify(defaultSettings));
    var userSettings = defaultSettings;
}else{
    var userSettings = JSON.parse(userSettingsText);
    function checkForKeys(obj,obj2){//obj2作为对比,obj为要处理的对象
        let keys = Object.keys(obj2);
        for(let i=0;i<keys.length;i++){
            if(
                obj[keys[i]] == undefined
                ||
                typeof obj[keys[i]] != typeof obj2[keys[i]]
            ){
                obj[keys[i]] = obj2[keys[i]];
            }else{
                if(obj[keys[i]] instanceof Object){//判断是否是对象
                    checkForKeys(obj[keys[i]],obj2[keys[i]]);
                }
            }
        }
        return obj;
    }
    userSettings = checkForKeys(userSettings,defaultSettings);
}