const { Router } = require('express');
const express=require('express');
const router=express.Router();
const homecntroller=require('../controllers/home_controller');

router.get('/',homecntroller.home);
router.use('/users',require('./users'));





module.exports=router;