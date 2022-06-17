const {Sequelize,Model,DataTypes,STRING,DATE,BIGINT,CHAR} = require('sequelize')

// reference to database
const sequelize = new Sequelize({
    username:'root',
    password:process.env.PASSWORD, 
    database:process.env.databaseName,
    dialect:'mysql'
})

// function that creates authTable model
module.exports = (sequelize,DataTypes)=>{
    const authTable = sequelize.define('authTable',{
        id:{
            type:BIGINT,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        username:{
            type:CHAR(50),
            allowNull:false,
            unique:true,
        },
        email:{
            type:CHAR(255),
            allowNull:false,
            unique:true,
        },
        password:{
            type:CHAR(60),
            allowNull:false,
        },
        created_at:{
            type:DATE,
            allowNull:false,
            //create default timestamp
            defaultValue:DataTypes.NOW
        }
        
    },{
        timestamps:false  
    })
    // creating assocation
    authTable.associate = models =>{
        authTable.hasOne(models.authPassword,{
            onDelete:'cascade'
        })
    } 
    return authTable; // returns model to function
}
