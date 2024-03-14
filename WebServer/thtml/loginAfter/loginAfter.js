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
		if( _d.profile_image != "" ) var imgsrc = _d.profile_image;
		else var imgsrc = "data:image/svg+xml," + `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0,0,20,20' width='320' height='320'><rect height='20' width='20' fill='${randomRgbaString(100)}'/><text fill='white' x='10' y='14.8' font-size='14' font-family='-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif' text-anchor='middle'>${_d.username[1].toUpperCase()}</text></svg>`
	
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