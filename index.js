document.addEventListener("DOMContentLoaded", async () => {
    const userListElement = document.getElementById('userList');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.classList.add('user-block');

            const userInfo = document.createElement('p');
            userInfo.innerHTML = `<strong>ID:</strong> ${user.id} <br> <strong>Name:</strong> ${user.name}`;

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.addEventListener('click', () => {
                window.location.href = `user-details.html?id=${user.id}`;
            });
            userBlock.appendChild(userInfo);
            userBlock.appendChild(detailsButton);

            userListElement.appendChild(userBlock);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});


