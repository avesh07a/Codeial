const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create=function(req,res)
{
         Post.findById(req.body.post,function(err,post){

            if(post)
            {
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },function(err,comment){
                    if(err){console.log(err);return;}
                    post.comments.push(comment);
                    
                    post.save();
                    req.flash('success','Commented Successfully');

                    res.redirect('/');
                });
            }
         });
}


module.exports.destroy=function(req,res)
{
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id)
        {
            let postid=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postid,{ $pull: {comments:req.params.id}},function(err,post){
                req.flash('success','Comment Deleted Successfully');
                return res.redirect('back');
            })
        }
        else
        {
            return res.redirect('back');

        }
    })
}