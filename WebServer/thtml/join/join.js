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
window.el.input.passwordCheck = window.document.getElementById("inputPasswordCheck");

window.el.btn = {}
window.el.btn.login = window.document.getElementById("btnLogin");
window.el.btn.join = window.document.getElementById("btnJoin");
window.el.btn.showPassBt = window.document.getElementById("showPassBt");
window.el.btn.hidePassBt = window.document.getElementById("hidePassBt");
window.el.btn.showPassBt1 = window.document.getElementById("showPassBt1");
window.el.btn.hidePassBt1 = window.document.getElementById("hidePassBt1");
window.el.div = {}
window.el.div.errMessage = window.document.getElementById("errMessage");
window.el.div.errMessage1 = window.document.getElementById("errMessage1");
window.el.div.errMessage2 = window.document.getElementById("errMessage2");
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Functions;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
var webStorageSetItem = function( o ){
	console.log( "[S] - webStorageSetItem ")
	var s,so;
	for( s in o ){
		so = o[ s ];
		console.log( s );
		window.localStorage.setItem( s , so );
	}
	console.log( "[E] - webStorageSetItem ")
}


var checkEmail = function(str){
	let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)          
	console.log(regex.test(str));

	return regex.test(str)

}
var checkPass = function(str){

	let regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)          
	console.log(regex.test(str));

	/*/
	return true;
	/*/
	return regex.test(str)
	//*/
}

var loginBtCheck = function(){
	var checkEmailInputData = window.el.input.email.attributes[ "data-validate" ].value
	var checkPassInputData = window.el.input.password.attributes[ "data-validate" ].value
	if( checkEmailInputData != "false" && checkPassInputData != "false" )
	{
		window.el.btn.login.classList.remove( "disabled" );
	}
	else
	{
		window.el.btn.login.classList.add( "disabled" );
	}
}

//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Event;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
window.evt = {}
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
window.el.btn.showPassBt1.addEventListener("click",function(evt){
	window.el.btn.hidePassBt1.classList.remove("displayNone");
	window.el.btn.showPassBt1.classList.add("displayNone");
	window.el.input.passwordCheck.type = "text";
})
window.el.btn.hidePassBt1.addEventListener("click",function(evt){
	window.el.btn.hidePassBt1.classList.add("displayNone");
	window.el.btn.showPassBt1.classList.remove("displayNone");
	window.el.input.passwordCheck.type = "password";
})
/*

window.el.input.email = window.document.getElementById("inputEmail");
window.el.input.password = window.document.getElementById("inputPassword");
window.el.input.passwordCheck = window.document.getElementById("inputPasswordCheck");
*/


