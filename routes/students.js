const express=require('express');

const router=express.Router();

const studentController=require('../controllers/student_controller')

router.get('/addstudent',studentController.addStudent)
router.post('/create',studentController.createStudent)



module.exports=router;