const Sequelize = require('sequelize');
const db = require('../db/db')
const ftpServerModel = require("../models/FtpServer");

const User = db.define('user',{

    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },

})

User.hasMany(ftpServerModel,{foreignKey: 'user_id'});
ftpServerModel.belongsTo(User,{foreignKey: 'user_id'});


module.exports = User
