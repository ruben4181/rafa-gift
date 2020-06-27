const express = require('express');
const app = express();

const generator = require('../services/generator');
const stats = require('../db/stats');

app.post('/generatePDF', (req, res)=>{
  let reqHeaders = req.headers;
  let reqBody = req.body;
  generator.generatePDF(reqBody.contract).then((resp)=>{
    if(reqBody.saveStat){
      let contract = reqBody.contract;
      contract.filename = resp.split("=")[1];
      stats.addContract(contract);
    }
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
    console.log(err);
  });
});
app.get('/services', (req, res)=>{
  res.status(200);
  res.send({
    data : 'Serices workings well'
  });
});

app.get('/download/', (req, res)=>{
  const file = './assets/'+req.query.file;
  res.status(200);
  res.download(file);
});

module.exports = app;