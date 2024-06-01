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
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Address: 
                    <ol>Street: ${user.address.street}</ol>
                    <ol>Suite: ${user.address.suite}</ol>
                    <ol>City: ${user.address.city}</ol>
                    <ol>Zipcode: ${user.address.zipcode}</ol>
                    <ul>Geo:
                        <li>lat: ${user.address.geo.lat}</li>
                        <li>lng: ${user.address.geo.lng}</li>
                        </ul>
            </p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: 
                    <li>Name: ${user.company.name}</li> 
                    <li>catchPhrase: ${user.company.catchPhrase}</li>
                    <li>bs: ${user.company.bs}</li>
            </p>
`;

        const existingPostsButton = document.getElementById('postsButton');

        if (existingPostsButton) {
            existingPostsButton.remove();
        }


        const postsButton = document.createElement('button');
        postsButton.id = 'postsButton';
        postsButton.textContent = 'Posts of Current User';
        postsButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
                const posts = await response.json();

                const postsList = document.createElement('div');
                postsList.classList.add('posts-grit');

                posts.forEach(post => {
                    const postItem = document.createElement('span');
                    const postLink = document.createElement('a');
                    postLink.textContent = post.title;
                    postLink.classList = 'post';
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