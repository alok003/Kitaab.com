const express = require('express');

const router=express.Router();
const passport = require('passport');
const dashController=require('../controllers/dash_controller');


router.get('/dashboardView',passport.checkAuthentication,dashController.dashboard);
// upload new File
router.post('/new-file-upload',passport.checkAuthentication,dashController.newfile);
// view old file stats
router.get('/deleteF/:id',passport.checkAuthentication,dashController.delfile);
// update your profile
router.post('/updatepwd',passport.checkAuthentication,dashController.updpwd);

module.exports=router;