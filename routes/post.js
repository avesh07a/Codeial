const express=require('express');
const router=express.Router();
const passport=require('passport');
const Post=require('../controllers/post_controller')


router.post('/create',passport.checkAuthentication,Post.create);
router.get('/destroy/:id',passport.checkAuthentication,Post.destroy);


module.exports=router;