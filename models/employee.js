const mongoose = require("mongoose")
const employeeSchema = mongoose.Schema({
employee_type: String,
department: String,
salary: Number
})
module.exports = mongoose.model("employee",
employeeSchema)