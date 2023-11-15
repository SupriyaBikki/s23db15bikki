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
// exports.employee_detail = function (req, res) {
//     res.send('NOT IMPLEMENTED: employee detail: ' + req.params.id);
// };
// for a specific employee.
exports.employee_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Employee.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle employee update form on PUT.
exports.employee_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Employee.findById(req.params.id)
        // Do updates of properties
        if (req.body.employee_type)
            toUpdate.employee_type = req.body.employee_type;
        if (req.body.department) toUpdate.department = req.body.department;
        if (req.body.salary) toUpdate.salary = req.body.salary;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};


exports.employee_detail = async function (req, res) {
    console.log("detail" + req.params.id); // Log the detail and the id parameter from the request.

    try {

        const result = await Employee.findById(req.params.id);

        if (result) {

            res.send(result);
        } else {

            res.status(404).send({ "error": "Document for id ${req.params.id} not found" });
        }
    } catch (error) {
        // If an error occurs during the database query, send a 500 status and an error message.
        res.status(500).send({ "error": "Internal Server Error" });
    }
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
exports.employee_delete = async function (req, res) {
    console.log("delete " + req.params.id)
try {
result = await Employee.findByIdAndDelete( req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
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

// Handle a show one view with id specified by query
exports.employee_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Employee.findById( req.query.id)
    res.render('employeedetail',
    { title: 'employee Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };


// Handle building the view for creating a employee.
// No body, no in path parameter, no query.
// Does not need to be async
exports.employee_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('employeecreate', { title: 'employee Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle building the view for updating a employee.
// query provides the id
exports.employee_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await Employee.findById(req.query.id)
res.render('employeeupdate', { title: 'employee Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle a delete one view with id from query
exports.employee_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Employee.findById(req.query.id)
    res.render('employeedelete', { title: 'employee Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
