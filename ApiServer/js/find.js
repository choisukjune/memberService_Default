//-------------------------------------------------------;
var fileNm = "js/find.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//-------------------------------------------------------;
(function(){
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var fs = require( "fs" );
var url = require('url');
var crypto = require("crypto");
var util = require("util");
var querystring = require('querystring');



//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://12k4:tjrwns2482%21%40@cluster0.suwebz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;


//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;
/*
Client ID
M8iKRLr_1Ld0T3nVxeV_
Client Secret
fiKA87hc1K
*/
var ROOT_PATH = process.cwd();

//mongosh command 
//mongosh "mongodb+srv://12k4:tjrwns2482%21%40@cluster0.suwebz6.mongodb.net/Cluster0"

var CP_COMMAND = {};
	//CP_COMMAND.MONGO = "..\\Binary\\Mongodb\\mongodb-win32-x86_64-windows-4.4.3\\bin\\mongo";
	CP_COMMAND.MONGO = "mongosh";

var DBJS_DIRECTORY_PATH = ROOT_PATH + "/dbjs/";
var _tDbjs_PATH = ROOT_PATH + "/tdbjs/";

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

var getUerInfoBySession = async function( sid, cbFunction ){
		
	
	console.log( "-------------------------" );
	console.log( "-------------------------" );
	console.log( "--- sid ---  " + sid  )
	console.log( "-------------------------" );
	console.log( "-------------------------" );

	try
	{

		await client.connect();
		// Get the database and collection on which to run the operation
		const db = client.db("data");
		const col0 = db.collection("session");
		const col1 = db.collection("memberInfo");
		// Query for a movie that has the title 'The Room'
		const _q = { 
			sid : sid 
		};
		
		// const options = {
		//   // Sort matched documents in descending order by rating
		//   sort: { "imdb.rating": -1 },
		//   // Include only the `title` and `imdb` fields in the returned document
		//   projection: { _id: 0, title: 1, imdb: 1 },
		// };

		var options = {};
		
		// Execute query
		const r = await col0.findOne(_q, options);
		

		if( !r )
		{
			return "{ \"sucess\" : 1 }";
		}
		else
		{
			console.log( r.userId );
			const userInfo = await col1.findOne({ userId : r.userId });

			return userInfo;
		}

		
		
	}
	finally
	{
		await client.close();
	}
	
	  
}


var randomBytesPromise = util.promisify(crypto.randomBytes);
var pbkdf2Promise = util.promisify(crypto.pbkdf2);

/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var createSalt = async () => {
  const buf = await randomBytesPromise(64);

  return buf.toString("base64");
};
/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var createHashedPassword = async (password, cbFunction) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("base64");
  cbFunction({ hashedPassword, salt }) ;
};
/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
const verifyPassword = async (password, userSalt, userPassword, cbFunction ) => {
	const key = await pbkdf2Promise(password, userSalt, 104906, 64, "sha512");
	const hashedPassword = key.toString("base64");
  	
	console.log("password : ", password)
	console.log("userPassword:", userPassword)
	console.log("hashedPassword:", hashedPassword)
	
	var r = false
	if (hashedPassword === userPassword)
	{
		console.log(true);
		r = true;
	}
	else
	{
		console.log(false);
		r = false;
	}
	cbFunction( r )
  };

/*
var _a = {
	hashedPassword:'JHGDnmlx5bzBn2jjgqQddRq5xwErkd3KVXoZT80Y31Xd5X8xknjP55waKCU5/HhfuCZJT175kqAJLtKrNzuqAw==',
	salt:'u4EniTRCUVZsSjG0SgGEqYJ8gHCqUUMU9Y7y3gonBMeaswlyGXZIubVBhc5yOT3oibyWpfxToS9Cbo63PD4r+w=='
}
verifyPassword("1234",_a.salt,_a.hashedPassword)
*/
//createHashedPassword("1234", function(d){console.log(d);})
/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var exec_query_DB = function( dbjsNm, bResult ){

	var DBJS_NM = dbjsNm;
	var FILE_PATH = ROOT_PATH + "/dbjs/" + DBJS_NM;

	/*
	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin \"<!=FILE_PATH=!>\"";
	if( bResult ) _t_command = _t_command + " > " + dbjsNm + "__" + Date.now() + ".result";
	
	var command = _t_command.replace( "<!=ID=!>", global.CONST.MongoDB.OPTIONS.self.ID )
		.replace( "<!=PWD=!>", global.CONST.MongoDB.OPTIONS.self.PWD )
		.replace( "<!=HOST=!>", global.CONST.MongoDB.OPTIONS.self.HOST )
		.replace( "<!=PORT=!>", global.CONST.MongoDB.OPTIONS.self.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );
	*/

	var command = CP_COMMAND.MONGO + ` "mongodb+srv://12k4:tjrwns2482%21%40@cluster0.suwebz6.mongodb.net/Cluster0&readPreference=secondary" ${FILE_PATH}`
	//mongosh --host localhost --port 59320 --username tjrwns --password 123qweasdzxc --authenticationDatabase admin --file insert.js
	//var command = CP_COMMAND.MONGO + ` --port 59320 -u tjrwns -p 123qweasdzxc --authenticationDatabase admin ${FILE_PATH}`
	console.log( command )
	var r = cp.execSync( command ).toString();
		//r = deleteLines( r , 8 )
	return r;
};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
/*
 * @function
 * @param {String} str
 * @param {Number} n
 * @return {String} str
 */
var deleteLines = function( str, n ){
	var i = 0,iLen = n,io;
	for(;i<iLen;++i){ str = str.slice(str.indexOf("\n") + 1, str.length ); }
	//]]str = str.replace( /\t/g, '' );
	//str = str.replace( /\r\n/g, '' );
	return str;
};
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

/**
*  SID를 생성하기 위한 문자열 인코딩 함수
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
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
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/find",function( req, res ){

		// var routerNm = req.url.split("?")[0];
		// var paramsO = paramToObject( req.url );
		// var _tdbjs_nm = "find";
				

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );

		async function run() {
			try {
    
				await client.connect();
				// Get the database and collection on which to run the operation
				const db = client.db("data");
				const col0 = db.collection("member");
				// Query for a movie that has the title 'The Room'
				const query = {};//{ title: "The Room" };
				// const options = {
				//   // Sort matched documents in descending order by rating
				//   sort: { "imdb.rating": -1 },
				//   // Include only the `title` and `imdb` fields in the returned document
				//   projection: { _id: 0, title: 1, imdb: 1 },
				// };
				var options = {};
				// Execute query
				const r = await col0.findOne(query, options);
				// Print the document returned by findOne()
				console.log(r);
				res.end( JSON.stringify( r ) )
			  } finally {
				await client.close();
			  }
		  }
		  run().catch(console.dir);


		// console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		// try
		// {
		// 	var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		// }
		// catch( err )
		// {
		// 	console.log( routerNm + " - DBJS File Not Found! - " + err );
		// 	res.end("{ sucess : 0, data : null }");
		// }
		
		// var query = _tQuery.replace( "<!=BRAND_NM=!>", paramsO.brandNm )
		// .replace( "<!=PAGE=!>", paramsO.page );
		// var dbjs_nm = "find_" + paramsO.brandNm + ".dbjs";

		// var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		// console.log( FILE_PATH )

		// fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		// var r = exec_query_DB( dbjs_nm )
		

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
		http://localhost:8888/findHashTag?tag=...&page=1
	* </code>
	*/
	global.server.addRouter("/findHashTag",function( req, res ){
		debugger;
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( decodeURIComponent( req.url  ));
		var _tdbjs_nm = "findHashTag";
				
		var _tag = decodeURIComponent( paramsO.tag )

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery.replace( "<!=TAG=!>", decodeURIComponent( paramsO.tag ) )
		.replace( "<!=PAGE=!>", paramsO.page )
		.replace( "<!=LIMIT=!>", paramsO.limit );
		var dbjs_nm = "find_" + _tag.replace(/\s/gi,"_") + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )
				
		res.end( r )


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
		http://localhost:8888/findContentsAll?page=1
	* </code>
	*/
	global.server.addRouter("/getUerInfoBySession",async function( req, res, data ){
		
		console.log( "[S] - getUerInfoBySession " )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var paramBody = JSON.parse( data )
		console.log( paramsO )		

		var r = await getUerInfoBySession( paramBody.sid );
		console.log( r )
		console.log( "[E] - getUerInfoBySession " )
		res.end( JSON.stringify(r) )	

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
		http://localhost:8888/findAll?page=1
	* </code>
	*/
	global.server.addRouter("/findAll",function( req, res ){
		debugger;
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var _tdbjs_nm = "findAll";
				

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery.replace( "<!=PAGE=!>", paramsO.page )
				.replace( "<!=LIMIT=!>", paramsO.limit );
		var dbjs_nm = _tdbjs_nm + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )
		res.end( r )	

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
		http://localhost:8888/find_report_All_by_brand?brand=varihope
	* </code>
	*/
	global.server.addRouter("/getTotalCount",function( req, res ){
		
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var _tdbjs_nm = "getTotalCount";
				

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery.replace( "<!=COL_NM=!>", paramsO.colNm )
				.replace( "<!=DB_NM=!>", paramsO.dbNm );
		var dbjs_nm = "find_" + paramsO.colNm + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )
		res.end( r )	

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
		http://localhost:8888/getHtml?fileNm=report_varihope_202008
	* </code>
	*/
	global.server.addRouter("/getHtml",function( req, res ){
		
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		try
		{
			var _tHtml = fs.readFileSync( _thtml_PATH + "/" + paramsO.fileNm + ".thtml" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - thtml File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}

		res.end( _tHtml )	

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
		http://localhost:8888/getTags
	* </code>
	*/
	global.server.addRouter("/getTags",function( req, res ){
		
		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
		var _tdbjs_nm = "getTags";
				

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery//.replace( "<!=COL_NM=!>", paramsO.colNm );
		var dbjs_nm = "find_" + _tdbjs_nm + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )
		res.end( r )	

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
		http://localhost:8888/findContentsAll?page=1
	* </code>
	*/
	global.server.addRouter("/searchProduct",function( req, res ){
		debugger;
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( decodeURIComponent( req.url  ));
		var _tdbjs_nm = "searchProduct";

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery.replace( "<!=PAGE=!>", paramsO.page )
			.replace( "<!=LIMIT=!>", paramsO.limit )
			.replace( "<!=KEYWORD=!>", paramsO.keyword )
			.replace( "<!=PAGE=!>", paramsO.page );
		var dbjs_nm = _tdbjs_nm + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )

		res.end( r )	

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
		http://localhost:8888/findContentsAll?page=1
	* </code>
	*/
	global.server.addRouter("/searchByShop",function( req, res ){
		
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( decodeURIComponent( req.url  ));
		var _tdbjs_nm = "searchByShop";

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery.replace( "<!=PAGE=!>", paramsO.page )
			.replace( "<!=LIMIT=!>", paramsO.limit )
			.replace( "<!=SHOP=!>", paramsO.shop )
			.replace( "<!=PAGE=!>", paramsO.page );
		var dbjs_nm = _tdbjs_nm + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )


		res.end( r )	

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
		http://localhost:8888/findContentsAll?page=1
	* </code>
	*/
	global.server.addRouter("/searchByBrand",function( req, res ){
		debugger;
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( decodeURIComponent( req.url  ));
		var _tdbjs_nm = "searchByBrand";

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		
		var query = _tQuery.replace( "<!=PAGE=!>", paramsO.page )
			.replace( "<!=LIMIT=!>", paramsO.limit )
			.replace( "<!=BRAND=!>", paramsO.brand )
			.replace( "<!=PAGE=!>", paramsO.page );
		var dbjs_nm = _tdbjs_nm + ".dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		var r = exec_query_DB( dbjs_nm )

		res.end( r )	

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
