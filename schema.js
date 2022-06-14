//creating schema for incoming payloads
const Joi = require('joi')

// create account schema 
const createAccountSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})

// create login scheme
const loginSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
})










module.exports = {
    createAccountSchema,
    loginSchema
}