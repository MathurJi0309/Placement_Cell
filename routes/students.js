const express=require('express');

const router=express.Router();

const studentController=require('../controllers/student_controller')

router.get('/addstudent',studentController.addStudent)
router.post('/create',studentController.createStudent)
router.get("/editstudent/:id", studentController.editStudent);
router.post("/update/:id", studentController.update);
router.get("/deletestudent/:studentId",studentController.destroy);


module.exports=router;