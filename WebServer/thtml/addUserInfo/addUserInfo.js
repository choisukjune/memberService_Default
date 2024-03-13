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
window.el.div.emailTooltip = window.document.getElementById("toolipEmail");
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Functions;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
const fileInput = document.getElementById("fileUpload");
// 또는 const fileInput = $("#fileUpload").get(0);

const handleFiles = (e) => {
	const selectedFile = [...fileInput.files];
	const fileReader = new FileReader();
  
	var a = fileReader.readAsDataURL(selectedFile[0]);
	console.log( selectedFile[0].name )
	var orgFileNm = selectedFile[0].name;
	fileReader.onload = async function () {
	  //document.getElementById("previewImg").src = fileReader.result;
	  console.log( fileReader.result )
	  var t =  await asyncFetch_POST_JSONDATA("/api/uploadFile",{ data:fileReader.result,fileNm:orgFileNm})
	  console.log( t );
	};
  };
//   var asyncFetch_POST_JSONDATA = async function(url,data){
// 	var option = {
// 		method : "POST",
// 		headers : {
// 			"Content-Type" : "application/json"
// 		},
// 		body : JSON.stringify( data )
// 	}

// 	const res = await fetch( url, option );
// 	const resText = await res.json();
// 	console.log( "asyncFetch_POST_JSONDATA - resText : ", resText )
// 	return resText;
// }
  fileInput.addEventListener("change", handleFiles);

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

function showClock(){
	var currentDate = new Date();
	var divClock = document.getElementById('divClock');
	var msg = "현재 시간 : ";
	if(currentDate.getHours()>12){      //시간이 12보다 크다면 오후 아니면 오전
		msg += "오후 ";
		msg += currentDate.getHours()-12+"시 ";
	}
	else {
		msg += "오전 ";
		msg += currentDate.getHours()+"시 ";
	}

	msg += currentDate.getMinutes()+"분 ";
	msg += currentDate.getSeconds()+"초";

	divClock.innerText = msg;

	if (currentDate.getMinutes()>58) {    //정각 1분전부터 빨강색으로 출력
		divClock.style.color="red";
	}
	setTimeout(showClock,1000);  //1초마다 갱신
}

showClock();

var checkEmail = function(str){
	let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)          
	console.log(regex.test(str));

	return regex.test(str)

}
var checkPass = function(str){

	let regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)          
	console.log(regex.test(str));

	//*/
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
	loginBtCheck();
})

window.el.input.email.addEventListener("change",function(evt){

	var emailInputLoader = window.document.getElementById("emailInputLoader");
	var email = evt.target.value;

	var checkEmailInputData = window.el.input.email.attributes[ "data-validate" ].value
	var checkPassInputData = window.el.input.password.attributes[ "data-validate" ].value


	emailInputLoader.classList.remove("displayNone");

	if( !checkEmail(email) )
	{
		evt.target.classList.add( "inputerror" );
		window.el.div.emailTooltip.classList.remove( "displayNone" );
		emailInputLoader.classList.add("displayNone");
		window.el.input.email.attributes[ "data-validate" ].value = "false";
		return;
		//return alert("이메일을 입력해주세요");

	}
	else
	{
		if( !window.el.div.emailTooltip.classList.contains( "displayNone" ) ) window.el.div.emailTooltip.classList.add( "displayNone" );
		evt.target.classList.remove( "inputerror" );
		// emailInputLoader.classList.add("displayNone");
		requestGet("/api/existEmail?email=" + email, function(d){
			var r = JSON.parse(d)
			if( r.r )
			{
			console.log( "email exist : " + r.userId )
			emailInputLoader.classList.add("displayNone");
			window.el.input.email.attributes[ "data-validate" ].value = "true";
			}
			else
			{
			window.el.div.emailTooltip.classList.remove( "displayNone" );
			emailInputLoader.classList.add("displayNone");
			evt.target.classList.add( "inputerror" );
			window.el.div.emailTooltip.innerText = "존재하지 않는 이메일입니다.!"
			console.log( "email exist : " + r.m )
			window.el.input.email.attributes[ "data-validate" ].value = "false";
			}
			loginBtCheck();
		})
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
	window.el.btn.join.classList.add("loading");

	console.log( "window.el.btn.login - click!" );

	var postBody = { email : email, pass : password }
	requestPostBodyJson('/api/join',postBody , function( d ){
		console.log( "===========" )
		console.log( "===========" )
		console.log( "===========" )
		console.log( "===========" )
		var _d = JSON.parse( d );
		webStorageSetItem( JSON.parse( _d.d ) )
		location.href="/"

	})

})             
window.evt.btnJoinClick = window.el.btn.join.addEventListener("click",function(evt){
	console.log( "window.el.btn.join - click!" )
	window.location.href = "/"
})   

})();