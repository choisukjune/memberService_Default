(function(){
    var userInfo = getMemberInfo();

    //DOM;
    window.el.div.profile = window.document.getElementById("profile");
    window.el.btn.logout = window.document.getElementById("logout");
    debugger;
    getUerInfoBySession(function(d){
        var html = ""
        var s,so;
        var _d = JSON.parse( d );
        for( s in _d ){
            so = _d[ s ];
            html += `<div>${s} - ${so}</div>\n`
        }
        window.el.div.profile.innerHTML = html 

    })
    
    
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