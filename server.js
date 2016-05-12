var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./config/connection.js');
var moment = require('moment')
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var Session = require("./model/session.js");

var app = express();
var PORT = process.env.PORT || 80;

// use morgan to log requests to the console
app.use(morgan('dev'));

// Sets JSON Web Token Secret for Encryption
app.set('jwtSecret', "CODINGROCKS"); // Can put anything in here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static('public'));


app.post('/auth',function(req,res, next){

	console.log(req.body)
	var input = 'SELECT * FROM teachers WHERE name="'+ req.body.username+'";'
	connection.query(input, function(err,result){

		// console.log(result)

		if (result == []) {
			res.json({success: false, message: 'Authentication failed. User not found.'})
		} else {

			if (req.body.password == result[0].password) {

				var token = jwt.sign(result[0], app.get('jwtSecret'), {
		          expiresIn: '1440m' // expires in 24 hours
		        });

		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });

		        console.log("/teacher?token=" + token);

		        next();

			} else {
				res.json({success: false, message: 'Authentication failed. Password Incorrect.'})
			}	

		}

		if (err) throw err;

	});

});

// app.all('*', function(req, res, next) {
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

//     // If a token is given...
//     if (token){

//     	// Attempt to verify it against hte app's jwtSecret (In our case: "CODINGROCKS")
//         jwt.verify(token, app.get('jwtSecret'), function(err, decoded){

//         	// If an error is experienced log it.
//             if(err){
//                 console.log("Uh... You call that a token? Hah!");
//                 return res.json({success: false, message: 'Uh... You call that a token? Hah!'});
            
//             // If the token is valid let the user know!
//             } else {
//                 // if token is valid, save to request for use in other routes
//                 console.log("Token looks legit to me. Have fun with our API!");

//                 // Save that in the requests' "decoded" property so its kept for future use
//                 req.decoded = decoded;

//                 // Proceed to check out the API routes. 
//                 next();
//             }
//         });

//     // If no token is provided also let the user know!
//     } else {
//         // no token provided
//         return res.status(403).send({
//             success: false,
//             message: "Bro. Did you even send me a token?"
//         });
//     }
// });

app.get('/teacher',function(req,res){
	console.log("BLAH");
	res.sendFile(path.join(__dirname+'/public/mat.html'));
});

app.get('/student',function(req,res){
	res.sendFile(path.join(__dirname+'/public/student.html'));
});

// app.get('/student',function(req,res){
// 	res.sendFile(path.join(__dirname+'/public/index.html'));
// });

app.get('/api/teacher',function(req,res){

	// var input = 'SELECT * FROM sessions;'
	// connection.query(input, function(err,result){
	// 	console.log(result);
	// 	if (err) throw err;
	// 	res.json(result);
	// });

	Session.findAll({
		where: {
			available: true,
		},
		order: ['time']
	})
		.then(function(result){
			res.json(result);
		})

	// console.log(moment('2010-10-20 12:10:30').isAfter('2010-01-01 12:10:30'));

	
});

app.post('/update',function(req,res){

	Session.update({
		available: false,
	}, {
		where: {
			id: req.body.id
		}
	});
	
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

		Session.create({
			time: m.format('YYYY-MM-DD HH:mm:SS'),
			teacher: req.body.name,
			available: true
		});

		// var input = 'INSERT INTO sessions(time, teacher, available) VALUES ("' + m.format('YYYY-MM-DD HH:mm:SS') + '", "'+req.body.name+'", "yes");'

		// connection.query(input, function(err,result){
		// 	if (err) throw err;
		// });

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

