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
		console.log(1)
		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
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
		//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		// httpGetCallback( "getUerInfoBySession?sid=" + paramsO.sid, function(d){
		// 	// res.setHeader('Set-Cookie', 'sid=' + d + "; max-age=" + 3600 + "; path=/;" );
		// 	// res.statusCode = 301;
		// 	res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		// 	res.end( d );
		// })

		
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
	var kakaoGetAccessToken = async function( params, cbFunction ){

		var client_id = 'b801a7fdeca26fbc4c1d690d911ca0b0';
		var client_secret = 'tCVZvUx2JGENA8p7aUw43ZvIpRsn66HQ';
		var code = params.code;
    	var state = params.state;
		var redirectURI = encodeURI("http://localhost:8889/api/oauth/kakao/callback");
    	
		const baseUrl = "https://kauth.kakao.com/oauth/token";
		const config = {
		  client_id: client_id,
		  client_secret: client_secret,
		  grant_type: "authorization_code",
		  redirect_uri: redirectURI,
		  code: code,
		};
		var _params = new URLSearchParams(config).toString();
		var finalUrl = `${baseUrl}?${_params}`;
		var kakaoTokenRequest = await fetch(finalUrl, {
		  method: "POST",
		  headers: {
			"Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
		  },
		});
		const json = await kakaoTokenRequest.json();
		console.log(json);
		return json;

	}

	var kakaoGetUserInfo = async function( access_token, cbFunction ){

		var userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
			headers: {
			  Authorization: `Bearer ${access_token}`,
			  "Content-type": "application/json",
			},
		  })
		  const json = await userRequest.json();
		  console.log(json);
		  return json;
	}
	
	global.server.addRouter("/api/oauth/kakao/callback",async function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		// var _tdbjs_nm = "insert";

		var code = paramsO.code;
    	var state = paramsO.state;
		
		/*
		//get access_token;
		{
			access_token: 'uOFuNp7-dHGfhEXoJtV3W_lG1mXapujr3yoKPXPrAAABjghvw51APV-WDrAHcw',
			token_type: 'bearer',
			refresh_token: 'kBU22C656-WjGw68wa0dUmMwkiufIOBUiwkKPXPrAAABjghvw5pAPV-WDrAHcw',
			expires_in: 21599,
			scope: 'profile_image profile_nickname',
			refresh_token_expires_in: 5183999
		}
		//userInfo;
		{
			id: 3373811719,
			connected_at: '2024-03-04T07:36:24Z',
			properties: {
				nickname: '최석준',
				profile_image: 'http://k.kakaocdn.net/dn/E0dO4/btssgJED9lM/8QUudZT0N0jd3XIkePsUw0/img_640x640.jpg',
				thumbnail_image: 'http://k.kakaocdn.net/dn/E0dO4/btssgJED9lM/8QUudZT0N0jd3XIkePsUw0/img_110x110.jpg'
			},
			kakao_account: {
				profile_nickname_needs_agreement: false,
				profile_image_needs_agreement: false,
				profile: {
					nickname: '최석준',
					thumbnail_image_url: 'http://k.kakaocdn.net/dn/E0dO4/btssgJED9lM/8QUudZT0N0jd3XIkePsUw0/img_110x110.jpg',
					profile_image_url: 'http://k.kakaocdn.net/dn/E0dO4/btssgJED9lM/8QUudZT0N0jd3XIkePsUw0/img_640x640.jpg',
					is_default_image: false
				}
			}
		}
		*/

		//get Access Token;
		var a = await kakaoGetAccessToken({ code : code, state : state })
		console.log( a );
		
		//get UserInfo;
		var b = await kakaoGetUserInfo(a.access_token);
		console.log( b );

		console.log( "kakao sso sucesss!" );
		
		// res.end(JSON.stringify(b));
		
		var options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( b )

		};
		
		try {
			var c = await fetch('http://localhost:8888/kakaoLogin', options )
			const data = await c.json();
			res.end( JSON.stringify(data) );
			//  api 서버 디비등록하고 세션발급하는 로직 생성후 만들기;
			// 	res.setHeader('Set-Cookie', 'sid=' + _d.sid + "; max-age=" + 3600 + "; path=/;" );
			// 	res.writeHead(301, {'Location': '/'});
			// 	res.end(d);
			//return data;
		} catch (e) {
			//return e;
			res.end( JSON.stringify(e) );
		}    

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
	global.server.addRouter("/api/oauth/kakao",function( req, res ){

		var client_id = 'b801a7fdeca26fbc4c1d690d911ca0b0';
		var client_secret = 'tCVZvUx2JGENA8p7aUw43ZvIpRsn66HQ';

		var state = "RANDOM_STATE";
		var redirectURI = encodeURI("http://localhost:8889/api/oauth/kakao/callback");
		var api_url = "";
		  api_url = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
		   res.writeHead(301, {'Location': api_url});
		   //res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
		   res.end()

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
