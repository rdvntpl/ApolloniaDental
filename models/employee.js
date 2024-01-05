const mongoose = require('mongoose')

const { schema } = mongoose

const employeeSchema = new mongoose.Schema({
    name : { type : String, require : true},
    surname : { type : String, require : true}
    })

module.exports = mongoose.model('Employee',employeeSchema)