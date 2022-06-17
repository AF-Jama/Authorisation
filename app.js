const express = require('express')
require('dotenv').config()
const db = require('./models')
const app = express()

// middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json()) // to parse incoming json payload



app.use('/v0',require('./routes/authorisation.js')) // base endpoint middleware


app.get('/',(req,res,next)=>{
    return res.json({
        msg:"Base response"
    })
})











// error handler middleware when next(error) is triggered in middleware
app.use((err,req,res,next)=>{
    if(err){
        console.log(`Error handler middleware hit`)
        return res.json({
            error:err.status||400,
            msg:err.message
        })
    }
})


db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on port ${process.env.PORT}`)
    })
})
