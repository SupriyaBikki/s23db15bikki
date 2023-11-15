// routes/employee.js
var express = require('express');
var router = express.Router();
var employee_controllers = require('../controllers/employee');

// ... other routes ...

// GET request for all employees.
/* GET employees */
router.get('/', employee_controllers.employee_view_all_Page);
module.exports = router;

// ... other routes ...
/* GET detail employee page */
router.get('/detail', employee_controllers.employee_view_one_Page);

/* GET create employee page */
router.get('/create', employee_controllers.employee_create_Page);
/* GET create update page */
router.get('/update', employee_controllers.employee_update_Page);
/* GET delete employee page */
router.get('/delete', employee_controllers.employee_delete_Page);

