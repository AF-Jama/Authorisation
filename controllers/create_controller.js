// create account controller when payload is validated
const {authTable,authPasswords,sequelize} = require('../config.js')
const { hash } = require('bcrypt')
const { use } = require('../routes/authorisation.js')

const saltRounds = 10

const createAccount = async (req,res,next)=>{
    const {username,email,password} = req.body  // destrucrures request payload
    const t = await sequelize.transaction();
    const hash_password = await hash(password,saltRounds) // hashing of password plain text
    try {
        console.log("Create controller hit")
        await authTable.create({username:username,email:email,password:hash_password},{ transaction: t })
        await t.commit() // commits if creation is succesful (ie: no error is triggered)
        var hour = 3600000 // hour in milliseconds
        res.cookie('new_user',true,{
            expires: new Date(Date.now()+(hour*24*62))
        })// creates new user identifier cookie, required for possible targeted ads to new users in the first month
        return res.send({
            msg:"Succesfully created account"
        })
    } catch (error) {
        await t.rollback()
        error.status = 900
        error.message = "Account already exists"
        next(error)
    }
}


module.exports = {
    createAccount
}