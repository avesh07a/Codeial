const passport=require('passport');
const User=require('../models/users');
const LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy({
  usernameField:'email'
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){console.log('error in finding the user sin the database');return;}


        if(!user || user.password!=password)
        {
            console.log('Invalid username or password');
            return done(null,false, { message: 'Incorrect username or password' });
        }
      return done(null ,user);
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  passport.checkAuthentication=function(req,res,next)
  {
      if(req.isAuthenticated())
      {
          return next();
      }
      return res.redirect('/users/signin');
  }

  passport.setAuthenticateduser=function(req,res,next)
  {
      if(req.isAuthenticated())
      {
          res.locals.user=req.user
      }
    next();
  }

  module.exports=passport;