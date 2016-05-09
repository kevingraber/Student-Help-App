var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./config/connection.js');
var moment = require('moment')

var app = express();
var PORT = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static('public'));

app.get('/teacher',function(req,res){
	res.sendFile(path.join(__dirname+'/public/mat.html'));
});

app.get('/student',function(req,res){
	res.sendFile(path.join(__dirname+'/public/student.html'));
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

	var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("'+req.body.time+'", "'+req.body.name+'", "yes");'

	// connection.query(input, function(err,result){
	// 	if (err) throw err;
	// });

	// var newTimeIncrement = moment(req.body.time).add(30, 'minutes').format('YYYY-MM-DD HH:mm:SS');
	// console.log(newTimeIncrement);



	for (var m = moment(req.body.time); m.isBefore(moment(req.body.endTime)); m.add(30, 'minutes')) {
		console.log(m.format('YYYY-MM-DD HH:mm:SS'))
	}

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

