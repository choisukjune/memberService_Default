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
	if( cbFunction ) cbFunction( r )
	else return r;
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

/**
*  SID를 생성하기 위한 문자열 인코딩 함수
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
	 
function SHA256(s){
	
	var chrsz   = 8;
	var hexcase = 0;
	
	function safe_add (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
	
	function core_sha256 (m, l) {
		
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 
			0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 
			0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 
			0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 
			0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 
			0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 
			0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 
			0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 
			0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 
			0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 
			0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

		var W = new Array(64);
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
	
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
	
		for ( var i = 0; i<m.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
	
			for ( var j = 0; j<64; j++) {
				if (j < 16) W[j] = m[j + i];
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
	
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
	
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
	
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
	
	function str2binb (str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
	
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
	
		for (var n = 0; n < string.length; n++) {
	
			var c = string.charCodeAt(n);
	
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
	
		}
	
		return utftext;
	}
	
	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}
	
	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	
}
	
// 암호화 확인
// console.log(SHA256("Test")) ;
// https://ko.javascript.info/cookie 쿠키 내용확인

function parseCookie( reqCookie ){

	if( !reqCookie ) return {};
	var _cookies = reqCookie.split("; ")
		
	console.log( _cookies );
	
	var r = {}
	var i = 0,iLen = _cookies.length,io;

	for(;i<iLen;++i){
		io = _cookies[ i ];
		var _t = io.split( "=" );
		r[ _t[0] ] = _t[ 1 ]
	}

	return r;
}

function randomStr(){
	return Math.random().toString(36).substr(2,11)
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
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/

	// 세션 시크릿 키 생성 함수
	function generateSessionSecret() {
		const secretBytes = crypto.randomBytes(32); // 32바이트 랜덤 데이터 생성
		const sessionSecret = secretBytes.toString('base64'); // base64로 인코딩

		return sessionSecret;
	}

	// 생성된 세션 시크릿 키 출력
	// const sessionSecret = generateSessionSecret();
	// console.log('Generated Session Secret:', sessionSecret);

	var insertSesstion = async function( data, cbFunction ){

		try {
			console.log( "[S] - insertSession" );
			await client.connect();
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("session");
			// Query for a movie that has the title 'The Room'
			var doc = {
				sid : data.sid,
				userId : data.userId,
				creatDate :  new Date()
			}
			// const options = {
			//   // Sort matched documents in descending order by rating
			//   sort: { "imdb.rating": -1 },
			//   // Include only the `title` and `imdb` fields in the returned document
			//   projection: { _id: 0, title: 1, imdb: 1 },
			// };
			var options = {};
			// Execute query
			const r = await col0.insertOne( doc );
			console.log( r )
			console.log( "[E] - insertSession" );
			return r;
			
		  } finally {
			await client.close();
		  }
		  
	}
	var checkSesstion = async function( sid, cbFunction ){
		
		
		try
		{

			await client.connect();
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("session");
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
			console.log( r )

			return r;
			
		}
		finally
		{
			await client.close();
		}
		
		  
	}
	var deleteSession = async function( sid ){
		
		try
		{
			console.log( "[S] - deleteSession" );
			await client.connect();
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("session");
			// Query for a movie that has the title 'The Room'
			var _q = {
				sid : sid
			}
			// const options = {
			//   // Sort matched documents in descending order by rating
			//   sort: { "imdb.rating": -1 },
			//   // Include only the `title` and `imdb` fields in the returned document
			//   projection: { _id: 0, title: 1, imdb: 1 },
			// };
			var options = {};
			// Execute query
			const r = await col0.deleteOne( _q );
			console.log( r )
			console.log( "[E] - deleteSession" );
			return r;
			
		} 
		finally
		{
			await client.close();
		}
	}
	var createUser = async function( data, password, salt, ssoType, isSSO, cbFunction ){
		console.log( "[S] - createUser" );

		console.log( "data - ", data );
		console.log( "ssoType - ", ssoType );
		console.log( "password - ", password );
		console.log( "salt - ", salt );
		console.log( "ssoType - ", ssoType );
		console.log( "isSSO - ", isSSO );

		password = password || null;
		
		// var query = _tQuery.replace( "<!=EMAIL=!>", data.email )
		// .replace( "<!=USER_INFO=!>", JSON.stringify( data ) )
		// .replace( "<!=PASSWORD=!>", password )
		// .replace( "<!=SALT=!>", salt )
		// .replace( "<!=IS_SSO=!>", isSSO )
		// .replace( "<!=SSO_TYPE=!>", ssoType );


		try {
			console.log( "[S] - insertSession" );
			
			await client.connect();
			
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("member");

			// Query for a movie that has the title 'The Room'
			var doc = {
				userId : data.email,
				password : password,
				salt : salt,
				isSso : isSSO,
				ssoType : ssoType,
				userInfo : data
			}
			// const options = {
			//   // Sort matched documents in descending order by rating
			//   sort: { "imdb.rating": -1 },
			//   // Include only the `title` and `imdb` fields in the returned document
			//   projection: { _id: 0, title: 1, imdb: 1 },
			// };
			var options = {};
			// Execute query
			const r = await col0.insertOne( doc );
			console.log( r )
			console.log( "[E] - createUser" );
			return r;
			
		  } finally {
			await client.close();
		  }
	}
	var existEmail = async function( email, cbFunction ){
		// var _tdbjs_nm = "existEmail";
		
		// console.log("existCheckEmail = ",email);
		
		// console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		// try
		// {
		// 	var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		// }
		// catch( err )
		// {
		// 	// console.log( routerNm + " - DBJS File Not Found! - " + err );
		// 	// res.end("{ sucess : 0, data : null }");
		// }
		
		// console.log( _tQuery );
		// var query = _tQuery.replace( "<!=EMAIL=!>", email )
		// //.replace( "<!=USER_ID=!>", data.userId );
		// var dbjs_nm = "existEmail.dbjs";

		// var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		// console.log( FILE_PATH );

		// fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
		// var _r = exec_query_DB( dbjs_nm );
		
		// var r = deleteLines( _r, 4 ).replace(/\n/gi,"");
		// console.log( "emailExist is = ",r );
		
		try {
    
			await client.connect();
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("member");
			
			// Query for a movie that has the title 'The Room'

			const query = { userId :email};//{ title: "The Room" };
			/*
			const options = {
			  // Sort matched documents in descending order by rating
			  sort: { "imdb.rating": -1 },
			  // Include only the `title` and `imdb` fields in the returned document
			  projection: { _id: 0, title: 1, imdb: 1 },
			};
			*/
			
			var options = {};

			// Execute query
			var result = await col0.findOne(query, options);
			
			console.log( "query result : ", result )
			
			if( result )
			{
				var r = "{ \"success\" : 0 }"
			
			}
			else
			{
				var r = "{ \"success\" : 1 }"
			
			}
			console.log("isExistEmail : ", r)
			return r;			
		  } finally {
			await client.close();
		  }

		// if( cbFunction ) cbFunction( r );
	}
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
	global.server.addRouter("/existEmail",async function( req, res ){
		/*
		
		https://lab.cliel.com/entry/nodejs-http
		여기서 세션처리하는 거 확인하기

		https://www.mongodb.com/docs/manual/tutorial/expire-data/
		몽고디비에서 세션컬렉션의 문서를 시간이지나면 자동으로 파기하는 방법

		일정시간이 지나고, 브라우저 쿠키가 만료되고, 로그인페이지로 이동시김
		*/
		console.log("[ S ] - /existEmail");

		//console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		//var paramBody = JSON.parse( data )

		//console.log( parseCookie( req.headers.cookie ) );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		var t = await existEmail( paramsO.email );
		console.log( t )
		res.end( t )

		console.log("[ E ] - /existEmail");

	});
	global.server.addRouter("/login",function( req, res, data ){
		/*
		
		https://lab.cliel.com/entry/nodejs-http
		여기서 세션처리하는 거 확인하기

		https://www.mongodb.com/docs/manual/tutorial/expire-data/
		몽고디비에서 세션컬렉션의 문서를 시간이지나면 자동으로 파기하는 방법

		일정시간이 지나고, 브라우저 쿠키가 만료되고, 로그인페이지로 이동시김
		*/
		console.log("[ S ] - /Login");

		console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var paramBody = JSON.parse( data )
		// var _tdbjs_nm = "login";
		
		// console.log( routerNm )
		// console.log( paramsO )
		// console.log( paramBody )
		// console.log( req.headers.cookie )

		//console.log( parseCookie( req.headers.cookie ) );

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
				const query = { userId :paramBody.email};//{ title: "The Room" };
				// const options = {
				//   // Sort matched documents in descending order by rating
				//   sort: { "imdb.rating": -1 },
				//   // Include only the `title` and `imdb` fields in the returned document
				//   projection: { _id: 0, title: 1, imdb: 1 },
				// };
				var options = {};
				// Execute query
				const r = await col0.findOne(query, options);
				console.log( r )
				console.log( "-----------------------------------" )
				//var password = "123"
				console.log( "r.password : ", r.password)
				var isPass = await verifyPassword(paramBody.pass,r.salt,r.password, null);
				console.log( "isPass : ",isPass )

				if( isPass )
				{
					const db = client.db("data");
					const col1 = db.collection("session");

					var doc = {
						sid : generateSessionSecret(),
						userId : paramBody.email,
						creatDate :  new Date()
					}

					var result = await col1.insertOne(doc);
					console.log( result )
					var result = { success : 0, d : { sid : doc.sid, userInfo : r.userInfo } }
					res.end( JSON.stringify( result ) );

				}
				else
				{
					//비밀번호가 일치하지 않을시 처리;
					var result = { success : 1, d : {} }
					res.end( JSON.stringify( result ) );
				}
				//const verifyPassword = async (password, userSalt, userPassword, cbFunction ) => {
				// Print the document returned by findOne()
				
			  } finally {
				await client.close();
			  }
		  }
		  run().catch(console.dir);

	});

	global.server.addRouter("/kakaoLogin",async function( req, res, data ){
		/*
		
		https://lab.cliel.com/entry/nodejs-http
		여기서 세션처리하는 거 확인하기

		https://www.mongodb.com/docs/manual/tutorial/expire-data/
		몽고디비에서 세션컬렉션의 문서를 시간이지나면 자동으로 파기하는 방법

		일정시간이 지나고, 브라우저 쿠키가 만료되고, 로그인페이지로 이동시김
		*/
		console.log("[ S ] - /naverLogin");

		console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var paramBody = JSON.parse( data )
		var _tdbjs_nm = "naverLogin";
		
		console.log( routerNm )
		console.log( paramsO )
		console.log( paramBody )
		console.log( req.headers.cookie )

		//console.log( parseCookie( req.headers.cookie ) );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		// var t = await existEmail( paramBody.email );
		// console.log( paramBody.email + "- 이메일 체크결과 -" + t )
		// console.log( typeof(t) )
		// var _t = JSON.parse( t );

		// console.log( "t.success ", t.success );

		// if( _t.success )
		// {
		// 	console.log( 1111 );
		// 	console.log( "-------------------------" );
		// 	console.log( "-------------------------" );
		// 	console.log( "-------------------------" );
		// 	var _t00 = await createUser( paramBody, null, null, "naver", true )

		// 	var sid = generateSessionSecret();
		// 	console.log( "new sid : ", sid );
		// 	await insertSesstion( { sid : sid, userId : paramBody.email } )

		// 	console.log("[ E ] - /naverLogin");

		// 	res.end( JSON.stringify( { sid : sid, d : paramBody } ) )	

		// }
		// else
		// {
		// 	console.log( 2222 );
		// 	console.log( "-------------------------" );
		// 	console.log( "-------------------------" );
		// 	console.log( "-------------------------" );
		// 	var sid = generateSessionSecret();
		// 	await insertSesstion( { sid : sid, userId : paramBody.email } )

		// 	console.log("[ E ] - /naverLogin");

		// 	res.end( JSON.stringify( { sid : sid, d : paramBody } ) )	
		// }
		//res.end( t )
		res.end( JSON.stringify( paramBody ) )
		console.log("[ E ] - /existEmail");

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
	global.server.addRouter("/checksession",function( req, res, data ){
		/*
		
		https://lab.cliel.com/entry/nodejs-http
		여기서 세션처리하는 거 확인하기

		https://www.mongodb.com/docs/manual/tutorial/expire-data/
		몽고디비에서 세션컬렉션의 문서를 시간이지나면 자동으로 파기하는 방법

		일정시간이 지나고, 브라우저 쿠키가 만료되고, 로그인페이지로 이동시김
		*/
		console.log("[ S ] - /checksession");

		console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		//var paramBody = JSON.parse( data )

		//console.log( parseCookie( req.headers.cookie ) );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( 1 )

		var isSession = checkSesstion( paramsO.sid );
		if( isSession )
		{
			var r = "{ success : 0 }"
			res.end( r )
		}
		else
		{
			var r = "{ success : 1 }"
			res.end( r )
		}
	
		console.log("[ E ] - /checksession");

		

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
	global.server.addRouter("/deletesession",function( req, res, data ){
		/*
		
		https://lab.cliel.com/entry/nodejs-http
		여기서 세션처리하는 거 확인하기

		https://www.mongodb.com/docs/manual/tutorial/expire-data/
		몽고디비에서 세션컬렉션의 문서를 시간이지나면 자동으로 파기하는 방법

		일정시간이 지나고, 브라우저 쿠키가 만료되고, 로그인페이지로 이동시김
		*/
		console.log("[ S ] - /deletesession");

		console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		//var paramBody = JSON.parse( data )

		//console.log( parseCookie( req.headers.cookie ) );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		deleteSession( paramsO.sid, function(r){
			res.end( r )	
		})
	
		console.log("[ E ] - /deletesession");

		

	});
	
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
