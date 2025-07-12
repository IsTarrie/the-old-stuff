class MWToGitHub{
    static getModalWindow(){
        let modalWindow = document.getElementById(mwToGitHub.MW_ID);
        if(!modalWindow){
            //MainEl
            modalWindow = document.createElement('div');
            modalWindow.classList.add('hide');
            modalWindow.id = mwToGitHub.MW_ID;
            //imgEl
            let imgEl = document.createElement('img');
            imgEl.alt = 'GitHubUserAvatar';
            imgEl.classList.add(mwToGitHub.IMG_class);
            imgEl.draggable = false;
            mwToGitHub.IMG_EL = imgEl;
            //text_main
            let textEl = document.createElement('p');
            textEl.innerText = mwToGitHub.text;
            //text_userNameEl
            let userNameEl = document.createElement('span');
            userNameEl.classList.add(mwToGitHub.GitHubUserNameElClass);
            userNameEl.addEventListener('click',MWToGitHub.jumpToGitHubPage);
            mwToGitHub.GitHubUserNameEl = userNameEl;
            //data_labelEl
            let data_labelEl = document.createElement('p');
            data_labelEl.classList.add(mwToGitHub.data_labelClass);

            let data_label_public_reposEl = document.createElement('span');
            data_label_public_reposEl.innerText = mwToGitHub.public_repos_label;
            data_label_public_reposEl.classList.add(mwToGitHub.public_reposElClass);

            let data_label_followersEl = document.createElement('span');
            data_label_followersEl.innerText = mwToGitHub.followers_label;
            data_label_followersEl.classList.add(mwToGitHub.followersElClass);

            let data_label_followingEl = document.createElement('span');
            data_label_followingEl.innerText = mwToGitHub.following_label;
            data_label_followingEl.classList.add(mwToGitHub.followingElClass);


            data_labelEl.appendChild(data_label_public_reposEl);
            data_labelEl.appendChild(data_label_followersEl);
            data_labelEl.appendChild(data_label_followingEl);
            //dataEl
            let dataEl = document.createElement('p');
            dataEl.classList.add(mwToGitHub.dataElClass);

            let public_reposEl = document.createElement('span');
            public_reposEl.classList.add(mwToGitHub.public_reposElClass);
            public_reposEl.innerText = '';

            let followersEl = document.createElement('span');
            followersEl.classList.add(mwToGitHub.followersElClass);
            followersEl.innerText = '';

            let followingEl = document.createElement('span');
            followingEl.classList.add(mwToGitHub.followingElClass);
            followingEl.innerText = '';

            dataEl.appendChild(public_reposEl);
            dataEl.appendChild(followersEl);
            dataEl.appendChild(followingEl);

            mwToGitHub.public_reposEl = public_reposEl;
            mwToGitHub.followersEl = followersEl;
            mwToGitHub.followingEl = followingEl;

            //data_tableEl
            let data_tableEl = document.createElement('div');
            data_tableEl.classList.add(mwToGitHub.data_tableElClass);
            data_tableEl.appendChild(data_labelEl);
            data_tableEl.appendChild(dataEl);
            //bioEl
            let bioEl = document.createElement('p');
            bioEl.classList.add(mwToGitHub.bioElClass);
            bioEl.innerText = '';

            mwToGitHub.bioEl = bioEl;
            //msgEl
            let msgEl = document.createElement('p');
            msgEl.classList.add(mwToGitHub.msgEl_class);
            msgEl.innerText = '正在从GitHub加载数据';
            mwToGitHub.msgEl = msgEl;
            //close_buttonEl
            let close_buttonEl = document.createElement('button');
            close_buttonEl.setAttribute('type','button');
            close_buttonEl.title = '关闭';
            close_buttonEl.classList.add(mwToGitHub.close_buttonElClass);
            close_buttonEl.addEventListener('click',MWToGitHub.handleCloseButtonClick);
                //“关闭”图片
                //创建SVG元素
let svgNS = "http://www.w3.org/2000/svg";
let svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('width', '24');
svg.setAttribute('height', '24');
svg.setAttribute('viewBox', '0 0 24 24');
svg.setAttribute('fill', 'none');
svg.setAttribute('stroke', 'currentColor');
svg.setAttribute('stroke-width', '2');
svg.setAttribute('stroke-linecap', 'round');
svg.setAttribute('stroke-linejoin', 'round');

// 创建第一条线
var line1 = document.createElementNS(svgNS, 'line');
line1.setAttribute('x1', '18');
line1.setAttribute('y1', '6');
line1.setAttribute('x2', '6');
line1.setAttribute('y2', '18');

// 创建第二条线
var line2 = document.createElementNS(svgNS, 'line');
line2.setAttribute('x1', '6');
line2.setAttribute('y1', '6');
line2.setAttribute('x2', '18');
line2.setAttribute('y2', '18');

// 将线条添加到SVG中
svg.appendChild(line1);
svg.appendChild(line2);
            close_buttonEl.appendChild(svg);
            mwToGitHub.close_buttonEl = close_buttonEl;
            //
            modalWindow.appendChild(imgEl);
            textEl.appendChild(userNameEl);
            modalWindow.appendChild(textEl);
            modalWindow.appendChild(data_tableEl);
            modalWindow.appendChild(bioEl);
            modalWindow.appendChild(msgEl);
            modalWindow.appendChild(close_buttonEl);
        }
        modalWindow.classList.add('msg');//只显示消息
        return modalWindow;
    }
    static getStartButton(){
        let startButton = document.getElementById(mwToGitHub.MW_button_ID);
        if(!startButton){
            //MainEl
            startButton = document.createElement('button');
            startButton.setAttribute('type','button');
            startButton.id = mwToGitHub.MW_button_ID;
            startButton.addEventListener('click',MWToGitHub.handleButtonClick);
            //imageEl
            let imageEl = document.createElement('img');
            imageEl.alt = 'GitHubICON';
            imageEl.src = mwToGitHub.GitHubICON_URL;
            imageEl.draggable = false;
            startButton.appendChild(imageEl);
        }
        return startButton;
    }
    static handleButtonClick(){
        mwToGitHub.startButtonEl.disabled = true;
        mwToGitHub.close_buttonEl.disabled = false;
        mwToGitHub.EL.classList.remove('hide');
        mwToGitHub.startButtonEl.classList.add('hide');
    }
    static handleCloseButtonClick(){
        mwToGitHub.close_buttonEl.disabled = true;
        mwToGitHub.startButtonEl.disabled = false;
        mwToGitHub.EL.classList.add('hide');
        mwToGitHub.startButtonEl.classList.remove('hide');
    }
    static getGitHubUserName(){//压缩来自FastLinkToGitHub
        let userName = undefined;
        //方案1:meta[name='author'content='github@userName']
        let meta_author=document.querySelector('meta[name="author"]');
        if(meta_author){let meta_authorcontent=meta_author.getAttribute
        ('content');let data=meta_authorcontent.split('@');if(data[0].
        toLowerCase()=='github'&&data[1]){userName=data[1];}}
        //方案2.1:meta[name=匹配前有author后有GitHub的字符串content='userName']
        let metas=document.getElementsByTagName('meta');for(let i=0;i<
        metas.length&&!userName;i++){let meta=metas[i];let metaName=
        meta.name.toLowerCase();if(metaName.includes('author')&&metaName.
        includes('github')){userName=meta.getAttribute('content');}}
        //方案2.2:meta[name=匹配GitHub的字符串content='userName']
        const isMatchHasOnlyGithub=false;for(let i=0;i<metas.length&&!
        userName&&isMatchHasOnlyGithub;i++){let meta=metas[i];let metaName
        =meta.name.toLowerCase();if(metaName.includes('github')){userName
        =meta.getAttribute('content');}}return userName;
    }
    static async getGitHubUserData(){
        const GitHubAPI = 'https://api.github.com/users/';
        //用户名错误
        if(!mwToGitHub.GitHubUserName){
            console.log('请求数据:无用户名');
            mwToGitHub.msgEl.innerText = '无用户名';
            return;
        }
        let url = GitHubAPI+mwToGitHub.GitHubUserName;
        let response = await fetch(url);
        //网络错误
        if(!response.ok){
            console.log('请求数据:网络错误');
            mwToGitHub.msgEl.innerText = `${response.status}错误`;
            return;
        }
        let data = await response.json();
        //添加数据
        //mwToGitHub_ajaxData.GitHubLoginUserName = data.login;
        //mwToGitHub_ajaxData.GitHubUser_public_name = data.name;
        mwToGitHub_ajaxData.used_name = data.name||data.login;
        mwToGitHub_ajaxData.IMG_URL = data.avatar_url;
        mwToGitHub_ajaxData.public_repos = data.public_repos;
        mwToGitHub_ajaxData.followers = data.followers;
        mwToGitHub_ajaxData.following = data.following;
        mwToGitHub_ajaxData.bio = data.bio;
        //更改DOM
        if(document.readyState == "complete")
        {this.addDataToElement();}else{document.
        addEventListener("DOMContentLoaded",this
        .addDataToElement())}
    }
    static addDataToElement(){
        mwToGitHub.GitHubUserNameEl.innerText = mwToGitHub_ajaxData.used_name;
        mwToGitHub.IMG_EL.src = mwToGitHub_ajaxData.IMG_URL;
        mwToGitHub.public_reposEl.innerHTML = mwToGitHub_ajaxData.public_repos;
        mwToGitHub.followersEl.innerHTML = mwToGitHub_ajaxData.followers;
        mwToGitHub.followingEl.innerHTML = mwToGitHub_ajaxData.following;
        mwToGitHub.bioEl.innerHTML = mwToGitHub_ajaxData.bio;
        mwToGitHub.isLoaded = true;
        mwToGitHub.msgEl.innerText = '加载完成';
        mwToGitHub.EL.classList.remove('msg');
    }
    static addElsToDOM(){
        document.body.appendChild(mwToGitHub.EL);
        document.body.appendChild(mwToGitHub.startButtonEl);
    }
    static jumpToGitHubPage(){
        let url = mwToGitHub.GitHub_Doman+mwToGitHub.GitHubUserName;
        window.open(url);
    }

    static clearButton(){//双击按钮时(永远)隐藏按钮
        mwToGitHub.startButtonEl.classList.add('clear');
    }
}
const mwToGitHub = {
    GitHub_Doman:'https://github.com/',
    GitHubICON_URL:'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    MW_button_ID:'ModalWindowToGitHubButton',
    MW_ID:'ModalWindowToGitHub',
    IMG_class:'github-user-img',
    GitHubUserNameElClass:'github-user-name',
    text:'',

    data_labelClass:'data-label',
    public_repos_label:'存储库',
    followers_label:'跟随者',
    following_label:'关注者',

    dataElClass:'data',
    data_tableElClass:'data-tabel',
    public_reposElClass:'public_repos',
    followersElClass:'followers',
    followingElClass:'following',
    bioElClass:'bio',
    msgEl_class:'msgbox',
    close_buttonElClass:'close-button',

    GitHubUserName:undefined,

    startButtonEl:null,
    EL:null,
    IMG_EL:null,
    GitHubUserNameEl:null,

    public_reposEl:null,
    followersEl:null,
    followingEl:null,
    bioEl:null,
    msgEl:null,
    close_buttonEl:null,
};
const mwToGitHub_ajaxData = {
    isLoaded:false,
    used_name:null,
    IMG_URL:null,
    public_repos:null,
    followers:null,
    following:null,
    bio:null,
}
mwToGitHub.EL = MWToGitHub.getModalWindow();
mwToGitHub.startButtonEl = MWToGitHub.getStartButton();
mwToGitHub.GitHubUserName = MWToGitHub.getGitHubUserName();

if(document.readyState === 'loading')
{window.addEventListener('DOMContentLoaded',
MWToGitHub.addElsToDOM)}else{MWToGitHub.
addElsToDOM();}
/*
    大致结构
    <div id="ModalWindowToGitHub">
        <img class="github-user-img"></img>
        <p>
            <span class="github-user-name"></span>
        </p>
        <div class="data-tabel">
            <p class='data-label'>
                <span class="public_repos"></span>
                <span class="followers"></span>
                <span class="following"></span>
            </p>
            <p class='data'>
                <span class="public_repos"></span>
                <span class="followers"></span>
                <span class="following"></span>
            </p>
            <p class='bio'></p>
        </div>
    </div>
*/
MWToGitHub.getGitHubUserData();


mwToGitHub.startButtonEl.addEventListener('contextmenu',(e)=>{e.preventDefault()});
mwToGitHub.startButtonEl.addEventListener('mousedown',(e)=>{
    if(e.button == 2){//按下控制键
        MWToGitHub.clearButton();
    }
});
document.addEventListener('fullscreenchange',(e)=>{
    if(!document.fullscreenElement){
        mwToGitHub.startButtonEl.hidden = false;
    }else{
        mwToGitHub.startButtonEl.hidden = true;
    }
});