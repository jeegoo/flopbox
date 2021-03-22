const express=require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv=require('dotenv');
const cors = require("cors");

const port=3030;
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const ftpServerRoute = require('./routes/ftpServer')
const ftpCommandsRoute = require('./routes/ftpCommands')

dotenv.config();


app.use(bodyParser.json());
app.use(cors());

app.use(loginRoute); //login
app.use(userRoute);  //user
app.use(ftpServerRoute); //ftpservers
app.use(ftpCommandsRoute); //ftpservers

app.listen(port);
