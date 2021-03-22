

class Login {

    constructor(){
        this.jwt=require('jsonwebtoken');
        this.userController=require('./user');
        this.generateToken = this.generateToken.bind(this);
        this.authenticateToken = this.authenticateToken.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.getUserData = this.getUserData.bind(this);

    }

    generateToken (req,res) {

        const {username,password} = req.body;

        this.getUserData(username,password).then(user=>{

            if(user!==[] && password===user[0].dataValues.password){
                const userToProtect = {id:user[0].dataValues.id,username:username};

                const accesToken = this.jwt.sign(userToProtect,process.env.ACCESS_TOKEN_SECRET);
                return res.json({accesToken:accesToken})
            }
            return res.json({succes:0,message:"invalide user or password"})

        }).catch(err=>res.json({succes:0,message:"invalide user or password"}));



    }

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.json({succes:0,message:"no given token! please specify a token"})

        this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

            if (err) return res.json({succes:0,message:"invalide token"})
            req.user = user
            next()
        })
    }

    checkLogin(username,password){

        let res = this.userController.getUserByUserName(username);
        console.log(res);
        return true;
    }

    getUserData(givenUsername) {

        return this.userController.getUserByUserName(givenUsername);

    }





}

module.exports = new Login();
