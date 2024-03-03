(function(){
    requestGet("/getHtml?fileNm=loginAfter",function(d){
    var _thtml = d;
    var html = "";
    getUerInfoBySession(function(d){
    
      var _d = JSON.parse(d);

      if( _d.userInfo.profile_image ) var imgsrc = _d.userInfo.profile_image
      else var imgsrc = "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

      if( _d.userInfo.name ) var name = _d.userInfo.name
      else var name = " - ";

      if( _d.userInfo.nickname ) var nickname = _d.userInfo.nickname
      else var nickname = " - ";

      if( _d.userInfo.email ) var email = _d.userInfo.email
      else var email = " - ";
      
      if( _d.userInfo.mobile ) var mobile = _d.userInfo.mobile
      else var mobile = " - ";

      
      html = _thtml.replace("{IMG_SRC}",imgsrc)
      .replace(/{USER_NAME}/gi,name)
      .replace("{NICK_NAME}",nickname)
      .replace("{EMAIL}",email)
      .replace("{MOBILE}", mobile);

      window.document.getElementById("container").innerHTML = html;

    //DOM;
    window.el.div.profile = window.document.getElementById("profile");
    window.el.div.profileImg = window.document.getElementById("profileImage");
    window.el.btn.logout = window.document.getElementById("logout");
    // debugger;
    // getUerInfoBySession(function(d){
    //     var html = ""
    //     var s,so;
    //     var _d = JSON.parse( d );
    //     for( s in _d ){
    //         so = _d[ s ];
    //         if( s == "profile_image" ) window.el.div.profileImg.src = so;
    //         else html += `<div>${s} - ${so}</div>\n`
    //     }
    //     window.el.div.profile.innerHTML = html 

    // })
    
    
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
})
})
})()