const express=require('express');
const { route } = require('.');
const router=express.Router();
const users_contrllers=require('../controllers/users_controllers');

router.get('/profile',users_contrllers.profile);
router.get('/signup',users_contrllers.SignUp);
router.get('/signin',users_contrllers.SignIn);
router.post('/createUser',users_contrllers.createUser);





module.exports=router;