const mongoose = require("mongoose")
const employeeSchema = mongoose.Schema({
employee_type: String,
size: String,
cost: Number
})
module.exports = mongoose.model("employee",
employeeSchema)