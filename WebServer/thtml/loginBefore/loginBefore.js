(function(){

    //DOM;
    window.el.btn.emaillogin = window.document.getElementById("btnEmailLogin");
    window.el.btn.join = window.document.getElementById("btnJoin"); 

    //EVENT;
    window.el.btn.emaillogin.addEventListener("click",function(evt){

        console.log( "window.el.btn.join - click!" )
        window.location.href = "/html/emailLogin.html"

    })    

    window.el.btn.join.addEventListener("click",function(evt){
        console.log( "window.el.btn.join - click!" )
        window.location.href = "/html/join.html"
    })


})();