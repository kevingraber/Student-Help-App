// *********************************************************************************
// CHARACTER.JS - THIS FILE CREATES A MODELED OF INDIVIDUAL CHARACTERS IN DB
// *********************************************************************************

// Dependency

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 
// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js"); 

// Creates a "Character" model that matches up with DB
var User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
	},
	username: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	admin: {
		type: Sequelize.BOOLEAN,
	}
}, {
	timestamps: false
});

// Syncs with DB
User.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = User;