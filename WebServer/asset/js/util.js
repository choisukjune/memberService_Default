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
                cbFunction( xhr.responseText );  				
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
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)          
    console.log(regex.test(str));

    return regex.test(str)
    
  }