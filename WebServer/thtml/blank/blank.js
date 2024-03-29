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

var initPage = async function(){

    // if( ref )
    // {
    //     renderAddUserInfo();
    // }

    var a =  await checkSession();
    if( a )
    {            
        var s = await getUerInfoBySession()   
        var html = `
        <div class="column" style="max-width: 450px;">
        <h2 class="ui white header">
            <div class="content">
            <!-- <div>🔑</div> -->
            <!-- <div class="colorWhite"> ✈️ 안녕하세요! 반갑습니다~</div> -->
            <button id="badgeLoginBt" class="circular ui icon inverted button" style="padding: 10px;">
                <img class="ui right spaced avatar image" src="${s.profile_image }">
        ${s.username }
            </button>

            </div>
        </h2>
        <!-- <div style="margin-bottom: 10px;">
            <div style="font-size: 1.3rem">Sign in</div>
            </div> -->
        <!-- <div id="logout" class="ui fluid inverted large submit button">로그인</div> -->
        </div>
        `;
        window.el.div.container.innerHTML = html;
        debugger;
        window.el.btn.badgeLoginBt = window.document.getElementById("badgeLoginBt");
            window.el.btn.badgeLoginBt.addEventListener("click",function(e){
                debugger;
                // console.log("remove");
                // //window.el.btn.badgeLoginBt.removeEventListener("click",function(e){
                //     console.log("add");
                     renderAfterLogin();
                // //})
            })
        return;
    }
    else
    {   
    //     renderBeforeLogin();
    //     return;
    // }

    var html = `
    <div class="column" style="max-width: 450px;">
    <h2 class="ui white header">
        <div class="content">
        <!-- <div>🔑</div> -->
        <!-- <div class="colorWhite"> ✈️ 안녕하세요! 반갑습니다~</div> -->
        <button id="badgeLoginBt" class="circular ui icon inverted button" style="padding: 10px;">
            지금시작하세요!
        </button>

        </div>
    </h2>
    <!-- <div style="margin-bottom: 10px;">
        <div style="font-size: 1.3rem">Sign in</div>
        </div> -->
    <!-- <div id="logout" class="ui fluid inverted large submit button">로그인</div> -->
    </div>

    `;
    window.el.div.container.innerHTML = html;
    
    window.el.btn.badgeLoginBt = window.document.getElementById("badgeLoginBt");

    window.el.btn.badgeLoginBt.addEventListener("click", async function(evt){

        var a =  await checkSession();
        if( a )
        {            
            var s = await getUerInfoBySession()   
            var html = `
            <img class="ui right spaced avatar image" src="${s.userInfo.profile_image }">
            ${s.userInfo.nickname }
            `;
            window.el.btn.badgeLoginBt.innerHTML = html;


            return;
        }
        else
        {   
            renderBeforeLogin();
            return;
        }
    })
    }
}



window.addEventListener('DOMContentLoaded', function()
{

    //https://tyrannocoding.tistory.com/51 <-- SSO 로그인 구현방법 읽어보기!
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

    element_init();
    window.el.div.container = window.document.getElementById("container");

    

    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //Functions;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;



    initPage();
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //Event;
    window.evt = {}

    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    $('.custom.button').popup({
        popup : $('.custom.popup'),
        on    : 'click'
    });



});
//-------------------------------------------------------;
//-------------------------------------------------------;
// WebSocker Connect.
//-------------------------------------------------------;
//-------------------------------------------------------;

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
            debugger;
            reject(er);
        }
        reader.onerror = reject;
    }
    reader.readAsText(blob);
    }) 
}

const webSocketHost = "localhost";
const webSocketPort = 8889;

const socket = new WebSocket(`ws://${webSocketHost}:${webSocketPort}`);
socket.onopen = () => {
    console.log("WebSocket is open");
    //socket.send( "TEST" );
};
socket.onmessage = async (event) => {
    console.log("Message from server:", event.data);
    var r = await blobToText( event.data );
    console.log( r );
    
};
socket.onclose = () => {
    console.log("WebSocket is closed");
};
socket.onerror = (error) => {
socket.close();
    console.log("WebSocket connection is closed due to:", error);
};
// socket.interval = setInterval(() => {
//     //! 웹소켓은 비동기이기 때문에 삑 날 수 있어, 웹소켓이 클라이언트랑 연결이 되었는지 검사하는 안전 장치
//     if (socket.readyState !== socket.OPEN) {
//         return;
//     }
//     // var sid = getCookie("sid");
//     // var data = { type : "func", nm : "checksession", param : sid };
//     // socket.send( JSON.stringify(data));
// }, 5000);
