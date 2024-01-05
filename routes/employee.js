const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

router.get('/employee', async (req,res) => {
    try {
        const employees = await Employee.find({},{_id:0})
        res.render("employees",{list:employees})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal Server Error'})
    }
})

/*
router.post('/employee', async (req,res) => {
    try {
        let {name,surname} = req.body
        
        if (!(name&&surname)) {
            return res.status(200).json({ message : 'Please fill name and surname !'})
        }
        const checkEmp = await Employee.findOne({name,surname})
        if (checkEmp) {
            return res.status(400).json({ message : 'Employee already exists!'})
        }

        const employee = new Employee({name,surname})
        await employee.save()

        return res.status(200).json({message:'Employee added!',employee})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal Server Error'})
    }
})
*/

/*
router.put('/employee/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;
  
    try {
      const employee = await Employee.findByIdAndUpdate(id, { name, surname }, { new: true });
      res.send(employee);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
*/

/*
router.delete('/employee/:id', async (req, res) => {
    const { name,surname } = req.params;
  
    try {
      const employee = await Employee.findByIdAndDelete(name,surname);
      res.send(employee);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
*/

module.exports = router