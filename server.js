var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./config/connection.js');
var moment = require('moment')
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var app = express();
var PORT = process.env.PORT || 80;

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static('public'));

app.post('/auth',function(req,res){

	console.log(req.body)
	var input = 'SELECT * FROM teachers WHERE name="'+req.body.username+'";'
	connection.query(input, function(err,result){
		if (req.body.password == result[0].password) {
			res.json({success: true})
		} else {
			res.json({success: false})
		}
		console.log(result);
		if (err) throw err;
	});

});



app.get('/teacher',function(req,res){
	res.sendFile(path.join(__dirname+'/public/mat.html'));
});

app.get('/student',function(req,res){
	res.sendFile(path.join(__dirname+'/public/student.html'));
});

app.get('/student',function(req,res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/api/teacher',function(req,res){

	var input = 'SELECT * FROM sessions;'

	connection.query(input, function(err,result){
		console.log(result);
		if (err) throw err;
		res.json(result);
	});

	console.log(moment('2010-10-20 12:10:30').isAfter('2010-01-01 12:10:30'));

	
});

app.post('/api/teacher', function(req,res){

	// console.log(req.body)
	// console.log(req.body.name)
	// console.log(req.body.time)
	// console.log(req.body.endTime)

	// var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("'+req.body.time+'", "'+req.body.name+'", "yes");'

	// connection.query(input, function(err,result){
	// 	if (err) throw err;
	// });

	// var newTimeIncrement = moment(req.body.time).add(30, 'minutes').format('YYYY-MM-DD HH:mm:SS');
	// console.log(newTimeIncrement);


	// This loop parses the number of 30 minute sessions there are in the period of the teacher's availability.
	// A seperate database entry is made for each 30 minute session.
	// If the start time is earlier than the end time it pushes a session to the database, adds 30 minutes to the start time, and runs again.
	for (var m = moment(req.body.time); m.isBefore(moment(req.body.endTime)); m.add(30, 'minutes')) {

		var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("' + m.format('YYYY-MM-DD HH:mm:SS') + '", "'+req.body.name+'", "yes");'

		connection.query(input, function(err,result){
			if (err) throw err;
		});

		console.log(m.format('YYYY-MM-DD HH:mm:SS'))
	};

	// for (var i = 0; i < 5; i ++) {

		// console.log(req.body.time)
		// console.log(moment(req.body.time).add(30, 'minutes'))

		// newTimeIncrement = moment(newTimeIncrement).add(30, 'minutes').format('YYYY-MM-DD HH:mm:SS');

		// var newTimeIncrement = moment(req.body.time).add(30, 'minutes').format('YYYY-MM-DD HH:mm:SS');
		// console.log(newTimeIncrement);

		// if (newTimeIncrement = req.body.formattedEndTime) {
			// console.log(newTimeIncrement)
			// return
		// }

	// }

	// var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("'+req.body.time+'", "'+req.body.name+'", "yes");'

	// connection.query(input, function(err,result){
	// 	if (err) throw err;
	// });

	// var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("'+req.body.time+'", "'+req.body.name+'", "yes");'

	// connection.query(input, function(err,result){
	// 	if (err) throw err;
	// });

	// connection.query('INSERT INTO programmers(name, role, programminglanguage, yearsexperience) VALUES ("Mauricio", "Frontend", "JavaScript", 10);', function(err, res) {
	// 	if (err) throw err;
	// });

});

app.listen(PORT, function(){
	console.log("App is now listening on PORT: " + PORT);
});

