const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log('Router loaded')
// router.get('/',homeController.home);
router.use('/',require('./users.js'))
router.use('/home',require('./home'))
router.use('/student',require('./students'))

module.exports=router;