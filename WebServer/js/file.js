//-------------------------------------------------------;
var fileNm = "js/html.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//-------------------------------------------------------;
(function(){
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var fs = require( "fs" );
var url = require('url');
var http = require('http');
var querystring = require('querystring');
var https = require('https');

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;




var ROOT_PATH = process.cwd();

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

/*
 * @function
 * @param {String} url
 * @return {Object} o
 */
var paramToObject = function( _url ){
	var queryData = url.parse( _url, true).query;
	return queryData;
};

var httpGetCallback = function( url, cbFunction ){
	var host = "http://localhost:8888/"
	http.get( host + url, function(response){
		response.setEncoding('utf8');
		var d = "";
		response.on('end', function () {
			cbFunction(d);
		});
	
		response.on('data', function (body) {
			d += body;
		});
	});
}

function httpPostCallback(option,data, cbFunction ) {
	// Build the post string from an object
	//var post_data = querystring.stringify( data );
	var post_data = JSON.stringify( data );
	console.log( post_data)
	// An object of options to indicate where to post to
	/* 
	var option = {
		host: 'localhost',
		port: '8888',
		path: '/join',
		method: 'POST',
		headers: {
			"content-type": "application/json",
			"Content-Length": Buffer.byteLength(post_data)
		}
	};
	*/

	// Set up the request
	var req = http.request(option, function(res){

		res.setEncoding('utf8');

		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
			console.log('Response: ' + chunk);
		});
		res.on('end', function () {
			//var data = global.api.String.convert_encoding__KR( chunks, characterSet );
			console.log( data )
			cbFunction( data );
		});
	});

	req.on('error', function(e){
		console.log(`problem with request: ${e}`);
	});

	// post the data
	req.write(post_data);
	req.end();
}

var memberJoin = function( data, cbFunction ){
	var post_data = JSON.stringify( data );
	console.log( post_data)
	// An object of options to indicate where to post to
	
	var option = {
		host: 'localhost',
		port: '8888',
		path: '/join',
		method: 'POST',
		headers: {
			"content-type": "application/json",
			"Content-Length": Buffer.byteLength(post_data)
		}
	};


	// Set up the request
	var req = http.request(option, function(res){

		res.setEncoding('utf8');

		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
			console.log('Response: ' + chunk);
		});
		res.on('end', function () {
			//var data = global.api.String.convert_encoding__KR( chunks, characterSet );
			console.log( data )
			cbFunction( data );
		});
	});

	req.on('error', function(e){
		console.log(`problem with request: ${e}`);
	});

	// post the data
	req.write(post_data);
	req.end();
}

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// ROUTER;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8889/html/test.html
	* </code>
	*/
	global.server.addRouter("/api/login",function( req, res, data ){

		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
		console.log( data )
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		

		//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		var option = {
			host: 'localhost',
			port: '8888',
			path: '/login',
			method: 'POST',
			headers: {
				"content-type": "application/json",
				//"Content-Length": Buffer.byteLength(post_data)
			}
		};
		
		//var _d = { email : "12k4@naver.com", pass : "123qwe"}
		var _d = { email : data.email, pass : data.pass }

		httpPostCallback( option, _d, function(d){

			
			var _d = JSON.parse( d );
			console.log( "====>",_d.d.sid );
			
			if( !_d.success ) 
			{
				res.setHeader('Set-Cookie', 'sid=' + _d.d.sid + "; max-age=" + 3600 + "; path=/;" );
			}
			res.end( d );
		})

		
	});
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8889/html/test.html
	* </code>
	*/
	/*
	
		$.ajax({
			type: "POST",
			url: "/facedata",
			data: { 
				imgBase64: dataURL
			}
		}).done(function(o) {
				console.log('saved'); 

			});

	    router.post('/facedata', function(req, res) {
        var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(<path-to-file>.png, base64Data, 'base64', function(err) {
            if(err){
               console.log(err);
             }
        });
	
	*/
	global.server.addRouter("/api/uploadFile",function( req, res, data ){
		
		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
		console.log( "POST data = ", data );
		var paramBody = data;

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );

		console.log(paramBody);
		
        var base64Data = paramBody.data.replace(/^data:image\/\w+;base64,/, "");
		var fileNm = Date.now()
        fs.writeFile( "./images/" + fileNm + "_" + paramBody.fileNm, base64Data, 'base64', async function(err) {
            if(err){
               console.log(err);
             }
			console.log("-----")
			var option = {
				host: 'localhost',
				port: '8888',
				path: '/uploadFile',
				method: 'POST',
				headers: {
					//"content-type": "application/json",
					//"Content-Length": Buffer.byteLength(post_data)
				}
			};
			var _d = { fileNm : fileNm + "_" + paramBody.fileNm }
			httpPostCallback( option, _d, function(d){
	
	
				var r = JSON.parse( d );
				console.log( "_d.success ==>", r.success )
				if( r.success ) res.end( d );
				else
				{
					console.log( "====>", r );
					// res.setHeader('Set-Cookie', 'sid=' + r.sid + "; max-age=" + 3600 + "; path=/;" );
					//res.statusCode = 301;
					//res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
					res.end( d );	
				}
				
			})
			
		})
		
	});
	
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
