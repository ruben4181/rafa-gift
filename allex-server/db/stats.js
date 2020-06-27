require('dotenv').config({path:'.env'});

const connection = require('./connection');
const DB_NAME = process.env.DATABASE_NAME;
const COLL_NAME = process.env.STATS_COLLECTION_NAME;
var db;

connection.getConnection().then((conn)=>{
  db=conn;
}).catch((err)=>{
  console.log(err);
});

module.exports = {
  addContract : (contract)=>{
    return new Promise((resolve, reject)=>{
      let conn = db.db(DB_NAME);
      conn.collection(COLL_NAME).insertOne(contract, (err, resp)=>{
        if(err){
          reject(err);
        }else{
          if(resp.result.ok==1 && resp.result.n==1){
            resolve({
              result : 'OK',
              message : 'Contract added succesfully'
            });
          } else{
            resolve({
              result : 'DECLINED',
              message : 'Was not possible to add contract'
            });
          }
        }
      });
    });
  },
  getContractByFilename : (filename)=>{
    return new Promise((resolve, reject)=>{
      let conn = db.db(DB_NAME);
      conn.collection(COLL_NAME).findOne({filename:filename}, { projection : {_id : 0}}, (err, resp)=>{
        if(err){
          reject(err);
        } else{
          if(resp){
            resolve({
              result : 'OK',
              message : 'Contract reached',
              data : resp
            });
          } else{
            resolve({
              result : 'DECLINED',
              message : "Can't get contract with that filename"
            });
          }
        }
      });
    });
  },
  deleteContract : (filename) =>{
    return new Promise((resolve, reject)=>{
      let conn = db.db(DB_NAME);
      conn.collection(COLL_NAME).deleteOne({filename:filename},(err, resp)=>{
        if(err){
          reject(err);
        } else{
          if(resp.result.n==1 && resp.result.ok==1){
            resolve({
              result : 'OK',
              message : 'Contract deleted successfully'
            });
          } else{
            resolve({
              result : 'DECLINED',
              message : 'Nothing was deleted'
            });
          }
        }
      });
    });
  },
  getAllContracts : ()=>{
    return new Promise((resolve, reject)=>{
      let conn = db.db(DB_NAME);
      let projection = {
        _id : 0
      }
      conn.collection(COLL_NAME).find({}, {projection : projection}).toArray((err, resp)=>{
        if(err){
          reject(err);
        } else{
          if(resp){
            resolve({
              result : 'OK',
              message : 'Got all contracts',
              data : resp
            });
          } else{
            resolve({
              result : 'DECLINED',
              message : 'Not contracts already'
            })
          }
        }
      });
    });
  },
  getContractsByYM : (year, month)=>{
    return new Promise((resolve, reject)=>{
      let conn = db.db(DB_NAME);
      let projection = {
        _id : 0
      }
      conn.collection(COLL_NAME).find({date : {$regex: year+'-'+month}}, {projection : projection}).toArray((err, resp)=>{
        if(err){
          reject(err);
        } else{
          if(resp){
            resolve({
              result : 'OK',
              message : 'Got the contracts of selected month',
              data : resp
            });
          } else{
            resolve({
              result : 'DECLINED',
              message : 'Not contracts at that month'
            });
          }
        }
      });
    });
  }
};

//setTimeout(()=>{
  /*module.exports.addContract({date: '2020-05-17', price : '200000', filename:'3.pdf'}).then((res)=>{
    console.log(res);
    db.close();
  }).catch((err)=>{
    console.log(err);
  });//*/
  /*module.exports.deleteContract('12345.pdf').then((res)=>{
    console.log(res);
    db.close();
  }).catch((err)=>{
    console.log(err);
  });//*/
  /*module.exports.getContractByFilename('3.pdf').then((res)=>{
    console.log(res);
    db.close();
  }).catch((err)=>{
    console.log(err);
  });//*/
  /*module.exports.getAllContracts().then((res)=>{
    console.log(res);
    db.close();
  }).catch((err)=>{
    console.log(err);
  });//*/
  /*module.exports.getContractsByYM('2020', '01' ).then((res)=>{
    console.log(res);
    db.close();
  }).catch((err)=>{
    console.log(err);
  });//*/
//}, 3000);