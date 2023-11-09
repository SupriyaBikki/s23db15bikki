var Employee = require('../models/employee');
// List of all employees

// List of all employees
exports.employee_list = async function(req, res) {
    try{
    theemployees = await Employee.find();
    res.send(theemployees);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    
// exports.employee_list = function(req, res) {
// res.send('NOT IMPLEMENTED: employee list');
// };
// for a specific employee.
exports.employee_detail = function(req, res) {
res.send('NOT IMPLEMENTED: employee detail: ' + req.params.id);
};
// Handle employee create on POST.
exports.employee_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: employee create POST');
};
// Handle employee delete form on DELETE.
exports.employee_delete = function(req, res) {
res.send('NOT IMPLEMENTED: employee delete DELETE ' + req.params.id);
};
// Handle employee update form on PUT.
exports.employee_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: employee update PUT' + req.params.id);
};
