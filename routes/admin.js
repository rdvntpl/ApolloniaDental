const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const Department = require('../models/department')

router.get('/admin', async (req,res) => {
    try {
        const employees = await Employee.find({})
        const departments = await Department.find({})
        res.render('admin', {employees, departments})
    } catch (error) {
        console.log('err:'+error)
        res.redirect('/')
    }
})

module.exports = router
