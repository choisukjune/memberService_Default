(function(){
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