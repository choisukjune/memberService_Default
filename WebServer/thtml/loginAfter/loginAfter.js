(function(){

	requestGet("/getHtml?fileNm=loginAfter",async function(d){
		var _thtml = d;
		var html = "";
		var _d = await getUerInfoBySession();

		function randomRgbaString (alpha) {
			let r = Math.floor(Math.random() * 255)
			let g = Math.floor(Math.random() * 255)
			let b = Math.floor(Math.random() * 255)
			let a = alpha
			return `rgba(${r},${g},${b},${a})`
		}

		if( _d.profile_image ) var profile_image = _d.profile_image;
    	else var profile_image = makeAvatarImg(_d.username);

		if( _d.name ) var name = _d.name;
		else var name = " - ";

		if( _d.username ) var username = _d.username;
		else var username = " - ";

		if( _d.userId ) var email = _d.userId
		else var email = " - ";
		
		if( _d.mobile ) var mobile = _d.mobile
		else var mobile = " - ";

		
		html = _thtml.replace("{IMG_SRC}",profile_image)
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