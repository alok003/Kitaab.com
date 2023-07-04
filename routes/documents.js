const express = require('express');

const router=express.Router();
const passport = require('passport');
const docController=require('../controllers/doc_controller');

console.log('router acessed documents');

router.get('/view',docController.view);
router.get('/dashboard',docController.dashboard);
// router.post('/createSession',docController.Csession);
// router.post('/create-user',docController.Cuser);

module.exports=router;