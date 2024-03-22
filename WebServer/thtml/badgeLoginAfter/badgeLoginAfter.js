(async function(){
    window.el.btn.badgeLoginBt = window.document.getElementById("badgeLoginBt");
    window.el.img.profile_image = window.document.getElementById("profile_image");
    window.el.span.username = window.document.getElementById("span_username");
    console.log( window.el.img.profile_image  )
    var s = await getUerInfoBySession();  
    
    if( s.profile_image ) var profile_image = s.profile_image;
    else var profile_image = makeAvatarImg(s.username);
    window.el.img.profile_image.src = profile_image;
    window.el.span.username.innerText = s.username;
    
    window.el.btn.badgeLoginBt = window.document.getElementById("badgeLoginBt");
    window.el.btn.badgeLoginBt.addEventListener("click",function(e){
        // console.log("remove");
        // //window.el.btn.badgeLoginBt.removeEventListener("click",function(e){
        //     console.log("add");
            render_loginAfter();
        // //})
    })    
})()

