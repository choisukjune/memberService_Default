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


	// const { default: axios } = require("axios");
	// const express = require("express");
	// const url = require("url");
	
	// require("dotenv").config();
	
	// const app = express();
	// const PORT = 3000;
	
	// express에서 정적 파일 사용하기
	// https://expressjs.com/ko/starter/static-files.html
	// app.use(express.static("public"));
	
	// NOTE process.env는 dotenv라이브러리 사용


	// const CLIENT_ID = process.env.CLIENT_ID;
	// const CLIENT_SECRET = process.env.CLIENT_SECRET;
	// const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";
	// const REDIRECT_URL = "http://localhost:3000/oauth2/redirect";
	// const RESPONSE_TYPE = "code";
	// const SCOPE = "openid%20profile%20email";
	// const ACCESS_TYPE = "offline";
	// const OAUTH_URL = `${AUTHORIZE_URI}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URL}&scope=${SCOPE}&access_type=${ACCESS_TYPE}`;
	
	const getCode = async () => {

	}
	
	// app.get("/oauth2/redirect", (req, res) => {
	// 	const query = url.parse(req.url, true).query;
	// 	if (query && query.code) {
	// 	  oauth2Api(query.code);
	// 	}
	// 	res.send("");
	//   });


	// const getToken = async (code) => {
	//   try {
	// 	const tokenApi = await axios.post(
	// 	  `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&grant_type=authorization_code`
	// 	);
	// 	const accessToken = tokenApi.data.access_token;
	
	// 	return accessToken;
	//   } catch (err) {
	// 	return err;
	//   }
	// };
	
	// const getUserInfo = async (accessToken) => {
	//   try {
	// 	const userInfoApi = await axios.get(
	// 	  `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
	// 	  {
	// 		headers: {
	// 		  authorization: `Bearer ${accessToken}`,
	// 		},
	// 	  }
	// 	);
	// 	return userInfoApi;
	//   } catch (err) {
	// 	return err;
	//   }
	// };
	
	// const oauth2Api = async (code) => {
	//   const accessToken = await getToken(code);
	//   // NOTE 사용자 정보를 콘솔로 확인
	//   console.log(await getUserInfo(accessToken));
	// };
	
	// NOTE 버튼 클릭시 구글 로그인 화면으로 이동
	// app.get("/auth/google", (req, res) => {
	//   res.redirect(OAUTH_URL);
	// });
	
	// NOTE 설정한 리다이렉트 페이지로 이동시 처리할 로직
	// app.get("/oauth2/redirect", (req, res) => {
	//   const query = url.parse(req.url, true).query;
	//   if (query && query.code) {
	// 	oauth2Api(query.code);
	//   }
	//   res.send("");
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
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	var googleGetAccessToken = async function( params, cbFunction ){

		var client_id = '144090840805-v8tngl71gvd3uudbsjeusrf7mha5pumn.apps.googleusercontent.com';
		var client_secret = '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';
		var code = params.code;
    	var state = params.state;
		var redirectURI = encodeURI("http://localhost:8889/api/oauth/google/callback");
    	
		//`https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&grant_type=authorization_code`
	

		const baseUrl = "https://oauth2.googleapis.com/token";
		const config = {
		  client_id: client_id,
		  client_secret: client_secret,
		  grant_type: "authorization_code",
		  redirect_uri: redirectURI,
		  code: code,
		};
		var _params = new URLSearchParams(config).toString();
		var finalUrl = `${baseUrl}?${_params}`;
		var googleTokenRequest = await fetch(finalUrl, {
		  method: "POST",
		  headers: {
			"Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
		  },
		});
		const json = await googleTokenRequest.json();
		console.log(json);
		//json.data.access_token
		return json.access_token;

	}

	var googleGetUserInfo = async function( access_token, cbFunction ){

		var userRequest = await fetch("https://www.googleapis.com/oauth2/v2/userinfo?alt=json", {
			headers: {
			  Authorization: `Bearer ${access_token}`,
			  "Content-type": "application/json",
			},
		  })
		  const json = await userRequest.json();
		  console.log(json);
		  return json;
	}
	
	global.server.addRouter("/api/oauth/google/callback",async function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		// var _tdbjs_nm = "insert";

		var code = paramsO.code;
    	var state = paramsO.state;
		
		/*
		//get access_token;
		{
			access_token: 'ya29.a0AfB_byDAGjWvEoFs3LrgrkQ-DhIsBBri0ZM3tjD2Ng0AG3aIegOoNvdc5b_itmDUURl6PnMiP2_y0ijRADrKIAhxoczNchhxHd_1TER34nx03gSBCKaK44JToTBw1DL0I2x-Iu4u_dHnBPzF0iNaW5M8nmpHF90fvFXUaCgYKAZkSARMSFQHGX2MiqifOCFOdC4_JRviQIz2sdA0171',
			expires_in: 3599,
			scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
			token_type: 'Bearer',
			id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOTc3N2E2ODU5MDc3OThlZjc5NDA2MmMwMGI2NWQ2NmMyNDBiMWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxNDQwOTA4NDA4MDUtdjh0bmdsNzFndmQzdXVkYnNqZXVzcmY3bWhhNXB1bW4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNDQwOTA4NDA4MDUtdjh0bmdsNzFndmQzdXVkYnNqZXVzcmY3bWhhNXB1bW4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ1MjE5OTM2NDEzMzY4MzUxMDMiLCJlbWFpbCI6InN1a2p1bmUuY2hvaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjJscWdWQUpPaFVtczdabWNDNlFJUmciLCJuYW1lIjoic3VrIGp1bmUgQ2hvaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLcjdoTGxteXZjSHZZVXozczE1VGdmeWdBRV9Tb1c3S3VSZ0JFUldLRm1LNW89czk2LWMiLCJnaXZlbl9uYW1lIjoic3VrIGp1bmUiLCJmYW1pbHlfbmFtZSI6IkNob2kiLCJsb2NhbGUiOiJrbyIsImlhdCI6MTcwOTU0MzcxNywiZXhwIjoxNzA5NTQ3MzE3fQ.EkQv7y7WINNAx00MA8o2CTJQnMSQj-Qs3a1s6CKRn9uSABagTwLr6QhcG8wJddx4QBSS0yZXvJi8JZbY0B2Kdg65zEoTIirL3EgEjxXPsgfXsEagnLFCscY8znYkLXsJV0O5jzbcEc0NOHuyMLE5U3ylNI5-hhdi3SCbFRl8XRRKICncRzJL8EQkSj_O9IsQMOMBdjWj2KOxn83FbBA3-KsZiCirL6JNuUhA9oyc7-g8uYO4P1Rdyn6qoqspGfUPQE_Zxun5y8fOg6OC8ev5aoqOuOOkRGrmoP0dQitjVTDxdrSzXCs4xlf6GCncsQNFgjy4XFNCK2_NtbxiQ4fNyg'
		}
		//userInfo;
		{
			id: '114521993641336835103',
			email: 'sukjune.choi@gmail.com',
			verified_email: true,
			name: 'suk june Choi',
			given_name: 'suk june',
			family_name: 'Choi',
			picture: 'https://lh3.googleusercontent.com/a/ACg8ocKr7hLlmyvcHvYUz3s15TgfygAE_SoW7KuRgBERWKFmK5o=s96-c',
			locale: 'ko'
		}
		*/

		//get Access Token;
		var a = await googleGetAccessToken({ code : code, state : state })
		console.log( a );
		
		//get UserInfo;
		var b = await googleGetUserInfo( a );
		console.log( b );

		console.log( "google sso sucesss!" );
		
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
			var c = await fetch('http://localhost:8888/googleLogin', options )
			const data = await c.json();
			console.log( data )
			//res.end( JSON.stringify(data) );
			// api 서버 디비등록하고 세션발급하는 로직 생성후 만들기;
				res.setHeader('Set-Cookie', 'sid=' + data.sid + "; max-age=" + 3600 + "; path=/;" );
				res.writeHead(301, {'Location': '/'});
				res.end(d);
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
	global.server.addRouter("/api/oauth/google",function( req, res ){

		var GOOGLE_CLIENT_ID = '144090840805-v8tngl71gvd3uudbsjeusrf7mha5pumn.apps.googleusercontent.com';
		var GOOGLE_SECRET = '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';
		var GOOGLE_REDIRECT_URI = encodeURI("http://localhost:8889/api/oauth/google/callback");

		let url = 'https://accounts.google.com/o/oauth2/v2/auth';
		// client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음
		// 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함.
		url += `?client_id=${GOOGLE_CLIENT_ID}`
		// 아까 등록한 redirect_uri
		// 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
		url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`
		// 필수 옵션.
		url += '&response_type=code'
		  // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
		url += '&scope=email profile'    

		var state = "RANDOM_STATE";
		
		res.writeHead(301, {'Location': url});
		res.end()

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
