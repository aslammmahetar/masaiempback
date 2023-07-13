const mongoose = require("mongoose")

const empSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    department: String,
    salary: Number
}, {
    __v: false
})

const EmpModel = mongoose.model("employee", empSchema)

module.exports = { EmpModel }