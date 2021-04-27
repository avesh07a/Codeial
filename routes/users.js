const express=require('express');
const passport=require('passport');
const passportLocal=require('../config/passport-local');

const { route } = require('.');
const router=express.Router();
const users_contrllers=require('../controllers/users_controllers');


router.get('/profile',passport.checkAuthentication,users_contrllers.profile);
router.get('/signup',users_contrllers.SignUp);
router.get('/signin',users_contrllers.SignIn);
router.post('/createUser',users_contrllers.createUser);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},

),users_contrllers.createSession);

router.get('/signout',users_contrllers.destroySession);




module.exports=router;