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

app.post('/api/teacher', function(req,res){

	console.log(req.body)
	console.log(req.body.name)
	console.log(req.body.time)

	var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("'+req.body.time+'", "'+req.body.name+'", "yes");'

	connection.query(input, function(err,result){
		if (err) throw err;
		// console.log("Success!")
	});

	// connection.query('INSERT INTO programmers(name, role, programminglanguage, yearsexperience) VALUES ("Mauricio", "Frontend", "JavaScript", 10);', function(err, res) {
	// 	if (err) throw err;
	// });

});

app.listen(PORT, function(){
	console.log("App is now listening on PORT: " + PORT);
});

