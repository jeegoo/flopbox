const EasyFtp = require('easy-ftp');
const ftp = new EasyFtp();
var config = {
    host: '',
    port: 21,
    username: '',
    password: '',
    type : 'ftp'
};

//서버 접속(connect)
ftp.connect(config);

