
const User=require('../models/users');

module.exports.profile=function(req,res){
    return res.render('usersProfile',{
        title:'Profile'
    });
}

module.exports.SignUp=function(req,res)
{
    if(req.isAuthenticated)
    {
        return res.redirect('/users/profile');
    }
    return res.render('signUp',{
        title:'Sign Up'
    })
}
module.exports.SignIn=function(req,res)
{
    return res.render('signIn',{
        title:'Sign In'
    })
}

module.exports.destroySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}

module.exports.createUser=function(req,res)
{
    
    if(req.body.password!=req.body.confirmpassword)
    {
        return res.redirect('back');
    }
    


    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding the user ');}
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating the new user ');}
                return res.redirect('/users/signin');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })
}
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}