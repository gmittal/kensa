var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var twilio= require('twilio');
var async = require('async');
var app = express();


app.use(bodyParser());


var accountSid = 'ACc7eeb233067530c7834796d06edbb5ec';
var authToken = "5fed0003a66309453cd403e5693608fe";
var client = require('twilio')(accountSid, authToken);


app.post('/', function (req, res) {

	console.log(req.body.MediaUrl0);
	request('http://api.qrserver.com/v1/read-qr-code/?fileurl='+req.body.MediaUrl0, function(err, response, body) {
		data = JSON.parse(body);
		// var decodedVal = ;
		console.log(data[0].symbol[0].data);

		var resp = new twilio.TwimlResponse();
	    resp.message(data[0].symbol[0].data);
	    
	    res.writeHead(200, {
	    	'Content-Type':'text/xml'
	    });
	    res.end(resp.toString());
		// res.send(resp.toString());
	});


	

	// res.send("yo");

	
});




var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port)

});