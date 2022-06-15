// create account controller when payload is validated
const {authTable,authPasswords,sequelize} = require('../config.js')
const { hash } = require('bcrypt')

const saltRounds = 10

hash('Ronaldo81.',saltRounds)
.then(res=>console.log(res))
.catch(err=>console.log(err))

const createAccount = async (req,res,next)=>{
    const {username,email,password} = req.body  // destrucrures request payload
    const t = await sequelize.transaction();
    try {
        console.log("Create controller hit")
        const hash_password = await hash(password,saltRounds)
        await authTable.create({username:username,email:email,password:hash_password},{ transaction: t })
        await t.commit()
        return res.send({
            msg:"Succesfully created"
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