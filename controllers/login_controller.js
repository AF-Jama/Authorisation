// Login user controller
const {authTable,authPasswords,sequelize} = require('../config.js')
const { hash,compare } = require('bcrypt')

//controller logic
const loginController = async (req,res,next) =>{
    const {username,password} = req.body // destructures request body
    try {
        console.log("Login controller hit")
        if(req.cookies.hasOwnProperty('logged_in')) return res.status(200).send({"msg":`User ${username} is already logged in`})
        const user = await authTable.findOne({where:{username:username}})
        if (user === null) throw new Error("User does not exist ");
        console.log("Here 1")
        console.log("Here 2")
        console.log(user.password)
        const passwordCompare = await compare(password,user.password) // compares hash with plain text password
        console.log("Here 3")
        if(passwordCompare && user.username === username){
            var hour = 3600000
            res.cookie('logged_in',true,{
                expires: new Date(Date.now()+(hour*24*31)) // sets expiration date to one month to the future
            })
            res.cookie("username",username)
            return res.json({
                msg:"Succesfully logged in"
            })
        } 
        throw new Error("Wrong password"); // triggered if password and username are not matched and hence triggers error
    } catch (error) {
        error.status = ""
        next(error)
    }
}

// const user = authTable.findOne({where:{username:'JoeLane'}})

// user.then(res=>console.log(res))

module.exports = {
    loginController
}