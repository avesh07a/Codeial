const Post=require('../models/post');
const comment=require('../models/comment');
const { post } = require('../routes');


module.exports.create=async function(req,res)
{
    try{
         await Post.create({
        content:req.body.content,
        user:req.user._id
        });
         return res.redirect('back');
    }catch(err)
    {
       if(err)
       {console.log(err);return;}
    }
  
}

module.exports.destroy=async function(req,res)
{  

    try {
        let post= await Post.findById(req.params.id);

   
        // .id means converting the object id into string
        if(post.user==req.user.id)
        {
            post.remove();
           await comment.deleteMany({post:req.params.id})
            return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }
        
    } catch (error) {
        if(error)
        {console.log('error',error);return;}
        
    }
   
   
}