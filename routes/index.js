const express = require('express');

const router=express.Router();
const passport = require('passport');
const homeController=require('../controllers/home_controller');

console.log('router acessed');

router.get('/',homeController.home);
router.get('/about',homeController.about);
router.get('/sign-out',homeController.sign_out);
router.use('/doc',require('./documents'));
router.post('/createSession',passport.authenticate('local',{failureRedirect:'/'},),homeController.adminLog);
router.post('/create-new-admin',homeController.Nadmin);
router.get('/admin',passport.checkAuthentication,homeController.adminLogP);

module.exports=router;