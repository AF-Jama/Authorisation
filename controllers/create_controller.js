// create account controller when payload is validated
const {authTable,authPasswords} = require('../config.js')
const { hash } = require('bcrypt')

const saltRounds = 100

const createAccount = async (req,res,next)=>{
    const {username,email,password} = req.body // destrucrures request payload

    try {
        const hash_password = await hash(password,saltRounds) // hashes plain text passwords
        await authTable.create({username:username,email:email,password:hash_password})
        return res.send({
            msg:"Succesfully created"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createAccount
}