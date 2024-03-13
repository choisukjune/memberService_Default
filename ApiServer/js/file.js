//-------------------------------------------------------;
var fileNm = "js/ws.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//-------------------------------------------------------;
(function(){
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var fs = require( "fs" );
var url = require('url');

//-------------------------------------------------------;
// MongoDB Driver Test;
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
// VARIABLE;
//-------------------------------------------------------;


var ROOT_PATH = process.cwd();

var CP_COMMAND = {};
	//CP_COMMAND.MONGO = "..\\Binary\\Mongodb\\mongodb-win32-x86_64-windows-4.4.3\\bin\\mongo";
	CP_COMMAND.MONGO = "mongo";

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

/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var exec_query_DB = function( dbjsNm, bResult ){

	var DBJS_NM = dbjsNm;
	var FILE_PATH = ROOT_PATH + "/dbjs/" + DBJS_NM;

	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin \"<!=FILE_PATH=!>\"";
	if( bResult ) _t_command = _t_command + " > " + dbjsNm + "__" + Date.now() + ".result";
	
	var command = _t_command.replace( "<!=ID=!>", global.CONST.MongoDB.OPTIONS.self.ID )
		.replace( "<!=PWD=!>", global.CONST.MongoDB.OPTIONS.self.PWD )
		.replace( "<!=HOST=!>", global.CONST.MongoDB.OPTIONS.self.HOST )
		.replace( "<!=PORT=!>", global.CONST.MongoDB.OPTIONS.self.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );
	console.log( command )
	var r = cp.execSync( command ).toString();
		r = deleteLines( r , 4 )
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
	//str = str.replace( /\t/g, '' );
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
	
//	var r =  url.split("?")[ 1 ];
//	var a = r.split("&");
//	var o = {};
//	var i = 0,iLen = a.length,io;
//	
//	for(;i<iLen;++i){
//		io = a[ i ];
//		var _ta = io.split( "=" );
//		o[ _ta[0] ] = _ta[ 1 ];
//	}
//	console.log( o )
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
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/uploadFile",async function( req, res, data ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( decodeURIComponent( req.url ) );
		var paramBody = JSON.parse( data )

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );

		// global.wss.clients.forEach(function each(client) {
		//   if (client.readyState === WebSocket.OPEN) {
		// 	//client.send(data);
		// 	if( global.ws == client ) return;
		// 	else client.send(  paramsO.data );
		//   }
		// });
		console.log(paramBody);
		
			
			try
			{
			
				await client.connect();
			
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("member");
			const col1 = db.collection("memberInfo");

			//var _q = { userId : data.email }
			var _q = { userId : "aaa@naver.com" }
			// var exsitEmail = await col0.findOne( _q );
			// console.log( "exsitEmail -- ",exsitEmail )
			// if( exsitEmail ) return { success : 1, m : "이미 등록된 메일입니다." }

			// Query for a movie that has the title 'The Room'

			var userInfo = {
				// userId : data.email,
				// username : data.email,
				profile_image : "/images/"+ paramBody.fileNm,
				// mobile : "",
				// name : "",
				// userInfos : {
				// 	site : {},
				// 	google : {},
				// 	naver : {},
				// 	kakao : {},
				// }

				
				
			}


			// const options = {
			//   // Sort matched documents in descending order by rating
			//   sort: { "imdb.rating": -1 },
			//   // Include only the `title` and `imdb` fields in the returned document
			//   projection: { _id: 0, title: 1, imdb: 1 },
			// };




			//var options = {};
			// Execute query
			const update = { $set: userInfo};
			const options = { upsert: true };

			let r0 = await col1.updateOne(_q, update, options);

			//let r0 = await col1.insertOne( userInfo );
			console.log( r0 )

			console.log( "[E] - createUser" );
			res.end(JSON.stringify(r0))	
			
		  } finally {
			await client.close();
		  }
			 
			 
			 
        });
		
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
