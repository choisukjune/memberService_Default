(function(){
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //Initialize;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    element_init();
    event_init();
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //DOM element;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;

    window.el.div.container = window.document.getElementById("container");

    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //Functions;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;

    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //LOGIC;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;

    initPage();

    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //Event;
    $('.custom.button').popup({
        popup : $('.custom.popup'),
        on    : 'click'
    });
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    //-------------------------------------------------------;   
})()