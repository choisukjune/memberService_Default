(function(){
      //-------------------------------------------------------;
    //-------------------------------------------------------;
    // WebSocker Connect.
    //-------------------------------------------------------;
    //-------------------------------------------------------;
    


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
    
})()