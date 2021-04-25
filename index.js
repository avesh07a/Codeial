const express=require('express');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

const app=express();
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));




  app.listen(port,function(err){
      if(err)
      {
          console.log('error on port',err);
          return;
      }
      console.log('successfully connected to port:',port);

  })