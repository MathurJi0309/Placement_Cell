const express=require('express')
const router=express.Router();

const usersController=require('../controllers/user_controller');


router.get('/',usersController.SignIn);

router.get('/sign-up',usersController.SignUp)

router.get('/profile',usersController.profile);


router.post('/create',usersController.create)

router.post('/create-session',usersController.createSession)

module.exports=router;