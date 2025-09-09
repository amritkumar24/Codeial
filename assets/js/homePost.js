const postForm = document.getElementById("new-post-form");
const postListContainer = document.getElementById("posts-list");

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);
    const data = Object.fromEntries(formData.entries());
    
    try{
        const res = await fetch("/posts/create", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        });

        const json = await res.json();

        if(json.success){
            const li = document.createElement("li");

            li.innerHTML = `
                <p>
                ${json.post.content}           <!-- Post content -->
                <br>
                <small>${json.post.user.name}</small> <!-- Author's name -->
                <a href="/posts/destroy/${json.post._id}">Delete</a> <!-- Delete link -->
                </p>
                <div class="post-comments">
                <!-- Form to add comments to this post -->
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                    <input type="hidden" name="post" value="${json.post._id}"> <!-- Associate comment with this post -->
                    <input type="submit" value="Add comments">
                </form>
                <div>
                    <ul></ul> <!-- List of comments will appear here -->
                </div>
                </div>
            `;

            postListContainer.prepend(li);

            postForm.reset();
        } else {
            console.log(json.message);
        }
    }catch(err){
        console.log("Error in submitting form");
    }
});

postListContainer.addEventListener("click", async (e) => {
    if(e.target.classList.contains("delete-post")){
        e.preventDefault();
        
        const deleteUrl = e.target.href;
        
        try{
            const res = await fetch(deleteUrl, {
                method: "GET"
            });

            if(res.ok){
                const postItem = e.target.closest("li");
                if(postItem){
                    postItem.remove();
                }

                console.log("post deleted from DOM and DB");
            }else{
                console.log("Failed to delete");
            }
        } catch (err) {
            console.error("Error sending delete request:", err);
        }
    }
})