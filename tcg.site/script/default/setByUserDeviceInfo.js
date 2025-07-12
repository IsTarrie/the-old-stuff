site.data.userDeviceInfo = Site.getUserDeviceInfo();
console.log(site.data.userDeviceInfo);
class Site_setByUserDeviceInfo{
    static navWillBe(){//inline和fixed不能更改,因为它们会直接插入到class,间接影响样式
        switch (site.data.userDeviceInfo.deviceType[0]){
            case 'desktop':
                return 'fixed';
            default:
                return 'inline';
        }
    }

}