

class FtpCommandsController {

    constructor(){

        this.ftpServer = require("../models/FtpServer");
        this.servers = new Map();
        this.ftpConnection = require('easy-ftp');
        this.connect = this.connect.bind(this);
        this.pwd = this.pwd.bind(this);
        this.list = this.list.bind(this);
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.rename = this.rename.bind(this);
        this.remove = this.remove.bind(this);
        this.close = this.close.bind(this);
        this.addNewServerConnection = this.addNewServerConnection.bind(this);
        this.getServer = this.getServer.bind(this);

    }

    addNewServerConnection(user_id,server_id,newFtpConnection){

        if(this.servers.has(user_id)){
            const hasServer = this.servers.get(user_id).filter(s=>s.server_id===server_id).length!==0;
            if(!hasServer) {
                this.servers.get(user_id).push({server_id: server_id, ftpConnection: newFtpConnection});
                return true;
            }
        }
        else {
            this.servers.set(user_id,[{server_id:server_id,ftpConnection:newFtpConnection}]);
            return true;
        }


        return false;

    }

    getServer(req,res){
        const user_id=req.user.id;
        const server_id = parseInt(req.params.ftpserverId);

        if(!this.servers.has(user_id))
            return res.status(403).json({message:"You are not connected the this server"});

        const server = this.servers.get(user_id).filter(server=>server.server_id === server_id);

        if(server.length === 0 || ! server[0].ftpConnection.isConnect)
            return res.status(403).json({message:"You cannot access this server"});

        return server[0].ftpConnection;
    }

    connect (req,res) {

        this.ftpServer.findAll({where:{id:req.body.server_id,user_id:req.user.id}})
            .then( ftpServer => {

                if(ftpServer.length!==0) {
                    let connected=false;
                    const ftpConnection = new this.ftpConnection();
                    if(!this.addNewServerConnection(parseInt(req.user.id),req.body.server_id,ftpConnection))
                        return res.status(200).json({message:`Already connect to ${ftpServer[0].dataValues.host}`});

                    ftpConnection.connect({     host: ftpServer[0].dataValues.host,
                                                port: ftpServer[0].dataValues.port,
                                                username:req.body.user,
                                                password: req.body.pass,
                                                type : 'ftp'});
                    ftpConnection.on('open',()=>{  connected=true;
                       res.status(200).json({result:`connected succesfully to : ${ftpServer[0].dataValues.host} with port ${ftpServer[0].dataValues.port}`})});
                   // if (! connected) res.status(404).json({message:`failed to connect to  : ${ftpServer[0].dataValues.host} with port ${ftpServer[0].dataValues.port}`});

            }
            else res.status(404).json({message:"server not found"})})
    }

    pwd (req,res)  {

          const ftpConnection = this.getServer(req,res);

          ftpConnection.pwd((err,path)=>{
                    if(err)
                        return res.status(403).json({message:"internal error occurred"});

                    return res.status(200).json({result:`"${path}" is the current path`});
          })

    }

    list(req,res){

        const ftpConnection = this.getServer(req,res);
        const path = req.body.path;

        ftpConnection.ls(path,(err,currentDir)=>{

            if(currentDir===undefined)
                return res.status(404).json({message:"you cannot access to this directory"});
            let content=[];
            currentDir.map(cnt=>{
                content.push(cnt.name);
            })

            return res.status(200).json({result:content});
        })


    }

    download(req, res) {

        const ftpConnection = this.getServer(req, res);

        const path = req.body.path;
        const path_to_save_to = process.cwd() + "/ftp_downloads";

        ftpConnection.download(path, path_to_save_to, function (err) {

            if (err)
                return res.status(404).json({message: `cannot download make sure the path '${path}' is correct`});
            res.status(200).json({message: `'${path}' downloaded to '${path_to_save_to}' successfully`});

        })

        ftpConnection.on('download', (path) => console.log(`downloaded '${path}' successfully`));

    }

    upload(req, res) {

        const ftpConnection = this.getServer(req, res);
        const {local_path,remote_path} = req.body;


        ftpConnection.upload(local_path, remote_path, function (err) {
            console.log(err)
            if (err) {
                let error_msg=""
                if (typeof err.code !== 'undefined') {
                    error_msg=`cannot upload make sure the path '${local_path}' is correct`
                }
                else {error_msg=`Permission denied`}

                return res.status(404).json({message: error_msg});

            }
            res.status(200).json({message: `'${local_path}' uploaded to '${remote_path}' successfully`});

        })

        ftpConnection.on('upload', (path) => console.log(`uploaded '${path}' successfully`));

    }

    rename(req, res) {

        const ftpConnection = this.getServer(req, res);
        const {old_path,new_path} = req.body;


        ftpConnection.mv(old_path, new_path, function (err) {

            if (err) {
                let error_msg=""
                if (typeof err.code !== 'undefined') {
                    error_msg=`file doesn't exist make sure the path '${old_path}' is correct`
                }
                else {error_msg=`Permission denied`}

                return res.status(404).json({message: error_msg});

            }
            res.status(200).json({message: `'${old_path}' renamed to '${new_path}' successfully`});

        })


    }

    remove(req, res) {

        const ftpConnection = this.getServer(req, res);
        const {path} = req.body;


        ftpConnection.rm(path, function (err) {

            if (err) {
                let error_msg=""
                if (typeof err.code !== 'undefined') {
                    error_msg=`file doesn't exist make sure the path '${path}' is correct`
                }
                else {error_msg=`Permission denied`}

                return res.status(404).json({message: error_msg});

            }
            res.status(200).json({message: `'${path}' removed successfully`});

        })


    }

    close(req,res){

    }

}

module.exports = new FtpCommandsController();
