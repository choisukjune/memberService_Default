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
			console.log( "====>", _d );
			res.setHeader('Set-Cookie', 'sid=' + _d.sid + "; max-age=" + 3600 + "; path=/;" );
			//res.statusCode = 301;
			//res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
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
		console.log( data )
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		

		//var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		httpGetCallback( "join?user=1&pass=2", function(d){
			res.setHeader('Set-Cookie', 'sid=' + d + "; max-age=" + 3600 + "; path=/;" );
			res.statusCode = 301;
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
				res.writeHead(301, {'Location': '/'});
				res.end();
			})
		})
		// res.statusCode = 200;
		// res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		// res.setHeader( "Access-Control-Allow-Origin", "*" );
		// res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		//console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		// try
		// {
		// 	var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		// }
		// catch( err )
		// {
		// 	console.log( routerNm + " - DBJS File Not Found! - " + err );
		// 	res.end("{ sucess : 0, data : null }");
		// }
		
		// var query = _tQuery
		// var dbjs_nm = "insert.dbjs";

		// var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		// console.log( FILE_PATH )

		// fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		// var r = exec_query_DB( dbjs_nm )
		// var r = "OK"
		// res.end( r )	

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
		// var routerNm = req.url.split("?")[0];
		// var paramsO = paramToObject( req.url );
		// var _tdbjs_nm = "insert";
				
		// http://localhost:8889/api/oauth/naver/callback
		// access_token=AAAANIakoru1eaMtUztkh1sZxkWI25DJcMxlTl7nuPaPi7zDc5JlC5qs_kMUTl3yWdD7LS2pdVCJ_U81LCQ0IkT688c&state=740b5e9c-e505-4c8e-8952-e508124ea695
		// token_type=bearer&expires_in=3600

		// code = req.query.code;
		// state = req.query.state;
		// api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
		//  + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
		// var request = require('request');
		// var options = {
		// 	url: api_url,
		// 	headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
		//  };
		// request.get(options, function (error, response, body) {
		//   if (!error && response.statusCode == 200) {
		// 	res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
		// 	res.end(body);
		//   } else {
		// 	res.status(response.statusCode).end();
		// 	console.log('error = ' + response.statusCode);
		//   }
		// });

		// res.statusCode = 200;
		// res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		// res.setHeader( "Access-Control-Allow-Origin", "*" );
		// res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		//console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		// try
		// {
		// 	var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		// }
		// catch( err )
		// {
		// 	console.log( routerNm + " - DBJS File Not Found! - " + err );
		// 	res.end("{ sucess : 0, data : null }");
		// }
		
		// var query = _tQuery
		// var dbjs_nm = "insert.dbjs";

		// var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		// console.log( FILE_PATH )

		// fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		// var r = exec_query_DB( dbjs_nm )
		// var r = "OK"
		// res.end( r )	

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
