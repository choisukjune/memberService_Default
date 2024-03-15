(async function(){
    var renderEmailLogin = async function(){
        console.log( "[S] - renderEmailLogin" );
        var html = await asyncFetch_GET("/getHtml?fileNm=emailLogin");
        console.log( html );
        window.document.getElementById("container").innerHTML = html;

        var jsStr = await asyncFetch_GET("/getJs?fileNm=emailLogin" )
        eval(jsStr);
        console.log( "[E] - renderEmailLogin" );
    }

    var renderJoin = async function(){
        console.log( "[S] - renderJoin" );
        var html = await asyncFetch_GET("/getHtml?fileNm=join");
        console.log( html );
        window.document.getElementById("container").innerHTML = html;

        var jsStr = await asyncFetch_GET("/getJs?fileNm=join" )
        eval(jsStr);
        console.log( "[E] - renderJoin" );
    }

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var vvv = parseJwt(response.credential)
        console.log(vvv)
    }
    google.accounts.id.initialize({
        client_id: "144090840805-v8tngl71gvd3uudbsjeusrf7mha5pumn.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large",width: "312" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

    //DOM;
    window.el.btn.emaillogin = window.document.getElementById("btnEmailLogin");
    window.el.btn.join = window.document.getElementById("btnJoin"); 

    //EVENT;
    window.el.btn.emaillogin.addEventListener("click",function(evt){

        console.log( "window.el.btn.join - click!" )
        //window.location.href = "/html/emailLogin.html"
        renderEmailLogin()

    })    

    window.el.btn.join.addEventListener("click",function(evt){
        console.log( "window.el.btn.join - click!" )
        renderJoin();
        //window.location.href = "/html/join.html"
    })


})();