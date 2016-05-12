// *********************************************************************************
// CHARACTER.JS - THIS FILE CREATES A MODELED OF INDIVIDUAL CHARACTERS IN DB
// *********************************************************************************

// Dependency

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 
// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js"); 

// Creates a "Character" model that matches up with DB
var Session = sequelize.define("session", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	time: {
		type: Sequelize.DATE,
	},
	teacher: {
		type: Sequelize.STRING(50),
	},
	available: {
		type: Sequelize.BOOLEAN,
	}
}, {
	timestamps: false
});

// Syncs with DB
Session.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Session;