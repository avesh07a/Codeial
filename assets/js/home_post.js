{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    
                    let newPost = newPostDom(data.data.post);
                    
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button'),newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}">
      
           <a class="delete-post-button" href="/post/destroy/${ post. _id }">X</a>
           
           
           <p>${ post .content }
           <br>${ post.user.name}</p> 
           
    
           <div class="post-comments">
            
                    
                    <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="type here to add comment">
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add Comment">
                    </form>
                    
                    
        </div>
        
        <div class="post-comments-list">
            <ul id="post-comments-${ post._id }">
                      
            </ul>
        
        
        </div>
           
      </li>     `)
    }

    //method to delete post from dom
    let deletePost=function(deleteLink)
    {
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                  type:'get',
                  url:$(deleteLink).prop('href'),
                  success:function(data)
                  {
                      console.log(data);
                      console.log(`#post-${data.data.post_id}`);
                         $(`#post-${data.data.post_id}`).remove();
                  },error:function(error)
                  {
                      console.log(error);
                  }
            });
        })
    }    


    createPost();
}