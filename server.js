var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./config/connection.js')

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

	
});

app.post('/api/teacher', function(req,res){

	console.log(req.body)
	console.log(req.body.name)
	console.log(req.body.time)

	var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("'+req.body.time+'", "'+req.body.name+'", "yes");'

	connection.query(input, function(err,result){
		if (err) throw err;
	});

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

