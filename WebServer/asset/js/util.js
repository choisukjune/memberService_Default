//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//FUNCTIONS;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
/* 
[요약 설명]
1. XMLHttpRequest : 비동기식 통신 방식 객체이며, 서버와 데이터를 교환할 때 사용됩니다
2. xhr.open : 서버로 보낼 Ajax 요청의 형식을 설정합니다
3. xhr.send : Ajax 요청을 서버로 전달합니다

4. xhr.onreadystatechange : XMLHttpRequest 객체의 현재 상태를 나타냅니다    	
5. readyState 프로퍼티 : 
    - UNSENT (숫자 0) : XMLHttpRequest 객체가 생성됨
    - OPENED (숫자 1) : open() 메소드가 성공적으로 실행됨
    - HEADERS_RECEIVED (숫자 2) : 모든 요청에 대한 응답이 도착함
    - LOADING (숫자 3) : 요청한 데이터를 처리 중
    - DONE (숫자 4) : 요청한 데이터의 처리가 완료되어 응답할 준비가 완료됨
    
6. xhr.status : 서버로부터 응답받은 상태 및 리턴 메시지를 확인합니다
7. status 프로퍼티 :
    - 200 ~ 201 : 요청이 성공적 상태
    - 그외 상태 : 인터넷에서 http 응답 상태를 검색해서 확인
*/

var getCookie = function(name) {      
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');     
	return value? value[2] : null;  
};

var asyncFetch_POST_JSONDATA = async function(url,data){
	var option = {
		method : "POST",
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify( data )
	}

	const res = await fetch( url, option );
	const resText = await res.json();
	console.log( "asyncFetch_POST_JSONDATA - resText : ", resText )
	return resText;
}
var asyncFetch_POST_JSONDATA_Text = async function(url,data){
	var option = {
		method : "POST",
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify( data )
	}

	const res = await fetch( url, option );
	const resText = await res.text();
	console.log( "asyncFetch_POST_JSONDATA - resText : ", resText )
	return resText;
}
var asyncFetch_GET = async function( url ){
    var option = {
		method : "GET",
	};
	const response = await fetch(url, option );
	const data = await response.text();
	console.log(data)
	return data;
}


/* 이벤트 함수 정의 */
function requestGet( url, cbFunction ){
    console.log("");
    console.log("[requestGet] : [start]");    		
    console.log("");
    
    // url 및 전송 데이터 선언
    //var url = "http://jsonplaceholder.typicode.com/posts?userId=1&id=1";
                                        
    // XMLHttpRequest 객체 생성 및 요청 수행
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
                
    console.log("[request url] : " + url);    		    	
    console.log("[request method] : " + "GET");
    console.log("");
    
    //xhr.onreadystatechange = CallbackFunction; //콜백 함수 지정해서 처리 가능    		
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) { 
            if (xhr.status == 200 || xhr.status == 201){
                console.log("[status] : " + xhr.status);
                console.log("[response] : " + "[success]");    				   				    				
                console.log("[response] : " + xhr.responseText);
                console.log("");
                if( cbFunction ) cbFunction( xhr.responseText );  				
                return xhr.responseText;
            }
            else {
                console.log("[status] : " + xhr.status);
                console.log("[response] : " + "[fail]");    				   				    				
                console.log("[response] : " + xhr.responseText);
                console.log("");        				
            }					
        }    			
    }
    xhr.send(null); //get 쿼리 파람 방식일때 null    					    		    		
                            
};



/* 이벤트 함수 정의 */
function requestPost(){
    console.log("");
    console.log("[requestPost] : [start]");    		
    console.log("");
    
    // url 및 전송 데이터 선언
    var url = "http://jsonplaceholder.typicode.com/posts?userId=1&id=1";
                                        
    // XMLHttpRequest 객체 생성 및 요청 수행
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
                
    console.log("[request url] : " + url);    		    	
    console.log("[request method] : " + "POST");
    console.log("");
    
    //xhr.onreadystatechange = CallbackFunction; //콜백 함수 지정해서 처리 가능    		
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201){
                console.log("[status] : " + xhr.status);
                console.log("[response] : " + "[success]");    				   				    				
                console.log("[response] : " + xhr.responseText);
                console.log("");        				
            }
            else {
                console.log("[status] : " + xhr.status);
                console.log("[response] : " + "[fail]");    				   				    				
                console.log("[response] : " + xhr.responseText);
                console.log("");        				
            }    				
        }    			
    }
    xhr.send(null); //post 쿼리 파람 방식일때 null    					    		    		
                            
};



