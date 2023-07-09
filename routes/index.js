const express = require('express');

const router=express.Router();
const passport = require('passport');
const homeController=require('../controllers/home_controller');

console.log('router acessed');

router.get('/',homeController.home);
router.get('/about',homeController.about);
router.use('/doc',require('./documents'));
router.use('/admin',require('./admin'));

module.exports=router;