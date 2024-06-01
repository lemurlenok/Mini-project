document.addEventListener("DOMContentLoaded", async () => {
    const postDetailsElement = document.getElementById('postDetails');
    const postId = new URLSearchParams(window.location.search).get('id');

    if (!postId) {
        postDetailsElement.innerHTML = '<p>Post ID not provided!</p>';
        return;
    }