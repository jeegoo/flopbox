

class FtpServerController {

    constructor(){
        this.ftpServer = require("../models/FtpServer");
        this.userModel = require("../models/User");
        this.getAllFtpServers = this.getAllFtpServers.bind(this);
        this.getFtpServerById = this.getFtpServerById.bind(this);
        this.deleteFtpServer = this.deleteFtpServer.bind(this);
        this.updateFtpServer = this.updateFtpServer.bind(this);
        this.createFtpServer = this.createFtpServer.bind(this);

    }

    getAllFtpServers (req,res) {

             this.ftpServer.findAll( {where: {user_id: req.user.id}}).
             then(allFtpServers => res.status(200).json( allFtpServers));
    }


    getFtpServerById (req,res)  {

            this.ftpServer.findAll({where:{id:req.params.ftpserverId,user_id:req.user.id}})
                .then( ftpServer => {if(ftpServer.length!==0) res.status(200).json(ftpServer)
                                    else res.status(404).json({message:"server not found"})}
    );

    }

    createFtpServer(req,res){

            let newFtpServer = {...req.body,user_id:req.user.id}
            this.ftpServer.create(newFtpServer)
                .then( (newFtpServer) => {res.status(200).json(newFtpServer);
                } );

    }

    updateFtpServer(req,res){

            let updatedFtpServer = {...req.body,user_id:req.user.id}
            this.ftpServer.update(updatedFtpServer,{where:{id:req.params.ftpserverId,user_id:req.user.id}})
                .then( (result) => {if(result[0]===1) res.status(200).json(updatedFtpServer)
                                 else res.status(403).json({status:403,message:"cannot update server"}) } );

    }

    deleteFtpServer(req,res){

            this.ftpServer.destroy({where:{id:req.params.ftpserverId,user_id:req.user.id}})
                .then( (result) => {console.log(result);if(result===1) res.status(200).end()
                else res.status(403).json({message:"cannot delete server"}) } );

    }

}

module.exports = new FtpServerController();
