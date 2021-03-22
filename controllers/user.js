

class UserController {

    constructor(){

        this.User = require("../models/User");
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUserByUserName = this.getUserByUserName.bind(this);

    }

    getAllUsers (req,res) {
        this.User.findAll().
        then(allUsers => res.status(200).json( allUsers))
    }


    getUserById (req,res)  {

        this.User.findAll({where:{id:req.params.userId}} )
            .then( User => res.status(200).json(User) );

    }

     getUserByUserName (username)  {

        return this.User.findAll({where:{username:username}} );

    }

    createUser(req,res){
        let newUser = {...req.body}
        console.log(newUser);
        this.User.create(newUser)
            .then( (newUser) => res.status(200).json(newUser) );

    }

    updateUser(req,res){

        let updatedUser = {...req.body}
        this.User.update(updatedUser,{where:{id:req.params.userId}})
            .then( (updatedUser) => res.status(200).json(updatedUser) );


    }

    deleteUser(req,res){
        this.User.destroy({where:{id:req.params.userId}})
            .then( () => res.status(200).end() );

    }

}

module.exports = new UserController();
