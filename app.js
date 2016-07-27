// For deployment, host on a server and set the route to the webhook in Twilio's messaging settings. Simply send an MMS to that number with the desired QR code and the system should reply back with the decoded response.

var dotenv = require('dotenv');
dotenv.load();
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var twilio= require('twilio');
var async = require('async');
var cheerio = require('cheerio');
var app = express();


app.use(bodyParser());

var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var responseNumber = "+16503004931";

app.post('/', function (req, res) {

	// $('#data .name').each(function() {
	//     console.log($(this).text());
	// });

	if (req.body.MediaUrl0) {
		console.log("MMS was received.");
		console.log(req.body.MediaUrl0);
		request('http://api.qrserver.com/v1/read-qr-code/?fileurl='+req.body.MediaUrl0, function(err, response, body) {
			data = JSON.parse(body);
			console.log(JSON.stringify(body));
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

		// request('http://zxing.org/w/decode?u='+req.body.MediaUrl0, function(err, response, body) {
		// 	console.log(body);
		// 	$ = cheerio.load(body);

		// 	var qrData = [];

		// 	$('pre').each(function() {
		// 	    // console.log($(this).text());
		// 	    qrData.push($(this).text()); // pushes all of the QR values gathered by zxing
		// 	});

		// 	console.log("Zxing translation: " + qrData[0]);

		// 	var resp = new twilio.TwimlResponse();
		//     resp.message(qrData[0]);
		    
		//     res.writeHead(200, {
		//     	'Content-Type':'text/xml'
		//     });

		//     res.end(resp.toString());
		//     res.send(resp.toString());

		// 	// res.send("yo");
		// });
	} else {


		console.log(req.body.From);
		console.log(req.body.Body);
		console.log("No MMS was received. Sending one instead.");
		client.messages.create({
		    body: "",
		    to: req.body.From,
		    from: "+16503004931",
		    mediaUrl: "https://api.qrserver.com/v1/create-qr-code/?data="+ encodeURIComponent((req.body.Body).trim()) +"&size=100x100&margin=10"
		}, function(err, message) {
			console.log(err);
		    // process.stdout.write(message.sid);
		});
	}



	

	// res.send("yo");

	
});




var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port)

});