/*
const mysqlModel = require('mysql-model');


const MyAppModel = mysqlModel.createConnection({
    host     : "freedb.tech",
    user     : "freedbtech_jeegoo",
    password : "juju",
    database : "freedbtech_flopbox"
});



module.exports = MyAppModel;

//dbConnection.on('connected',()=>console.log("conneted to DB clients"));
*/
const Sequelize = require('sequelize');


const db =new Sequelize("freedbtech_flopbox","freedbtech_jeegoo","juju", {
    host: "freedb.tech",
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

db.authenticate().then(()=>{
    console.log("db connected")
}).catch(()=>{console.log("error connecting")})

module.exports=db;