/* 이벤트 함수 정의 */
function requestPostBodyJson( url, data, cbFunction ){
    console.log("");
    console.log("[requestPostBodyJson] : [start]");    		
    console.log("");
    
    // url 및 전송 데이터 선언
    //var url = "http://jsonplaceholder.typicode.com/posts";
    
    // 전송 json 데이터 선언
    var jsonData = data//{"userId" : 1 , "id" : 1};
                                        debugger;
    // XMLHttpRequest 객체 생성 및 요청 수행
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
                
    console.log("[request url] : " + url);
    console.log("[request data] : " + JSON.stringify(jsonData));
    console.log("[request method] : " + "POST");
    console.log("");
    
    //xhr.onreadystatechange = CallbackFunction; //콜백 함수 지정해서 처리 가능    		
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201){
                console.log("[status] : " + xhr.status);
                console.log("[response] : " + "[success]");    				   				    				
                console.log("[response] : " + xhr.responseText);
                console.log("");
        cbFunction( xhr.responseText )        				
            }
            else {
                console.log("[status] : " + xhr.status);
                console.log("[response] : " + "[fail]");    				   				    				
                console.log("[response] : " + xhr.responseText);
                console.log("");        				 
            }						    				
        }    			
    }
    xhr.setRequestHeader("Content-Type", "application/json");    		
    xhr.send(JSON.stringify(jsonData)); //post body json 방식 일때    					    		    		
                            
};

//숫자를 한글로변화하는 함수;
function num2han(num) {  
    num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + '';  // 숫자/문자/돈 을 숫자만 있는 문자열로 변환  
    if(num == '0')    return '영';  
    var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];  
    var unit = ['', '만', '억', '조'];  var smallUnit = ['천', '백', '십', ''];  
    var result = [];  //변환된 값을 저장할 배열  
    var unitCnt = Math.ceil(num.length / 4);  //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.  
    num = num.padStart(unitCnt * 4, '0')  //4자리 값이 되도록 0을 채운다  
    var regexp = /[\w\W]{4}/g;  //4자리 단위로 숫자 분리  
    var array = num.match(regexp);  //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)  
    for(var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {    
        var hanValue = _makeHan(array[i]);  //한글로 변환된 숫자    
        if(hanValue == '')  //값이 없을땐 해당 단위의 값이 모두 0이란 뜻.       
        {
            continue;
        }    
        result.unshift(hanValue + unit[unitCnt]);  //unshift는 항상 배열의 앞에 넣는다.  
    }  //여기로 들어오는 값은 무조건 네자리이다. 1234 -> 일천이백삼십사  
    function _makeHan(text) {    
        var str = '';    
        for(var i = 0; i < text.length; i++) {      
            var num = text[i];      
            if(num == '0')  //0은 읽지 않는다        
            {
                continue;
            }
            str += number[num] + smallUnit[i];    
        }    
        return str;  
    }  
    return result.join('');
}
var checkEmail = function(str){

	console.log( "[S] - checkEmail" );
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)          
    console.log(regex.test(str));

	console.log( "[E] - checkEmail" );
    return regex.test(str)
    
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

var showClock = function(){
    var currentDate = new Date();
    var divClock = document.getElementById('divClock');
    var msg = "현재 시간 : ";
    if(currentDate.getHours()>12){      //시간이 12보다 크다면 오후 아니면 오전
        msg += "오후 ";
        msg += currentDate.getHours()-12+"시 ";
    }
    else
    {
        msg += "오전 ";
        msg += currentDate.getHours()+"시 ";
    }

    msg += currentDate.getMinutes()+"분 ";
    msg += currentDate.getSeconds()+"초";

    divClock.innerText = msg;

    if (currentDate.getMinutes()>58)
    {   
        //정각 1분전부터 빨강색으로 출력
        divClock.style.color="red";
    }
    setTimeout(showClock,1000);  //1초마다 갱신
}

        
var getUerInfoBySession = async function( cbfunction ){
    
    var sid = getCookie("sid");
    if(!sid) return;

    var url = "/api/getUerInfoBySession"
    var method = "POST"
    var data = { sid : sid };
    var r = await asyncFetch_POST_JSONDATA( url, data )
    console.log( "getUerInfoBySession - r : ",r );
    
    return r;
    
}
    
