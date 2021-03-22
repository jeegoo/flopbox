
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
