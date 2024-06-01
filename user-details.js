function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


async function getUserDetails() {
    try {
        const userId = getUserIdFromUrl();
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        const userDetailsElement = document.getElementById('userDetails');


        userDetailsElement.innerHTML = `
            <h2>User Details</h2>
            <p>ID: ${user.id}</p>
            <p>Name: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
            <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        `;

        const existingPostsButton = document.getElementById('postsButton');

        if (existingPostsButton) {
            // Видалення існуючої кнопки
            existingPostsButton.remove();
        }


        const postsButton = document.createElement('button');
        postsButton.id = 'postsButton';
        postsButton.textContent = 'Posts of Current User';
        postsButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
                const posts = await response.json();

                const postsList = document.createElement('ul');

                posts.forEach(post => {
                    const postItem = document.createElement('li');
                    const postLink = document.createElement('a');
                    postLink.textContent = post.title;
                    postLink.href = `post-details.html?id=${post.id}`;
                    postItem.appendChild(postLink);
                    postsList.appendChild(postItem);
                });

                userDetailsElement.appendChild(postsList);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        });

        userDetailsElement.appendChild(postsButton);

    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

getUserDetails();