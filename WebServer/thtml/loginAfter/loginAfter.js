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
window.el.input.userId = window.document.getElementById("userId");
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
window.el.btn.logout = window.document.getElementById("logout");
window.el.btn.changePass = window.document.getElementById("changePass");

window.el.img = {};
window.el.img.profileImg = window.document.getElementById("profileImg");

window.el.fileInput = {};
window.el.fileInput.profileImg = window.document.getElementById("fileUpload");
// window.el.btn.showPassBt = window.document.getElementById("showPassBt");
// window.el.btn.hidePassBt = window.document.getElementById("hidePassBt");
// window.el.btn.showPassBt1 = window.document.getElementById("showPassBt1");
// window.el.btn.hidePassBt1 = window.document.getElementById("hidePassBt1");

window.el.div = {};
window.el.div.userNameTitle = window.document.getElementById("userNameTitle");

//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Functions;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
var mobileCheck = function(str){
	console.log( "[S] - checkEmail" );
	var regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
	console.log("mobile check : ",regex.test(str));
	console.log( "[E] - checkEmail" );
    return regex.test(str)
};
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

var profile_init = async function(){
	var a = await getUerInfoBySession();
	window.el.input.username.value = a.username;
	window.el.input.mobile.value = a.mobile;
	window.el.input.userId.value = a.userId;
	//추가정보1
	window.el.input.addInfo1.value = "addInfo1"
	//추가정보1
	window.el.input.addInfo2.value = "addInfo2"
	//추가정보1
	window.el.input.addInfo3.value = "addInfo3"

	if( a.profile_image ) var profileImg = a.profile_image;
	else var profileImg = makeAvatarImg( a.username );
	window.el.img.profileImg.src = profileImg;
	window.el.div.userNameTitle.innerText = `${a.username}님! 반갑습니다!`
}
profile_init();
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//Event;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//input validation 설정해야함....;
window.evt = {}
fileInput.addEventListener("change", handleFiles);
window.el.input.mobile.addEventListener("focusout",function(evt){

	var mobileNumber = evt.target.value;
	debugger;
	if( mobileCheck(mobileNumber) )
	{
		//성공
		evt.target.parentElement.classList.remove("error")
	}
	else
	{
		//실패
		//alert("휴대폰번호를 확인해주세요");
		evt.target.parentElement.classList.add("error")
	}
})
window.el.btn.saveAddInfo.addEventListener("click",async function(e){
	console.log("window.el.btn.saveAddInfo - click!");
	
	
	var d = {
		userId : window.el.input.userId.value,
		profile_image : window.el.img.profileImg.src,
		username : window.el.input.username.value,
		mobile : window.el.input.mobile.value,
		addInfo1 : window.el.input.addInfo1.value,
		addInfo2 : window.el.input.addInfo2.value,
		addInfo3 : window.el.input.addInfo3.value,
	}

	var profile_image = null;
	if( window.el.img.profileImg.src.indexOf("data:image") == -1 ) profile_image = window.el.img.profileImg.src;
	/*
	{
		userId : data.userId,
		username : data.username,
		profile_image : data.profile_image,
		mobile : data.mobile,
		//name : data.name,
		userInfos : {
			site : data,
			google : {},
			naver : {},
			kakao : {},
		}
	}
	*/

	console.log( d );
	
	var postData = {
		userId : window.el.input.userId.value,
		username : window.el.input.username.value,
		profile_image : profile_image,
		mobile : window.el.input.mobile.value,
		//name : data.name,
		userInfos : {
			site : d,
			google : {},
			naver : {},
			kakao : {},
		}
	};
	
	var t =  await asyncFetch_POST_JSONDATA("/api/addUserInfo",postData)
	console.log( t );
	if( t.success )
	{
		debugger;
		alert("test")
	}
	else
	{
		//debugger;
		profile_init();
	}
	
})
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

})()