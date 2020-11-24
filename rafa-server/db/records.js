require('dotenv').config({path:'.env'});

const connection = require('./connection');
const DB_NAME = process.env.DATABASE_NAME;
const COLL_NAME = process.env.RECORDS_COLLECTION_NAME;

var db;

connection.getConnection().then((conn)=>{
  db=conn;
}).catch((err)=>{
  console.log(err);
7});

module.exports = {
	addRecord : (session) => {
		return new Promise((resolve, reject)=>{
			let conn = db.db(DB_NAME);
			
			conn.collection(COLL_NAME).insertOne({session}, (err, resp)=>{
				if(err){
					console.log(err);
					reject(err);
				} else{
					if(resp.result.ok==1 && resp.result.n==1){
						resolve({
							result : 'OK',
							message : 'Record added correctly'
						});
					}
				}
			});
		});
	},
	getRecords : () => {
		return new Promise((resolve, reject)=>{
			let conn = db.db(DB_NAME);
			
			conn.collection(COLL_NAME).find().sort({$natural:-1}).limit(150).toArray(
				(err, resp)=>{
				if(err){
						console.log(err);
						reject(err);
					} else{
						resolve(resp);
					}
				}
			);
		});
	}
}
