//var nav = document.querySelector('body>header>nav');
var headerEl = document.createElement('header');
var navEl = document.createElement('nav');
headerEl.appendChild(navEl);

var progress_loadPageEl = document.createElement('div');
progress_loadPageEl.classList.add('progress_loadPage');
headerEl.appendChild(progress_loadPageEl);
progress_loadPageEl.hidden = true;

navEl.classList.add(Site_setByUserDeviceInfo.navWillBe());
document.body.insertBefore(headerEl,document.body.firstChild);

var navListEl = document.createElement('ul');
navEl.appendChild(navListEl);
site.xhr_loadNav = new XMLHttpRequest();
site.xhr_loadNav.open('GET','/json/navigator.json',true);
site.xhr_loadNav.addEventListener('load',function(){
    site.navData = JSON.parse(site.xhr_loadNav.responseText);
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded',function(){
            Site.loadNav();
        });
    }else{
        Site.loadNav();
    }
});
site.xhr_loadNav.addEventListener('error',function(e){
    Site.handleXHRError(e);
});
site.xhr_loadNav.send();