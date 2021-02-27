const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors");
const http = require('http');
const infrarequest = require('./lib/infra_request');
var app = express();

var port = 3000;

if(process.argv){
	if(process.argv.length > 2 && !isNaN(process.argv[2])){
		port = process.argv[2];
	}
}
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.get('/', function(req, res) { 
	res.json({message: `Hello World! Port:${port}`});
});


app.post("/api/createInfraReq", function(req, res) {
	infrarequest.createRequest(req, res, req.body);
	res.status(200).json({message : "Success"});
});

app.get("/api/reviewInfraReq", function(req, res) {
	res.status(200).json(infrarequest.reviewRequest(req, res));
});

app.post("/api/approveInfraReq", function(req, res) {
	infrarequest.applyRequest(req, res, req.body);
	res.status(200).json(req.body);
});

app.listen(port, function () {
  console.log(`Started Listing to ${port} port !`);
})