const express=require('express');
const { route } = require('.');
const router=express.Router();
const users_contrllers=require('../controllers/users_controllers');

router.get('/profile',users_contrllers.profile);







module.exports=router;