//패스워드확인
window.el.input.password.addEventListener("input",function(evt){

	//var emailInputLoader = window.document.getElementById("emailInputLoader");
	var pass = evt.target.value;
	if( pass == "" )
	{
		evt.target.classList.remove( "inputerror" );
		//window.el.div.errMessage1.classList.add("displayNone");
		window.el.div.errMessage1.innerText = "";
		return;
	}
	

	//window.el.div.errMessage1.classList.add("displayNone");

	if( checkPass(pass) )
	{
		window.el.input.password.attributes[ "data-validate" ].value = "true";
		evt.target.classList.remove( "inputerror" );
		window.el.div.errMessage1.innerText = "";
		//return;
	}
	else
	{
		debugger;
		window.el.input.password.attributes[ "data-validate" ].value = "false";
		window.el.div.errMessage1.innerText = "비밀번호 형식이 맞지않습니다.";
		//window.el.div.errMessage1.classList.remove("displayNone")
		evt.target.classList.add( "inputerror" );
	}
	loginBtCheck();
	// if( window.el.input.passwordCheck.value == "" ) return;
	// if(window.el.input.password.value != window.el.input.passwordCheck.value )
	// {
	// 	debugger;
	// 	window.el.input.password.attributes[ "data-validate" ].value = "false";
	// 	window.el.input.passwordCheck.attributes[ "data-validate" ].value = "false";
	// 	window.el.div.errMessage1.innerText = "비밀번호와 비밀번호확인이 일치하지 않습니다.";
	// 	//window.el.div.errMessage1.classList.remove("displayNone")
	// 	evt.target.classList.add( "inputerror" );
	// 	return;
	// }
	// else
	// {
	// 	window.el.input.password.attributes[ "data-validate" ].value = "true";
	// 	window.el.input.passwordCheck.attributes[ "data-validate" ].value = "true";
	// 	//window.el.div.errMessage1.classList.add("displayNone");
	// 	evt.target.classList.remove( "inputerror" );
	// 	window.el.div.errMessage1.innerText = "";
	// 	loginBtCheck();
	// }

	
})
window.el.input.passwordCheck.addEventListener("input",function(evt){

	//var emailInputLoader = window.document.getElementById("emailInputLoader");
	var pass = evt.target.value;
	debugger;
	if( pass == "" ) 
	{
		evt.target.classList.remove( "inputerror" );
		window.el.div.errMessage2.innerText = "";
		//window.el.div.errMessage2.classList.add("displayNone");
		return;
	}

	//window.el.div.errMessage2.classList.add("displayNone");

	// if( checkPass(pass) )
	// {
	// 	window.el.input.passwordCheck.attributes[ "data-validate" ].value = "true";
	// 	evt.target.classList.remove( "inputerror" );
	// 	window.el.div.errMessage2.innerText = "";
	// 	return;
	// }
	// else
	// {
	// 	debugger;
	// 	window.el.input.passwordCheck.attributes[ "data-validate" ].value = "false";
	// 	window.el.div.errMessage2.innerText = "비밀번호 형식이 맞지않습니다.";
	// 	//window.el.div.errMessage2.classList.remove("displayNone")
	// 	evt.target.classList.add( "inputerror" );

	// }
	if( window.el.input.password.value == "" ) return;
	if(window.el.input.password.value != window.el.input.passwordCheck.value )
	{
		console.log("pass",window.el.input.password.value)
		console.log("passCheck",window.el.input.passwordCheck.value)
		debugger;
		window.el.input.password.attributes[ "data-validate" ].value = "false";
		window.el.input.passwordCheck.attributes[ "data-validate" ].value = "false";
		window.el.div.errMessage2.innerText = "비밀번호와 비밀번호확인이 일치하지 않습니다.";
		//window.el.div.errMessage1.classList.remove("displayNone")
		evt.target.classList.add( "inputerror" );
		return;
	}
	else
	{
		window.el.input.password.attributes[ "data-validate" ].value = "true";
		window.el.input.passwordCheck.attributes[ "data-validate" ].value = "true";
		//window.el.div.errMessage1.classList.add("displayNone");
		window.el.div.errMessage2.innerText = "";
		evt.target.classList.remove( "inputerror" );
		loginBtCheck();
		
	}
})
window.el.input.email.addEventListener("input",function(evt){

	var emailInputLoader = window.document.getElementById("emailInputLoader");
	var email = evt.target.value;

	var checkEmailInputData = window.el.input.email.attributes[ "data-validate" ].value
	var checkPassInputData = window.el.input.password.attributes[ "data-validate" ].value

	if( email == "" ) 
	{
		evt.target.classList.remove( "inputerror" );
		window.el.div.errMessage.innerText = "";
		//window.el.div.errMessage2.innerText = "";
		//window.el.div.errMessage2.classList.add("displayNone");
		return;
	}

		//window.el.div.errMessage.classList.add("displayNone");
	
	
	//emailInputLoader.classList.remove("displayNone");

	if( !checkEmail(email) )
	{
		evt.target.classList.add( "inputerror" );
		//window.el.div.errMessage.classList.remove( "displayNone" );
		window.el.div.errMessage.innerText = "이메일형식이 올바르지 않습니다.";
		//emailInputLoader.classList.add("displayNone");
		window.el.input.email.attributes[ "data-validate" ].value = "false";
		return;
		//return alert("이메일을 입력해주세요");

	}
	else
	{
		window.el.div.errMessage.innerText = "";
		evt.target.classList.remove( "inputerror" );
		window.el.input.email.attributes[ "data-validate" ].value = "true";
		// if( !window.el.div.emailTooltip.classList.contains( "displayNone" ) ) window.el.div.emailTooltip.classList.add( "displayNone" );
		// evt.target.classList.remove( "inputerror" );
		// // emailInputLoader.classList.add("displayNone");
		// requestGet("/api/existEmail?email=" + email, function(d){
		// 	var r = JSON.parse(d)
		// 	if( r.r )
		// 	{
		// 	console.log( "email exist : " + r.userId )
		// 	emailInputLoader.classList.add("displayNone");
		// 	window.el.input.email.attributes[ "data-validate" ].value = "true";
		// 	}
		// 	else
		// 	{
		// 	window.el.div.emailTooltip.classList.remove( "displayNone" );
		// 	emailInputLoader.classList.add("displayNone");
		// 	evt.target.classList.add( "inputerror" );
		// 	window.el.div.emailTooltip.innerText = "존재하지 않는 이메일입니다.!"
		// 	console.log( "email exist : " + r.m )
		// 	window.el.input.email.attributes[ "data-validate" ].value = "false";
		// 	}
		// 	loginBtCheck();
		// })
	}
	loginBtCheck();

});
window.evt.btnLoginClick = window.el.btn.join.addEventListener("click",function(evt){

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

	window.el.btn.join.classList.add("loading");

	console.log( "window.el.btn.join - click!" );

	var postBody = { email : email, pass : password }
	requestPostBodyJson('/api/join',postBody , function( d ){
		debugger;
		var _d = JSON.parse( d )
		if( _d.success )
		{
			window.el.div.errMessage.innerText = _d.m;
			window.el.div.errMessage.classList.remove("displayNone")
			window.el.btn.join.classList.remove("loading");
		}
		else location.href="/"
	})

})             
window.evt.btnLoginClick = window.el.btn.login.addEventListener("click",function(evt){
	console.log( "window.el.btn.join - click!" )
	window.location.href = "/"
})   

})();