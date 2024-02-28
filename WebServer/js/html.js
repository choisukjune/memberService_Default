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
	global.server.addRouter("/getHtml",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );

		var tHtml = fs.readFileSync("./thtml/" + paramsO.fileNm + "/" + paramsO.fileNm + ".thtml" ).toString();

		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		res.end( tHtml );
		
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
	global.server.addRouter("/getJs",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );

		var js = fs.readFileSync("./thtml/" + paramsO.fileNm + "/" + paramsO.fileNm + ".js" ).toString();

		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		res.end( js );
		
	});
	
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
