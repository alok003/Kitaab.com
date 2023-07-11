const express = require('express');

const router=express.Router();
const passport = require('passport');
const homeController=require('../controllers/home_controller');

console.log('router acessed');

router.get('/',homeController.home);
router.use('/doc',require('./documents'));

module.exports=router;