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
		http://localhost:8889/html/test.html
	* </code>
	*/
	global.server.addRouter("/api/addUserInfo",function( req, res, data ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		console.log( "====>",data );
		var paramsBody = data;
		console.log( paramsBody )
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		

		// var _d = { email : data.email, pass : data.pass }
		console.log("-----")
		var option = {
			host: 'localhost',
			port: '8888',
			path: '/addUserInfo',
			method: 'POST',
			headers: {
				"content-type": "application/json",
				//"Content-Length": Buffer.byteLength(post_data)
			}
		};

		httpPostCallback( option, paramsBody, function(d){


			var r = JSON.parse( d );
			console.log( "_d.success ==>", r.success )
			if( r.success ) res.end( d );
			else
			{
				console.log( "====>", r );
				//res.setHeader('Set-Cookie', 'sid=' + r.sid + "; max-age=" + 3600 + "; path=/;" );
				//res.statusCode = 301;
				//res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
				res.end( d );	
			}
			
		})

		
	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
