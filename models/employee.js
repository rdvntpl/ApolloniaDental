const mongoose = require('mongoose')

const { schema } = mongoose

const employeeSchema = new mongoose.Schema({
    name : { type : String, require : true},
    surname : { type : String, require : true},
    departmentId : { type : mongoose.Types.ObjectId, require : false}
    })

module.exports = mongoose.model('Employee',employeeSchema)