(function(){
    var userInfo = getMemberInfo();

    //DOM;
    window.el.div.userInfoEmail = window.document.getElementById("userInfoEmail");
    window.el.div.userInfoName = window.document.getElementById("userInfoName");
    window.el.btn.logout = window.document.getElementById("logout");
    debugger;
    window.el.div.userInfoEmail.innerText = userInfo.userId;
    window.el.div.userInfoName.innerText = userInfo.name;
    
    
    //EVENT;
    window.el.btn.logout.addEventListener("click",function(evt){
    
        console.log( "window.el.btn.logout - click!" )
    
        //로컬스토리지를 비운다;
        window.localStorage.clear();
    
        //세션을 삭제한다;
        deleteSession();
    
        //쿠키를 삭제한다;
        deleteAllCookies();
    
        //로그인이전 html을 붙인다;
        renderBeforeLogin();
    
    })
})()