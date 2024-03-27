//----------------------------------------------------------------------------------------------------;
var fileNm = "Server/index.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//----------------------------------------------------------------------------------------------------;
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var cp = require( "child_process" );
var fs = require('fs');
var http = require('http');
var path = require('path');
var WebSocket = require('ws');

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;
// 정리해야함 ---- 생각나는데로 하고있음.....;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.server = {};
global.server.addRouter = function(a,b){ return global.ROUTER_LIST[ a ] = b; };

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.ROUTER_LIST = {};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

var CWD = global.process.cwd();
var server_port = 8889;

var ROUTER_DIRECTORY_PATH = CWD + "/js/";

//router등록을 한다.
(function(){
	var ROUTER_FILE_LIST = fs.readdirSync( ROUTER_DIRECTORY_PATH );
	var i =0,iLen = ROUTER_FILE_LIST.length,io;
	for(;i<iLen;++i){
		//라우터를 등록한다;
		eval( fs.readFileSync( ROUTER_DIRECTORY_PATH + ROUTER_FILE_LIST[ i ] ).toString() );
	}
})();
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// LOGIC;
//-------------------------------------------------------;

var getCookie = function(name) {      
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');     
	 return value? value[2] : null;  
  };


global.server = http.createServer(function(req, res){
	
    req.on('error', function( err ){
        console.error(err);
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', function( err ){ console.error(err); });

	//var routerNm = req.url.replace(/\//,"");
	var routerNm = req.url.split("?")[0];
	var uri = decodeURI( req.url.split("?")[0] );
	console.log(req.url)
	if (req.method == 'POST') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
			//console.log(JSON.parse(jsonString));
			res.statusCode = 200;
			global.ROUTER_LIST[ routerNm ]( req, res, JSON.parse(jsonString) );
        });
    }
	else if( global.ROUTER_LIST[ routerNm ] )
	{
		res.statusCode = 200;
		global.ROUTER_LIST[ routerNm ]( req, res );
	}
	else
	{
	
		//필요시 mime-type 추가함;
		var _oContentTypes = {
			".aac": "audio/aac",
			".abw": "application/x-abiword",
			".arc": "application/octet-stream",
			".avi": "video/x-msvideo",
			".azw": "application/vnd.amazon.ebook",
			".bin": "application/octet-stream",
			".bz": "application/x-bzip",
			".bz2": "application/x-bzip2",
			".csh": "application/x-csh",
			".css": "text/css",
			".csv": "text/csv",
			".doc": "application/msword",
			".epub": "application/epub+zip",
			".gif": "image/gif",
			".html": "text/html",
			".htm": "text/html",
			".ico": "image/x-icon",
			".ics": "text/calendar",
			".jar": "application/java-archive",
			".jpeg": "image/jpeg",
			".jpg": "image/jpeg",
			".js": "application/js",
			".json": "application/json",
			".midi": "audio/midi",
			".mid": "audio/midi",
			".mpeg": "video/mpeg",
			".mpkg": "application/vnd.apple.installer+xml",
			".odp": "application/vnd.oasis.opendocument.presentation",
			".ods": "application/vnd.oasis.opendocument.spreadsheet",
			".odt": "application/vnd.oasis.opendocument.text",
			".oga": "audio/ogg",
			".ogv": "video/ogg",
			".ogx": "application/ogg",
			".pdf": "application/pdf",
			".ppt": "application/vnd.ms-powerpoint",
			".rar": "application/x-rar-compressed",
			".rtf": "application/rtf",
			".sh": "application/x-sh",
			".svg": "image/svg+xml",
			".swf": "application/x-shockwave-flash",
			".tar": "application/x-tar",
			".tiff": "image/tiff",
			".tif": "image/tiff",
			".ttf": "application/x-font-ttf",
			".vsd": "application/vnd.visio",
			".wav": "audio/x-wav",
			".weba": "audio/webm",
			".webm": "video/webm",
			".webp": "image/webp",
			".woff": "application/x-font-woff",
			".xhtml": "application/xhtml+xml",
			".xls": "application/vnd.ms-excel",
			".xml": "application/xml",
			".xul": "application/vnd.mozilla.xul+xml",
			".zip": "application/zip",
		//    ".3gp": "video/3gpp\naudio/3gpp if it doesn't contain video",
		//    ".3g2": "video/3gpp2\naudio/3gpp2 if it doesn't contain video",
			".7z": "application/x-7z-compressed"
		}

		//라우터를 활용하는부분이지만 이서버는 html서빙망 하므로 사용하지않음;
		
		if( global.ROUTER_LIST[ routerNm ] )
		{
			res.statusCode = 200;
			return global.ROUTER_LIST[ routerNm ]( req, res );
		}
		
		console.log( "[S] - " +  req.url );
		var urlPath = req.url.split("?")[0];
		console.log( "urlPath = ", urlPath)
		if( urlPath == "/" )
		{
			var filePath = "./index.html"
		}
		else if( urlPath.indexOf( "/asset" ) != -1 ){
			console.log( "/asset === " , req.url.split("?")[0] )
			var filePath = '.' + req.url.split("?")[0].replace("/html","");
		}
		else if( urlPath.indexOf( "/page" ) != -1 ){
			console.log( 'req.url.split("?")[0] --->',req.url.split("?")[0] )
			var filePath = '.' + req.url.split("?")[0];

			var _page = req.url.split("?")[0].split("/")
			var page = _page[ _page.length - 1 ];
			console.log( 'page --->',page )

			var template = fs.readFileSync("./thtml/blank/blank.thtml").toString();
			var html = fs.readFileSync(`./thtml/${page}/${page}.thtml`).toString();
			var _t = template.replace("<!=HTML=!>",html)
					.replace(/<!=JS=!>/gi,page);
			res.end(_t, 'utf-8');
			return;
		}
		
		// else if( urlPath == "/favicon.ico" ){
		// 	//console.log( req.url.split("?")[0] )
			
		// 	var template = fs.readFileSync("./favicon.ico").toString();
		// 	res.end(template, 'utf-8');
		// 	return;
		// }
		else
		{
			var filePath = '.' + uri;
		}

		console.log( req.url );
		
		var extname = path.extname(filePath);
		console.log( "extname = ",extname );
		console.log( "filePath = ",filePath );
		var contentType = _oContentTypes[ extname ];

		res.writeHead(200, { 'Content-Type': contentType + ';charset=UTF-8' });		
		
		fs.readFile(filePath, function(error, content) {
			if(error)
			{
				console.log( "error = ",error )
				if(error.code == 'ENOENT')
				{
					res.statusCode = 404;
					console.log( "   [err] - res.statusCode " +  res.statusCode );
					console.log( "   [err] - " +  req.url );
					console.log( "[E] - " +  req.url );
					res.end('404: File Not Found - 테스트중입니다.');
				}
				else
				{
					res.writeHead(500);
					console.log( "   [err] - res.statusCode " +  res.statusCode );
					console.log( "   [err] - " +  req.url );
					console.log( "[E] - " +  req.url );çççç
					res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
					res.end(); 
				}
			}
			else
			{
				console.log( "[E] - " +  req.url );
				res.end(content, 'utf-8');

			}
		});
	}
	return;

})