var renderBeforeLogin = async function(){
    console.log( "[S] - renderBeforeLogin" );
    var html = await asyncFetch_GET("/getHtml?fileNm=loginBefore");
    console.log( html );
    window.document.getElementById("container").innerHTML = html;

    var jsStr = await asyncFetch_GET("/getJs?fileNm=loginBefore" )
    eval(jsStr);
    console.log( "[E] - renderBeforeLogin" );
}

var renderAfterLogin = async function(){
    console.log( "[S] - renderAfterLogin" );
    // var html = await asyncFetch_GET("/getHtml?fileNm=loginAfter");
    // console.log( html );
    // window.document.getElementById("container").innerHTML = html;

    var jsStr = await asyncFetch_GET("/getJs?fileNm=loginAfter" )
    eval(jsStr);
    console.log( "[E] - renderAfterLogin" );
}


var renderAddUserInfo = async function(){
    console.log( "[S] - renderAddUserInfo" );
    var html = await asyncFetch_GET("/getHtml?fileNm=addUserInfo");
    console.log( html );
    window.document.getElementById("container").innerHTML = html;

    var jsStr = await asyncFetch_GET("/getJs?fileNm=addUserInfo" )
    eval(jsStr);
    console.log( "[E] - renderAddUserInfo" );
}

var render_join = async function(){
    console.log( "[S] - render_join" );
    var html = await asyncFetch_GET("/getHtml?fileNm=join");
    console.log( html );
    window.document.getElementById("container").innerHTML = html;

    var jsStr = await asyncFetch_GET("/getJs?fileNm=join" )
    eval(jsStr);
    console.log( "[E] - render_join" );
}


