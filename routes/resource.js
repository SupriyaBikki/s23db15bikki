// routes/resource.js

var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var employee_controller = require('../controllers/employee');


// API ROUTE
router.get('/', api_controller.api);

// COSTUME ROUTES
router.post('/employee', employee_controller.employee_create_post);
router.delete('/employee/:id', employee_controller.employee_delete);
router.put('/employee/:id', employee_controller.employee_update_put);
router.get('/employee/:id', employee_controller.employee_detail);
 router.get('/employee', employee_controller.employee_list);
//  router.post('/costumes', costume_controllers.costume_create_post);



module.exports = router;