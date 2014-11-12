// For deployment, host on a server and set the route to the webhook in Twilio's messaging settings. Simply send an MMS to that number with the desired QR code and the system should reply back with the decoded response.

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var twilio= require('twilio');
var async = require('async');
var app = express();


app.use(bodyParser());


var accountSid = 'xxxxxxxx';
var authToken = "xxxxxxxx";
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