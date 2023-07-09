const express = require('express');

const router=express.Router();
const passport = require('passport');
const docController=require('../controllers/doc_controller');

router.get('/view',docController.view);
router.get('/likeF/:id',docController.likeF);
router.get('/download/:id',docController.download);
router.use('/dashboard',require('./dashboard'));
router.post('/createSession',passport.authenticate('local',{failureRedirect:'/'},),docController.Csession);
router.post('/create-user',docController.Cuser);
router.post('/updateP',passport.checkAuthentication,docController.update);
router.get('/sign-out',docController.sign_out);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),docController.Csession);

module.exports=router;