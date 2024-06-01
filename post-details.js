document.addEventListener("DOMContentLoaded", async () => {
    const postDetailsElement = document.getElementById('postDetails');
    const postId = new URLSearchParams(window.location.search).get('id');

    if (!postId) {
        postDetailsElement.innerHTML = '<p>Post ID not provided!</p>';
        return;
    }
    try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await postResponse.json();


        const postDetailBlock = document.createElement('div');
        postDetailBlock.classList.add('post-detail-block');

        const postInfo = document.createElement('p');
        postInfo.innerHTML = `
            <strong>ID:</strong> ${post.id} <br>
            <strong>Title:</strong> ${post.title} <br>
            <strong>Body:</strong> ${post.body}`;

        postDetailBlock.appendChild(postInfo);
        postDetailsElement.appendChild(postDetailBlock);
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await commentsResponse.json();

        const commentsBlock = document.createElement('div');
        commentsBlock.classList.add('comments-block');


        const commentsGrid = document.createElement('div');
        commentsGrid.classList.add('comments-grid');

        comments.forEach(comment => {
            const commentInfo = document.createElement('p');
            commentInfo.innerHTML = `
                <strong>Name:</strong> ${comment.name} <br>
                <strong>Email:</strong> ${comment.email} <br>
                <strong>Body:</strong> ${comment.body}`;


            commentsGrid.appendChild(commentInfo);
        });
        commentsBlock.appendChild(commentsGrid);
        postDetailsElement.appendChild(commentsBlock);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});