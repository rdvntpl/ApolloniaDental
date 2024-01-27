const express = require('express')
const router = express.Router()
const Department = require('../models/department')

//Read ALL
router.get('/department', async (req,res) => {

    try {
        const departments = await Department.find({})
        res.render("departments",{list:departments})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal Server Error'})
    }
})

//Read Department with Employees
router.get('/departmentsDetailed', async (req,res) => {
  try {
      const departmentsDetailed = await Department.aggregate([{
        $lookup:
          {
            from:"employees",
            localField:"_id",
            foreignField:"departmentId",
            as:"Staff",
            
          }
      },{$project: {"_id":0,"Staff._id":0,"Staff.department":0}}])
      res.render("departmentsdetailed",{list:departmentsDetailed})
  } catch (error) {
      console.log(error)
      return res.status(500).json({message:'Internal Server Error'})
  }
})

//ADD
router.post('/department', async (req,res) => {
    try {
        const {name} = req.body
        console.log(name)
        
        if (!(name)) {
          console.log('ADD : NO NAME ERROR')
            return res.redirect('/department')
        }
        const checkDept = await Department.findOne({name})
        if (checkDept) {
          console.log('ADD : EXiSTS')
            return res.redirect('/department')
        }

        const department = new Department({name})
        await department.save()

        console.log('ADD OK')
        return res.redirect('/department')

    } catch (error) {
        console.log(error)
        console.log('ADD ERROR')
        return res.redirect('/department')
    }
})

//Update
router.post('/department/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    console.log('id:'+id+" ,name:"+name);

    try {
      const department = await Department.findByIdAndUpdate(id, { name });
      console.log('UPDATE OK')
      return res.redirect('/department')
    } catch (error) {
      console.error(error);
      console.log('UPDATE ERROR')
      return res.redirect('/department')
    }
  });


//DELETE
router.get('/department/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const department = await Department.findByIdAndDelete(id);
      console.log('DELETE OK')
      return res.redirect('/department')
      
    } catch (error) {
      console.error(error);
      console.log('DELETE ERROR')
      return res.redirect('/department')
    }
  });

module.exports = router