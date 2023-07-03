const express = require('express');

const router=express.Router();

const docController=require('../controllers/doc_controller');

console.log('router acessed documents');

router.get('/view',docController.view);
router.get('/dashboard',docController.dashboard);

module.exports=router;