const express = require("express");
const bodyParser = require('body-parser')

var app = express();

var PORT = 3000;
if(process.argv){
	if(process.argv.length > 2 && !isNaN(process.argv[2])){
		PORT = process.argv[2];
	}
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.get('/', function(req, res) { 
	res.json({message: `Hurrayyyy !! You got me. Port:${PORT}`});
});

app.listen(PORT, function () {
    console.log(`Started Listing to ${PORT} port !`);
});