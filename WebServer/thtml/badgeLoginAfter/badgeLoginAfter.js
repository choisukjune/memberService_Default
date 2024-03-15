(async function(){
    window.el.btn.badgeLoginBt = window.document.getElementById("badgeLoginBt");
    window.el.img.profile_image = window.document.getElementById("profile_image");
    window.el.span.username = window.document.getElementById("span_username");
    console.log( window.el.img.profile_image  )
    var s = await getUerInfoBySession();  
    
    if( s.profile_image == "" ) var profile_image = "data:image/svg+xml," + `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0,0,20,20' width='320' height='320'><rect height='20' width='20' fill='${randomRgbaString(100)}'/><text fill='white' x='10' y='14.8' font-size='14' font-family='-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif' text-anchor='middle'>${s.username[1].toUpperCase()}</text></svg>`;
    else var profile_image = s.profile_image;
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

