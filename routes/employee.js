const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const Department = require('../models/department')

//READ ALL
router.get('/employee', async (req,res) => {
    try {
        const employees = await Employee.find({})
        const departments = await Department.find({})
        res.locals.departments = departments
        res.render("employees",{list:employees})
    } catch (error) {
        console.log('err:'+error)
        return res.redirect('/employee');// status(500).json({message:'Internal Server Error'})
    }
})

//ADD
router.post('/employee', async (req,res) => {
    try {
        const {name,surname,department} = req.body
        
        if (!(name&&surname)) {
            return res.redirect('/admin');// status(400).json({ message : 'Please fill name and surname !'})
        }
        const checkEmp = await Employee.findOne({name,surname})
        if (checkEmp) {
            console.log('error: already exists '+checkEmp)
            return res.redirect('/admin'); //status(400).json({ message : 'Employee already exists!'})
        }

        const deptID = await Department.findOne({name:department},'_id')
        console.log(department+' / ok report: '+deptID._id)
        const employee = new Employee({name,surname,departmentId:deptID})
        console.log('ok report2: '+employee)
        await employee.save()

        return res.redirect('/admin');// status(200).json({message:'Employee added!',employee})

    } catch (error) {
        console.log(error)
        return res.redirect('/admin');// status(500).json({message:'Internal Server Error'})
    }
})

//UPDATE
router.post('/employee/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname, department } = req.body;

    const deptID = await Department.findOne({name:department},'_id')
  
    try {
      const employee = await Employee.findByIdAndUpdate(id, { name, surname , departmentId:deptID });
      console.log('update ok')
      res.redirect('/admin');
    } catch (error) {
      console.log('update ERROR')
      console.error(error);
      res.redirect('/admin');
    }
  });

//DELETE
router.get('/employee/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await Employee.findByIdAndDelete(id);
      console.log('DELETE ok')
      res.redirect('/admin');
    } catch (error) {
      console.log('DELETE ERROR')
      console.error(error);
      res.redirect('/admin');
    }
  });


module.exports = router