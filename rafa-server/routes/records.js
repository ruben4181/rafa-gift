const express = require('express');
const app = express();

const services = require('../db/records.js');

app.post('/new-record', (req, res)=>{
	let record = {
		id : new Date().now(),
		ammount : req.body.ammount,
		description : req.body.description || ''
	};
	
	services.addRecord(record).then((resp)=>{
		res.status(200);
		res.send(resp);
	}).catch((err)=>{
		res.status(500);
		res.send({
			result : 'ERROR',
			message : 'Error while adding record',
			err : err
		});
	});
});

app.get('/get-records', (req, res)=>{
	services.getRecords().then((resp)=>{
		res.status(200);
		res.send(resp);
	}).catch((err)=>{
		res.status(500);
		res.send({
			result : 'ERROR',
			message : 'Error while getting whole records',
			err : err
		});
	})
});

module.exports = app;
