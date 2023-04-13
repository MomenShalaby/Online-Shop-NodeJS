const route = require('express').Router()
const product_controller = require('../controllers/product_controller')
const home_controller=require('../controllers/home_controller')


route.get('/:id',product_controller.get_product_details)
route.get('/', home_controller.get_home);


module.exports = route;
