const post=require('../models/post');


module.exports.home=function(req,res){

    // post.find({},function(err,post)
    // {
    //     if(err){console.log('could not find');return;}
    //     return res.render('home',{
    //     title:'home',
    //     posts:post
    // })
    // })

    post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,post){
        if(err){console.log('could not find');return;}
        return res.render('home',{
        title:'home',
        posts:post
    })
    });


   


    
}