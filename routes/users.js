const express=require('express')
const router=express.Router();
const passport = require("passport");

const usersController=require('../controllers/user_controller');


router.get('/',usersController.SignIn);

router.get('/sign-up',usersController.SignUp)

router.get('/profile',usersController.profile);


router.post('/create',usersController.create)

// use passport as middleware to authenticate
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/" }),
    usersController.createSession
  );
  

module.exports=router;