var mysql = require('mysql');
var password = require('./password.js')
// Dependencies
var Sequelize = require("sequelize");

// var connection = mysql.createConnection({
//     port: 3306,
//     host: 'localhost',
//     user: 'root',
//     password: password,
//     database: 'help_db'
// });

// connection.connect(function(err){
//     if (err){
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });

// module.exports = connection;

var source = {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'help_db'
}

var sequelize = new Sequelize(source.database, source.user, source.password, {
  host: source.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

// Exports the connection for other files to use
module.exports = sequelize;