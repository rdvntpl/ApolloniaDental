const mongoose = require('mongoose')

const { schema } = mongoose

const departmentSchema = new mongoose.Schema({
    name : { type : String, require : true}
    })

module.exports = mongoose.model('Department',departmentSchema)