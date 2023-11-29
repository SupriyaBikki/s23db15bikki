const mongoose = require("mongoose")
const employeeSchema = mongoose.Schema({
employee_type: String,
department: String,
salary: {
    type : String,
    min : [1000 , 'minimum 1000'],
    max : [10000 , 'maximum 10000']
}
})
module.exports = mongoose.model("employee",
employeeSchema)