(function(){

	requestGet("/getHtml?fileNm=loginAfter",async function(d){
		var _thtml = d;
		var html = "";
		var _d = await getUerInfoBySession();

		debugger;
		if( _d.profile_image ) var imgsrc = _d.profile_image;
		else var imgsrc = "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

		if( _d.name ) var name = _d.name;
		else var name = " - ";

		if( _d.username ) var username = _d.username;
		else var username = " - ";

		if( _d.userId ) var email = _d.userId
		else var email = " - ";
		
		if( _d.mobile ) var mobile = _d.mobile
		else var mobile = " - ";

		
		html = _thtml.replace("{IMG_SRC}",imgsrc)
		.replace(/{USER_NAME}/gi,name)
		.replace("{NICK_NAME}",username)
		.replace("{EMAIL}",email)
		.replace("{MOBILE}", mobile);

		window.document.getElementById("container").innerHTML = html;

		//DOM;
		window.el.div.profile = window.document.getElementById("profile");
		window.el.div.profileImg = window.document.getElementById("profileImage");
		window.el.btn.logout = window.document.getElementById("logout");
		
		
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
			initPage();
		
		})

	})
})()