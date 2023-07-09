const express = require('express');

const router=express.Router();
const passport = require('passport');
const adminController=require('../controllers/admin_controller');

console.log('router acessed admin');


router.get('/adminProfile',passport.checkAuthentication,adminController.adminLogP);
// view all files list and their details carry operation on them
// view all user list and their details carry operation on them 

// change your details make else admin or kickout admin


module.exports=router;