const express = require('express');
const app = express();

const statsServices = require('../db/stats');

app.post('/new-contract', (req, res)=>{
  let body = req.body;
  let contract = req.contract;
  contract.filename = body.filename;
  statsServices.addContract(contract).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send({
      result : 'ERROR',
      message : 'Try later'
    })
  });
});

app.get('/get-contract', (req, res)=>{
  let filename = req.query.filename;
  statsServices.getContractByFilename(filename).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send({
      result : 'ERROR',
      message : 'Try later'
    });
  });
});

app.get('/get-contracts', (req, res)=>{
  statsServices.getAllContracts().then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send({
      result : 'ERROR',
      message : 'Try later'
    });
  });
});

app.get('/get-contracts-month', (req, res)=>{
  let year = req.query.year;
  let month = req.query.month;
  statsServices.getContractsByYM(year, month).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send({
      result : 'ERROR',
      message : 'Try later'
    })
  });
});

app.post('/delete-contract', (req, res)=>{
  let filename = req.body.filename;
  statsServices.deleteContract(filename).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send({
      result : 'ERROR',
      message : 'Try later'
    })
  })
});

module.exports = app;