var htmlToElement = function( html ){
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
 
    
var deleteAllCookies = function( name ) {

    if( name ) return document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};

var checkSession = async function(){

    console.log( "[S] - checkSession" )
    
    var sid = await getCookie( "sid" );
    
    if( !sid || sid == "undefined" )
    { 
    
        window.localStorage.clear();
        await deleteSession();
        await deleteAllCookies();
        console.log( "   [MSG] - sid not found!" );
        console.log( "[E] - checkSession" );
        return false;
    }
    else
    {
        console.log( "sid : " + sid )
        var r = await asyncFetch_GET("http://localhost:8888/checksession?sid=" + sid);
        console.log( "   [Query Result] : " + JSON.stringify(r) );
        if( r ){
            console.log( "   [MSG] - session check complete!" );
            console.log( "[E] - checkSession" );
            return true;
        }
        else
        {
            //renderBeforeLogin();
            await window.localStorage.clear();
            await deleteSession();
            await deleteAllCookies();
            // location.href = "/";
            console.log( "   [MSG] - session check fail!!" );
            console.log( "[E] - checkSession" )
            return false;
        }
    }
}

var deleteSession = async function(){
    var sid = getCookie("sid");
    if( sid ){
        var r = await asyncFetch_GET("/api/deletesession?sid=" + sid);
        console.log( r ) ;
    }
}

var getUerInfoBySession = async function( cbfunction ){
    
    var sid = getCookie("sid");
    if(!sid) return;

    var url = "/api/getUerInfoBySession"
    var method = "POST"
    var data = { sid : sid };
    var r = await asyncFetch_POST_JSONDATA( url, data )
    console.log( "getUerInfoBySession - r : ",r );
    
    return r;
    
};

var loadJSscript = function(id, js_src, callback) {
        if (document.getElementById(id)) { return; }
        var my_head = document.getElementsByTagName('head')[0];
        var my_js = document.createElement('script');
        my_js.id = id;
        my_js.type= 'text/javascript';
        my_js.async = true;
        my_js.src = js_src;
        my_js.addEventListener("load", function(event) { if(callback && typeof callback == "function"){ callback(); }});
        my_head.appendChild(my_js);
};

var loadCss = function(filename){
    var linkElement=document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("type", "text/css");
    linkElement.setAttribute("href", filename);
    document.getElementsByTagName("head")[0].appendChild(linkElement);
};

var loadHtml = async function(targetDomId,filename){
    var html = await asyncFetch_GET("/getHtml?fileNm=" + filename);
    window.document.getElementById( targetDomId ).innerHTML = html;
    return html;
};

//render html;
var render_loginBefore = async function(){
    console.log( "[S] - render_loginBefore" );
    await loadHtml("container","loginBefore");
    loadCss( "/asset/css/common.css" )
    loadJSscript('loginBefore','/thtml/loginBefore/loginBefore.js', function (){
        // if(typeof my_example_init == "function")
        // {
            //my_example_init();
            console.log("success")
        // } 
    });
    console.log( "[E] - render_loginBefore" );
}

var render_loginAfter = async function(){
    console.log( "[S] - render_loginAfter" );
    // var html = await asyncFetch_GET("/getHtml?fileNm=loginAfter");
    // console.log( html );
    // window.document.getElementById("container").innerHTML = html;
    loadJSscript('loginAfter','/thtml/loginAfter/loginAfter.js',function(){console.log("OK!")})
    console.log( "[E] - render_loginAfter" );
}


var render_addUserInfo = async function(){
    console.log( "[S] - renderAddUserInfo" );

    await loadHtml("container","addUserInfo");
    // loadCss( "/asset/css/common.css" )
    loadJSscript('addUserInfo','/thtml/addUserInfo/addUserInfo.js', function (){
        // if(typeof my_example_init == "function")
        // {
            //my_example_init();
            console.log("success")
        // } 
    });
    console.log( "[E] - renderAddUserInfo" );
}

var render_badgeLoginAfter = async function(){
    console.log( "[S] - render_badgeLoginAfter" );

    await loadHtml("container","badgeLoginAfter");
    // loadCss( "/asset/css/common.css" )
    loadJSscript('badgeLoginAfter','/thtml/badgeLoginAfter/badgeLoginAfter.js', function (){
        // if(typeof my_example_init == "function")
        // {
            //my_example_init();
            console.log("success")
        // } 
    });
    console.log( "[E] - render_badgeLoginAfter" );
}

var render_badgeLoginBefore = async function(){
    console.log( "[S] - render_badgeLoginBefore" );

    await loadHtml("container","badgeLoginBefore");
    // loadCss( "/asset/css/common.css" )
    loadJSscript('badgeLoginBefore','/thtml/badgeLoginBefore/badgeLoginBefore.js', function (){
        // if(typeof my_example_init == "function")
        // {
            //my_example_init();
            console.log("success")
        // } 
    });
    console.log( "[E] - render_badgeLoginBefore" );
}

var emailLogin = async function(){
    console.log( "[S] - emailLogin" );

    await loadHtml("container","emailLogin");
    // loadCss( "/asset/css/common.css" )
    loadJSscript('emailLogin','/thtml/emailLogin/emailLogin.js', function (){
        // if(typeof my_example_init == "function")
        // {
            //my_example_init();
            console.log("success")
        // } 
    });
    console.log( "[E] - emailLogin" );
}

var htmlToElement = function( html ){
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
 
    
var deleteAllCookies = function( name ) {

    if( name ) return document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};

var checkSession = async function(){

    console.log( "[S] - checkSession" )
    
    var sid = await getCookie( "sid" );
    
    if( !sid || sid == "undefined" )
    { 
    
        window.localStorage.clear();
        await deleteSession();
        await deleteAllCookies();
        console.log( "   [MSG] - sid not found!" );
        console.log( "[E] - checkSession" );
        return false;
    }
    else
    {
        console.log( "sid : " + sid )
        var r = await asyncFetch_GET("http://localhost:8888/checksession?sid=" + sid);
        console.log( "   [Query Result] : " + JSON.stringify(r) );
        if( r ){
            console.log( "   [MSG] - session check complete!" );
            console.log( "[E] - checkSession" );
            return true;
        }
        else
        {
            //render_loginBefore();
            await window.localStorage.clear();
            await deleteSession();
            await deleteAllCookies();
            // location.href = "/";
            console.log( "   [MSG] - session check fail!!" );
            console.log( "[E] - checkSession" )
            return false;
        }
    }
}

var deleteSession = async function(){
    var sid = getCookie("sid");
    if( sid )
    {
        var r = await asyncFetch_GET("/api/deletesession?sid=" + sid);
        return console.log( r ) ;
    }
    else
    {
        return;
    }

}

function randomRgbaString (alpha) {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let a = alpha
    return `rgba(${r},${g},${b},${a})`
}

var blobToText = function( blob ){
    return new Promise((resolve,reject) => {
        var reader = new FileReader();
        reader.onload = function() {

        try
        {
            resolve(reader.result);
        }
        catch( er )
        {
            reject(er);
        }
        reader.onerror = reject;
    }
    reader.readAsText(blob);
    }) 
}

var usePageUri = function(){
    var urlStr = window.location.href;
    var url = new URL(urlStr);

    var urlParams = url.searchParams;

    var page = urlParams.get('p');

    // javascript
    console.log(page);

    if( page ){
        eval( "render_" + page + "();" );
    } 
    return;
}