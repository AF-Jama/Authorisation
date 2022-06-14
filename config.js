const {createPool} = require('mysql')
const {Sequelize,Model,DataTypes,STRING,DATE,BIGINT,CHAR} = require('sequelize')
require('dotenv').config()

// const pool = createPool({
//     user:'root',
//     password: process.env.PASSWORD,
//     database:process.env.databaseName
// })

// creating models 
/*
1) Authpasswords
2) Authtable 
*/

const sequelize = new Sequelize({
    username:'root',
    password:process.env.PASSWORD, 
    database:process.env.databaseName,
    dialect:'mysql'
})

// testing connection to database
async function test(){
    try {
        await sequelize.authenticate()
        console.log(`Succesfully connected to database`)
    } catch (error) {
        console.log(`Error when connecting to database ${error}`)
    }
}

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
})

/* 

    created_at:{
        type:DATE,
        allowNull:false,
        defaultValue: sequelize.fn.now
    }

*/

const authPasswords = sequelize.define('authPasswords',{
    pID:{
        type:BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    userId:{
        type:BIGINT,
        allowNull:false,
        references:{
            model:authTable,
            key:'id',
            
            
        },
        onDelete:'cascade'
    },
})

async function createTable(){
    try {
        await authTable.sync()
        await authPasswords.sync()   
    } catch (error) {
        console.log(`Error ${error}`)
    }
}

// createTable()

module.exports = {
    authTable,
    authPasswords  
}; //exporting pool connection to database

