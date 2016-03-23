var express = require("express");
var nodemailer = require("nodemailer");
var app = express();

var smtp = nodemailer.createTransport("	SMTP", {
	service: "Gmail",
	auth: {
		user: "youremail@gmail.com",
		pass: "password"
	}
});

app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/send', function(req, res){
	var mailList = {
		 to: req.query.to,
		 subject : req.query.subject,
		 text : req.query.text
	}
	console.log(mailList);
	smtp.sendMail(mailList, function(error, response){
		if(error){
			console.log(error);
		}
		else{
			console.log("Message sent: " + response.message);

		}
	});
});

app.listen(3000, function(){
	console.log("Server running at port: 3000");
})