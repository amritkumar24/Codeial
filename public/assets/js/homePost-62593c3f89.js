let postForm=document.getElementById("new-post-form"),postListContainer=document.getElementById("posts-list");postForm.addEventListener("submit",async e=>{e.preventDefault();e=new FormData(postForm),e=Object.fromEntries(e.entries());try{var t,o=await(await fetch("/posts/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json();o.success?((t=document.createElement("li")).innerHTML=`
                <p>
                ${o.post.content}           <!-- Post content -->
                <br>
                <small>${o.post.user.name}</small> <!-- Author's name -->
                <a href="/posts/destroy/${o.post._id}">Delete</a> <!-- Delete link -->
                </p>
                <div class="post-comments">
                <!-- Form to add comments to this post -->
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                    <input type="hidden" name="post" value="${o.post._id}"> <!-- Associate comment with this post -->
                    <input type="submit" value="Add comments">
                </form>
                <div>
                    <ul></ul> <!-- List of comments will appear here -->
                </div>
                </div>
            `,postListContainer.prepend(t),postForm.reset()):console.log(o.message)}catch(e){console.log("Error in submitting form")}}),postListContainer.addEventListener("click",async e=>{if(e.target.classList.contains("delete-post")){e.preventDefault();var t,o=e.target.href;try{(await fetch(o,{method:"GET"})).ok?((t=e.target.closest("li"))&&t.remove(),console.log("post deleted from DOM and DB")):console.log("Failed to delete")}catch(e){console.error("Error sending delete request:",e)}}});