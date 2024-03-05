(function(){
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//REGEX;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;

//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//DOM element;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;

window.el = {};
window.el.input = {};
window.el.input.email = window.document.getElementById("inputEmail");
window.el.input.password = window.document.getElementById("inputPassword");

window.el.btn = {}
window.el.btn.login = window.document.getElementById("btnLogin");
window.el.btn.join = window.document.getElementById("btnJoin");
window.el.btn.showPassBt = window.document.getElementById("showPassBt");
window.el.btn.hidePassBt = window.document.getElementById("hidePassBt");

window.el.div = {}
window.el.div.emailTooltip = window.document.getElementById("toolipEmail");

//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Functions;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
var renderJoin = async function(){
	console.log( "[S] - renderJoin" );
	var html = await asyncFetch_GET("/getHtml?fileNm=join");
	console.log( html );
	window.document.getElementById("container").innerHTML = html;

	var jsStr = await asyncFetch_GET("/getJs?fileNm=join" )
	eval(jsStr);
	console.log( "[E] - renderJoin" );
}

var loginBtCheck = function(){
	var checkEmailInputData = window.el.input.email.attributes[ "data-validate" ].value
	var checkPassInputData = window.el.input.password.attributes[ "data-validate" ].value
	if( checkEmailInputData != "false" && checkPassInputData != "false" )
	{
		return window.el.btn.login.classList.remove( "disabled" );
	}
	else
	{
		return window.el.btn.login.classList.add( "disabled" );
	}
}

var checkPass = function(str){
	console.log( "[S] - checkPass" );
	let regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)          
	console.log(regex.test(str));
	console.log( "[E] - checkPass" );
	//*/
	return true;
	/*/
	return regex.test(str)
	//*/
}
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Event;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;

window.evt = {}
window.el.input.password.addEventListener("keypress",function(evt){
	
	//var emailInputLoader = window.document.getElementById("emailInputLoader");
	var pass = evt.target.value;
	var checkEmailInputData = window.el.input.email.attributes[ "data-validate" ].value
	var checkPassInputData = window.el.input.password.attributes[ "data-validate" ].value

	if( checkPass(pass) )
	{
		window.el.input.password.attributes[ "data-validate" ].value = "true";
	}
	else
	{
		window.el.input.password.attributes[ "data-validate" ].value = "false";
	}
	return loginBtCheck();
})

window.el.input.email.addEventListener("change",async function(evt){
	
	var emailInputLoader = window.document.getElementById("emailInputLoader");
	var email = evt.target.value;
	
	var checkEmailInputData = window.el.input.email.attributes[ "data-validate" ].value
	var checkPassInputData = window.el.input.password.attributes[ "data-validate" ].value


	emailInputLoader.classList.remove("displayNone");

	if( email == "" )
	{
		evt.target.classList.add( "inputerror" );
		window.el.div.emailTooltip.classList.remove( "displayNone" );
		emailInputLoader.classList.add("displayNone");
		window.el.input.email.attributes[ "data-validate" ].value = "false";
		window.el.div.emailTooltip.innerText = "이메일을 입력해주세요"
		return;
		//return alert("이메일을 입력해주세요");
	}

	if( !checkEmail(email) )
	{
		evt.target.classList.add( "inputerror" );
		window.el.div.emailTooltip.classList.remove( "displayNone" );
		emailInputLoader.classList.add("displayNone");
		window.el.input.email.attributes[ "data-validate" ].value = "false";
		window.el.div.emailTooltip.innerText = "잘못된 이메일형식 입니다..!"
		return;
		//return alert("이메일을 입력해주세요");

	}
	else
	{
		if( !window.el.div.emailTooltip.classList.contains( "displayNone" ) ) window.el.div.emailTooltip.classList.add( "displayNone" );
		evt.target.classList.remove( "inputerror" );
		// emailInputLoader.classList.add("displayNone");
		var d = await asyncFetch_GET( "/api/existEmail?email=" + email )
		var r = JSON.parse(d)
		if( !r.success )
		{
			//console.log( "email exist : " + r.userId )
			emailInputLoader.classList.add("displayNone");
			window.el.input.email.attributes[ "data-validate" ].value = "true";
		}
		else
		{
			window.el.div.emailTooltip.classList.remove( "displayNone" );
			emailInputLoader.classList.add("displayNone");
			evt.target.classList.add( "inputerror" );
			window.el.div.emailTooltip.innerText = "존재하지 않는 이메일입니다.!"
			//console.log( "email exist : " + r.m )
			window.el.input.email.attributes[ "data-validate" ].value = "false";
		}
		
		loginBtCheck();
	}

});
window.evt.btnLoginClick = window.el.btn.login.addEventListener("click",function(evt){

	var email = window.el.input.email.value;
	var password = window.el.input.password.value;

	console.log( "email : ", email );
	console.log( "password : ", password );

	if( email == "" ){
		return alert("이메일을 입력해주세요")
	}
	else
	{
		if( !checkEmail( email ) ){
			return alert("이메일형식이 잘못되었습니다.")
		}
	}

	if( password == "" ){
		return alert("비밀번호를 입력해주세요")
	}
	//window.el.btn.login.textContent = ""
	window.el.btn.login.classList.add("loading");
	
	console.log( "window.el.btn.login - click!" );

	var postBody = { email : email, pass : password }
	requestPostBodyJson('/api/login',postBody , function( d ){
		var _d = JSON.parse( d );
		if( _d.success )
		{
			window.el.btn.login.classList.remove("loading");
			alert("패스워드를 확인해주세요");
		}
		else
		{
			debugger;
			var userInfo = _d.d.userInfo;
			webStorageSetItem( userInfo );
			location.href="/"
		}
		
	})

})        
window.evt.btnJoinClick = window.el.btn.join.addEventListener("click",function(evt){
	console.log( "window.el.btn.join - click!" )
	//window.location.href = "/html/join.html"
	renderJoin();
})
//툴팁달기 https://sisiblog.tistory.com/336;
window.el.btn.showPassBt.addEventListener("click",function(evt){
	window.el.btn.hidePassBt.classList.remove("displayNone");
	window.el.btn.showPassBt.classList.add("displayNone");
	window.el.input.password.type = "text";
})
window.el.btn.hidePassBt.addEventListener("click",function(evt){
	window.el.btn.hidePassBt.classList.add("displayNone");
	window.el.btn.showPassBt.classList.remove("displayNone");
	window.el.input.password.type = "password";
})

})();