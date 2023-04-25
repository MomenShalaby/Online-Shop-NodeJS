const routes = require('express').Router()
const bodyParser = require('body-parser')
const auth_controller=require('../controllers/auth_controller')


routes.get('/signup',auth_controller.get_signup)

routes.post('/signup',auth_controller.post_signup)

routes.get('/login',auth_controller.get_login)

routes.post('/login',auth_controller.post_login)

routes.all('/logout',auth_controller.logout)

module.exports = routes
