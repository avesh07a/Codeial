const post=require('../models/post');
const user=require('../models/users');


module.exports.home=async function(req,res){

    // post.find({},function(err,post)
    // {
    //     if(err){console.log('could not find');return;}
    //     return res.render('home',{
    //     title:'home',
    //     posts:post
    // })
    // })

    try{
let posts=await post.find({}).sort('-createdAt').populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    let users=await user.find({}).sort('-createdAt'); 
    
     return res.render('home',{
        title:'home',
        posts:posts,
        user_profile:users
        })
    }catch(err)
    {
          if(err)
          {
              console.log(err);
          }
          return;
    }

   
    // exec(function(err,post){
    //     if(err){console.log('could not find');return;}

    //     user.find({},function(err,user)
    //     {
          
        // return res.render('home',{
        //     title:'home',
        //     posts:post,
        //     user_profile:user
        //     })
    // })
    // });


   


    
}