//소켓으로 전송된 내용을 실행한다.
global.wsFuncs = {};
global.wsFuncs.checksession = async function( sid ){
	//test checkSession;
	
	try {
		var c = await (await fetch('http://localhost:8888/checksession?sid=' + sid )).text()
		console.log( c )
		return c;
	} catch (e) {
		//return e;
		return e;
	}    
}
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//웹소켓연결부분;

global.wss = new WebSocket.Server({ server : global.server });
global.ws = {};
global.ws.clients = {};
global.wss.on('connection', function connection( ws ) {

	ws.on('message', async function incoming( message ){
		
		console.log('received: %s', message);
		console.log( typeof message );

		var a = JSON.parse( message );
		if( a.type == "func" )
		{
			var r = await global.wsFuncs[a.nm]( a.param );
			ws.send(r,{ binary : true });

		}
	});
	ws.on('close', function close() {
		console.log('disconnected SOCKET - PORT : 8889');
	});
	//var r = {	type : "connection", data : id };
	//global.ws.send( JSON.stringify( r ) );

	// ws.interval = setInterval(() => {
	// 	//! 웹소켓은 비동기이기 때문에 삑 날 수 있어, 웹소켓이 클라이언트랑 연결이 되었는지 검사하는 안전 장치
	// 	if (ws.readyState !== ws.OPEN) {
	// 		return;
	// 	}

	// 	ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
	// }, 3000);

});
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;



global.server.listen( server_port );

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//----------------------------------------------------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//----------------------------------------------------------------------------------------------------;