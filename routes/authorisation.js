const express  = require('express')
const validator = require('express-joi-validation').createValidator({})

const {createAccountSchema,loginSchema} = require('../schema.js') // payloads schemas
const {emailMiddleware,passwordMiddleware,usernameMiddleware} = require('../middleware/custom_middleware.js')
const {createAccount} = require('../controllers/create_controller.js') // create account controller
const {loginController} = require('../controllers/login_controller.js')
const {logoutController} = require('../controllers/logout.controller.js')

const router = express.Router()

router.use((res,req,next)=>{
    console.log(`Authorisation endpoint hit`)
    next()
})

router.get('/',(req,res)=>{
    res.send({
        status:`${res.status}`
    })
})

router.post('/create',validator.body(createAccountSchema),usernameMiddleware,emailMiddleware,passwordMiddleware,createAccount)

router.post('/login',validator.body(loginSchema),loginController)

router.post('/logout',logoutController) // checks if user is logged by checking cookie then logout accordingly




module.exports = router; // exports router from module