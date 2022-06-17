const {Sequelize,DataTypes,BIGINT,CHAR} = require("sequelize");

const sequelize = new Sequelize({
    username:'root',
    password:process.env.PASSWORD, 
    database:process.env.databaseName,
    dialect:'mysql'
})

// // creating authTable
// module.exports = (sequelize,DataTypes)=>{
//     const authPassword = sequelize.define('authPassword',{
        // pID:{
        //     type:BIGINT,
        //     allowNull:false,
        //     primaryKey:true,
        //     autoIncrement:true,
        // },
        // password:{
        //     type:CHAR(60),
        //     allowNull:false,
        //     }

// })


module.exports = (sequelize,DataTypes) =>{
    const authPassword = sequelize.define('authPassword',{
        pID:{
            type:BIGINT,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        password:{
            type:CHAR(60),
            allowNull:false,
        }

    })
    authPassword.associate = models=>{
        authPassword.belongsTo(models.authTable)
    }
    return authPassword;
}