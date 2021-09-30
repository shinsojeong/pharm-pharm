const Sequelize = require('sequelize');
const Schedule = require('./schedule.js');
const User = require('./user.js');

//const env = process.env.NODE_ENV || 'development';
const { development } = require('../config/config.js');
//config[env];
const db = {};

const sequelize = new Sequelize(development.database, development.username, development.password, development);
db.sequelize = sequelize;

db.Schedule = Schedule;
db.User = User;

Schedule.init(sequelize);
User.init(sequelize);

Schedule.associate(db);
User.associate(db);

module.exports = db;