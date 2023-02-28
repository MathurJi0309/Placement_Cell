const express=require("express");
const interviewController=require('../controllers/interview_controller');
const router=express.Router();

router.get("/addinterview",interviewController.addInterview);
router.post('/create',interviewController.create);
router.get("/scheduledinterviews",interviewController.scheduled)
router.post('/enroll/:id',interviewController.enroll)
router.get('/remove/:studentId/:interviewId',interviewController.remove)

module.exports=router;
