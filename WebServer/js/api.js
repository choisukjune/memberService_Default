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
	global.server.addRouter("/api/join",function( req, res, data ){
		
		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
		console.log( "POST data = ", data );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		var _d = { email : data.email, pass : data.pass }
		console.log("-----")
		var option = {
			host: 'localhost',
			port: '8888',
			path: '/join',
			method: 'POST',
			headers: {
				"content-type": "application/json",
				//"Content-Length": Buffer.byteLength(post_data)
			}
		};

		httpPostCallback( option, _d, function(d){


			var r = JSON.parse( d );
			console.log( "_d.success ==>", r.success )
			if( r.success ) res.end( d );
			else
			{
				console.log( "====>", r );
				res.setHeader('Set-Cookie', 'sid=' + r.sid + "; max-age=" + 3600 + "; path=/;" );
				//res.statusCode = 301;
				//res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
				res.end( d );	
			}
			
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
	global.server.addRouter("/api/existEmail",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		//console.log( data )


		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		

		//var _d = { email : "12k4@naver.com", pass : "123qwe"}
		//var _d = { email : data.email, pass : data.pass }

		var url = "existEmail?email=" + paramsO.email

		httpGetCallback( url, function(d){
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
	global.server.addRouter("/api/getUerInfoBySession",function( req, res, data ){
		console.log("[S] - /api/getUerInfoBySession");
		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );

		var paramsO = paramToObject( req.url );
		 var paramBody = JSON.parse( data )
		// console.log( paramsO )
		// var a = req.headers.cookie.split(";");
		// var cookieObject = {}
		// var i=0,iLen=a.length,io;
		// for(;i<iLen;++i){

		// 	io = a[ i ].trim();
		// 	var _t = io.split( "=" );

		// 	var key = _t.shift();
		// 	cookieObject[ key ] = io.replace(key+"=","");

		// }

		// console.log( cookieObject );

		
		var paramBody = data
		console.log( "paramBody", paramBody )
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log(1)
		//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		var option = {
			host: 'localhost',
			port: '8888',
			path: '/getUerInfoBySession',
			method: 'POST',
			headers: {
				"content-type": "application/json",
				//"Content-Length": Buffer.byteLength(post_data)
			}
		};
		console.log(1)
		//var _d = { email : "12k4@naver.com", pass : "123qwe"}
		var _d = { sid : paramBody.sid }

		httpPostCallback( option, _d, function(d){

			var _d = JSON.parse( d );
			
			if( !_d.r ) 
			{
				console.log("---1")
					//res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
					res.end( d );
			}
			else
			{
				console.log("---2")
				//res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
				res.end(d);
			}
			
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
	global.server.addRouter("/api/checksession",function( req, res, data ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		console.log( data )
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		

		//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		httpGetCallback( "checksession?sid=" + paramsO.sid, function(d){
			// res.setHeader('Set-Cookie', 'sid=' + d + "; max-age=" + 3600 + "; path=/;" );
			// res.statusCode = 301;
			res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
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
	// global.server.addRouter("/api/renderTHTML",function( req, res, data ){

	// 	var routerNm = req.url.split("?")[0];
	// 	var paramsO = paramToObject( req.url );
	// 	console.log( data )
	// 	res.statusCode = 200;
	// 	res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
	// 	res.setHeader( "Access-Control-Allow-Origin", "*" );
	// 	res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
	// ZZZZ
	// 		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
	// 		res.end( d );
	// 	})

		
	// });
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
	global.server.addRouter("/api/deletesession",function( req, res, data ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		console.log( data )
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		

		//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		httpGetCallback( "deletesession?sid=" + paramsO.sid, function(d){
			// res.setHeader('Set-Cookie', 'sid=' + d + "; max-age=" + 3600 + "; path=/;" );
			// res.statusCode = 301;
			res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
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
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	var naverGetAccessToken = function( params, cbFunction ){

		var client_id = 'M8iKRLr_1Ld0T3nVxeV_';
		var client_secret = 'fiKA87hc1K';
		var code = params.code;
    	var state = params.state;
		var redirectURI = encodeURI("http://localhost:8889/api/oauth/naver/callback");
    	

		var options = {
			hostname: 'nid.naver.com',
			path: '/oauth2.0/token?grant_type=authorization_code&client_id=' + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state,
			headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
		}
		
		https.get(options, (response) => {
		
			var result = ''
			response.on('data', function (chunk) {
				result += chunk;
			});
		
			response.on('end', function () {

				var _d = JSON.parse( result );
				cbFunction( _d );
				

			});
		
		});

	}

	var naverGetUserInfo = function( d, cbFunction ){

		var header = "Bearer " + d.access_token; // Bearer 다음에 공백 추가

		var options = {
			hostname: 'openapi.naver.com',
			path: '/v1/nid/me',
			headers: {'Authorization': header}
		}

		https.get(options, (response) => {

			var result = ''
			response.on('data', function (chunk) {
				result += chunk;
			});
		
			response.on('end', function () {
				// res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
				// res.end(result);
				cbFunction( result );
			});
		
		});
	}
	
	global.server.addRouter("/api/oauth/naver/callback",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		// var _tdbjs_nm = "insert";

		var code = paramsO.code;
    	var state = paramsO.state;
		
		/*
		{
			"resultcode": "00",
			"message": "success",
			"response": {
				"id": "gdSLm7IG5uoC9w3X1WAhLWwnL1jA98fnmoO8p--WodM",
				"nickname": "최석준",
				"profile_image": "https://phinf.pstatic.net/contact/20231115_39/17000369280735pXRv_PNG/02_icon.png",
				"email": "jun@b2link.co.kr",
				"mobile": "010-6863-6311",
				"mobile_e164": "+821068636311",
				"name": "최석준"
			}
		}
		*/
		naverGetAccessToken({ code : code, state : state }, function(d){
			naverGetUserInfo(d, function(r){

				console.log( "naver sso sucesss!" );
				console.log( r );
				var _d = JSON.parse( r );
				//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
				var option = {
					host: 'localhost',
					port: '8888',
					path: '/naverLogin',
					method: 'POST',
					headers: {
						"content-type": "application/json",
						//"Content-Length": Buffer.byteLength(post_data)
					}
				};
				
				// //var _d = { email : "12k4@naver.com", pass : "123qwe"}
				//var _d = { email : _d.response.email, pass : null }

				httpPostCallback( option, _d.response, function(d){

					/*/
					res.writeHead(301, {'Location': '/'});
					res.end();
					/*/
					console.log("------------")
					console.log(d)
					var _d = JSON.parse( d );
					console.log( "====>", _d );
					res.setHeader('Set-Cookie', 'sid=' + _d.sid + "; max-age=" + 3600 + "; path=/;" );
					res.writeHead(301, {'Location': '/'});
					//res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
					res.end(d);
					//*/
				
				})

				
			})
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
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/api/oauth/naver",function( req, res ){

		var client_id = 'M8iKRLr_1Ld0T3nVxeV_';
		var client_secret = 'fiKA87hc1K';

		var state = "RANDOM_STATE";
		var redirectURI = encodeURI("http://localhost:8889/api/oauth/naver/callback");
		var api_url = "";
		  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
		   res.writeHead(301, {'Location': 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=M8iKRLr_1Ld0T3nVxeV_&redirect_uri=http://localhost:8889/api/oauth/naver/callback&state=RANDOM_STATE'});
		   //res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
		   res.end()

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
