//-------------------------------------------------------;
var fileNm = "js/join.js";
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
var createHashedPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("base64");
  console.log( hashedPassword )
  console.log( salt )
  var r = { hashedPassword : hashedPassword, salt : salt };
  console.log( r );
  return r;
};

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

	var command = CP_COMMAND.MONGO + ` "mongodb+srv://12k4:tjrwns2482%21%40@cluster0.suwebz6.mongodb.net/Cluster0" ${FILE_PATH}`
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
async function generateSessionSecret() {
	const secretBytes = await crypto.randomBytes(32); // 32바이트 랜덤 데이터 생성
	const sessionSecret = await secretBytes.toString('base64'); // base64로 인코딩

	return sessionSecret;
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
			// var options = {};
			// Execute query

			const query = { userId : data.userId };
			const update = { $set: doc};
			const options = { upsert: true };

			const r = await col0.updateOne(query, update, options);

			//const r = await col0.insertOne( doc );
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
	var createUser = async function( data, password, salt, ssoType, isSSO ){
		console.log( "[S] - createUser" );

		console.log( "data - ", data );
		console.log( "ssoType - ", ssoType );
		console.log( "password - ", password );
		console.log( "salt - ", salt );
		console.log( "ssoType - ", ssoType );
		console.log( "isSSO - ", isSSO );

		password = password || null;
		


		try {
			console.log( "[S] - insertSession" );
			
			await client.connect();
			
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("member");
			const col1 = db.collection("memberInfo");

			var _q = { userId : data.email }
			var exsitEmail = await col0.findOne( _q );
			console.log( "exsitEmail -- ",exsitEmail )
			if( exsitEmail ) return { success : 1, m : "이미 등록된 메일입니다." }

			// Query for a movie that has the title 'The Room'
			var doc = {
				userId : data.email,
				password : password,
				salt : salt,
				isSso : isSSO,
				ssoType : ssoType,
			}

			var userInfo = {
				userId : data.email,
				username : data.email,
				profile_image : "",
				mobile : "",
				name : "",
				userInfos : {
					site : {},
					google : {},
					naver : {},
					kakao : {},
				}

				
				
			}


			// const options = {
			//   // Sort matched documents in descending order by rating
			//   sort: { "imdb.rating": -1 },
			//   // Include only the `title` and `imdb` fields in the returned document
			//   projection: { _id: 0, title: 1, imdb: 1 },
			// };




			//var options = {};
			// Execute query
			const r = await col0.insertOne( doc );
			console.log( r )

			

			const query = { userId : data.email };
			const update = { $set: userInfo};
			const options = { upsert: true };

			let r0 = await col1.updateOne(query, update, options);

			//let r0 = await col1.insertOne( userInfo );
			console.log( r0 )

			console.log( "[E] - createUser" );
			return r;
			
		  } finally {
			await client.close();
		  }
	}

	global.server.addRouter("/join",async function( req, res, data ){
		/*
		
		https://lab.cliel.com/entry/nodejs-http
		여기서 세션처리하는 거 확인하기

		https://www.mongodb.com/docs/manual/tutorial/expire-data/
		몽고디비에서 세션컬렉션의 문서를 시간이지나면 자동으로 파기하는 방법

		일정시간이 지나고, 브라우저 쿠키가 만료되고, 로그인페이지로 이동시김
		*/
		console.log("[ S ] - /Join");

		console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var paramBody = JSON.parse( data )
		
		console.log( routerNm )
		console.log( paramsO )
		console.log( paramBody )
		console.log( req.headers.cookie )

		//console.log( parseCookie( req.headers.cookie ) );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		var hashedPassword = await createHashedPassword(paramBody.pass )
			console.log("====>", hashedPassword )
		var user = await createUser(paramBody, hashedPassword.hashedPassword, hashedPassword.salt, null, false )
		console.log(user)

		if( user.success ) res.end( JSON.stringify( user ) )
			
		var sid = await generateSessionSecret();
			console.log("sid : ", sid)
		var r = await insertSesstion( { sid : sid, userId : paramBody.email })

		console.log("[ E ] - /Join");
		res.end( JSON.stringify( { sid : sid, d : r } ) )	


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
	global.server.addRouter("/checksession",async function( req, res, data ){
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
		var r = checkSesstion( paramsO.sid );
		console.log( r );
			res.end( r )	
	
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
	global.server.addRouter("/deletesession",async function( req, res, data ){
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
		
		var r =  await deleteSession( paramsO.sid );
		console.log( r );
			res.end( r )	
	
		console.log("[ E ] - /deletesession");

		

	});

	var addUserInfo = async function( data ){
		console.log( "[S] - addUserInfo" );

		console.log( "data - ", data );
		/*
		//data scheme;
		{
			"_id":{"$oid":"65f2c197538e6aaa8dd9a6dc"},
			"userId":"test@naver.com",
			"mobile":"",
			"name":"",
			"profile_image":"",
			"userInfos":{
				"site":{},
				"google":{},
				"naver":{},
				"kakao":{}
			},
			"username":"test@naver.com"
		}
		*/
		try {
			
			await client.connect();
			
			// Get the database and collection on which to run the operation
			const db = client.db("data");
			const col0 = db.collection("memberInfo");

			var userInfo = {
				userId : data.userId,
				username : data.username,
				profile_image : data.profile_image,
				mobile : data.mobile,
				name : data.name,
				userInfos : {
					site : {
						userId : data.userId,
						username : data.username,
						profile_image : data.profile_image,
						mobile : data.mobile,
						name : data.name,
					},
					google : {},
					naver : {},
					kakao : {},
				}
			}

			const query = { userId : data.userId };
			const update = { $set: userInfo};
			const options = { upsert: true };

			let r0 = await col0.updateOne(query, update, options);
			console.log( r0 )
			/*
			{
				acknowledged: true,
				modifiedCount: 1,
				upsertedId: null,
				upsertedCount: 0,
				matchedCount: 1
			}
			*/
			var r = { success : 0, m : "업데이트완료" };
			console.log( "[E] - addUserInfo" );
			return r;
			
		  } finally {
			await client.close();
		  }
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
	global.server.addRouter("/addUserInfo",async function( req, res, data ){

		console.log("[ S ] - /addUserInfo");

		console.log( data )
		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
		var paramBody = JSON.parse( data )

		//console.log( parseCookie( req.headers.cookie ) );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		
		var r =  await addUserInfo( paramBody );
		
		console.log( "/addUserInfo - result : ",r );
		console.log("[ E ] - /addUserInfo");

		res.end( JSON.stringify( r ) )	

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
