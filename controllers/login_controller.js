// Login user controller
const {authTable,authPasswords,sequelize} = require('../config.js')
const { hash,compare } = require('bcrypt')

//controller logic
const loginController = async (req,res,next) =>{
    const {username,password} = req.body // destructures request body
    try {
        console.log("Login controller hit")
        const user = await authTable.findOne({where:{username:username}})
        if (user === null) throw new Error;
        console.log("Here 1")
        console.log("Here 2")
        console.log(user.password)
        const passwordCompare = await compare(password,user.password) // compares hash with plain text password
        console.log("Here 3")
        if(passwordCompare && user.username === username){
            return res.json({
                msg:"Succesfully logged in"
            })
        } 
        throw new Error; // triggered if password and username are not matched and hence triggers error
    } catch (error) {
        error.status = "Could not login either the account does not exist or your credentials are wrong."
        next(error)
    }
}

// const user = authTable.findOne({where:{username:'JoeLane'}})

// user.then(res=>console.log(res))

module.exports = {
    loginController
}