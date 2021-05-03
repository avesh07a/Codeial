
const User=require('../models/users');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
       return res.render('usersProfile',{
        title:'Profile',
        user_profile:user
    }); 
    })
    
}
module.exports.update=function(req,res)
{
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }
    else
    {
        return res.status(401).send('Unauthorised');
    }
}
module.exports.SignUp=function(req,res)
{
    console.log('hii');
    // if(req.isAuthenticated)
    // {
    //     return res.redirect('/users/profile');
    // }
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
    req.flash('success','logged out successfully');
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
    req.flash('success','logged in successfully');
    return res.redirect('/');
}