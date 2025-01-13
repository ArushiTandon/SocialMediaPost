const apiUrl = 'http://localhost:3000/posts';

async function uploadPost(event) {
    event.preventDefault();

    const image = event.target.link.value;
    const description = event.target.description.value;

    const post = { image, description, comments: [] };

    try {
        await axios.post(apiUrl, post); 
        
    } catch (error) {
        console.error("CAN'T POST:", error);
    }

    event.target.reset();
    loadPosts();
}

async function loadPosts() {
    try {
        const response = await axios.get(apiUrl);
        const posts = response.data;

        const userList = document.getElementById('postList');
        userList.innerHTML = '';

        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';

            // Image preview
            const image = document.createElement('img');
            image.src = post.image;
            image.alt = 'Post Image';
            image.style.width = '100%';
            image.style.height = 'auto';

            // Description
            const description = document.createElement('p');
            description.textContent = `User - ${post.description}`;

            // Comment Box
            const commentBox = document.createElement('textarea');
            commentBox.className = 'cmntBox';
            commentBox.placeholder = 'Write a comment';

            // Comment Button
            const commentBtn = document.createElement('button');
            commentBtn.textContent = "Comment";
            commentBtn.className = 'commentBtn';
            commentBtn.onclick = async () => {
                const comment = commentBox.value.trim();
                if (comment) {
                    try {
                        post.comments.push(comment); 
                        await axios.post(`${apiUrl}/comments/${post.id}`, { comment });
                        displayComment(commentsSection, comment);
                        commentBox.value = ''; 
                    } catch (error) {
                        console.error("CAN'T COMMENT ON POST:", error);
                    }
                } else {
                    alert("Write something");
                }
            };

            // Comments Section
            const commentsSection = document.createElement('div');
            commentsSection.className = 'comments';
            if (post.comments) {
                post.comments.forEach(comment => displayComment(commentsSection, comment));
            }

            listItem.appendChild(image);
            listItem.appendChild(description);
            listItem.appendChild(commentBox);
            listItem.appendChild(commentBtn);
            listItem.appendChild(commentsSection);
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error("CAN'T LOAD POSTS", error);
    }
}

function displayComment(parent, comment) {
    const commentDiv = document.createElement('p');
    commentDiv.className = 'comment';
    commentDiv.textContent = `Anonymous: ${comment}`;
    parent.appendChild(commentDiv);
}

window.onload = loadPosts;
