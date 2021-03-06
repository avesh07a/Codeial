const express=require('express');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session key
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const Mware=require('./config/middleware');





const app=express();
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahblah',
    resave: false,
  saveUninitialized: false,
  cookie:{
      maxAge:(1000*60*100)
  },
  store:MongoStore.create(
    { mongoUrl: 'mongodb://localhost/test' },
    function(err)
    {
        console.log(err || 'in finding the database');
    }
  )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateduser);
app.use(flash());
app.use(Mware.setFlash);
app.use('/',require('./routes'));





  app.listen(port,function(err){
      if(err)
      {
          console.log('error on port',err);
          return;
      }
      console.log('successfully connected to port:',port);

  })