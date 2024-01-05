const express = require('express')
const router = express.Router()
const Department = require('../models/department')

router.get('/department', async (req,res) => {
    try {
        const departments = await Department.find({})
        res.render("departments",{list:departments})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal Server Error'})
    }
})

router.get('/departmentsDetailed', async (req,res) => {
  try {
      const departmentsDetailed = await Department.aggregate([{
        $lookup:
          {
            from:"employees",
            localField:"_id",
            foreignField:"department",
            as:"Staff",
            
          }
      },{$project: {"_id":0,"Staff._id":0,"Staff.department":0}}])
      res.render("departmentsdetailed",{list:departmentsDetailed})
  } catch (error) {
      console.log(error)
      return res.status(500).json({message:'Internal Server Error'})
  }
})
/* 
router.post(/'/department', async (req,res) => {
    try {
        let {name} = req.body
        
        if (!(name)) {
            return res.status(200).json({ message : 'Please enter the name !'})
        }
        const checkDept = await Department.findOne({name})
        if (checkDept) {
            return res.status(400).json({ message : 'Department already exists!'})
        }

        const department = new Department({name})
        await department.save()

        return res.status(200).json({message:'Department added!',department})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal Server Error'})
    }
})
*/

/*
router.put('/department/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const department = await Department.findByIdAndUpdate(id, { name }, { new: true });
      res.send(department);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
*/

/*
router.delete('/department/:id', async (req, res) => {
    const { name } = req.params;
  
    try {
      const department = await Department.findByIdAndDelete(name);
      res.send(department);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  */

module.exports = router