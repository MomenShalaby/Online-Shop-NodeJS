const routes = require('express').Router()
const home_controller=require('../controllers/home_controller')

// Add routes
routes.get('/', home_controller.get_home);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
