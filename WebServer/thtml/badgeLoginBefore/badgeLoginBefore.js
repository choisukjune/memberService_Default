(async function(){
    debugger;
    window.el.btn.badgeLoginBt = window.document.getElementById("badgeLoginBt");

    window.el.btn.badgeLoginBt.addEventListener("click", async function(evt){
    
        var a =  await checkSession();
        if( a )
        {            
            render_badgeLoginAfter();
        }
        else
        {   
            render_loginBefore();
        }
    })
})();