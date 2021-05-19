
const User=require('../models/users');
const fs=require('fs');
const path=require('path');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
       return res.render('usersProfile',{
        title:'Profile',
        user_profile:user
    }); 
    })
    
}
module.exports.update=async function(req,res)
{
    // if(req.user.id==req.params.id)
    // {
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }
    // else
    // {
    //     
    // }

      if(req.user.id==req.params.id)
      {
          try{
              let user=await User.findById(req.params.id);
              User.uploadedAvatar(req,res,function(err){
                  if(err)
                  {
                      console.log('multer error',err);
                  }
                  user.name=req.body.name;
                  user.email=req.body.email;

                  if(req.file)
                  {
                      if(user.avatar)
                      {
                         fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                      }
                      user.avatar=User.avatarPath+'/'+req.file.filename;
                  }
                  user.save();
                  return res.redirect('back');
              })

          }catch(err)
          {
              req.flash('error',err);
              res.redirect('back');
          }

      }else
      {   req.flash('error','unauthorise');
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