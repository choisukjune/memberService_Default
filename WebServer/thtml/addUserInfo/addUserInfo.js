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
debugger;

console.log( "adduserinfo.html" )
window.el = {};
window.el.input = {};
window.el.input.username = window.document.getElementById("username");
window.el.input.mobile = window.document.getElementById("mobile");
//추가정보1
window.el.input.addInfo1 = window.document.getElementById("addInfo1");
//추가정보1
window.el.input.addInfo2 = window.document.getElementById("addInfo2");
//추가정보1
window.el.input.addInfo3 = window.document.getElementById("addInfo3");

window.el.btn = {}
window.el.btn.saveAddInfo = window.document.getElementById("saveAddInfo");
window.el.btn.profileSave = window.document.getElementById("profileSave");
window.el.btn.profileDelete = window.document.getElementById("profileDelete");

window.el.img = {};
window.el.img.profileImg = window.document.getElementById("profileImg");

// window.el.btn.showPassBt = window.document.getElementById("showPassBt");
// window.el.btn.hidePassBt = window.document.getElementById("hidePassBt");
// window.el.btn.showPassBt1 = window.document.getElementById("showPassBt1");
// window.el.btn.hidePassBt1 = window.document.getElementById("hidePassBt1");


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
var addUserInfo_init = async function(){
	var a = await getUerInfoBySession();
	window.el.input.username.value = a.username;
	window.el.input.mobile.value = a.mobile;
	//추가정보1
	window.el.input.addInfo1.value = "addInfo1"
	//추가정보1
	window.el.input.addInfo2.value = "addInfo2"
	//추가정보1
	window.el.input.addInfo3.value = "addInfo3"
	function randomRgbaString (alpha) {
		let r = Math.floor(Math.random() * 255)
		let g = Math.floor(Math.random() * 255)
		let b = Math.floor(Math.random() * 255)
		let a = alpha
		return `rgba(${r},${g},${b},${a})`
	}
	if( a.profile_image != "" ) var profileImg = a.profile_image;
	else var imgsrc 

	if( a.profile_image != "" ) var profileImg = a.profile_image;
	else var profileImg = "data:image/svg+xml," + `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0,0,20,20' width='320' height='320'><rect height='20' width='20' fill='${randomRgbaString(100)}'/><text fill='white' x='10' y='14.8' font-size='14' font-family='-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif' text-anchor='middle'>${a.username[1].toUpperCase()}</text></svg>`;

	window.el.img.profileImg.src = profileImg;
}
addUserInfo_init();
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Event;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
window.evt = {}
window.el.btn.saveAddInfo.addEventListener("click",function(e){
	console.log("window.el.btn.saveAddInfo - click!");
	var d = {
		username : window.el.input.username.value,
		mobile : window.el.input.mobile.value,
		addInfo1 : window.el.input.addInfo1.value,
		addInfo2 : window.el.input.addInfo2.value,
		addInfo3 : window.el.input.addInfo3.value,
	}
	console.log( d );
})

})();