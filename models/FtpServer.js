const Sequelize = require('sequelize');
const db = require('../db/db')


const FtpServer = db.define('ftpservers',{

    host: {
        type: Sequelize.STRING
    },
    port: {
        type: Sequelize.INTEGER
    },
    user_id:{
        type: Sequelize.INTEGER
    }

})

module.exports= FtpServer
