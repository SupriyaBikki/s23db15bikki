// routes/resource.js

var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var employee_controller = require('../controllers/employee');

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }

// API ROUTE
router.get('/', api_controller.api);

// COSTUME ROUTES
router.post('/employee', secured, employee_controller.employee_create_post);
router.delete('/employee/:id',secured, employee_controller.employee_delete);
router.put('/employee/:id',secured, employee_controller.employee_update_put);
router.get('/employee/:id',secured, employee_controller.employee_detail);
 router.get('/employee',secured, employee_controller.employee_list);
//  router.post('/employees', employee_controller.employee_create_post);

//  router.post('/costumes', costume_controllers.costume_create_post);



module.exports = router;