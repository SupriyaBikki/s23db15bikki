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


