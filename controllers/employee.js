var Employee = require('../models/employee');
var express = require('express');
const employee_controllers = require('../controllers/employee');
var router = express.Router();

// List of all employees
exports.employee_list = async function (req, res) {
    try {
        theemployees = await Employee.find();
        res.send(theemployees);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific employee.
exports.employee_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: employee detail: ' + req.params.id);
};

// Handle employee create on POST.
exports.employee_create_post = async function (req, res) {
    console.log(req.body);
    let document = new Employee();
    document.employee_type = req.body.employee_type;
    document.department = req.body.department;
    document.salary = req.body.salary;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle employee delete form on DELETE.
exports.employee_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: employee delete DELETE ' + req.params.id);
};

// Handle employee update form on PUT.
exports.employee_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: employee update PUT' + req.params.id);
};

exports.employee_view_all_Page = async function (req, res) {
    try {
        theemployees = await Employee.find();
        res.render('employee', { title: 'employee Search Results', results: theemployees });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

/* GET employees */
// router.get('/', employee_controllers.employee_view_all_Page);
// module.exports = router;
